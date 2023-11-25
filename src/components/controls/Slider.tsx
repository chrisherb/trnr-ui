import ControlBase, { ExternalControlBaseProps } from "./ControlBase";

interface InternalSliderBaseProps extends ExternalControlBaseProps {
  polarity?: "uni" | "bi";
  style?: "bar" | "line";
  orientation?: "horizontal" | "vertical";
  width: number;
}

const Slider = ({
  value,
  onChange,
  polarity = "uni",
  style = "bar",
  orientation = "horizontal",
  width,
  gear = 400,
  defaultValue,
  ...props
}: InternalSliderBaseProps) => {
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
      <div
        className={`flex rounded-global ring ring-global ring-primary ring-offset-global ring-offset-background m-thickness-2 h-full`}
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
      className={`bg-secondary h-full rounded-global`}
      style={{ width: `${props.value * 100}%` }}
    ></div>
  );
};

const VerticalSlider = (props: { value: number }) => {
  return (
    <div
      className={`bg-secondary w-full rounded-global self-end`}
      style={{ height: `${props.value * 100}%` }}
    ></div>
  );
};

export default Slider;
