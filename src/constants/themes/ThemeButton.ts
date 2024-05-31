export type TButton = typeof ThemeButton;

const baseStyles = "inline-flex items-center justify-center whitespace-nowrap";
const variantPrimaryStyles = "bg-slate-100";
const variantSecondaryStyles = "";
const variantTertiaryStyles = "";
const variantDisabledStyles = "";
const sizeSmStyles = "";
const sizeMdStyles = "px-6 py-2";
const sizeLgStyles = "";
const sizeXlStyles = "";

export const ThemeButton = {
  base: baseStyles,
  variant: {
    primary: variantPrimaryStyles,
    secondary: variantSecondaryStyles,
    tertiary: variantTertiaryStyles,
    disabled: variantDisabledStyles,
  },
  size: {
    sm: sizeSmStyles,
    md: sizeMdStyles,
    lg: sizeLgStyles,
    xl: sizeXlStyles,
  },
};
