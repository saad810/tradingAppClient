import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { GiProfit } from "react-icons/gi";
const RealTradeSideBar = ({
  buyIn,
  buyOut,
  currentPrice,
  stake,
  setStake,
  selectedMultiplier,
  setSelectedMultiplier,
}) => {
  const multipliers = ["25X", "50X", "75X", "100X"];

  const handleMultiplierClick = (multiplier) => {
    setSelectedMultiplier(multiplier);
  };

  const handleBuyIn = () => {
    if (currentPrice !== null) {
      buyIn(currentPrice);
    }
  };

  const handleBuyOut = () => {
    buyOut();
  };

  return (
    <div className="">
      <div className="bg-slate-200 px-4 py-2">
        <h4 className="font-semibold text-base text-primary pb-2">
          Trade Type
        </h4>
        <div className="bg-slate-100 w-52 rounded-lg mb-3 flex items-center gap-8 px-4 py-4">
          <span className="text-lg font-semibold">Multiplier</span>
          <span>
            <GiProfit className="text-secondary text-2xl font-bold" />
          </span>
        </div>
      </div>

      <div className="bg-slate-200 px-4 py-2 pb-6 my-1">
        <h4 className="font-semibold text-base text-primary pb-2">Stake</h4>
        <div className="bg-slate-100 w-52 rounded-lg flex items-center">
          <input
            type="number"
            placeholder="16"
            value={stake !== null ? stake : ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= 0 || e.target.value === "") {
                setStake(e.target.value);
              }
            }}
            className="border-none bg-slate-50 outline-none px-1 py-2 w-full text-lg text-gray-700 placeholder-white"
          />
          <span className="text-base font-semibold text-gray-600 bg-slate-100">
            USD
          </span>
        </div>

        <div className="flex items-center gap-2 pt-4">
          {multipliers.map((multiplier) => (
            <div
              key={multiplier}
              className={`p-2 rounded-md font-semibold text-sm cursor-pointer transition ${
                selectedMultiplier === multiplier
                  ? "bg-slate-300"
                  : "bg-slate-100"
              } hover:bg-slate-200`}
              onClick={() => handleMultiplierClick(multiplier)}
              aria-label={`Select ${multiplier} multiplier`}
            >
              {multiplier}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-200 px-4 py-6 my-1">
        <h4 className="font-semibold text-base text-primary pb-2">
          Current Price
        </h4>
        <div className="bg-slate-100 w-52 rounded-lg mb-3 flex items-center gap-8 px-4 py-4">
          <span className="text-lg font-semibold">
            {currentPrice !== null
              ? `$${currentPrice.toFixed(2)}`
              : "Loading..."}
          </span>
        </div>

        <button
          onClick={handleBuyIn}
          disabled={!stake || !selectedMultiplier || currentPrice === null}
          className="w-52 border-2 mb-4 bg-emerald-600 flex gap-1 flex-col py-3 px-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700"
          aria-label="Buy In"
        >
          <span className="text-base text-white font-regular">Buy In</span>
          <div className="flex items-center gap-16">
            <span className="text-2xl font-bold text-white">
              {stake || "10.00"}
            </span>
            <span className="text-3xl font-extrabold text-white">
              <MdArrowOutward className="rotate-90" />
            </span>
          </div>
        </button>

        <button
          onClick={handleBuyOut}
          disabled={currentPrice === null}
          className="w-52 border-2 bg-red-500 flex gap-1 flex-col py-3 px-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600"
          aria-label="Buy Out"
        >
          <span className="text-base text-white font-regular">Buy Out</span>
          <div className="flex items-center gap-16">
            <span className="text-2xl font-bold text-white">
              {stake || "10.00"}
            </span>
            <span className="text-3xl font-extrabold text-white">
              <MdArrowOutward />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RealTradeSideBar;
