import { PropsWithChildren, useEffect } from "react";

interface TrnrProps extends PropsWithChildren {
  colors?: { primary: string; secondary: string; background: string };
}

const Trnr = ({
  colors = { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  children,
}: TrnrProps) => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-background", colors.background);
  }, [colors.background, colors.primary, colors.secondary]);

  return (
    <div className="h-screen w-screen bg-background">
      <div className="h-full w-full mx-auto">{children}</div>
    </div>
  );
};

export default Trnr;
