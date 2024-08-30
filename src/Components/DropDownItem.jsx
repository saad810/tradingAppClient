import React, {useState} from 'react'
import { IoMdArrowDropdown } from "react-icons/io";


const DropDownItem = ({ item, onSymbolSelect }) => {
    const [showSub, setShowSub] = useState(false);
  
    const toggleSub = () => setShowSub(!showSub);
  
    return (
      <li className="cursor-pointer">
        <div onClick={toggleSub} className="flex justify-between p-2 hover:bg-gray-100">
          <span>{item.title}</span>
          {item.submarkets || item.symbols ? (
            <IoMdArrowDropdown className={`text-lg transition-transform ${showSub ? "rotate-180" : ""}`} />
          ) : null}
        </div>
        {showSub && item.submarkets && (
          <ul className="pl-4 border-l border-gray-300">
            {item.submarkets.map((subItem, subIndex) => (
              <DropDownItem key={subIndex} item={subItem} onSymbolSelect={onSymbolSelect} />
            ))}
          </ul>
        )}
        {showSub && item.symbols && (
          <ul className="pl-4 border-l border-gray-300">
            {item.symbols.map((symbolItem, symbolIndex) => (
              <li
                key={symbolIndex}
                className="p-2 hover:bg-gray-100"
                onClick={() => onSymbolSelect(symbolItem.symbol)}
              >
                {symbolItem.displayName}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };
export default DropDownItem