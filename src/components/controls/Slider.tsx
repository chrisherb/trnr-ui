import { useState } from "react";
import ControlBase, { ExternalControlBaseProps } from "./ControlBase";
import Frame from "./Frame";

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
  defaultValue,
  ...props
}: InternalSliderBaseProps) => {
  const [value, setValue] = useState(defaultValue);

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
      defaultValue={defaultValue}
      {...props}
    >
      <Frame className="flex align-bottom">
        {orientation === "horizontal" && <HorizontalSlider value={value} />}
        {orientation === "vertical" && <VerticalSlider value={value} />}
      </Frame>
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
