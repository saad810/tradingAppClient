
import { create } from 'zustand';

const marketStore = create((set) => ({
    selectedMarket: null,
    setSelectedMarket: (market) => set({ selectedMarket: market }),
}));

export default marketStore;
