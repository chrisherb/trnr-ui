import { PropsWithChildren } from "react";

interface FrameProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  isButton?: boolean;
}

const Frame = ({ className, onClick, isButton, children }: FrameProps) => {
  const classNames = `border-global w-full h-full rounded-md border-primary p-global ${className}`;

  if (isButton) {
    return (
      <button onClick={onClick} className={classNames}>
        {children}
      </button>
    );
  } else {
    return (
      <div onClick={onClick} className={classNames}>
        {children}
      </div>
    );
  }
};

export default Frame;
