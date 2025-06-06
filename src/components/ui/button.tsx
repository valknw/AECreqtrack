export interface ButtonProps {
  variant?: string;
  size?: string;
  [key: string]: any;
}

export function Button({ variant, size, ...props }: ButtonProps) {
  return <button {...props} />;
}
