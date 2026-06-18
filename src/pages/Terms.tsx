import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Scale,
  CreditCard,
  AlertTriangle,
  UserCheck,
  Ban,
  FileText,
} from "lucide-react";

const sections = [
  {
    icon: <Scale className="w-6 h-6 text-primary" />,
    title: "Acceptance of Terms",
    content:
      "By creating an account or using any Wallet Management services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our platform. We reserve the right to update these terms at any time, and continued use constitutes acceptance of changes.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-primary" />,
    title: "Eligibility & Account Registration",
    content:
      "You must be at least 18 years old to use our services. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. Multi-factor authentication is strongly recommended.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    title: "Financial Transactions",
    content:
      "All transactions are processed in accordance with applicable financial regulations. We charge fees as disclosed during each transaction. You authorize us to debit your wallet for all authorized transactions. Transaction limits apply based on your account tier and verification level. Disputes must be filed within 30 days.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-primary" />,
    title: "Prohibited Activities",
    content:
      "You may not use our platform for any illegal activity, money laundering, fraud, or transactions involving prohibited goods or services. Any violation may result in immediate account suspension, forfeiture of funds, and reporting to relevant authorities. We actively monitor for suspicious activity.",
  },
  {
    icon: <Ban className="w-6 h-6 text-primary" />,
    title: "Limitation of Liability",
    content:
      "Wallet Management shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the fees you paid in the 12 months preceding the claim. We are not responsible for losses due to unauthorized access if you failed to maintain account security.",
  },
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Termination & Suspension",
    content:
      "We reserve the right to suspend or terminate your account at any time for violation of these terms, illegal activity, or extended inactivity. You may close your account at any time through your dashboard. Upon termination, you must withdraw any remaining balance within 60 days.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: June 2026
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            These terms govern your use of the Wallet Management platform. Please
            read them carefully before using our services.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 bg-muted/50 rounded-2xl text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Have Legal Questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you need clarification on any of these terms, please contact our
            legal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/privacy-policy">View Privacy Policy</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
