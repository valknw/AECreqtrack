import { ReactNode, createContext, useContext } from "react";

interface SelectContextValue {
  value?: string;
  onValueChange?: (v: string) => void;
}

const SelectContext = createContext<SelectContextValue>({});

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      {children}
    </SelectContext.Provider>
  );
}

export function SelectTrigger(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  const ctx = useContext(SelectContext);
  return (
    <select
      {...props}
      value={ctx.value}
      onChange={(e) => ctx.onValueChange?.(e.target.value)}
    >
      {props.children}
    </select>
  );
}

export function SelectContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SelectItem(
  props: React.OptionHTMLAttributes<HTMLOptionElement> & { value: string }
) {
  return <option {...props}>{props.children}</option>;
}

export function SelectValue(_props: {
  placeholder?: string;
  className?: string;
}) {
  return null;
}
