export type TButton = typeof ThemeButton;

const baseStyles = "p";
const variantPrimaryStyles = "p";
const variantSecondaryStyles = "p";
const variantTertiaryStyles = "p";
const variantDisabledStyles = "p";
const sizeSmStyles = "p-0 ";
const sizeMdStyles = "p-0";
const sizeLgStyles = "p-0";
const sizeXlStyles = "p-0";

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
