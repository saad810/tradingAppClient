import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal";

const Deposit = ({ onClose }) => {
  const [toggle, setToggle] = useState(false); // Toggle between Stripe and EasyPaisa
  const stripe = useStripe();
  const elements = useElements();
  const { auth, setAuth } = useAuth();
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (paymentError) {
      setError(paymentError.message);
      return;
    }

    try {
      const response = await axios.post("/payment/deposit", {
        email: auth.user.email,
        amount: parseFloat(amount),
        paymentMethodId: paymentMethod.id,
      });

      setAuth((prev) => ({
        ...prev,
        wallet: {
          ...response.data.wallet,
        },
      }));

      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...auth,
          wallet: response.data.wallet,
        })
      );

      setMessage("Deposit successful!");
      setAmount("");
    } catch (error) {
      console.error("Error during deposit:", error.response || error);
      setError("Failed to process the deposit");
    }
  };

  const handleEasyPaisaDeposit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post("/payment/easy-deposit", {
        email: auth.user.email,
        balance: parseFloat(amount),
        easypaisaNumber: number,
      });
      alert("response", response)

      setAuth((prev) => ({
        ...prev,
        wallet: {
          ...response.data,
        },
      }));

      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...auth,
          wallet: response.data,
        })
      );

      setMessage("EasyPaisa deposit successful!");
      setAmount("");
      setNumber("");
    } catch (error) {
      console.error("Error during EasyPaisa deposit:", error.response || error);
      setError("Failed to process the EasyPaisa deposit");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="max-w-xs mx-auto">
        <h3 className="font-bold text-3xl py-1">Deposit Funds</h3>
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
          ? LocalDeposit(
            handleEasyPaisaDeposit,
            amount,
            setAmount,
            number,
            setNumber,
            error,
            message
          )
          : StripeDeposit(handleDeposit, amount, setAmount, stripe, error, message)}
      </div>
    </Modal>
  );
};

const StripeDeposit = (handleDeposit, amount, setAmount, stripe, error, message) => {
  return (
    <form onSubmit={handleDeposit}>
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
          <label htmlFor="card" className="font-semibold text-base">
            Card Information
          </label>
          <CardElement className="w-full mt-1 p-2 rounded bg-bgOne" />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full p-2 rounded bg-primary text-white font-semibold text-xl"
            disabled={!stripe}
          >
            Deposit
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {message && <div className="text-green-500 mt-2">{message}</div>}
      </div>
    </form>
  );
};

const LocalDeposit = (
  handleEasyPaisaDeposit,
  amount,
  setAmount,
  number,
  setNumber,
  error,
  message
) => {
  return (
    <form onSubmit={handleEasyPaisaDeposit}>
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
            type="number"
            id="easypaisa"
            className="w-full mt-1 p-2 rounded bg-bgOne"
            placeholder="Enter EasyPaisa number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full p-2 rounded bg-primary text-white font-semibold text-xl"
          >
            Deposit
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {message && <div className="text-green-500 mt-2">{message}</div>}
      </div>
    </form>
  );
};

export default Deposit;
