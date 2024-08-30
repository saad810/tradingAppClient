import React from "react";
import { FaAngleDown } from "react-icons/fa";
import HistoryDataLine from "../Components/HistoryDataLine";
import { data } from "../Components/data";
const UserHome = () => {
  const auth = true;
  return (
    <>
      {auth ? (
        <div>
          <div className="border-b">
            <HomeHero />
          </div>
          <div>
            <div className="py-2 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Recent Trades</h3>
              <button className="text-white bg-primary px-4 py-2 rounded-lg text-base font-medium">
                View all
              </button>
            </div>
            <div>
              {data.map((item) => (
                <HistoryDataLine
                  trade={item.trade}
                  percentage={item.percentage}
                  status={item.status}
                  points={item.points}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        "You are not authorized to view this page"
      )}
    </>
  );
};

const HomeHero = () => {
  return (
    <div className="py-5">
      <div className="pb-4">
        <h3 className="text-lg font-regular">Hi, Muhammad Hamza</h3>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-semibold text-primary">4456</h3>
          <span className="text-lg font-semibold text-primary">USD</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-primary">
            Select currency
          </span>
          <button className="p-1 text-primary flex gap-3 items-center">
            <span>USD</span>
            <FaAngleDown />
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserHome;
