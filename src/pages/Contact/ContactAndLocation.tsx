import { Mail, MapPinHouse, PhoneCall } from "lucide-react";

const ContactAndLocation = () => {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-start gap-4">
        <MapPinHouse className="bg-primary h-16 w-16 text-white p-4 rounded" />
        <div>
          <h1 className="text-foreground md:text-lg font-medium">Our Address</h1>
          <p className="text-muted-foreground">221B Baker Street, London, NW1 6XE, UK.</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <PhoneCall className="bg-primary h-16 w-16 text-white p-4 rounded" />
        <div>
          <h1 className="text-foreground md:text-lg font-medium">Phone Number</h1>
          <p className="text-muted-foreground">+44 20 7946 0958</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Mail className="bg-primary h-16 w-16 text-white p-4 rounded" />
        <div>
          <h1 className="text-foreground md:text-lg font-medium">Email Address</h1>
          <p className="text-muted-foreground">info@walletmanagement.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactAndLocation;
