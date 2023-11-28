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
        className={`rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 grow`}
      >
        {orientation === "horizontal" && (
          <HorizontalSlider value={value} segments={100} />
        )}
        {orientation === "vertical" && (
          <VerticalSlider value={value} segments={33} />
        )}
      </div>
    </ControlBase>
  );
};

const HorizontalSlider = (props: { value: number; segments: number }) => {
  return (
    <div
      className={`bg-secondary h-full rounded-1`}
      style={{ width: `${props.value * 100}%` }}
    ></div>
  );
};

const VerticalSlider = (props: { value: number; segments: number }) => {
  return (
    <div className="flex flex-col-reverse w-full h-full gap-1 select-none">
      {[...Array(props.segments)].map((_, i) => {
        const bla = Math.floor(props.segments * props.value);
        const opacity = i > bla ? 0.5 : 1;

        return (
          <div
            className={`grow rounded-1 bg-secondary`}
            style={{ opacity: opacity }}
          ></div>
        );
      })}
    </div>
  );
};

export default Slider;
