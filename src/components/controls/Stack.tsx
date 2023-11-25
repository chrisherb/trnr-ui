import { PropsWithChildren, ReactNode } from "react";

interface StackProps extends PropsWithChildren {
  style?: "default" | "header-only";
  header?: ReactNode;
  footer?: ReactNode;
  orientation?: "horizontal" | "vertical";
}

const Stack = ({ orientation = "vertical", ...props }: StackProps) => {
  if (orientation === "vertical") return <VerticalStack {...props} />;
  if (orientation === "horizontal") return <HorizontalStack {...props} />;
};

const VerticalStack = ({
  style = "default",
  header,
  footer,
  children,
}: StackProps) => {
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

const HorizontalStack = ({
  style = "default",
  header,
  footer,
  children,
}: StackProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-7 shrink-0"></div>
      <div className="flex flex-row grow">
        <div className="w-1/2 uppercase grid content-center">{header}</div>
        <div className="w-1/2">{children}</div>
      </div>
      <div className="h-7 shrink-0 uppercase text-center">
        {style == "default" && footer}
      </div>
    </div>
  );
};

export default Stack;
