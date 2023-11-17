import { PropsWithChildren } from "react";

interface TrnrUIProps extends PropsWithChildren {
  colors?: { primary: string; secondary: string; background: string };
}

const TrnrUI = ({
  colors = { primary: "#F55A50", secondary: "#87DEAA", background: "#000000" },
  children,
}: TrnrUIProps) => {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", colors.primary);
  root.style.setProperty("--color-secondary", colors.secondary);
  root.style.setProperty("--color-background", colors.background);

  return (
    <div className="h-screen w-screen bg-background">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default TrnrUI;
