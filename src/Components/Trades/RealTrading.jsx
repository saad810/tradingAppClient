'use client';

import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import RealTradeSideBar from "../TradingSideBar/RealTradeSideBar";
import useTrade from "../../hooks/useTrade";
import { toast } from "react-toastify";
import { LuCandlestickChart } from "react-icons/lu";
import {
  FaCamera,
  FaChartBar,
  FaChartLine,
  FaChartArea,
} from "react-icons/fa";
import MarketsModal from './MarketsModal';
import marketStore from '../../store/marketStore';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useCandlestickData from "../../hooks/useCandlestickData";
import {
  calculateMovingAverage,
  calculateBollingerBands,
  calculateRSI,
  calculateFibonacciRetracement,
  calculateATR,
  calculateEMA,
  calculateVWAP
} from './indicators';
import { sampleCandlestickData } from './sample';

const RealTrading = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const selectedMarket = marketStore((state) => state.selectedMarket);
  console.log(selectedMarket);
  // const [candlestickData, setCandlestickData] = useState([]);
  const { candlestickData } = useCandlestickData(selectedMarket || "WLDAUD", 5);
  useEffect(() => {
    if (auth.currAccType !== "real") {
      toast.error("You are not allowed to access this page");
      navigate("/demo-trading");
    }
  }, [auth, navigate]);

  const {
    stake,
    setStake,
    selectedMultiplier,
    setSelectedMultiplier,
    currentPrice,
    handleBuyIn,
    handleBuyOut,
  } = useTrade(selectedMarket ? selectedMarket : "WLDAUD", candlestickData);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [indicator, setIndicator] = useState("Moving Average");
  const [chartType, setChartType] = useState("Candlestick");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSnapshot = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.querySelector("canvas");
      if (canvas) {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "chart-snapshot.png";
        link.click();
      }
    }
  };

  useEffect(() => {
    toast.info("Demo trading YAY");
  }, []);

  useEffect(() => {
    if (!candlestickData || candlestickData.length === 0 || !chartRef.current) {
      return;
    }

    // Remove existing chart if any
    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
    }

    // Create chart
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        textColor: "#000",
        background: { type: "solid", color: "#fff" },
      },
      grid: {
        vertLines: {
          color: '#e1e1e1',
        },
        horzLines: {
          color: '#e1e1e1',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        position: 'left',
        autoScale: true,
      },
      rightPriceScale: {
        visible: true, // Ensure right scale is visible for indicators
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartInstanceRef.current = chart;

    let mainSeries;

    // Add main chart series based on chartType
    switch (chartType) {
      case "Candlestick":
        mainSeries = chart.addCandlestickSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        });
        mainSeries.setData(candlestickData);
        break;
      case "Bar":
        mainSeries = chart.addBarSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
        });
        mainSeries.setData(candlestickData);
        break;
      case "Line":
        mainSeries = chart.addLineSeries({
          color: "#2962FF",
          lineWidth: 2,
        });
        const lineData = candlestickData.map((d) => ({
          time: d.time,
          value: d.close,
        }));
        mainSeries.setData(lineData);
        break;
      case "Area":
        mainSeries = chart.addAreaSeries({
          topColor: 'rgba(41, 98, 255, 0.4)',
          bottomColor: 'rgba(41, 98, 255, 0.0)',
          lineColor: '#2962FF',
          lineWidth: 2,
        });
        const areaData = candlestickData.map((d) => ({
          time: d.time,
          value: d.close,
        }));
        mainSeries.setData(areaData);
        break;
      default:
        mainSeries = chart.addCandlestickSeries();
        mainSeries.setData(sampleCandlestickData);
    }

    chart.timeScale().fitContent();

    // Add selected indicator
    if (indicator) {
      switch (indicator) {
        case "Moving Average":
          const maData = calculateMovingAverage(candlestickData, 14);
          const maSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2, priceScaleId: 'right' });
          maSeries.setData(maData);
          break;
        case "Bollinger Bands":
          const bbData = calculateBollingerBands(candlestickData, 14, 2);
          const upperBandSeries = chart.addLineSeries({ color: 'green', lineWidth: 1, priceScaleId: 'right' });
          const middleBandSeries = chart.addLineSeries({ color: 'blue', lineWidth: 1, priceScaleId: 'right' });
          const lowerBandSeries = chart.addLineSeries({ color: 'red', lineWidth: 1, priceScaleId: 'right' });
          upperBandSeries.setData(bbData.map(d => ({ time: d.time, value: d.upper })));
          middleBandSeries.setData(bbData.map(d => ({ time: d.time, value: d.middle })));
          lowerBandSeries.setData(bbData.map(d => ({ time: d.time, value: d.lower })));
          break;
        case "RSI":
          const rsiData = calculateRSI(candlestickData, 14);
          const rsiSeries = chart.addLineSeries({ color: 'purple', lineWidth: 2, priceScaleId: 'right' });
          rsiSeries.setData(rsiData);
          break;
        case "EMA":
          const emaData = calculateEMA(candlestickData, 14);
          const emaSeries = chart.addLineSeries({ color: 'cyan', lineWidth: 2, priceScaleId: 'right' });
          emaSeries.setData(emaData);
          break;
        case "VWAP":
          const vwapData = calculateVWAP(candlestickData);
          const vwapSeries = chart.addLineSeries({ color: 'brown', lineWidth: 2, priceScaleId: 'right' });
          vwapSeries.setData(vwapData);
          break;
        case "ATR":
          const atrData = calculateATR(candlestickData);
          const atrSeries = chart.addLineSeries({ color: "magenta", lineWidth: 2, priceScaleId: "right" });
          atrSeries.setData(atrData);
          break;
        default:
          break;
      }
    }

    // Handle chart resize
    const handleResize = () => {
      if (chartRef.current && chartInstanceRef.current) {
        chartInstanceRef.current.applyOptions({
          width: chartRef.current.clientWidth,
          height: chartRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [candlestickData, chartType, indicator]);

  return (
    <div className="flex flex-row h-screen">
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

      <div className="flex-grow flex flex-col">
        <div className="flex flex-row items-center justify-between bg-gray-100 p-2">
          <div className="flex space-x-4">
            <LuCandlestickChart
              size={24}
              className={`cursor-pointer ${chartType === "Candlestick" ? 'text-blue-500' : 'text-gray-600'}`}
              title="Candlestick Chart"
              onClick={() => setChartType("Candlestick")}
            />
            <FaChartBar
              size={24}
              className={`cursor-pointer ${chartType === "Bar" ? 'text-blue-500' : 'text-gray-600'}`}
              title="Bar Chart"
              onClick={() => setChartType("Bar")}
            />
            <FaChartLine
              size={24}
              className={`cursor-pointer ${chartType === "Line" ? 'text-blue-500' : 'text-gray-600'}`}
              title="Line Chart"
              onClick={() => setChartType("Line")}
            />
            <FaChartArea
              size={24}
              className={`cursor-pointer ${chartType === "Area" ? 'text-blue-500' : 'text-gray-600'}`}
              title="Area Chart"
              onClick={() => setChartType("Area")}
            />
            <FaCamera
              size={24}
              className="cursor-pointer text-gray-600"
              title="SnapShot"
              onClick={handleSnapshot}
            />
            <button onClick={() => setIsModalOpen(true)}>Markets</button>
            {/* <button onClick={handleSnapshot}>Snapshot</button> */}
          </div>
          <div>
            <select onChange={(e) => setIndicator(e.target.value)} value={indicator}>
              <option value="Moving Average">Moving Average</option>
              <option value="Bollinger Bands">Bollinger Bands</option>
              <option value="RSI">RSI</option>
              <option value="EMA">EMA</option>
              <option value="VWAP">VWAP</option>
              <option value="ATR">ATR</option>
            </select>
          </div>
        </div>

        <div ref={chartRef} className="flex-grow" style={{
          height: 'calc(100vh - 8rem)',
          width: '100%',
        }} />
      </div>

      <MarketsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default RealTrading;
