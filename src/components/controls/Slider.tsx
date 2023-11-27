import ControlBase, { ExternalControlBaseProps } from "./ControlBase";

interface InternalSliderBaseProps extends ExternalControlBaseProps {
  polarity?: "uni" | "bi";
  style?: "bar" | "line";
  orientation?: "horizontal" | "vertical";
}

const Slider = ({
  value,
  onChange,
  polarity = "uni",
  style = "bar",
  orientation = "vertical",
  gear = 400,
  defaultValue,
  ...props
}: InternalSliderBaseProps) => {
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
        className={`flex rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 h-full`}
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
      className={`bg-secondary h-full rounded-1`}
      style={{ width: `${props.value * 100}%` }}
    ></div>
  );
};

const VerticalSlider = (props: { value: number }) => {
  return (
    <div
      className={`bg-secondary w-full rounded-1 self-end`}
      style={{ height: `${props.value * 100}%` }}
    ></div>
  );
};

export default Slider;
