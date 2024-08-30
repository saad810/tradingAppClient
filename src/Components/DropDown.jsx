import React, { useState } from "react";
import DropDownItem from "./DropDownItem";
import { IoMdArrowDropdown } from "react-icons/io";
const DropDown = ({ title, items, onSymbolSelect }) => {
    const [show, setShow] = useState(false);
  
    const toggle = () => setShow(!show);
  
    const handleSymbolSelect = (symbol) => {
      onSymbolSelect(symbol);
      setShow(false); // Hide dropdown after selection
    };
  
    return (
      <div className="relative">
        <div
          onClick={toggle}
          className="select-none cursor-pointer flex items-center gap-2 justify-between p-2 border border-gray-400 bg-gray-200"
        >
          <span className="text-lg font-medium text-gray-700">{title}</span>
          <span>
            <IoMdArrowDropdown className={`text-2xl transition-transform ${show ? "rotate-180" : ""}`} />
          </span>
        </div>
        {show && (
          <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="list-none p-2">
              {items.map((item, index) => (
                <DropDownItem key={index} item={item} onSymbolSelect={handleSymbolSelect} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

export default DropDown;
