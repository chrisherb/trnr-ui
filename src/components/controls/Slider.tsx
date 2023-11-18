import { useState } from "react";
import ControlBase, { ExternalControlBaseProps } from "./ControlBase";

interface InternalSliderBaseProps extends ExternalControlBaseProps {
  polarity?: "uni" | "bi";
  style?: "bar" | "line";
  orientation?: "horizontal" | "vertical";
  width: number;
}

const Slider = ({
  onChange,
  polarity = "uni",
  style = "bar",
  orientation = "horizontal",
  width,
  gear = 400,
  ...props
}: InternalSliderBaseProps) => {
  const [value, setValue] = useState(0);

  let barWidth = "";

  switch (width) {
    case 16:
      barWidth = orientation == "horizontal" ? "h-16" : "w-16";
      break;
    case 32:
      barWidth = orientation == "horizontal" ? "h-32" : "w-32";
      break;
  }

  const handleOnChange = (v: number) => {
    onChange(v);
    setValue(v);
  };

  return (
    <ControlBase
      value={value}
      onChange={handleOnChange}
      gear={gear}
      orientation={orientation}
      {...props}
    >
      <div
        className={`border-2 rounded-md border-primary p-1 w-full h-full ${barWidth} flex`}
      >
        {orientation === "horizontal" && <HorizontalSlider value={value} />}
        {orientation === "vertical" && <VerticalSlider value={value} />}
      </div>
    </ControlBase>
  );
};

const HorizontalSlider = (props: { value: number }) => {
  return (
    <div
      className={`bg-secondary h-full rounded-sm`}
      style={{ width: `${props.value * 100}%` }}
    ></div>
  );
};

const VerticalSlider = (props: { value: number }) => {
  return (
    <div
      className={`bg-secondary w-full rounded-sm self-end`}
      style={{ height: `${props.value * 100}%` }}
    ></div>
  );
};

export default Slider;
