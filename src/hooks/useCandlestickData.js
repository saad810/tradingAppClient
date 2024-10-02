import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';

import { useState, useEffect, useRef } from "react";

const useCandlestickData = (symbol, aggregationTime = 5) => {
  const [candlestickData, setCandlestickData] = useState([]);
  const tickBufferRef = useRef([]);
  const lastCandleCloseRef = useRef(null);

  const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
  const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);
  const api = new DerivAPIBasic({ connection });
  const tickStream = () => api.subscribe({ ticks: symbol });


  useEffect(() => {
    const tickResponse = async (res) => {
      const data = JSON.parse(res.data);
      if (data.error !== undefined) {
        console.log("Error : ", data.error.message);
        return;
      }

      if (data.msg_type === "tick") {
        updateTickBuffer(data.tick);
      }
    };

    const updateTickBuffer = (tick) => {
      const tickEpoch =
        Math.floor(tick.epoch / aggregationTime) * aggregationTime;

      // Create a copy of tickBufferRef's current array
      let tickBuffer = [...tickBufferRef.current];

      if (tickBuffer.length === 0 || tickBuffer[0].time !== tickEpoch) {
        if (tickBuffer.length > 0) {
          const newCandle = aggregateCandlestickData(tickBuffer);
          updateCandleData(newCandle);
        }
        tickBufferRef.current = [{ time: tickEpoch, ...tick }];
      } else {
        tickBuffer.push({ time: tickEpoch, ...tick });
        tickBufferRef.current = tickBuffer;
      }
    };

    const aggregateCandlestickData = (buffer) => {
      const open = buffer[0].quote;
      const close = buffer[buffer.length - 1].quote;
      const high = Math.max(...buffer.map((tick) => tick.quote));
      const low = Math.min(...buffer.map((tick) => tick.quote));

      return {
        time: buffer[0].time,
        open,
        high,
        low,
        close,
      };
    };

    const updateCandleData = (newCandle) => {
      setCandlestickData((prevData) => {
        const updatedData = [...prevData, newCandle];

        // Keep the last 100 candlestick data points
        if (updatedData.length > 100) {
          updatedData.shift();
        }

        return updatedData;
      });

      lastCandleCloseRef.current = newCandle.close;
    };

    const subscribeTicks = async () => {
      await tickStream();
      connection.addEventListener('message', tickResponse);
    };

    const unsubscribeTicks = () => {
      connection.removeEventListener('message', tickResponse, false);
      tickStream().unsubscribe();
    };

    subscribeTicks();

    return () => {
      unsubscribeTicks();
    };
  }, [aggregationTime]);

  return { candlestickData };
};

export default useCandlestickData;
