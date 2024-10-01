export const calculateMovingAverage = (data, period) => {
    const movingAverages = [];
    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, candle) => acc + candle.close, 0);
        movingAverages.push({ time: data[i].time, value: sum / period });
    }
    return movingAverages;
};
export const calculateBollingerBands = (data, period, numStdDev) => {
    const movingAverages = calculateMovingAverage(data, period);
    const bollingerBands = [];

    for (let i = period - 1; i < data.length; i++) {
        const slice = data.slice(i - period + 1, i + 1);
        const mean = movingAverages[i - period + 1].value;
        const stdDev = Math.sqrt(
            slice.reduce((acc, candle) => acc + Math.pow(candle.close - mean, 2), 0) / period
        );

        bollingerBands.push({
            time: data[i].time,
            upper: mean + numStdDev * stdDev,
            middle: mean,
            lower: mean - numStdDev * stdDev,
        });
    }
    return bollingerBands;
};
export const calculateRSI = (data, period) => {
    if (data.length < period) return []; // Return empty array if not enough data

    const gains = [];
    const losses = [];

    for (let i = 1; i < data.length; i++) {
        const change = data[i].close - data[i - 1].close;
        gains.push(change > 0 ? change : 0);
        losses.push(change < 0 ? Math.abs(change) : 0);
    }

    // Calculate initial average gain and average loss
    let averageGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
    let averageLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

    const rsi = [];
    if (averageLoss === 0) {
        rsi.push(100); // If there are no losses, RSI is 100
    } else {
        const initialRS = averageGain / averageLoss;
        rsi.push(100 - (100 / (1 + initialRS)));
    }

    for (let i = period; i < data.length; i++) {
        const gain = gains[i - 1];
        const loss = losses[i - 1];

        // Update the average gain and average loss
        averageGain = (averageGain * (period - 1) + gain) / period;
        averageLoss = (averageLoss * (period - 1) + loss) / period;

        const rs = averageGain / averageLoss;
        rsi.push(100 - (100 / (1 + rs)));
    }

    // Return the RSI values along with corresponding time
    return rsi.map((value, index) => {
        const timeIndex = index + period; // Calculate the index
        return timeIndex < data.length ? { // Check if within bounds
            time: data[timeIndex].time, // Adjusting the time to match the RSI output
            value,
        } : null; // Return null if out of bounds
    }).filter(item => item !== null); // Remove null items
};



export const calculateMACD = (data, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) => {
    const shortMA = calculateMovingAverage(data, shortPeriod);
    const longMA = calculateMovingAverage(data, longPeriod);

    const macd = shortMA.map((ma, index) => ({
        time: ma.time,
        value: ma.value - (longMA[index] ? longMA[index].value : 0),
    }));

    const signalLine = calculateMovingAverage(macd, signalPeriod);

    return { macd, signalLine };
};

export const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    const ema = [data[0].close]; // Starting with the first close price

    for (let i = 1; i < data.length; i++) {
        const value = (data[i].close - ema[i - 1]) * k + ema[i - 1];
        ema.push(value);
    }

    return ema.map((value, index) => ({ time: data[index].time, value }));
};
export const calculateVWAP = (data) => {
    let totalVolume = 0;
    let cumulativeTotalPrice = 0;

    const vwap = data.map(candle => {
        totalVolume += candle.volume; // Assuming you have a volume field in your candlestick data
        cumulativeTotalPrice += candle.close * candle.volume; // Assuming closing price is used

        return {
            time: candle.time,
            value: cumulativeTotalPrice / totalVolume
        };
    });

    return vwap;
};
export const calculateATR = (data, period) => {
    const tr = [];

    for (let i = 1; i < data.length; i++) {
        const high = data[i].high;
        const low = data[i].low;
        const previousClose = data[i - 1].close;

        const currentTR = Math.max(
            high - low,
            Math.abs(high - previousClose),
            Math.abs(low - previousClose)
        );
        tr.push(currentTR);
    }

    const atr = [];
    for (let i = period - 1; i < tr.length; i++) {
        const slice = tr.slice(i - period + 1, i + 1);
        const averageTR = slice.reduce((acc, value) => acc + value, 0) / period;
        atr.push({
            time: data[i + 1].time, // Aligning with the time of the corresponding candle
            value: averageTR,
        });
    }
    return atr;
};



export const calculateFibonacciRetracement = (high, low) => {
    const diff = high - low;
    const levels = {
        level0: high,
        level23_6: high - diff * 0.236,
        level38_2: high - diff * 0.382,
        level50: high - diff * 0.5,
        level61_8: high - diff * 0.618,
        level100: low,
    };
    return levels;
};
