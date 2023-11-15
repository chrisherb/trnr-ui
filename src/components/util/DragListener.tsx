import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { clamp } from "./Math";
import { useMouse as useMouse } from "../hooks/useMouse";

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

  const handleMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (onMouseDown) onMouseDown(true);
    setOrigin(orientation == "vertical" ? ev.clientY : ev.clientX);
    setTempVal(value);
  };

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    if (onMouseDown) onMouseDown(false);
  }, [onMouseDown]);

  const [mouseX, mouseY] = useMouse(handleMouseUp);

  useEffect(() => {
    if (dragging) {
      const clientPos = orientation == "vertical" ? mouseY : mouseX;
      let relativeDrag = 0;
      if (orientation == "vertical") relativeDrag = (clientPos - origin) / gear;
      else relativeDrag = (origin - clientPos) / gear;
      onChange(clamp(tempVal - relativeDrag));
    }
  });

  return <div onMouseDown={handleMouseDown}>{children}</div>;
};

export default DragListener;
