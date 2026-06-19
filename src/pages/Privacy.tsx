import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Database, Cookie } from "lucide-react";

const sections = [
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: "Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, phone number, and payment details when you create an account or use our services. We also automatically collect certain technical information, including IP address, browser type, device information, and usage patterns to improve our platform.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "How We Use Your Information",
    content:
      "Your information is used to provide, maintain, and improve our wallet services, process transactions, send administrative messages, comply with legal obligations, and protect against fraud or unauthorized access. We never sell your personal information to third parties.",
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Data Security",
    content:
      "We implement industry-standard security measures including 256-bit encryption, multi-factor authentication, and continuous monitoring to protect your data. Our systems are SOC 2 Type II certified and comply with PCI DSS Level 1 standards for payment data protection.",
  },
  {
    icon: <Eye className="w-6 h-6 text-primary" />,
    title: "Your Rights",
    content:
      "You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a copy of your data, opt out of marketing communications, or close your account. We respond to all data requests within 30 days.",
  },
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: "Data Retention",
    content:
      "We retain your personal information for as long as your account is active or as needed to provide services. Transaction records are kept for a minimum of 7 years to comply with financial regulations. After account closure, we securely delete or anonymize your data within 90 days.",
  },
  {
    icon: <Cookie className="w-6 h-6 text-primary" />,
    title: "Cookies & Tracking",
    content:
      "We use essential cookies for authentication and security, functional cookies for performance, and analytics cookies to understand usage patterns. You can manage cookie preferences in your browser settings. Disabling certain cookies may affect platform functionality.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: June 2026
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy outlines how we collect,
            use, and protect your personal information when you use our wallet
            management platform.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
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
          className="mt-12 p-8 bg-muted/50 rounded-xl text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
          <p className="text-muted-foreground mb-6">
            If you have any questions or concerns about how we handle your data,
            please reach out to our privacy team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
