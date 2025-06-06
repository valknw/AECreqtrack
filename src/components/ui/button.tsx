export interface ButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md";
  className?: string;
  [key: string]: any;
}

export function Button({
  variant = "default",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  let classes =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors " +
    className;

  classes += size === "sm" ? " px-2 py-1 text-sm" : " px-4 py-2";

  if (variant === "outline") {
    classes +=
      " border border-logo text-logo hover:bg-logo hover:text-white hover:bg-logo-dark";
  } else if (variant === "ghost") {
    classes += " hover:bg-gray-100 dark:hover:bg-gray-800";
  } else {
    classes += " bg-logo text-white hover:bg-logo-dark";
  }

  return <button {...props} className={classes} />;
}
