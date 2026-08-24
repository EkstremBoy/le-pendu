import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none transition-[transform,background-color,color,opacity,border-color] duration-(--motion-quick) ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-[0_1px_0_color-mix(in_oklab,var(--color-ink)_12%,transparent)] hover:bg-accent-hot",
        secondary:
          "bg-paper-2 text-ink border border-line hover:bg-paper-3",
        ghost: "bg-transparent text-ink-soft hover:bg-paper-2 hover:text-ink",
        key: "bg-paper text-ink border border-line font-semibold tracking-wide hover:bg-paper-2",
      },
      size: {
        md: "h-11 px-5 text-sm rounded-[var(--radius-md)]",
        lg: "h-12 px-6 text-base rounded-[var(--radius-lg)]",
        sm: "h-9 px-3 text-sm rounded-[var(--radius-sm)]",
        icon: "size-11 rounded-[var(--radius-md)]",
        key: "h-11 min-w-10 px-0 rounded-[var(--radius-sm)] text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
));
Button.displayName = "Button";
