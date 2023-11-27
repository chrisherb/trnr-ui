import { PropsWithChildren, createContext, useEffect } from "react";
import "@fontsource/jura/700.css";
import { Honeycomb } from "../../assets/Honeycomb";

const defaultTheme: TrnrTheme = {
  colors: { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  thickness: 0.125,
  roundness: 0.375,
  effects: ["honeycomb", "blur"],
};

export const TrnrContext = createContext<TrnrTheme>(defaultTheme);

export type TrnrTheme = {
  colors?: { primary: string; secondary: string; background: string };
  thickness?: number;
  roundness?: number;
  effects?: ("honeycomb" | "blur")[];
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
        className={`relative h-screen w-screen bg-background font-sans text-lg`}
      >
        <div className="h-full w-full text-secondary">{children}</div>
        {mergedTheme.effects?.includes("blur") && (
          <div className="absolute top-0 pointer-events-none h-full w-full text-secondary blur-md opacity-50">
            {children}
          </div>
        )}
        {mergedTheme.effects?.includes("honeycomb") && (
          <div className="absolute top-0 pointer-events-none h-full w-full z-50">
            <Honeycomb />
          </div>
        )}
      </div>
    </TrnrContext.Provider>
  );
};

export default Trnr;
