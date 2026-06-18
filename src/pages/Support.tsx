import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  LifeBuoy,
  MessageCircle,
  Mail,
  Phone,
  FileQuestion,
  Shield,
  ArrowRight,
  Search,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const faqCategories = [
  {
    category: "Account & Security",
    questions: [
      { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot Password'. Enter your registered email and follow the instructions sent to your inbox. Password reset links expire after 15 minutes." },
      { q: "How do I enable two-factor authentication?", a: "Navigate to your Profile Settings > Security. Under 'Two-Factor Authentication', click 'Enable' and follow the setup wizard using your preferred authenticator app." },
      { q: "My account is locked. What should I do?", a: "Accounts are temporarily locked after 5 failed login attempts. Wait 30 minutes for automatic unlock, or contact support for immediate assistance." },
    ],
  },
  {
    category: "Transactions",
    questions: [
      { q: "How long do transactions take?", a: "Wallet-to-wallet transfers are instant. Bank transfers take 1-3 business days. International transfers may take 3-5 business days depending on the destination country." },
      { q: "What are the transaction fees?", a: "Wallet-to-wallet transfers are free. Cash-in fees are 1.5%, cash-out fees are 2%. International transfers have a flat fee of $5 plus 1% of the transfer amount." },
      { q: "Can I cancel a transaction?", a: "Only pending transactions can be cancelled. Once a transaction is marked as 'Processing' or 'Successful', it cannot be reversed. Contact support within 24 hours for dispute resolution." },
    ],
  },
  {
    category: "Wallet & Cards",
    questions: [
      { q: "How do I add money to my wallet?", a: "You can add money via bank transfer, debit/credit card, or by visiting an authorized agent. Go to your Dashboard > Deposit and choose your preferred method." },
      { q: "What is the maximum wallet balance?", a: "The maximum balance depends on your account verification level. Basic accounts have a $10,000 limit, verified accounts have a $100,000 limit, and business accounts have custom limits." },
      { q: "How do I block my card?", a: "If your card is lost or stolen, immediately go to your Dashboard > Cards > select the card > 'Block Card'. You can also contact our 24/7 support hotline for immediate card blocking." },
    ],
  },
];

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.questions.length > 0 || searchQuery === "");

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-2xl bg-primary/10">
              <LifeBuoy className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Search our knowledge base, browse FAQs, or get
            in touch with our support team.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative max-w-xl mx-auto mb-12"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-12 h-14 text-lg rounded-2xl shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-card border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-primary/10 inline-flex mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team in real-time. Available 24/7.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Start Chat
            </Button>
          </div>
          <div className="bg-card border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-primary/10 inline-flex mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us an email and we'll respond within 24 hours.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@walletmanagement.com">Email Us</a>
            </Button>
          </div>
          <div className="bg-card border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-xl bg-primary/10 inline-flex mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Speak to a representative. Toll-free number.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:+442079460958">+44 20 7946 0958</a>
            </Button>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FileQuestion className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {filteredCategories.map((cat) => (
              <div key={cat.category} className="bg-card border rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === cat.category ? null : cat.category)
                  }
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left"
                >
                  <span className="font-bold text-lg">{cat.category}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      openCategory === cat.category ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openCategory === cat.category && (
                  <div className="border-t">
                    {cat.questions.map((item) => (
                      <div key={item.q} className="p-5 border-b last:border-b-0 hover:bg-muted/20">
                        <h4 className="font-semibold mb-2">{item.q}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {searchQuery && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No results found for "{searchQuery}"</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl text-center border"
        >
          <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7 to assist you with any issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">
                Contact Support
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/faqs">Browse All FAQs</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
