import React from "react";
import { markets } from "../Screens/markets";
const TicksComponent = () => {
  return (
    <div>
      {markets.map((market, index) => {
        return (
          <div key={index}>
            <h3>{market.title}</h3>
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {market.ticks.map((tick, index) => {
                  return (
                    <tr key={index}>
                      <td>{tick.symbol}</td>
                      <td>{tick.price}</td>
                      <td>{tick.change}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default TicksComponent;
