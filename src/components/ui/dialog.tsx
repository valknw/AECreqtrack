import {
  ReactNode,
  createContext,
  useContext,
  cloneElement,
  isValidElement,
} from "react";

interface DialogContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  setOpen: () => {},
});

interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  [key: string]: any;
}

export function Dialog({ open, onOpenChange, children, ...props }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, setOpen: onOpenChange || (() => {}) }}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" {...props}>
            {children}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  asChild?: boolean;
  children: ReactNode;
  [key: string]: any;
}

export function DialogTrigger({ asChild, children, ...props }: DialogTriggerProps) {
  const { setOpen } = useContext<DialogContextValue>(DialogContext as any);
  const handleClick = (e: any) => {
    if (props.onClick) props.onClick(e);
    setOpen(true);
  };
  if (asChild && isValidElement(children)) {
    return cloneElement(children as any, {
      ...props,
      onClick: handleClick,
    });
  }
  return (
    <button {...props} onClick={handleClick}>
      {children}
    </button>
  );
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
