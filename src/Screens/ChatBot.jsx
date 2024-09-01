import React, { useState } from "react";

const ChatBot = () => {
  const [err, setErr] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("sample respose");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleAsk = () => {};
  const handleClear = () => {
    // setInput("");
    // setErr("");
    // setResponse("");
  };

  const getResponse = async () => {
    if (!value) {
      setErr("Please enter a question");
      return;
    }
    try {
      const data = {
        message: value,
        chatHistory,
      };
      const response = await fetch("http://localhost:5000/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        const result = await response.json();
        console.log(data);
    } catch (error) {
      console.log(error);
      setErr("Error fetching response");
    }
  };
  const surpriseOptions = [
    "Surprise me with the latest on Derivatives Trading!",
    "Interested in learning how to trade Synthetic Indices? Let’s explore the options!",
    "Would you like a quick guide on Forex Trading strategies?",
    "Surprise me with some effective risk management strategies for trading!",
    "How about tips on the best times to trade synthetic indices?",
  ];
  const surprise = () => {
    const randomIndex =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomIndex);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl overflow-hidden">
      <section className="p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">
          What do you want to know?
          <button
            disabled={!chatHistory.length > 0}
            onClick={surprise}
            className="ml-2 bg-accent text-white py-1 px-3 rounded-full text-sm hover:bg-opacity-80"
          >
            Surprise me
          </button>
        </h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask your questions..."
            className="w-[700px] p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-accent"
          />
          {!err ? (
            <button
              onClick={handleAsk}
              className="ml-3 bg-primary text-white py-2 px-4 rounded-md transition duration-200 hover:bg-opacity-80"
            >
              Ask
            </button>
          ) : (
            <button
              onClick={handleClear}
              className="ml-3 bg-secondary text-white py-2 px-4 rounded-md transition duration-200 hover:bg-opacity-80"
            >
              Clear
            </button>
          )}
        </div>
        {err && <p className="text-red-500 mt-2">{err}</p>}
        <div className="mt-4">
          {response && (
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-700">{response}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatBot;
