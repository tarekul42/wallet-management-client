import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import { RegisterProgressSteps } from "./Register/RegisterProgressSteps";
import SecurityFeatures from "./Register/SecurityFeatures";
import Step1Register from "./Register/Step1Register";
import Step2Register from "./Register/Step2Register";
import { useAppSelector } from "@/redux/hook";

const Register = () => {
  const { currentStep } = useAppSelector((state) => state.registration);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/[0.03] via-background to-primary/[0.06] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link to="/" className="flex items-center justify-center mb-4">
            <Logo />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Complete all steps to create your secure digital wallet account
          </p>
        </motion.div>

        <Card className="shadow-sm">
          <CardContent className="p-8">
            <RegisterProgressSteps currentStep={currentStep} />

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && <Step1Register />}

              {/* Step 2: Password & Terms */}
              {currentStep === 2 && <Step2Register />}
            </AnimatePresence>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-border/70">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline underline-offset-4 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Features */}
        <SecurityFeatures />
      </div>
    </div>
  );
};

export default Register;
