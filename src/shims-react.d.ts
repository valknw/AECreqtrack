declare module 'react' {
  export function useState<T>(initial: T | (() => T)): [T, (v: T) => void];
  export function useEffect(...args: any[]): void;
  export function useRef<T>(init?: T): { current: T };
  export function useMemo<T>(fn: () => T, deps: any[]): T;
  export function useCallback(fn: (...args: any[]) => any, deps: any[]): any;
  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(ctx: any): T;
  export function cloneElement(element: any, props?: any, ...children: any[]): any;
  export function isValidElement(element: any): boolean;
  export const Fragment: any;
  export const StrictMode: any;
  export interface ReactNode {}
  export interface FC<P = {}> {
    (props: P): any;
  }
  export interface ReactSVG {}
  export interface ForwardRefExoticComponent<P> {}
  export interface RefAttributes<T> {}
  export interface SVGProps<T> {}
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react-dom/client' {
  export function createRoot(container: any): { render(children: any): void };
}

declare module 'vite/client' {}

declare module 'recharts' {
  export const PieChart: any;
  export const Pie: any;
  export const Cell: any;
  export const Tooltip: any;
  export const ResponsiveContainer: any;
  export const BarChart: any;
  export const Bar: any;
  export const XAxis: any;
  export const YAxis: any;
}

declare module 'lucide-react' {
  export const Plus: any;
  export const Save: any;
  export const Search: any;
  export const Upload: any;
  export const Download: any;
  export const Trash: any;
  export const Moon: any;
  export const Sun: any;
  export const X: any;
}


declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
