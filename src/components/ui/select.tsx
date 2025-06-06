import { ReactNode } from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  [key: string]: any;
}

export function Select({ value, onValueChange, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectItem(props: any & { value: string }) {
  return <option {...props}>{props.children}</option>;
}

export function SelectValue(_props: { placeholder?: string; className?: string }) {
  return null;
}
