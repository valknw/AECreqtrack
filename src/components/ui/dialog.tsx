import { ReactNode } from "react";

interface DialogProps {
  [key: string]: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ children, ...props }: DialogProps) {
  return <div {...props}>{children}</div>;
}

interface DialogTriggerProps {
  asChild?: boolean;
  [key: string]: any;
}

export function DialogTrigger({ asChild, ...props }: DialogTriggerProps) {
  return <button {...props} />;
}

interface DialogContentProps {
  children: ReactNode;
  [key: string]: any;
}

export function DialogContent({ children, ...props }: DialogContentProps) {
  return <div {...props}>{children}</div>;
}

export function DialogHeader({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}

export function DialogFooter({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}

export function DialogTitle({ children, ...props }: any) {
  return <h3 {...props}>{children}</h3>;
}

export function DialogDescription({ children, ...props }: any) {
  return <p {...props}>{children}</p>;
}
