import { useContext } from "react";
import { TradingContext } from "../Context/TradingContext";

const useTrade = () => {
  return useContext(TradingContext);
};

export default useTrade;
