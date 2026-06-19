import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
];

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto space-y-8 px-4 py-12 md:py-20 sm:px-6 lg:space-y-16 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo />

            <p className="mt-4 max-w-xs text-muted-foreground">
              A secure and easy way to manage your finances. All in one place.
            </p>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-foreground">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/send-money"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Send Money
                  </Link>
                </li>

                <li>
                  <Link
                    to="/deposit"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Deposit
                  </Link>
                </li>

                <li>
                  <Link
                    to="/withdraw"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Withdraw
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    to="/features"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    to="/faqs"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-foreground">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Wallet Management. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
