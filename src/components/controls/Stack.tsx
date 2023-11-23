import { PropsWithChildren, ReactNode } from "react";

interface StackProps extends PropsWithChildren {
  style?: "default" | "header-only";
  header?: ReactNode;
  footer?: ReactNode;
}

const Stack = ({ style = "default", header, footer, children }: StackProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-7 shrink-0 uppercase text-center">{header}</div>
      {children}
      <div className="h-7 shrink-0 uppercase text-center">
        {style == "default" && footer}
      </div>
    </div>
  );
};

export default Stack;
