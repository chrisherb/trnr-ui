import { PropsWithChildren, useEffect, useState } from "react";
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

  const [mouseX, mouseY] = useMouse(endDrag);

  useEffect(() => {
    if (dragging) {
      console.log("dragging");
      const clientPos = orientation == "vertical" ? mouseY : mouseX;
      const relativeDrag = (clientPos - origin) / gear;
      onChange(clamp(tempVal - relativeDrag));
    }
  });

  return (
    <div onMouseDown={startDrag} className="active:cursor-none">
      {children}
    </div>
  );
};

export default DragListener;
