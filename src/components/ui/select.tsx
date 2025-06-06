import { ReactNode } from "react";

interface SelectProps {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export function Select({ value, onValueChange, children, multiple, ...props }: SelectProps) {
  return (
    <select
      {...props}
      value={value}
      multiple={multiple}
      onChange={(e) => {
        const target = e.target as HTMLSelectElement;
        if (multiple) {
          const vals = Array.from(target.selectedOptions).map((o) => o.value);
          onValueChange?.(vals);
        } else {
          onValueChange?.(target.value);
        }
      }}
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
