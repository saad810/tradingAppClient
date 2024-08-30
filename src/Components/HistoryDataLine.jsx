import React from 'react';

const HistoryDataLine = ({ trade, percentage, status, points }) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <h3 className="text-lg font-semibold">{trade}</h3>
        <span className="text-base font-medium text-primary">{percentage}</span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-base font-medium ${
            status === 'UP' ? 'text-primary' : 'text-secondary'
          }`}
        >
          {status}
        </span>
        <span
          className={`text-base font-medium ${
            status === 'UP' ? 'text-primary' : 'text-secondary'
          }`}
        >
          {points}
        </span>
      </div>
    </div>
  );
};

export default HistoryDataLine;
