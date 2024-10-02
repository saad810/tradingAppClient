// 'use client';

// import React, { useEffect, useRef, useState } from "react";
// import { createChart, CrosshairMode } from "lightweight-charts";
// import RealTradeSideBar from "../TradingSideBar/RealTradeSideBar";
// import useTrade from "../../hooks/useTrade";
// import { toast } from "react-toastify";
// import { LuCandlestickChart } from "react-icons/lu";
// import {
//   FaCamera,
//   FaChartBar,
//   FaChartLine,
//   FaChartArea,
// } from "react-icons/fa";
// import { calculateMovingAverage, calculateBollingerBands, calculateRSI, calculateMACD, calculateEMA, calculateVWAP, calculateATR, calculateFibonacciRetracement } from "./indicators";
// import MarketsModal from './MarketsModal';
// import marketStore from '../../store/marketStore';
// import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import useCandlestickData from "../../hooks/useCandlestickData";
// // import { candlestickData } from '../../data/candlestickData';
// const RealTrading = () => {
//   const { auth } = useAuth();
//   const navigate = useNavigate();
//   const { candlestickData } = useCandlestickData('WLDAUD');
//   useEffect(() => {
//     if (auth.currAccType !== "real") {
//       toast.error("You are not allowed to access this page");
//       navigate("/demo-trading");
//     }
//   }, [auth]);
//   const selectedMarket = marketStore((state) => state.selectedMarket);

//   // Sample candlestick data
//   const sampleCandlestickData = [
//     { time: '2023-09-25', open: 70.34, high: 71.19, low: 69.96, close: 70.61 },
//     { time: '2023-09-26', open: 70.61, high: 71.55, low: 70.20, close: 71.23 },
//     { time: '2023-09-27', open: 71.23, high: 72.24, low: 71.00, close: 71.80 },
//     { time: '2023-09-28', open: 71.80, high: 72.89, low: 71.50, close: 72.34 },
//     { time: '2023-09-29', open: 72.34, high: 73.12, low: 72.00, close: 72.76 },
//     { time: '2023-09-30', open: 72.76, high: 73.45, low: 72.12, close: 73.00 },
//     { time: '2023-10-01', open: 73.00, high: 74.00, low: 72.89, close: 73.55 },
//     { time: '2023-10-02', open: 73.55, high: 74.45, low: 73.12, close: 74.00 },
//   ];

//   // Sample data for indicators based on the candlestick data
//   const sampleMovingAverageData = [
//     { time: '2023-09-25', value: 70.50 },
//     { time: '2023-09-26', value: 71.00 },
//     { time: '2023-09-27', value: 71.50 },
//     { time: '2023-09-28', value: 71.90 },
//     { time: '2023-09-29', value: 72.20 },
//     { time: '2023-09-30', value: 72.60 },
//     { time: '2023-10-01', value: 72.90 },
//     { time: '2023-10-02', value: 73.30 },
//   ];

//   const sampleBollingerBandsData = {
//     upper: [
//       { time: '2023-09-25', value: 71.50 },
//       { time: '2023-09-26', value: 72.00 },
//       { time: '2023-09-27', value: 72.50 },
//       { time: '2023-09-28', value: 72.90 },
//       { time: '2023-09-29', value: 73.20 },
//       { time: '2023-09-30', value: 73.60 },
//       { time: '2023-10-01', value: 73.90 },
//       { time: '2023-10-02', value: 74.30 },
//     ],
//     middle: sampleMovingAverageData, // Middle band is the same as the Moving Average
//     lower: [
//       { time: '2023-09-25', value: 69.50 },
//       { time: '2023-09-26', value: 70.00 },
//       { time: '2023-09-27', value: 70.50 },
//       { time: '2023-09-28', value: 70.90 },
//       { time: '2023-09-29', value: 71.20 },
//       { time: '2023-09-30', value: 71.60 },
//       { time: '2023-10-01', value: 71.90 },
//       { time: '2023-10-02', value: 72.30 },
//     ]
//   };

//   const sampleRsiData = [
//     { time: '2023-09-25', value: 50 },
//     { time: '2023-09-26', value: 55 },
//     { time: '2023-09-27', value: 60 },
//     { time: '2023-09-28', value: 65 },
//     { time: '2023-09-29', value: 70 },
//     { time: '2023-09-30', value: 75 },
//     { time: '2023-10-01', value: 60 },
//     { time: '2023-10-02', value: 65 },
//   ];

