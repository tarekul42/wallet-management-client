import { faqsData } from "@/assets/data/faqsData";
import { useState } from "react";

const FAQsItems = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-screen-2xl mx-auto space-y-4">
      {faqsData.map(({ question, answer }, idx) => (
        <details
          key={idx}
          className="group [&_summary::-webkit-details-marker]:hidden rounded-md border border-primary-foreground cursor-pointer"
          open={openIndex === idx}
        >
          <summary
            onClick={(e) => {
              e.preventDefault();
              setOpenIndex(openIndex === idx ? null : idx);
            }}
            className={`flex items-center justify-between gap-1.5 bg-primary-foreground ${
              openIndex === idx ? "rounded-t-md" : "rounded-md"
            } border-gray-100 bg-gray-50 p-4 text-gray-900`}
          >
            <h2 className="md:text-lg font-medium">
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
