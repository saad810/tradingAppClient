import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createChart } from "lightweight-charts";
import DemoTradeSideBar from "../TradingSideBar/DemoTradeSideBar";
import useCandlestickData from "../../hooks/useCandlestickData";
import useDemoTrade from "../../hooks/useDemoTrade";
import { toast } from "react-toastify";

const DemoTrading = () => {
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
  const [movingAverageData, setMovingAverageData] = useState([]);
  const [bollingerBands, setBollingerBands] = useState({
    upperBandData: [],
    lowerBandData: [],
  });

  useEffect(() => {
    toast.info("Demo trading YAY");
  }, []);

  useEffect(() => {
    if (candlestickData.length > 0) {
      const maData = calculateMovingAverage(candlestickData, 10); // 10-period MA
      const { upperBandData, lowerBandData } = calculateBollingerBands(candlestickData);

      setMovingAverageData(maData);
      setBollingerBands({ upperBandData, lowerBandData });
    }
  }, [candlestickData]);

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

    const movingAverageSeries = chart.addLineSeries({
      color: "blue",
      lineWidth: 2,
    });
    movingAverageSeries.setData(movingAverageData);

    const upperBandSeries = chart.addLineSeries({
      color: "green",
      lineWidth: 1,
    });
    upperBandSeries.setData(bollingerBands.upperBandData);

    const lowerBandSeries = chart.addLineSeries({
      color: "red",
      lineWidth: 1,
    });
    lowerBandSeries.setData(bollingerBands.lowerBandData);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [candlestickData, movingAverageData, bollingerBands]);

  return (
    <div className="flex">
      <div style={{ width: "1180px", height: "500px" }} className="mt-3">
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
      </div>
      <div className="w-80">
        <DemoTradeSideBar
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

const calculateMovingAverage = (data, windowSize) => {
  let movingAverageData = [];
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i].close;
    if (i >= windowSize - 1) {
      movingAverageData.push({
        time: data[i].time,
        value: sum / windowSize,
      });
      sum -= data[i - (windowSize - 1)].close;
    }
  }
  return movingAverageData;
};

const calculateBollingerBands = (data, windowSize = 20, numStdDev = 2) => {
  let upperBandData = [];
  let lowerBandData = [];
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i].close;
    if (i >= windowSize - 1) {
      const mean = sum / windowSize;

      let variance = 0;
      for (let j = 0; j < windowSize; j++) {
        variance += Math.pow(data[i - j].close - mean, 2);
      }
      variance /= windowSize;

      const stdDev = Math.sqrt(variance);

      upperBandData.push({
        time: data[i].time,
        value: mean + numStdDev * stdDev,
      });
      lowerBandData.push({
        time: data[i].time,
        value: mean - numStdDev * stdDev,
      });

      sum -= data[i - (windowSize - 1)].close;
    }
  }

  return { upperBandData, lowerBandData };
};

export default DemoTrading;
