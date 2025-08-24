import ContactPageHeading from "@/pages/Contact/ContactPageHeading";
import ContactAndLocation from "./ContactAndLocation";
import { ContactForm } from "@/components/modules/ContactPage/ContactForm";

const Contact = () => {
  return (
    <>
      <div className="mx-auto space-y-8 px-4 py-4 md:py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 lg:gap-16">
          <div className="space-y-4 justify-self-center md:jussstify-self-start md:text-start">
            <ContactPageHeading />
            <ContactAndLocation />
          </div>
          <div className="min-w-full justify-self-center md:justify-self-end">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
