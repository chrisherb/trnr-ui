import { PropsWithChildren, useEffect, useState } from "react";
import { clamp } from "./Math";

interface DragListenerProps extends PropsWithChildren {
  value: number;
  orientation?: "horizontal" | "vertical";
  onChange: (value: number) => void;
  onMouseDown?: (mouseDown: boolean) => void;
  gear?: number;
}

const DragListener = ({
  value,
  orientation = "vertical",
  children,
  onChange,
  onMouseDown,
  gear = 200,
}: DragListenerProps) => {
  const [origin, setOrigin] = useState(0);
  const [tempVal, setTempVal] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startDrag = (ev: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (onMouseDown) onMouseDown(true);
    setOrigin(orientation == "vertical" ? ev.clientY : ev.clientX);
    setTempVal(value);
  };

  const endDrag = () => {
    setDragging(false);
    if (onMouseDown) onMouseDown(false);
  };

  const handleDrag = (ev: MouseEvent) => {
    if (dragging) {
      const clientPos = orientation == "vertical" ? ev.clientY : ev.clientX;
      const relativeDrag = (clientPos - origin) / gear;
      onChange(clamp(tempVal - relativeDrag));
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", endDrag);
  });

  useEffect(() => {
    if (dragging) {
      window.onmousemove = handleDrag;
    } else {
      window.onmousemove = null;
    }
  });

  return (
    <div onMouseDown={startDrag} className="active:cursor-none">
      {children}
    </div>
  );
};

export default DragListener;
