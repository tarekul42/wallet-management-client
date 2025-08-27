import { Check } from "lucide-react";

export const RegisterProgressSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, title: "Basic Info", description: "Personal details" },
    { id: 2, title: "Email Verification", description: "Verify email address" },
    {
      id: 3,
      title: "Phone Verification",
      description: "Optional verification",
    },
    { id: 4, title: "Security Setup", description: "Password & terms" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  currentStep > step.id
                    ? "bg-green-600 border-green-600 text-white"
                    : currentStep === step.id
                    ? "bg-primary border-primary text-white"
                    : "bg-background border-muted-foreground text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <div className="text-center mt-2">
                <div
                  className={`text-sm font-medium ${
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-0.5 transition-all ${
                    currentStep > step.id ? "bg-green-600" : "bg-muted"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};