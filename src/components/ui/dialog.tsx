import { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

export function Dialog({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function DialogTrigger(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h3>{children}</h3>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}
