import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(
  `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
);

const Charts = ({ selectedSymbol }) => {
  const tradingChart = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();
  const [currentCandlestick, setCurrentCandlestick] = useState(null);
  const intervalDuration = 5 * 1000; // 5-second interval
  const [intervalStart, setIntervalStart] = useState(null);
  const api = useRef(new DerivAPIBasic({ connection })).current;

  const createLineChart = () => {
    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    };

    const chart = createChart(tradingChart.current, {
      width: tradingChart.current.clientWidth,
      height: 400,
    });
    chart.applyOptions(chartOptions);
    chart.timeScale().applyOptions({
      timeVisible: true,
      rightOffset: 0,
      barSpacing: 15,
      minBarSpacing: 5,
      fixLeftEdge: true,
    });

    const candlestickSeries = chart.addCandlestickSeries();
    candlestickSeries.applyOptions({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      autoScale: false, // disables auto scaling based on visible content
      scaleMargins: {
        top: 0.1,
        bottom: 0.2,
      },
    });

    candlestickSeriesRef.current = candlestickSeries;
    chart.priceScale("right").applyOptions({
      borderColor: "rgba(197, 203, 206, 0.5)",
    });
    chart.timeScale().applyOptions({
      borderColor: "rgba(197, 203, 206, 0.5)",
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;
  };

  useEffect(() => {
    createLineChart();

    const handleResize = () => {
      chartRef.current.resize(
        tradingChart.current.clientWidth,
        tradingChart.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      chartRef.current?.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tickStream = (symbol) => api.subscribe({ ticks: symbol });

  const tickResponse = async (res) => {
    const data = JSON.parse(res.data);
    if (data.error !== undefined) {
      console.log("Error : ", data.error.message);
      connection.removeEventListener("message", tickResponse, false);
      await api.disconnect();
      return;
    }
    if (data.msg_type === "tick") {
      const tick = data.tick;
      console.log(tick);
      const currentTime = tick.epoch * 1000; // Convert to milliseconds
      const currentQuote = tick.quote;

      if (!currentCandlestick) {
        // Start a new candlestick
        const newIntervalStart =
          Math.floor(currentTime / intervalDuration) * intervalDuration;
        setIntervalStart(newIntervalStart);

        const newCandlestick = {
          time: newIntervalStart / 1000, // Time in seconds
          open: currentQuote,
          high: currentQuote,
          low: currentQuote,
          close: currentQuote,
        };

        setCurrentCandlestick(newCandlestick);
        candlestickSeriesRef.current.update(newCandlestick);
      } else {
        if (currentTime < intervalStart + intervalDuration) {
          // Update the current candlestick
          const updatedCandlestick = {
            ...currentCandlestick,
            high: Math.max(currentCandlestick.high, currentQuote),
            low: Math.min(currentCandlestick.low, currentQuote),
            close: currentQuote,
          };

          setCurrentCandlestick(updatedCandlestick);
          candlestickSeriesRef.current.update(updatedCandlestick);
        } else {
          // The interval has ended, push the candlestick to the chart
          candlestickSeriesRef.current.update(currentCandlestick);

          // Start a new candlestick for the next interval
          const newIntervalStart = intervalStart + intervalDuration;
          setIntervalStart(newIntervalStart);

          const newCandlestick = {
            time: newIntervalStart / 1000,
            open: currentQuote,
            high: currentQuote,
            low: currentQuote,
            close: currentQuote,
          };

          setCurrentCandlestick(newCandlestick);
          candlestickSeriesRef.current.update(newCandlestick);
        }
      }
    }
  };

  const subscribeTicks = async (symbol) => {
    await tickStream(symbol);
    connection.addEventListener("message", tickResponse);
  };

  const unsubscribeTicks = () => {
    connection.removeEventListener("message", tickResponse, false);
    api.disconnect();
  };

  useEffect(() => {
    unsubscribeTicks();
    subscribeTicks(selectedSymbol);
    console.log(`Subscribed to ${selectedSymbol}`);
    return () => unsubscribeTicks();
  }, [selectedSymbol]);

  return (
    <div
      ref={tradingChart}
      style={{ position: "relative", width: "1150px", height: "500px" }}
    />
  );
};

export default Charts;
