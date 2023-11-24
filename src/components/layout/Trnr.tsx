import { PropsWithChildren, createContext, useEffect } from "react";
import "@fontsource/jura/700.css";

const defaultTheme: TrnrTheme = {
  colors: { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  thickness: 2,
  crt: false,
};

export const TrnrContext = createContext<TrnrTheme>(defaultTheme);

export type TrnrTheme = {
  crt?: boolean;
  colors?: { primary: string; secondary: string; background: string };
  thickness?: number;
};

interface TrnrProps extends PropsWithChildren {
  theme?: TrnrTheme;
}

const Trnr = ({ theme = defaultTheme, children }: TrnrProps) => {
  useEffect(() => {
    const root = document.documentElement;
    if (theme.colors) {
      root.style.setProperty("--color-primary", theme.colors.primary);
      root.style.setProperty("--color-secondary", theme.colors.secondary);
      root.style.setProperty("--color-background", theme.colors.background);
    }
    theme.thickness &&
      root.style.setProperty("--border-width", `${theme.thickness}px`);
  }, [theme.colors, theme.thickness]);

  return (
    <TrnrContext.Provider value={theme}>
      <div
        className={`h-screen w-screen bg-background font-sans text-lg ${
          theme.crt && "crt"
        }`}
      >
        <div className="h-full w-full mx-auto text-secondary">{children}</div>
      </div>
    </TrnrContext.Provider>
  );
};

export default Trnr;
