import { useState } from "react";

const useTradeProfitLoss = () => {
  const [buyInPrice, setBuyInPrice] = useState(null);
  const [buyOutPrice, setBuyOutPrice] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);

  // Function to set buy-in price
  const buyIn = (price) => {
    setBuyInPrice(price);
    setBuyOutPrice(null); // Reset buy-out price when a new buy-in occurs
    setProfitLoss(null); // Reset profit/loss when a new buy-in occurs
  };

  // Function to set buy-out price and calculate profit or loss
  const buyOut = (price) => {
    setBuyOutPrice(price);
    if (buyInPrice !== null) {
      const profitLossValue = ((price - buyInPrice) / buyInPrice) * 100; // Calculate profit/loss percentage
      console.log("Profit/Loss Percentage [hook]:", profitLossValue);
      setProfitLoss(profitLossValue);
    }
    console.log("Buy Out [hook]", profitLoss);
  };

  // Reset the trade
  const resetTrade = () => {
    setBuyInPrice(null);
    setBuyOutPrice(null);
    setProfitLoss(null);
  };

  return { buyIn, buyOut, profitLoss, resetTrade, buyInPrice, buyOutPrice };
};

export default useTradeProfitLoss;
