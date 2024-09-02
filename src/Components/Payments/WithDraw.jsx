// src/components/Payments/WithDraw.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal";

const WithDraw = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { auth } = useAuth();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    try {
      const response = await axios.post("/api/withdraw", {
        userId: auth.user._id,
        amount: parseFloat(amount),
      });

      setMessage(response.data.message);
      setAmount("");
    } catch (error) {
      console.error("Error during withdrawal:", error);
      setError("Failed to process withdrawal");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="max-w-xs mx-auto">
        <h3 className="font-bold text-3xl py-1">Withdraw Funds</h3>
        <form onSubmit={handleWithdraw}>
          <div>
            <div className="mt-4">
              <label htmlFor="amount" className="font-semibold text-base">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 p-2 rounded bg-bgOne"
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full p-2 rounded bg-primary text-white font-semibold text-xl"
              >
                Withdraw
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {message && <div className="text-green-500 mt-2">{message}</div>}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WithDraw;
