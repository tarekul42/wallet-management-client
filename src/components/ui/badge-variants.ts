import { cva } from "class-variance-authority"

export const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
                secondary:
                    "border-border/60 bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20 dark:bg-destructive/20 dark:text-destructive",
                outline:
                    "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
                success:
                    "border-transparent bg-success/12 text-success [a&]:hover:bg-success/20",
                warning:
                    "border-transparent bg-warning/15 text-warning [a&]:hover:bg-warning/25",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
