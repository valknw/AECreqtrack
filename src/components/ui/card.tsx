import { HTMLAttributes, ReactNode } from "react";

export function Card({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function CardHeader({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function CardTitle({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props}>{children}</h2>;
}

export function CardContent({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
