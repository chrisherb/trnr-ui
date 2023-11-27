import { PropsWithChildren, createContext, useEffect } from "react";
import "@fontsource/jura/700.css";

const defaultTheme: TrnrTheme = {
  colors: { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  thickness: 0.125,
  roundness: 0.375,
  crt: false,
};

export const TrnrContext = createContext<TrnrTheme>(defaultTheme);

export type TrnrTheme = {
  crt?: boolean;
  colors?: { primary: string; secondary: string; background: string };
  thickness?: number;
  roundness?: number;
};

interface TrnrProps extends PropsWithChildren {
  theme?: TrnrTheme;
}

const Trnr = ({ theme, children }: TrnrProps) => {
  const mergedTheme = { ...defaultTheme, ...theme };

  useEffect(() => {
    const root = document.documentElement;
    if (mergedTheme.colors) {
      root.style.setProperty(
        "--trnr-color-primary",
        mergedTheme.colors.primary
      );
      root.style.setProperty(
        "--trnr-color-secondary",
        mergedTheme.colors.secondary
      );
      root.style.setProperty(
        "--trnr-color-background",
        mergedTheme.colors.background
      );
    }
    mergedTheme.thickness &&
      root.style.setProperty("--trnr-thickness", `${mergedTheme.thickness}rem`);
    mergedTheme.roundness != null &&
      root.style.setProperty(
        "--trnr-roundness",
        `${mergedTheme.roundness}${mergedTheme.roundness > 0 ? "rem" : "px"}`
      );
  }, [mergedTheme.colors, mergedTheme.roundness, mergedTheme.thickness]);

  return (
    <TrnrContext.Provider value={mergedTheme}>
      <div
        className={`h-screen w-screen bg-background font-sans text-lg ${
          mergedTheme.crt && "crt"
        }`}
      >
        <div className="h-full w-full text-secondary">{children}</div>
      </div>
    </TrnrContext.Provider>
  );
};

export default Trnr;
