import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl md:text-3xl font-light text-muted-foreground mt-4">
          Oops! Page Not Found
        </p>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Go Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
