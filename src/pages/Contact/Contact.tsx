import ContactPageHeading from "@/pages/Contact/ContactPageHeading";
import ContactAndLocation from "./ContactAndLocation";

const Contact = () => {
  return (
    <>
      <div className="mx-auto space-y-8 px-4 py-4 md:py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <ContactPageHeading />
        <ContactAndLocation />
        this is contact page
      </div>
      ;
    </>
  );
};

export default Contact;
