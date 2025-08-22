import ContactPageHeading from "@/pages/Contact/ContactPageHeading";
import ContactAndLocation from "./ContactAndLocation";
import { ContactForm } from "@/components/modules/ContactPage/ContactForm";

const Contact = () => {
  return (
    <>
      <div className="mx-auto space-y-8 px-4 py-4 md:py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
          <div className="space-y-4">
            <ContactPageHeading />
            <ContactAndLocation />
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
