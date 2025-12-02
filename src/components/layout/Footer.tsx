import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto space-y-8 px-4 py-4 md:py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Logo />

            <p className="mt-4 max-w-xs text-muted-foreground">
              A secure and easy way to manage your finances. All in one place.
            </p>
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
