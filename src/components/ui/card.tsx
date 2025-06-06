export function Card({ children, className = "", ...props }: any) {
  return (
    <div
      {...props}
      className={`bg-white rounded-lg shadow-md p-4 fade-in ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, ...props }: any) {
  return <div {...props} className={`mb-4 ${props.className || ""}`}>{children}</div>;
}

export function CardTitle({ children, ...props }: any) {
  return (
    <h2 {...props} className={`text-lg font-semibold ${props.className || ""}`}> 
      {children}
    </h2>
  );
}

export function CardContent({ children, ...props }: any) {
  return <div {...props} className={props.className}>{children}</div>;
}
