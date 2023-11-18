import { PropsWithChildren, createContext, useEffect } from "react";

export interface TrnrProps extends PropsWithChildren {
  colors?: { primary: string; secondary: string; background: string };
  strokeWidth?: number;
}

const defaultProps = {
  colors: { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  strokeWidth: 2,
};

export const TrnrContext = createContext<TrnrProps>(defaultProps);

const Trnr = ({
  colors = defaultProps.colors,
  strokeWidth = defaultProps.strokeWidth,
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
    <TrnrContext.Provider value={{ colors, strokeWidth }}>
      <div className="h-screen w-screen bg-background">
        <div className="h-full w-full mx-auto">{children}</div>
      </div>
    </TrnrContext.Provider>
  );
};

export default Trnr;
