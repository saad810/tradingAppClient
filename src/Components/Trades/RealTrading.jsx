import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { createChart } from "lightweight-charts";

import useCandlestickData from "../../hooks/useCandlestickData";
import useDemoTrade from "../../hooks/useDemoTrade";
import RealTradeSideBar from "../TradingSideBar/RealTradeSideBar";

const RealTrading = () => {
  const { symbol } = useParams();
  const { candlestickData } = useCandlestickData(symbol, 5);
  const {
    demoBalance,
    stake,
    setStake,
    selectedMultiplier,
    setSelectedMultiplier,
    currentPrice,
    handleBuyIn,
    handleBuyOut,
  } = useDemoTrade(symbol, candlestickData);

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
      <div style={{ width: "1180px", height: "500px" }} className="mt-3">
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
      </div>
      <div className="w-80">
        <RealTradeSideBar
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

export default RealTrading;
