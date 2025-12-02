import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import { RegisterProgressSteps } from "./Register/RegisterProgressSteps";
import SecurityFeatures from "./Register/SecurityFeatures";
import Step1Register from "./Register/Step1Register";
import Step2Register from "./Register/Step2Register";
import Step3Register from "./Register/Step3Register";
import Step4Register from "./Register/Step4Register";
import { useAppSelector } from "@/redux/hook";

const Register = () => {
  const { currentStep } = useAppSelector((state) => state.registration);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo />
            <span className="text-2xl font-bold">Wallet Management</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Complete all steps to create your secure digital wallet account
          </p>
        </motion.div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <RegisterProgressSteps currentStep={currentStep} />

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && <Step1Register />}

              {/* Step 2: Email Verification */}
              {currentStep === 2 && <Step2Register />}

              {/* Step 3: Phone Verification (Optional) */}
              {currentStep === 3 && <Step3Register />}

              {/* Step 4: Password & Terms */}
              {currentStep === 4 && <Step4Register />}
            </AnimatePresence>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
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
