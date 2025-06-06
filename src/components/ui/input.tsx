export interface InputProps {
  [key: string]: any;
}

export function Input(props: InputProps) {
  const className =
    "border border-gray-300 rounded-md px-2 py-1 transition-colors focus:border-logo focus:ring-logo " +
    (props.className || "");
  return <input {...props} className={className} />;
}
