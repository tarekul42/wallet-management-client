import { faqsData } from "@/assets/data/faqsData";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQsItems = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqsData.map(({ question, answer }, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-border/70 bg-card overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex items-center justify-between w-full text-left px-5 py-3.5 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
              aria-expanded={isOpen}
            >
              <span>{question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                {answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQsItems;
