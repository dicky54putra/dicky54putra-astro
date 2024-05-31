import type { HTMLAttributes } from "astro/types";
import type { TButton } from "constants/themes/ThemeButton";
import type { TTypography } from "constants/themes/ThemeTypography";

export interface PropsButton extends HTMLAttributes<"button"> {
  variant?: keyof TButton["variant"];
  size?: keyof TButton["size"];
}

export interface PropsButtonLink extends HTMLAttributes<"a"> {
  variant?: keyof TButton["variant"];
  size?: keyof TButton["size"];
}

export interface PropsType {
  variant?: keyof TTypography["variant"];
}

export interface PropsHeading
  extends PropsType,
    HTMLAttributes<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> {
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface PropsParagraph
  extends PropsType,
    HTMLAttributes<"span" | "p"> {
  component: "p" | "span";
}
