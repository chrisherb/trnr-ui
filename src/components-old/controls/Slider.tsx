import { Parameter } from "../hooks/useParameter";
import ControlBase, { ExternalControlBaseProps } from "./ControlBase";

interface InternalSliderBaseProps extends ExternalControlBaseProps {
  polarity?: "uni" | "bi";
  style?: "bar" | "line";
  orientation?: "horizontal" | "vertical";
}

const Slider = ({
  parameter,
  style = "bar",
  orientation = "vertical",
  gear = 400,
  ...props
}: InternalSliderBaseProps) => {
  return (
    <ControlBase
      parameter={parameter}
      gear={gear}
      orientation={orientation}
      {...props}
    >
      <div className={`rounded-1 m-2 grow`}>
        {orientation === "horizontal" && (
          <HorizontalSlider parameter={parameter} segments={100} />
        )}
        {orientation === "vertical" && (
          <VerticalSlider parameter={parameter} segments={33} />
        )}
      </div>
    </ControlBase>
  );
};

const HorizontalSlider = (props: {
  parameter: Parameter;
  segments: number;
}) => {
  return (
    <div
      className={`bg-secondary h-full rounded-1`}
      style={{ width: `${props.parameter.normalizedValue * 100}%` }}
    ></div>
  );
};

const VerticalSlider = (props: { parameter: Parameter; segments: number }) => {
  return (
    <div className="flex flex-col-reverse w-full h-full gap-1 select-none">
      {[...Array(props.segments)].map((_, i) => {
        const bla = Math.floor(
          props.segments * props.parameter.normalizedValue
        );
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
