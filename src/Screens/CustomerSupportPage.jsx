"use client"

import React, { useState } from 'react'
import { FaHeadset, FaEnvelope, FaPhone, FaWhatsapp, FaQuestionCircle } from 'react-icons/fa'
import { MdLiveHelp } from 'react-icons/md'
import { motion } from 'framer-motion'
import { faqs } from './faqCustomer'
import FAQSection from '../Components/LandingPage/FAQSection'
const ChatBox = () => {
  const [chatStarted, setChatStarted] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const email = "your-email@example.com"; // Replace with your email
  const phoneNumber = "1234567890"; // Replace with your phone number
  // const phoneNumber = "1234567890";

  const questions = {
    "What's new in derivatives trading?": {
      "answer": "Options trading is on the rise! 'Iron Condor' strategies are gaining popularity, especially with AI-powered predictions. Curious to dive deeper?",
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "What are the top derivatives to trade?",
        "How do I choose a derivatives trading strategy?"
      ]
    },
    "What are the top derivatives to trade?": {
      "answer": "The most traded derivatives include futures and options on indices, commodities, and forex. The choice depends on your market knowledge and risk tolerance.",
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "What's new in derivatives trading?",
        "How do I choose a derivatives trading strategy?"
      ]
    },
    "How do I choose a derivatives trading strategy?": {
      "answer": "Choosing a strategy involves understanding market trends and volatility. Popular strategies include 'Straddles' for volatile markets and 'Iron Condor' for range-bound markets.",
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "What's new in derivatives trading?",
        "What are the top derivatives to trade?"
      ]
    },
    "How do I start trading synthetic indices?": {
      "answer": "Synthetic indices offer 24/7 trading, mirroring real markets. Begin with price action strategies and tools like RSI. Timing your trades is crucial! Want to explore further? 📊",
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "What are synthetic indices?",
        "Can I use leverage with synthetic indices?"
      ]
    },
    "What are synthetic indices?": {
      "answer": "Synthetic indices are financial instruments that mimic the behavior of real-world indices but are not affected by real-world events like economic news.",
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "How do I start trading synthetic indices?",
        "Can I use leverage with synthetic indices?"
      ]
    },
    "Can I use leverage with synthetic indices?": {
      "answer": "Yes, leverage can be used when trading synthetic indices. However, it's important to understand the risks involved, as leverage can amplify both gains and losses.",
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "How do I start trading synthetic indices?",
        "What are synthetic indices?"
      ]
    },
    "How to Withdraw": {
      "answer": `1. Log in to Your SyntoNext Account:\n- Open the SyntoNext platform.\n- Use your username and password to log in to your account.\n2. Navigate to the Withdrawal Section:\n- On your dashboard, locate the 'Withdraw' or 'Funds' section.\n- Select the Withdrawal option to proceed.\n3. Select Your Withdrawal Method:\n- Choose from the following supported gateways:\n  - Stripe: For international withdrawals using debit/credit cards.\n  - Easypaisa: For local payments (Pakistan).\n4. Enter Your Card Number:\n- SyntoNext only requires your card number for Stripe-based withdrawals.\n- Ensure that your card is authorized for online transactions and supports withdrawals.\n- Important: Double-check your card number for accuracy.\n5. Authentication and Authorization:\n- SyntoNext will automatically authenticate and authorize your card details.\n- The system will verify whether your card is valid for withdrawal.\n- If necessary, the platform might prompt for additional authentication (OTP or 2FA).\n6. Enter the withdrawal amount.\n7. Ensure that the amount does not exceed your account balance.\n8. Stripe Gateway:\n9. Easypaisa Gateway:\n- If there are any issues, contact SyntoNext support for assistance.`,
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "How do I start trading synthetic indices?",
        "What are synthetic indices?"
      ]
    },
    "How to Deposit": {
      "answer": `1. Log in to Your SyntoNext Account:\n- Open the SyntoNext platform.\n- Use your username and password to log in to your account.\n2. Navigate to the Deposit Section:\n- On your dashboard, locate the deposit section.\n- Select the Deposit option to proceed.\n3. Select Your Deposit Method:\n- Choose from the following supported gateways:\n  - Stripe: For international deposits using debit/credit cards.\n  - Easypaisa: For local payments (Pakistan).\n4. Enter Your Card Number:\n- SyntoNext only requires your card number for Stripe-based deposits.\n- Ensure that your card is authorized for online transactions, deposits, and withdrawals.\n- Important: Double-check your card number for accuracy.\n5. Authentication and Authorization:\n- SyntoNext will automatically authenticate and authorize your card details.\n- The system will verify whether your card is valid for deposits.\n- If necessary, the platform might prompt for additional authentication (OTP or 2FA).\n6. Enter the deposit amount.\n7. Stripe Gateway:\n8. Easypaisa Gateway:\n- If there are any issues, contact SyntoNext support for assistance.`,
      "link": `https://wa.me/${phoneNumber}`,
      "moreQuestions": [
        "What are synthetic indices?",
        "Can I use leverage with synthetic indices?"
      ]
    }
  };


  const handleQuestionClick = (question) => {
    setSelectedQuestion(questions[question])
  }

  const startNewChat = () => {
    setChatStarted(true)
    setSelectedQuestion(null)
  }


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Live Chat Support</h2>
      <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
        {!chatStarted ? (
          <button
            onClick={startNewChat}
            type="button"
            className="bg-primary text-primary-foreground text-center py-4 px-6 rounded-lg w-full"
          >
            Start a new chat
          </button>
        ) : selectedQuestion ? (
          <>
            <div className="mb-4">
              <div className="bg-primary text-white p-4 rounded-lg">
                {selectedQuestion.answer}
              </div>
              <div className="mt-4">
                <a href={selectedQuestion.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Chat with our representative on WhatsApp
                </a>
              </div>
            </div>
            <div className="mt-4">
              <strong>Related Questions:</strong>
              <ul className="list-disc list-inside mt-2">
                {selectedQuestion.moreQuestions.map((q, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-blue-500 mt-2 hover:underline"
                    onClick={() => handleQuestionClick(q)}
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>
            {Object.keys(questions).map((q, index) => (
              <div
                key={index}
                className="cursor-pointer mb-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => handleQuestionClick(q)}
              >
                {q}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CustomerSupportPage() {
  const email = "saadameen810@gmail.com"; // Replace with your email
  const phoneNumber = "923205501013"; // Replace with your phone number
  const sendEmail = () => {
    const subject = "Subject";
    const body = "Body of the email";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const redirectToWhatsApp = () => {
    // Replace with your phone number
    const message = "Hello!"; // Default message
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const makePhoneCall = () => {
    // Replace with your phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 p-8">
      <h1 className="text-2xl font-bold text-left mb-12 text-primary">Customer Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SupportCard
              onPress={sendEmail}
              icon={<FaEnvelope className="text-4xl text-primary" />}
              title="Email Support"
              description="Reach out to us via email for detailed inquiries and we'll respond promptly."
            />
            <SupportCard
              onPress={makePhoneCall}
              icon={<FaPhone className="text-4xl text-primary" />}
              title="Phone Support"
              description="For immediate assistance, call our support hotline and speak directly with an expert."
            />
            <SupportCard
              onPress={redirectToWhatsApp}
              icon={<FaWhatsapp className="text-4xl text-primary" />}
              title="WhatsApp Support"
              description="Connect with us on WhatsApp for quick and convenient support on the go."
            />

          </div>
          <div>
            <FAQSection faqs={faqs} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

const SupportCard = ({ icon, title, description, onPress }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onPress}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-4">{title}</h2>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)