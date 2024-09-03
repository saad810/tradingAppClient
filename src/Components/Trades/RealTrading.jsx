import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createChart } from "lightweight-charts";
import useCandlestickData from "../../hooks/useCandlestickData";
import useTrade from "../../hooks/useTrade";
import RealTradeSideBar from "../TradingSideBar/RealTradeSideBar";
import { toast } from "react-toastify";

const RealTrading = () => {
  const { symbol } = useParams();
  const { candlestickData } = useCandlestickData(symbol, 5);
  const {
    stake,
    setStake,
    selectedMultiplier,
    setSelectedMultiplier,
    currentPrice,
    handleBuyIn,
    handleBuyOut,
  } = useTrade(symbol, candlestickData);

  const chartRef = useRef(null);
  const areaChartRef = useRef(null); // Ref for area series chart
  const histogramChartRef = useRef(null); // Ref for histogram chart
  const [movingAverageData, setMovingAverageData] = useState([]);
  const [bollingerBands, setBollingerBands] = useState({
    upperBandData: [],
    lowerBandData: [],
  });
  const [selectedIndicators, setSelectedIndicators] = useState({
    movingAverage: false,
    bollingerBands: false,
    parabolicSAR: false,
  });

  useEffect(() => {
    toast.info("Real trading YAY");
  }, []);

  useEffect(() => {
    if (candlestickData.length > 0) {
      const maData = calculateMovingAverage(candlestickData, 10); // 10-period MA
      const { upperBandData, lowerBandData } =
        calculateBollingerBands(candlestickData);

      setMovingAverageData(maData);
      setBollingerBands({ upperBandData, lowerBandData });
    }
  }, [candlestickData]);

  // Main chart setup
  useEffect(() => {
    const chart = createChart(chartRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    });
    chart.applyOptions({
      watermark: {
          visible: true,
          fontSize: 24,
          horzAlign: 'center',
          vertAlign: 'center',
          color: 'rgba(171, 71, 188, 0.5)',
          text: 'SYNTHO-NEXT',
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

    // Conditionally render the moving average
    if (selectedIndicators.movingAverage) {
      const movingAverageSeries = chart.addLineSeries({
        color: "blue",
        lineWidth: 2,
      });
      movingAverageSeries.setData(movingAverageData);
    }

    // Conditionally render Bollinger Bands
    if (selectedIndicators.bollingerBands) {
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
    }

    // Parabolic SAR Calculation and Rendering
    if (selectedIndicators.parabolicSAR) {
      const parabolicSARData = calculateParabolicSAR(candlestickData);
      const bullishSARSeries = chart.addLineSeries({
        color: "green", // Bullish SAR
        lineWidth: 2,
      });
      bullishSARSeries.setData(parabolicSARData.bullishPoints);

      const bearishSARSeries = chart.addLineSeries({
        color: "red", // Bearish SAR
        lineWidth: 2,
      });
      bearishSARSeries.setData(parabolicSARData.bearishPoints);
    }

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [candlestickData, movingAverageData, bollingerBands, selectedIndicators]);

  // Area series chart setup
  useEffect(() => {
    const areaChart = createChart(areaChartRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      width: areaChartRef.current.clientWidth,
      height: areaChartRef.current.clientHeight,
    });

    const areaSeries = areaChart.addAreaSeries({
      topColor: "rgba(76, 175, 80, 0.5)", // Area color
      bottomColor: "rgba(76, 175, 80, 0.1)",
      lineColor: "rgba(76, 175, 80, 1)",
    });

    // Use currentPrice or any relevant data for area series
    const areaData = candlestickData.map((item) => ({
      time: item.time,
      value: item.close, // Assuming close price for area series
    }));
    areaSeries.setData(areaData);

    return () => {
      areaChart.remove();
    };
  }, [candlestickData]);

  // Histogram chart setup
  useEffect(() => {
    const histogramChart = createChart(histogramChartRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      width: histogramChartRef.current.clientWidth,
      height: histogramChartRef.current.clientHeight,
    });

    const histogramSeries = histogramChart.addHistogramSeries({
      color: "rgba(255, 0, 0, 0.8)", // Histogram color
    });

    // Example data for histogram, you can replace it with any relevant data
    const histogramData = candlestickData.map((item) => ({
      time: item.time,
      value: item.close - item.open, // Example calculation
    }));
    histogramSeries.setData(histogramData);

    return () => {
      histogramChart.remove();
    };
  }, [candlestickData]);

  const handleIndicatorChange = (e) => {
    const { name, checked } = e.target;
    setSelectedIndicators((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        {/* Main Chart */}
        <div>
          <label className="mb-4 font-semibold text-blue-800">
            <input
              type="checkbox"
              name="movingAverage"
              checked={selectedIndicators.movingAverage}
              onChange={handleIndicatorChange}
              className="checked:bg-blue-600 checked:border-transparent"
              disabled={!candlestickData.length}
            />
            Moving Average
          </label>
          <label className="ml-4 text-red-800 font-semibold">
            <input
              type="checkbox"
              name="bollingerBands"
              checked={selectedIndicators.bollingerBands}
              onChange={handleIndicatorChange}
              className="checked:bg-red-600 checked:border-transparent"
              disabled={!candlestickData.length}
            />
            Bollinger Bands
          </label>
          <label className="ml-4 font-semibold text-orange-800">
            <input
              type="checkbox"
              name="parabolicSAR"
              checked={selectedIndicators.parabolicSAR}
              onChange={handleIndicatorChange}
              className="checked:bg-orange-600 checked:border-transparent"
              disabled={!candlestickData.length}
            />
            Parabolic SAR
          </label>
        </div>

        <div style={{ width: "1100px", height: "350px" }} className="mt-3">
          <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
        </div>

        <div className="flex flex-row mt-4">
          <div style={{ width: "550px", height: "200px" }}>
            <div
              ref={areaChartRef}
              style={{ width: "100%", height: "100%" }}
            ></div>
          </div>
          <div style={{ width: "550px", height: "200px" }}>
            <div
              ref={histogramChartRef}
              style={{ width: "100%", height: "100%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Area and Histogram Charts in One Line */}

      <div>
        <RealTradeSideBar
          stake={stake}
          setStake={setStake}
          selectedMultiplier={selectedMultiplier}
          setSelectedMultiplier={setSelectedMultiplier}
          currentPrice={currentPrice}
          handleBuyIn={handleBuyIn}
          handleBuyOut={handleBuyOut}
        />
      </div>
    </div>
  );
};
// const calculateMACD = (
//   data,
//   shortPeriod = 12,
//   longPeriod = 26,
//   signalPeriod = 9
// ) => {
//   const emaShort = calculateEMA(data, shortPeriod);
//   const emaLong = calculateEMA(data, longPeriod);
//   const macd = [];
//   const signal = calculateEMA(
//     emaShort.map((item) => item.value),
//     signalPeriod
//   );

//   for (let i = 0; i < emaShort.length; i++) {
//     macd.push({
//       time: emaShort[i].time,
//       value: emaShort[i].value - emaLong[i].value,
//     });
//   }

//   return { macd, signal };
// };

// // EMA calculation function
// const calculateEMA = (data, period) => {
//   const k = 2 / (period + 1);
//   const ema = [];
//   let prevEma = data[0].close; // Initial EMA value

//   for (let i = 0; i < data.length; i++) {
//     if (i === 0) {
//       ema.push({ time: data[i].time, value: prevEma });
//     } else {
//       prevEma = (data[i].close - prevEma) * k + prevEma;
//       ema.push({ time: data[i].time, value: prevEma });
//     }
//   }

//   return ema;
// };

// Parabolic SAR calculation function
const calculateParabolicSAR = (
  data,
  accelerationFactor = 0.02,
  maxAF = 0.2
) => {
  const sarData = {
    bullishPoints: [],
    bearishPoints: [],
  };
  let af = accelerationFactor; // Acceleration factor
  let ep = data[0].high; // Extreme point
  let sar = data[0].low; // Initial SAR
  let long = true; // Start with a bullish trend
  let prevSAR = sar;

  for (let i = 1; i < data.length; i++) {
    if (long) {
      sar = prevSAR + af * (ep - prevSAR);
      if (data[i].low < sar) {
        long = false;
        sar = ep; // Switch to bearish
        ep = data[i].low; // Reset extreme point
        af = accelerationFactor; // Reset acceleration factor
      } else {
        sarData.bullishPoints.push({ time: data[i].time, value: sar });
        if (data[i].high > ep) {
          ep = data[i].high; // Update extreme point
          af = Math.min(af + accelerationFactor, maxAF); // Increase acceleration factor
        }
      }
    } else {
      sar = prevSAR + af * (ep - prevSAR);
      if (data[i].high > sar) {
        long = true;
        sar = ep; // Switch to bullish
        ep = data[i].high; // Reset extreme point
        af = accelerationFactor; // Reset acceleration factor
      } else {
        sarData.bearishPoints.push({ time: data[i].time, value: sar });
        if (data[i].low < ep) {
          ep = data[i].low; // Update extreme point
          af = Math.min(af + accelerationFactor, maxAF); // Increase acceleration factor
        }
      }
    }
    prevSAR = sar; // Update previous SAR
  }

  return sarData;
};

// Bollinger Bands calculation function
const calculateBollingerBands = (data, period = 20, multiplier = 2) => {
  const upperBandData = [];
  const lowerBandData = [];
  const maData = calculateMovingAverage(data, period);

  for (let i = 0; i < maData.length; i++) {
    const stdDev = calculateStandardDeviation(
      data.slice(i, i + period),
      maData[i].value
    );
    upperBandData.push({
      time: maData[i].time,
      value: maData[i].value + multiplier * stdDev,
    });
    lowerBandData.push({
      time: maData[i].time,
      value: maData[i].value - multiplier * stdDev,
    });
  }

  return { upperBandData, lowerBandData };
};

// Standard deviation calculation
const calculateStandardDeviation = (data, mean) => {
  const variance =
    data.reduce((sum, item) => sum + Math.pow(item.close - mean, 2), 0) /
    data.length;
  return Math.sqrt(variance);
};

// Moving Average calculation function
const calculateMovingAverage = (data, period) => {
  const movingAverages = [];

  for (let i = 0; i < data.length; i++) {
    if (i >= period - 1) {
      const sum = data
        .slice(i - period + 1, i + 1)
        .reduce((acc, curr) => acc + curr.close, 0);
      const average = sum / period;
      movingAverages.push({ time: data[i].time, value: average });
    }
  }

  return movingAverages;
};
export default RealTrading;
