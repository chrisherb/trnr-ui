import {
  Children,
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { clamp } from "../util/Math";
import { useMouse as useMouse } from "../hooks/useMouse";
import Label, { ExternalLabelProps } from "./Label";
import Value, { ExternalValueProps } from "./Value";
import Stack from "./Stack";

export interface ExternalControlBaseProps
  extends ExternalLabelProps,
    ExternalValueProps {
  defaultValue: number;
  gear?: number;
  onChange: (value: number) => void;
  onMouseDown?: (mouseDown: boolean) => void;
}

interface InternalControlBaseProps
  extends ExternalControlBaseProps,
    React.PropsWithChildren {
  value: number;
  orientation?: "horizontal" | "vertical";
}

const ControlBase = ({
  defaultValue,
  orientation = "vertical",
  children,
  gear = 200,
  onChange,
  onMouseDown,
  value,
  ...props
}: InternalControlBaseProps) => {
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
      const calulatedValue = clamp(tempVal - relativeDrag);
      onChange(calulatedValue);
    }
  }, [dragging, orientation, mouseY, mouseX, origin, gear, tempVal, onChange]);

  const handleDoubleClick = () => {
    onChange(defaultValue);
  };

  return (
    <Stack
      header={<Label {...props} value={value} />}
      footer={<Value {...props} value={value} />}
    >
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement, {
          onMouseDown: handleMouseDown,
          onDoubleClick: handleDoubleClick,
        });
      })}
    </Stack>
  );
};

export default ControlBase;
