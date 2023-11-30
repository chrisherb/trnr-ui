import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMouse } from "../hooks/useMouse";
import { clamp } from "../util/Math";
import { Parameter } from "../hooks/useParameter";

export interface ExternalControlBaseProps {
  parameter: Parameter;
  gear?: number;
  onMouseDown?: (mouseDown: boolean) => void;
}

interface InternalControlBaseProps
  extends ExternalControlBaseProps,
    PropsWithChildren {
  orientation?: "horizontal" | "vertical";
  polarity?: "bi" | "uni";
}

const ControlBase = ({
  parameter,
  orientation = "vertical",
  polarity = "bi",
  children,
  gear = 200,
  onMouseDown,
}: InternalControlBaseProps) => {
  const [origin, setOrigin] = useState(0);
  const [tempVal, setTempVal] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (onMouseDown) onMouseDown(true);
    setOrigin(orientation == "vertical" ? ev.clientY : ev.clientX);
    setTempVal(parameter.normalizedValue);
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
      const calulatedValue = clamp(tempVal - relativeDrag, polarity);
      parameter.setNormalizedValue(calulatedValue);
    }
  }, [
    dragging,
    gear,
    mouseX,
    mouseY,
    orientation,
    origin,
    parameter,
    polarity,
    tempVal,
  ]);

  const handleDoubleClick = () => {
    parameter.reset();
  };

  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement, {
          onMouseDown: handleMouseDown,
          onDoubleClick: handleDoubleClick,
        });
      })}
    </>
  );
};

export default ControlBase;
