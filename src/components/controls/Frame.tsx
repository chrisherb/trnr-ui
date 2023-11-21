import { PropsWithChildren } from "react";

interface FrameProps extends PropsWithChildren {
  onClick?: () => void;
}

const Frame = ({ onClick, children }: FrameProps) => {
  return (
    <div
      onClick={onClick}
      className="border-global flex-grow rounded-md border-primary p-global"
    >
      {children}
    </div>
  );
};

export default Frame;
