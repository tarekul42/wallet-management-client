import { useState } from "react";

const FAQsItems = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqsData = [
    {
      question: "What is a digital wallet?",
      answer:
        "A digital wallet is a secure online application that allows you to store money digitally, make payments, transfer funds, and manage your financial transactions conveniently from your device.",
    },
    {
      question: "How do I create a digital wallet account?",
      answer:
        "You can register by providing your basic information such as name, phone number, and email. Choose your role as either a User or Agent during registration, then set up your password.",
    },
    {
      question: "What roles are supported in the app?",
      answer:
        "Our system supports three roles: Users, Agents, and Admins. Each role has different dashboard features and permissions aligned with their responsibilities.",
    },
    {
      question: "How do I add money to my wallet?",
      answer:
        "Users can deposit money by visiting an Agent, who will perform a cash-in transaction. Agents can also add money directly to user wallets through the Agent Dashboard.",
    },
    {
      question: "Can I send money to other users?",
      answer:
        "Yes, users can send money to other users by searching for their phone number or email and entering the amount to transfer securely.",
    },
    {
      question: "How is my money kept secure?",
      answer:
        "We use encrypted authentication with JWT tokens, password hashing, and secure API communication to protect your account and transactions.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        'You can reset your password via the "Forgot Password" option on the login page by providing your registered email or phone number and following the instructions.',
    },
    {
      question: "How do I view my transaction history?",
      answer:
        "Your dashboard includes a transaction history section where you can filter transactions by type, date range, and paginate through your records.",
    },
    {
      question: "Can agents manage multiple users?",
      answer:
        "Yes, agents have access to their handled user wallets, including cash-in/cash-out functionality and commission history (if enabled).",
    },
    {
      question: "How do I contact support if I have an issue?",
      answer:
        "You can use the Contact page’s inquiry form to send us a message, or reach out via the provided support email or phone number.",
    },
    {
      question: "Are there any fees for using the wallet?",
      answer:
        "Fees depend on the service plan or transaction type. Please visit the Pricing page to see detailed fee structures and subscription options (if applicable).",
    },
    {
      question: "Is this wallet app available on mobile devices?",
      answer:
        "Yes, the app is fully responsive and accessible via mobile browsers with a smooth UI designed to work on all device types.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "In your dashboard's profile management section, you can update your personal details, phone number, and password securely at any time.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto space-y-4">
      {faqsData.map(({ question, answer }, idx) => (
        <details
          key={idx}
          className="group [&_summary::-webkit-details-marker]:hidden rounded-md border border-gray-300"
          open={openIndex === idx}
        >
          <summary
            onClick={(e) => {
              e.preventDefault();
              setOpenIndex(openIndex === idx ? null : idx);
            }}
            className={`flex items-center justify-between gap-1.5 ${
              openIndex === idx ? "rounded-t-md" : "rounded-md"
            } border-gray-100 bg-gray-50 p-4 text-gray-900`}
          >
            <h2 className="text-lg font-medium">
              {idx + 1}. {question}
            </h2>

            <svg
              className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 py-4 text-gray-900">{answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQsItems;
