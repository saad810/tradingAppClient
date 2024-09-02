import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../Modal";

const Deposit = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { auth } = useAuth();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!stripe || !elements) {
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
        userId: auth.user._id,
        amount: parseFloat(amount),
        token: paymentMethod.id,
      });
      console.log(response.data);
      setMessage(response.data.message);
      setAmount("");
    } catch (error) {
      console.error("Error during deposit:", error.response || error);
      setError("Failed to process deposit");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="max-w-xs mx-auto">
        <h3 className="font-bold text-3xl py-1">Deposit Funds</h3>
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
      </div>
    </Modal>
  );
};

export default Deposit;
