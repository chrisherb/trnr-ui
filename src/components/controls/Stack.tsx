import { PropsWithChildren, ReactNode } from "react";

export interface StackProps extends PropsWithChildren {
  style?: "default" | "header-only";
  header?: ReactNode;
  footer?: ReactNode;
  orientation?: "horizontal" | "vertical";
}

const Stack = ({ orientation = "vertical", ...props }: StackProps) => {
  if (orientation === "vertical") return <VerticalStack {...props} />;
  if (orientation === "horizontal") return <HorizontalStack {...props} />;
};

const VerticalStack = ({ header, footer, children }: StackProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-7 shrink-0 uppercase text-center select-none">
        {header}
      </div>
      {children}
      <div className="h-7 shrink-0 uppercase text-center select-none">
        {footer}
      </div>
    </div>
  );
};

const HorizontalStack = ({ header, children }: StackProps) => {
  return (
    <>
      <div className="flex flex-row h-full w-full gap-x-2">
        <div className="w-1/2 uppercase grid content-center truncate select-none">
          {header}
        </div>
        <div className="w-1/2 shrink-0 flex select-none">{children}</div>
      </div>
    </>
  );
};

export default Stack;
