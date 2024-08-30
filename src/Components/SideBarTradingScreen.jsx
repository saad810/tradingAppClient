import React from "react";
import DropDown from "./DropDown";
import { MdArrowOutward } from "react-icons/md";

const SideBarTradingScreen =  ({ markets, onSymbolSelect }) => {
    return (
      <div className="mt-20">
        <div>
          <DropDown title={"Markets"} items={markets} onSymbolSelect={onSymbolSelect} />
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <button className="border-2 bg-red-500 flex gap-1 flex-col py-3 px-3 rounded-lg">
            <span className="text-lg text-white font-regular">Amount USD</span>
            <div className="flex items-center gap-16">
              <span className="text-2xl font-bold text-white">10.00</span>
              <span className="text-3xl font-extrabold text-white">
                <MdArrowOutward />
              </span>
            </div>
          </button>
  
          <button className="border-2 bg-emerald-600 flex gap-1 flex-col py-3 px-3 rounded-lg">
            <span className="text-lg text-white font-regular">Amount USD</span>
            <div className="flex items-center gap-16">
              <span className="text-2xl font-bold text-white">10.00</span>
              <span className="text-3xl font-extrabold text-white">
                <MdArrowOutward className="rotate-90" />
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  };

export default SideBarTradingScreen;