//   const sampleMacdData = [
//     { time: '2023-09-25', value: 0.5 },
//     { time: '2023-09-26', value: 0.6 },
//     { time: '2023-09-27', value: 0.7 },
//     { time: '2023-09-28', value: 0.8 },
//     { time: '2023-09-29', value: 0.9 },
//     { time: '2023-09-30', value: 1.0 },
//     { time: '2023-10-01', value: 0.6 },
//     { time: '2023-10-02', value: 0.7 },
//   ];

//   const sampleEmaData = [
//     { time: '2023-09-25', value: 70.40 },
//     { time: '2023-09-26', value: 70.85 },
//     { time: '2023-09-27', value: 71.35 },
//     { time: '2023-09-28', value: 71.75 },
//     { time: '2023-09-29', value: 72.15 },
//     { time: '2023-09-30', value: 72.50 },
//     { time: '2023-10-01', value: 72.85 },
//     { time: '2023-10-02', value: 73.20 },
//   ];

//   const sampleVwapData = [
//     { time: '2023-09-25', value: 70.45 },
//     { time: '2023-09-26', value: 70.95 },
//     { time: '2023-09-27', value: 71.40 },
//     { time: '2023-09-28', value: 71.85 },
//     { time: '2023-09-29', value: 72.30 },
//     { time: '2023-09-30', value: 72.65 },
//     { time: '2023-10-01', value: 73.00 },
//     { time: '2023-10-02', value: 73.40 },
//   ];

//   const {
//     stake,
//     setStake,
//     selectedMultiplier,
//     setSelectedMultiplier,
//     currentPrice,
//     handleBuyIn,
//     handleBuyOut,
//   } = useTrade(selectedMarket ? selectedMarket : "WLDAUD", candlestickData);

