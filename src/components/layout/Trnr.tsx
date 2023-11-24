import { PropsWithChildren, createContext, useEffect } from "react";
import "@fontsource/jura/700.css";

export interface TrnrProps extends PropsWithChildren {
  colors?: { primary: string; secondary: string; background: string };
  thickness?: number;
  crt?: boolean;
}

const defaultProps = {
  colors: { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  strokeWidth: 2,
  crt: false,
};

export const TrnrContext = createContext<TrnrProps>(defaultProps);

const Trnr = ({
  colors = defaultProps.colors,
  thickness: strokeWidth = defaultProps.strokeWidth,
  crt,
  children,
}: TrnrProps) => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty("--border-width", `${strokeWidth}px`);
  }, [colors.background, colors.primary, colors.secondary, strokeWidth]);

  return (
    <TrnrContext.Provider value={{ colors, thickness: strokeWidth }}>
      <div
        className={`h-screen w-screen bg-background font-sans text-lg ${
          crt && "crt"
        }`}
      >
        <div className="h-full w-full mx-auto text-secondary">{children}</div>
      </div>
    </TrnrContext.Provider>
  );
};

export default Trnr;
