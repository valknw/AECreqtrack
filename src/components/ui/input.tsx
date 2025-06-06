export interface InputProps {
  [key: string]: any;
}

export function Input(props: InputProps) {
  return <input {...props} />;
}
