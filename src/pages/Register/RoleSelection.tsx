import { roleOptions } from "@/assets/data/register/roleOptions";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RoleSelection = ({step1Form}: any) => {
  return (
    <FormField
      control={step1Form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">
            Choose Account Type
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roleOptions.map((option) => (
                <div key={option.value} className="relative">
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="sr-only peer"
                  />
                  <label
                    htmlFor={option.value}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 ${
                      option.popular ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    {option.popular && (
                      <Badge className="absolute -top-2 left-4 bg-primary">
                        Most Popular
                      </Badge>
                    )}
                    <div className="flex items-start gap-3">
                      {option.icon}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {option.description}
                        </p>
                        <ul className="space-y-1">
                          {option.features.slice(0, 2).map((feature, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-muted-foreground flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RoleSelection;
