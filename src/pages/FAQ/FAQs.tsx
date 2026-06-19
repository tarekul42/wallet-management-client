import { useState } from "react";
import { faqsData } from "@/assets/data/faqsData";
import { motion } from "framer-motion";
import { Search, ChevronDown, HelpCircle, Mail, PhoneCall } from "lucide-react";
import { Link } from "react-router";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filtered = faqsData.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Frequently asked questions
        </h1>
        <p className="text-muted-foreground">
          Everything you need to know about using your digital wallet.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpenIndex(null);
          }}
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-shadow"
        />
      </div>

      {/* Accordion */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No questions match your search.
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map(({ question, answer }) => {
            const realIndex = faqsData.indexOf(
              faqsData.find((f) => f.question === question)!
            );
            const isOpen = openIndex === realIndex;

            return (
              <div
                key={realIndex}
                className="rounded-xl border border-border/70 bg-card overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : realIndex)
                  }
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
      )}

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-xl bg-muted/50 border border-border/60 text-center"
      >
        <h2 className="font-semibold mb-2">Still have questions?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          We're here to help you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
          >
            <Mail className="h-4 w-4" />
            Contact support
          </Link>
          <span className="hidden sm:inline text-muted-foreground/40">|</span>
          <a
            href="mailto:info@walletmanagement.com"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <PhoneCall className="h-4 w-4" />
            info@walletmanagement.com
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQs;
