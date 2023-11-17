import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { clamp } from "../util/Math";
import { useMouse as useMouse } from "../hooks/useMouse";
import Label, { ExternalLabelProps } from "./Label";
import Value, { ExternalValueProps } from "./Value";

export interface InternalControlBaseProps {
  value?: number;
}

export interface ExternalControlBaseProps {
  defaultValue: number;
  gear?: number;
  onChange: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  onMouseDown?: (mouseDown: boolean) => void;
}

interface ControlBaseProps
  extends ExternalControlBaseProps,
    ExternalLabelProps,
    ExternalValueProps {
  children: React.ReactElement<InternalControlBaseProps>;
}

const ControlBase = ({
  defaultValue,
  orientation = "vertical",
  children,
  gear = 200,
  onChange,
  onMouseDown,
  ...props
}: ControlBaseProps) => {
  const [value, setValue] = useState(defaultValue);
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
      setValue(calulatedValue);
    }
  }, [dragging, orientation, mouseY, mouseX, origin, gear, tempVal, onChange]);

  const handleDoubleClick = () => {
    setValue(defaultValue);
    onChange(defaultValue);
  };

  return (
    <div onMouseDown={handleMouseDown} onDoubleClick={handleDoubleClick}>
      <Label {...props} value={value} />
      {Children.map(children, (child) => cloneElement(child, { value: value }))}
      <Value {...props} value={value} />
    </div>
  );
};

export default ControlBase;
