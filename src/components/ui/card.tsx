export function Card({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}

export function CardHeader({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}

export function CardTitle({ children, ...props }: any) {
  return <h2 {...props}>{children}</h2>;
}

export function CardContent({ children, ...props }: any) {
  return <div {...props}>{children}</div>;
}
