import { cva } from "class-variance-authority"

export const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/30 outline-none transition-colors focus-visible:ring-[3px]"
)
