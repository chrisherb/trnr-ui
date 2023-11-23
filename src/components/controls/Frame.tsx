import { MouseEventHandler, PropsWithChildren } from "react";

interface FrameProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  isButton?: boolean;
  onMouseDown?: MouseEventHandler;
  onDoubleClick?: () => void;
}

const Frame = ({
  className,
  isButton = false,
  children,
  ...props
}: FrameProps) => {
  const classNames = `border-global w-full h-full rounded-md border-primary p-global ${className}`;

  if (isButton) {
    return (
      <button type="button" className={classNames} {...props}>
        {children}
      </button>
    );
  } else {
    return (
      <div className={classNames} {...props}>
        {children}
      </div>
    );
  }
};

export default Frame;
