import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FeaturesTag from "./FeaturesTag";

/* eslint-disable @typescript-eslint/no-explicit-any */
const FeaturesCard = ({
    id,
    icon,
    title,
    description,
    tags,
    isKey,
  }: {
    id: any;
    icon: any;
    title: any;
    description: any;
    tags: any;
    isKey: any;
  }) => {
  return (
    <Card
        id={`feature-card-${id}`}
        className={`h-full border-0 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 ${isKey ? "ring-1 ring-primary" : ""}`}
      >
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                {icon}
              </div>
              <CardTitle className="text-base font-semibold leading-tight">
                {title}
              </CardTitle>
            </div>
            {isKey && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="rounded-full" variant="secondary">
                      Key
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>High-impact feature</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {tags.map((t: any) => (
            <FeaturesTag key={t} label={t} />
          ))}
        </CardContent>
      </Card>
  );
};

export default FeaturesCard;