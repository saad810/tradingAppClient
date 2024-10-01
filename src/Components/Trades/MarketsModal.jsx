import Modal from '../Modal';
import React, { useState, useEffect } from 'react';
import { IoMdSearch } from 'react-icons/io';
import marketStore from '../../store/marketStore';
import { markets } from '../markets';

const MarketsModal = ({ isOpen, onClose }) => {
    const [filteredData, setFilteredData] = useState(markets); // Initialize with all markets
    const [searchQuery, setSearchQuery] = useState('');
    const setSelectedMarket = marketStore((state) => state.setSelectedMarket);

    const handleSelectMarket = (market) => {
        setSelectedMarket(market);
        onClose(); // Close modal after selection
    };

    useEffect(() => {
        // Filtering based on search query
        const filtered = markets.filter((market) =>
            market.display_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery]); // Runs whenever search query changes

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="px-4 md:px-8 lg:px-12 ">
                <div className="mt-5">
                    <div className="sticky top-0 bg-white z-10 py-4">
                        <div className="">
                            <h3 className="text-2xl font-bold text-primary py-5">All Markets</h3>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <div className="flex items-center gap-2 border-2 border-gray-300 pr-4 rounded">
                                    <input
                                        type="text"
                                        placeholder="Search markets..."
                                        className="border-none px-4 py-2 w-full"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <span>
                                        <IoMdSearch className="text-gray-400 text-xl" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Set a fixed height for the scrollable container */}
                    <div className="overflow-y-auto scroll-px-10 max-h-[400px]"> {/* Fixed height for scrolling */}
                        {filteredData.length > 0 ? (
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="text-gray-400">
                                        <th className="py-3 text-left font-medium text-sm">Market Name</th>
                                        <th className="py-3 text-left font-medium text-sm">Market Title</th>
                                        <th className="py-3 text-left font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((market) => (
                                        <tr key={market.symbol} onClick={() => handleSelectMarket(market.symbol)}>
                                            <td className="py-2">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-semibold text-primaryblue-700">
                                                        {market.display_name}
                                                    </span>
                                                    <span className="text-sm font-bold text-gray-400">
                                                        {market.symbol}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-2">
                                                <span>{market.market_display_name}</span>
                                            </td>
                                            <td className="py-2">
                                                <button
                                                    onClick={() => handleSelectMarket(market)}
                                                    className="bg-blue-500 text-white rounded px-2 py-1"
                                                >
                                                    Select
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>No markets found.</div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MarketsModal;
