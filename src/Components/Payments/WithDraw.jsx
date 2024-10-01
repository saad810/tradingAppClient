import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal";

const WithDraw = ({ onClose }) => {
  const [toggle, setToggle] = useState(false); // Toggle between Stripe and EasyPaisa
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState(""); // For EasyPaisa number
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { auth, setAuth } = useAuth();

  // Stripe Withdrawal Handler
  const handleStripeWithdraw = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post("/payment/withdraw", {
        paymentIntentId: auth.wallet.stripeId,
        amount: parseFloat(amount),
      });

      setMessage(response.data.message);
      updateWalletBalance(amount);
      setAmount("");
    } catch (error) {
      console.error("Error during Stripe withdrawal:", error);
      setError("Failed to process Stripe withdrawal.");
    }
  };

  // EasyPaisa Withdrawal Handler
  const handleEasyPaisaWithdraw = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (!amount || isNaN(parseFloat(amount))) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!number) {
      setError("Please enter a valid EasyPaisa number.");
      return;
    }

    try {
      const response = await axios.post("/payment/easy-withdraw", {
        email: auth.user.email,
        amount: parseFloat(amount),
        easypaisaNumber: number,
      });

      setMessage(response.data.message);
      updateWalletBalance(amount);
      setAmount("");
      setNumber("");
    } catch (error) {
      console.error("Error during EasyPaisa withdrawal:", error);
      setError("Failed to process EasyPaisa withdrawal.");
    }
  };

  // Function to update wallet balance
  const updateWalletBalance = (amount) => {
    setAuth((prev) => ({
      ...prev,
      wallet: {
        ...prev.wallet,
        balance: prev.wallet.balance - parseFloat(amount),
      },
    }));

    localStorage.setItem(
      "auth",
      JSON.stringify({
        ...auth,
        wallet: {
          ...auth.wallet,
          balance: auth.wallet.balance - parseFloat(amount),
        },
      })
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="max-w-xs mx-auto">
        <h3 className="font-bold text-3xl py-1">Withdraw Funds</h3>
        <div className="flex justify-center mb-4">
          <button
            className={`p-2 ${!toggle ? "bg-primary" : "bg-gray-300"} text-white`}
            onClick={() => setToggle(false)}
          >
            Stripe
          </button>
          <button
            className={`p-2 ${toggle ? "bg-primary" : "bg-gray-300"} text-white ml-2`}
            onClick={() => setToggle(true)}
          >
            EasyPaisa
          </button>
        </div>

        {toggle
          ? EasyPaisaWithdrawForm(
              handleEasyPaisaWithdraw,
              amount,
              setAmount,
              number,
              setNumber,
              error,
              message
            )
          : StripeWithdrawForm(handleStripeWithdraw, amount, setAmount, error, message)}
      </div>
    </Modal>
  );
};

// Stripe Withdrawal Form
const StripeWithdrawForm = (handleWithdraw, amount, setAmount, error, message) => {
  return (
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
  );
};

// EasyPaisa Withdrawal Form
const EasyPaisaWithdrawForm = (
  handleWithdraw,
  amount,
  setAmount,
  number,
  setNumber,
  error,
  message
) => {
  return (
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
        <div className="mt-4">
          <label htmlFor="easypaisa" className="font-semibold text-base">
            EasyPaisa Number
          </label>
          <input
            type="text"
            id="easypaisa"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-bgOne"
            placeholder="Enter EasyPaisa number"
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
  );
};

export default WithDraw;
