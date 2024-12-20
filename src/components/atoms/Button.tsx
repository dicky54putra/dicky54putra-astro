import { cn } from "@/lib/utils";
import type { Box, BoxRF } from "@/types/component.type";
import { cva, type VariantProps } from "class-variance-authority";

import React from "react";

const buttonVariants = cva(
  "inline-flex justify-center items-center gap-2 disabled:opacity-50 rounded-md focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-medium text-sm whitespace-nowrap transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 focus-visible:outline-none",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
        lg: "h-11 rounded-md px-8",
        sm: "h-9 rounded-md px-3",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const PrimitiveButton = (props: BoxRF<ButtonProps>) => {
  const {
    as: Element = "button",
    children,
    className,
    size,
    variant,
    ...restProps
  } = props;

  return (
    <Element
      className={cn(buttonVariants({ className, size, variant }))}
      {...restProps}
    >
      {children}
    </Element>
  );
};

const Button: Box<ButtonProps> = PrimitiveButton;

export { Button, buttonVariants };

export default Button;
