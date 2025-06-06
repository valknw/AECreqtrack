import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
}

export function Button({ variant, size, ...props }: ButtonProps) {
  return <button {...props} />;
}
