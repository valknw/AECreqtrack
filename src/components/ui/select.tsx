import { ReactNode } from "react";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export function Select({ value, onValueChange, children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={
        "border border-gray-300 rounded-md px-2 py-1 transition-colors focus:border-logo focus:ring-logo " +
        (props.className || "")
      }
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
