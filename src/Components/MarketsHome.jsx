import React, { useState, useEffect } from "react";
import { markets } from "./markets";
import { IoMdSearch } from "react-icons/io";
import MarketBar from "./MarketBar";

const MarketsHome = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to shuffle the array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    // Shuffle the markets array and get the first 6 items
    const randomMarkets = shuffleArray([...markets]).slice(0, 6);
    setFilteredData(randomMarkets);
  }, []); // Runs once when the component mounts

  useEffect(() => {
    // If there's a search query, filter the original markets array
    if (searchQuery) {
      const filtered = markets.filter((market) =>
        market.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      // If search query is empty, reset to the initial random markets
      const randomMarkets = shuffleArray([...markets]).slice(0, 3);
      setFilteredData(randomMarkets);
    }
  }, [searchQuery]); // Runs whenever the search query changes

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <div className="mt-5">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <h3 className="text-3xl font-bold text-primary py-5">Hot Markets</h3>
          <div className="flex items-center gap-2 w-full md:w-auto border-2 border-gray-300 pr-4 rounded">
            <input
              type="text"
              placeholder="Search markets..."
              className="border-none px-4 py-2 w-full md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span>
              <IoMdSearch className="text-gray-400 text-xl" />
            </span>
          </div>
        </div>
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-gray-400">
                  <th className="py-3 text-left font-medium text-sm">
                    Market Name
                  </th>
                  <th className="py-3 text-left font-medium text-sm">
                    Market Title
                  </th>
                  <th className="py-3 text-left font-medium text-sm">
                    Submarket Title
                  </th>
                  <th className="py-3 text-left font-medium text-sm">Price</th>
                  <th className="py-3 text-left font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((market) => (
                  <MarketBar key={market.symbol} market={market} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No markets found.</div>
        )}
      </div>
    </div>
  );
};

export default MarketsHome;
