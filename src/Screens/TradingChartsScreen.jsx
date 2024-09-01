import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { createChart } from "lightweight-charts";
import { useParams } from "react-router-dom";
import useCandlestickData from "../hooks/useCandlestickData";
import useTradeProfitLoss from "../hooks/useTradeProfitLoss";
import SideBarTrading from "../Components/SideBarTrading";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useTrade from "../hooks/useTrade";

const TradingChartsScreen = () => {
  const { demoBalance, setDemoBalance } = useTrade();
  const { auth } = useAuth();
  const { symbol } = useParams();
  const [userTrade, setUserTrade] = useState(null);
  const { candlestickData } = useCandlestickData(symbol, 5);
  const { buyIn, buyOut, profitLoss, buyInPrice, buyOutPrice } =
    useTradeProfitLoss();
  const [currentPrice, setCurrentPrice] = useState(null);
  const [stake, setStake] = useLocalStorage("stake", null);
  const [selectedMultiplier, setSelectedMultiplier] = useLocalStorage(
    "multiplier",
    "50X"
  );

  useEffect(() => {
    if (candlestickData.length > 0) {
      setCurrentPrice(candlestickData[candlestickData.length - 1].close);
    }
  }, [candlestickData]);

  useEffect(() => {
    console.log("Profit/Loss Percentage:", profitLoss);
  }, [profitLoss]);

  const calculateWinNum = (profitLoss, multiplier, stake) => {
    switch (multiplier) {
      case "25X":
        return profitLoss * 25 * stake;
      case "50X":
        return profitLoss * 50 * stake;
      case "75X":
        return profitLoss * 75 * stake;
      case "100X":
        return profitLoss * 100 * stake;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (stake && selectedMultiplier && profitLoss) {
      setUserTrade({
        isDemo: true,
        tradePair: symbol,
        tradeEntry: buyInPrice,
        tradeClosePrice: buyOutPrice,
        profitVal: profitLoss,
        stake: stake,
        tradeType: "demo",
        multiplier: selectedMultiplier,
        tradeWinNum: calculateWinNum(profitLoss, selectedMultiplier, stake),
        tradeUserId: auth.user.id,
      });
      console.log("User Trade", JSON.stringify(userTrade));
    }
  }, [profitLoss, stake, selectedMultiplier]);

  // Create trade only when userTrade is updated
  const handleCreateTrade = async () => {
    if (!userTrade) return; // Ensure userTrade is set before making the request
    try {
      console.log("Creating Trade", userTrade);
      const response = await axios.post("/trades", userTrade, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Trade Created", response.data);
      toast.success("Trade created successfully");
    } catch (error) {
      console.log("Error creating trade", error);
      toast.error("Error creating trade");
    }
  };

  const handleBuyIn = () => {
    if (!stake || !selectedMultiplier) {
      toast.error("Please select a multiplier and stake before buying in.");
      return; // Prevent further execution
    }

    if (stake < 1000) {
      toast.error("Insufficient demo balance. Cannot buy in.");
      return; // Prevent further execution
    }

    console.log("Buy In Clicked", currentPrice);
    setDemoBalance(demoBalance - stake); // Deduct stake from demo balance
    if (currentPrice !== null) {
      buyIn(currentPrice); // Set buy-in price to current price
    }
  };

  const handleBuyOut = async () => {
    try {
      console.log("Buy Out Clicked", currentPrice);
      if (currentPrice !== null) {
        await buyOut(currentPrice); // Wait for buyOut to finish
        if (demoBalance >= stake) {
          setDemoBalance(
            (demoBalance - stake) *
              calculateWinNum(profitLoss, selectedMultiplier, stake)
          );
        } else {
          toast.error("Insufficient balance");
        }
        // Deduct stake from demo balance
        handleCreateTrade(); // Call create trade after buy out
        console.log("Profit/Loss Percentage:", profitLoss); // Log profit/loss percentage
      }
    } catch (error) {
      console.log("Error during Buy Out", error);
      toast.error("Error during Buy Out");
    }
  };

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candlestickSeries.setData(candlestickData);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [candlestickData]);

  return (
    <div className="flex">
      <div style={{ width: "1180px", height: "500px" }}>
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
      </div>
      <div className="w-80">
        <SideBarTrading
          buyIn={handleBuyIn}
          buyOut={handleBuyOut}
          currentPrice={currentPrice}
          stake={stake}
          setStake={setStake}
          selectedMultiplier={selectedMultiplier}
          setSelectedMultiplier={setSelectedMultiplier}
        />
      </div>
    </div>
  );
};

export default TradingChartsScreen;
