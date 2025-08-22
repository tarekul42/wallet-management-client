import { Mail, Phone } from "lucide-react";
import { Link } from "react-router";

const FAQcard = () => {
  return (
    <Link to="/contact" className="block bg-primary rounded-md p-4 sm:p-6">
      <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
        <div className="mt-4 sm:mt-0">
          <h3 className="md:text-lg font-medium text-pretty text-primary-foreground">
            Can't find your answer?
          </h3>
          <h3 className="md:text-lg font-medium text-pretty text-primary-foreground">
            We're here to help.
          </h3>

          <div className="pt-4">
            <div className="mt-1 text-[16px] text-sidebar-border flex gap-2">
              <Mail className="w-[16px]" />
              info@walletmanagement.com
            </div>
            <div className="mt-1 text-[16px] text-sidebar-border flex gap-2">
              <Phone className="w-[16px]" />
              +880 1619028278
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FAQcard;
