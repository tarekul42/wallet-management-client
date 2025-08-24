import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  BellRing,
  ChartPie,
  LineChart,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";

const FeaturesHeader = () => {
  return (
    <header className="mb-4 lg:mb-12 grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-4 md:gap-8 lg:gap-16">
      <div className="justify-self-center md:justify-self-start text-center md:text-start">
        <h1 className="text-primary font-medium md:text-xl">Features</h1>
        <h1 className="text-lg md:text-4xl font-medium mb-4">
          Powerful, role‑based features for a modern wallet
        </h1>
        <p className="text-gray-700 font-medium max-w-2xl">
          Discover the powerful, secure, and user-friendly features that make
          managing your digital wallet simple and safe.
        </p>
      </div>
      <div className="justify-self-center md:justify-self-end">
        <Card className="max-w-xl bg-primary text-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie className="size-4 md:size-5" /> Key Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 w-full gap-3 text-sm">
              <li className="flex items-start gap-2">
                <ShieldCheck className="size-4 mt-0.5" /> Role‑based navigation
              </li>
              <li className="flex items-start gap-2">
                <Activity className="size-4 mt-0.5" /> Real‑time loading &
                errors
              </li>
              <li className="flex items-start gap-2">
                <LineChart className="size-4 mt-0.5" /> Charts & analytics ready
              </li>
              <li className="flex items-start gap-2">
                <BellRing className="size-4 mt-0.5" /> Toast feedback
              </li>
              <li className="flex items-start gap-2">
                <Search className="size-4 mt-0.5" /> Advanced filters
              </li>
              <li className="flex items-start gap-2">
                <Rocket className="size-4 mt-0.5" /> Guided tour onboarding
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </header>
  );
};

export default FeaturesHeader;
