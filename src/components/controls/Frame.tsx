import { PropsWithChildren } from "react";

interface FrameProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const Frame = ({ className, onClick, children }: FrameProps) => {
  return (
    <div
      onClick={onClick}
      className={`border-global flex-grow rounded-md border-primary p-global ${className}`}
    >
      {children}
    </div>
  );
};

export default Frame;