//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);
//   const [indicator, setIndicator] = useState("Moving Average");
//   const [chartType, setChartType] = useState("Candlestick"); // New state for chart type
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSnapshot = () => {
//     if (chartRef.current) {
//       const canvas = chartRef.current.querySelector("canvas");
//       if (canvas) {
//         const imgData = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.href = imgData;
//         link.download = "chart-snapshot.png";
//         link.click();
//       }
//     }
//   };

//   // Helper function to remove all indicator series
//   const removeAllIndicators = (chart) => {
//     const series = chart.getAllSeries();
//     series.forEach((s) => {
//       if (s.options().priceScaleId !== 'left') { // Assuming indicators are on a different price scale
//         chart.removeSeries(s);
//       }
//     });
//   };



//   useEffect(() => {
//     if (!sampleCandlestickData || sampleCandlestickData.length === 0 || !chartRef.current) {
//       return 'loading...';
//     }

//     // Remove existing chart if any
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.remove();
//       chartInstanceRef.current = null;
//     }

//     // Create chart based on chartType
//     const chart = createChart(chartRef.current, {
//       width: chartRef.current.clientWidth,
//       height: chartRef.current.clientHeight,
//       layout: {
//         textColor: "#000",
//         background: { type: "solid", color: "#fff" },
//       },
//       grid: {
//         vertLines: {
//           color: '#e1e1e1',
//         },
//         horzLines: {
//           color: '#e1e1e1',
//         },
//       },
//       crosshair: {
//         mode: CrosshairMode.Normal,
//       },
//       priceScale: {
//         position: 'left',
//       },
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: false,
//       },
//     });

//     chartInstanceRef.current = chart;

//     // let mainSeries;
//     const  mainSeries = chart.addCandlestickSeries({
//           upColor: "#26a69a",
//           downColor: "#ef5350",
//           borderVisible: false,
//           wickUpColor: "#26a69a",
//           wickDownColor: "#ef5350",
//         });
//         mainSeries.setData(candlestickData);

//     // Add main chart series based on chartType
//     // switch (chartType) {
//     //   case "Candlestick":
//     //     mainSeries = chart.addCandlestickSeries({
//     //       upColor: "#26a69a",
//     //       downColor: "#ef5350",
//     //       borderVisible: false,
//     //       wickUpColor: "#26a69a",
//     //       wickDownColor: "#ef5350",
//     //     });
//     //     mainSeries.setData(candlestickData);
//     //     break;
//     //   case "Bar":
//     //     mainSeries = chart.addBarSeries({
//     //       upColor: "#26a69a",
//     //       downColor: "#ef5350",
//     //       borderVisible: false,
//     //     });
//     //     mainSeries.setData(candlestickData);
//     //     break;
//     //   case "Line":
//     //     mainSeries = chart.addLineSeries({
//     //       color: "#2962FF",
//     //       lineWidth: 2,
//     //     });
//     //     // For line chart, use closing prices
//     //     const lineData = candlestickData.map((d) => ({
//     //       time: d.time,
//     //       value: d.close,
//     //     }));
//     //     mainSeries.setData(lineData);
//     //     break;
//     //   case "Area":
//     //     mainSeries = chart.addAreaSeries({
//     //       topColor: 'rgba(41, 98, 255, 0.4)',
//     //       bottomColor: 'rgba(41, 98, 255, 0.0)',
//     //       lineColor: '#2962FF',
//     //       lineWidth: 2,
//     //     });
//     //     // For area chart, use closing prices
//     //     const areaData = candlestickData.map((d) => ({
//     //       time: d.time,
//     //       value: d.close,
//     //     }));
//     //     mainSeries.setData(areaData);
//     //     break;
//     //   default:
//     //     mainSeries = chart.addCandlestickSeries();
//     //     mainSeries.setData(candlestickData);
//     // }

//     chart.timeScale().fitContent();

//     // Add selected indicator
//     // if (indicator) {
//     //   switch (indicator) {
//     //     case "Moving Average":
//     //       const maSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2 });
//     //       maSeries.setData(sampleMovingAverageData);
//     //       break;
//     //     case "Bollinger Bands":
//     //       const upperBandSeries = chart.addLineSeries({ color: 'green', lineWidth: 1 });
//     //       const middleBandSeries = chart.addLineSeries({ color: 'blue', lineWidth: 1 });
//     //       const lowerBandSeries = chart.addLineSeries({ color: 'red', lineWidth: 1 });
//     //       upperBandSeries.setData(sampleBollingerBandsData.upper);
//     //       middleBandSeries.setData(sampleBollingerBandsData.middle);
//     //       lowerBandSeries.setData(sampleBollingerBandsData.lower);
//     //       break;
//     //     case "RSI":
//     //       const rsiSeries = chart.addLineSeries({ color: 'purple', lineWidth: 2 });
//     //       rsiSeries.setData(sampleRsiData);
//     //       break;
//     //     case "MACD":
//     //       const macdSeries = chart.addLineSeries({ color: 'orange', lineWidth: 2 });
//     //       macdSeries.setData(sampleMacdData);
//     //       break;
//     //     case "EMA":
//     //       const emaSeries = chart.addLineSeries({ color: 'cyan', lineWidth: 2 });
//     //       emaSeries.setData(sampleEmaData);
//     //       break;
//     //     case "VWAP":
//     //       const vwapSeries = chart.addLineSeries({ color: 'brown', lineWidth: 2 });
//     //       vwapSeries.setData(sampleVwapData);
//     //       break;
//     //     default:
//     //       break;
//     //   }
//     // }
//     if (indicator && candlestickData) { // Assuming 'data' is your candlestick data
//       switch (indicator) {
//         case "Moving Average":
//           const movingAverageData = calculateMovingAverage(candlestickData, 14); // Example period
//           const maSeries = chart.addLineSeries({ color: 'blue', lineWidth: 2 });
//           maSeries.setData(movingAverageData);
//           break;

//         case "Bollinger Bands":
//           const bollingerData = calculateBollingerBands(candlestickData, 20, 2); // Example period and multiplier
//           const upperBandSeries = chart.addLineSeries({ color: 'green', lineWidth: 1 });
//           const middleBandSeries = chart.addLineSeries({ color: 'blue', lineWidth: 1 });
//           const lowerBandSeries = chart.addLineSeries({ color: 'red', lineWidth: 1 });
//           upperBandSeries.setData(bollingerData.upper);
//           middleBandSeries.setData(bollingerData.middle);
//           lowerBandSeries.setData(bollingerData.lower);
//           break;

//         case "RSI":
//           const rsiData = calculateRSI(candlestickData, 14); // Example period
//           const rsiSeries = chart.addLineSeries({ color: 'purple', lineWidth: 2 });
//           rsiSeries.setData(rsiData);
//           break;

//         case "MACD":
//           const macdData = calculateMACD(candlestickData, 12, 26, 9); // Example MACD settings
//           const macdSeries = chart.addLineSeries({ color: 'orange', lineWidth: 2 });
//           macdSeries.setData(macdData);
//           break;

//         case "EMA":
//           const emaData = calculateEMA(candlestickData, 14); // Example period
//           const emaSeries = chart.addLineSeries({ color: 'cyan', lineWidth: 2 });
//           emaSeries.setData(emaData);
//           break;

//         case "VWAP":
//           const vwapData = calculateVWAP(candlestickData); // Assuming daily VWAP calculation
//           const vwapSeries = chart.addLineSeries({ color: 'brown', lineWidth: 2 });
//           vwapSeries.setData(vwapData);
//           break;

//         case "ATR":
//           const atrData = calculateATR(candlestickData, 14); // Example period
//           const atrSeries = chart.addLineSeries({ color: 'yellow', lineWidth: 2 });
//           atrSeries.setData(atrData);
//           break;

//         case "Fibonacci Retracement":
//           const fibonacciData = calculateFibonacciRetracement(candlestickData);
//           fibonacciData.forEach((level) => {
//             const fibSeries = chart.addLineSeries({ color: 'pink', lineWidth: 1 });
//             fibSeries.setData([{ time: candlestickData[0].time, value: level }, { time: candlestickData[candlestickData.length - 1].time, value: level }]);
//           });
//           break;

//         default:
//           break;
//       }


//     }


//     // Handle chart resize
//     const handleResize = () => {
//       if (chartRef.current && chartInstanceRef.current) {
//         chartInstanceRef.current.applyOptions({
//           width: chartRef.current.clientWidth,
//           height: chartRef.current.clientHeight,
//         });
//       }
//     };

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.remove();
//         chartInstanceRef.current = null;
//       }
//     };
//   }, [candlestickData, chartType, indicator]);


//   return (
//     <div className="flex flex-row h-screen">
//       {/* Sidebar on the right */}
//       <div className="w-80">
//         <RealTradeSideBar
//           buyIn={handleBuyIn}
//           buyOut={handleBuyOut}
//           currentPrice={currentPrice}
//           stake={stake}
//           setStake={setStake}
//           selectedMultiplier={selectedMultiplier}
//           setSelectedMultiplier={setSelectedMultiplier}
//         />
//       </div>

//       <div className="flex-grow flex flex-col">
//         {/* Toolbar above chart */}
//         <div className="flex flex-row items-center justify-between bg-gray-100 p-2">
//           {/* Chart type icons */}
//           <div className="flex space-x-4">
//             <LuCandlestickChart
//               size={24}
//               className={`cursor-pointer ${chartType === "Candlestick" ? 'text-blue-500' : 'text-gray-600'}`}
//               title="Candlestick Chart"
//               onClick={() => setChartType("Candlestick")}
//             />
//             <FaChartBar
//               size={24}
//               className={`cursor-pointer ${chartType === "Bar" ? 'text-blue-500' : 'text-gray-600'}`}
//               title="Bar Chart"
//               onClick={() => setChartType("Bar")}
//             />
//             <FaChartLine
//               size={24}
//               className={`cursor-pointer ${chartType === "Line" ? 'text-blue-500' : 'text-gray-600'}`}
//               title="Line Chart"
//               onClick={() => setChartType("Line")}
//             />
//             <FaChartArea
//               size={24}
//               className={`cursor-pointer ${chartType === "Area" ? 'text-blue-500' : 'text-gray-600'}`}
//               title="Area Chart"
//               onClick={() => setChartType("Area")}
//             />
//           </div>

//           {/* Dropdown for indicators */}
//           <div>
//             <select
//               value={indicator}
//               onChange={(e) => setIndicator(e.target.value)}
//               className="border p-1 rounded"
//             >
//               <option value="">No Indicator</option>
//               <option value="Moving Average">Moving Average</option>
//               <option value="Bollinger Bands">Bollinger Bands</option>
//               <option value="RSI">RSI</option>
//               <option value="MACD">MACD</option>
//               <option value="EMA">EMA</option>
//               <option value="VWAP">VWAP</option>
//             </select>
//           </div>

//           {/* Camera icon for snapshot */}
//           <div>
//             <FaCamera
//               size={24}
//               className="cursor-pointer text-gray-600"
//               title="Screenshot"
//               onClick={handleSnapshot}
//             />
//           </div>

//           {/* Button to open the markets modal */}
//           <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white rounded px-2 py-1">
//             Select Market
//           </button>
//         </div>

//         {/* Chart below the toolbar */}
//         <div style={{ width: "100%", height: "calc(100vh - 4rem)" }} className="mt-3">
//           <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
//         </div>
//       </div>

//       {/* Markets Modal */}
//       <MarketsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// };

// export default RealTrading;


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
  calculateATR,
  calculateEMA,
  calculateVWAP
} from './indicators';
import { sampleCandlestickData } from './sample';

const RealTrading = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const selectedMarket = marketStore((state) => state.selectedMarket);
  // console.log(selectedMarket);
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
  } = useTrade(selectedMarket || "WLDAUD", candlestickData);


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











