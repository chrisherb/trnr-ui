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
import Stack, { StackProps } from "./Stack";

export interface ExternalControlBaseProps extends StackProps {
  parameter: Parameter;
  gear?: number;
  onMouseDown?: (mouseDown: boolean) => void;
}

interface InternalControlBaseProps
  extends ExternalControlBaseProps,
    PropsWithChildren {
  orientation?: "horizontal" | "vertical";
}

const ControlBase = ({
  parameter,
  orientation = "vertical",
  children,
  gear = 200,
  onMouseDown,
  ...props
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
      const calculatedValue = clamp(tempVal - relativeDrag);
      parameter.setNormalizedValue(calculatedValue);
    }
  }, [dragging, gear, mouseX, mouseY, orientation, origin, parameter, tempVal]);

  return (
    <Stack {...props}>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement, {
          onMouseDown: handleMouseDown,
          onDoubleClick: () => parameter.reset(),
        });
      })}
    </Stack>
  );
};

export default ControlBase;
