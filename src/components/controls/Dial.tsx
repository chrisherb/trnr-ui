import { useContext, useEffect, useState } from "react";
import ControlBase, { ExternalControlBaseProps } from "./ControlBase";
import { TrnrContext, TrnrProps } from "../layout/Trnr";

interface InternalDialProps extends ExternalControlBaseProps {
  lineOffset?: number;
}

const Dial = ({ lineOffset = 0.1, onChange, ...props }: InternalDialProps) => {
  const [value, setValue] = useState(0);
  const [radius, setRadius] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [lineCoordinates, setLineCoordinates] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const context = useContext(TrnrContext) as TrnrProps;
  const SIZE = 100;

  useEffect(() => {
    if (context.strokeWidth) setStrokeWidth(context.strokeWidth);
    setRadius(SIZE / 2 - strokeWidth);
    const gap = 0.25;

    // Calculate the inner coordinates of the line
    const innerRadius = (SIZE / 2) * lineOffset;
    const adjustedValue1 = value * (1 - gap);
    const theta1 = 2 * Math.PI * (adjustedValue1 + 0.25 + gap / 2);
    const lineX1 = SIZE / 2 + innerRadius * Math.cos(theta1);
    const lineY1 = SIZE / 2 + innerRadius * Math.sin(theta1);

    // Calculate the outer coordinates of the line
    const adjustedValue2 = value * (1 - gap);
    const theta2 = 2 * Math.PI * (adjustedValue2 + 0.25 + gap / 2);
    const lineX2 = SIZE / 2 + radius * Math.cos(theta2);
    const lineY2 = SIZE / 2 + radius * Math.sin(theta2);

    setLineCoordinates({ x1: lineX1, y1: lineY1, x2: lineX2, y2: lineY2 });
  }, [lineOffset, value, radius, strokeWidth, context.strokeWidth]);

  const handleOnChange = (v: number) => {
    onChange(v);
    setValue(v);
  };

  return (
    <ControlBase value={value} onChange={handleOnChange} {...props}>
      <svg
        className="grow"
        xmlns="<http://www.w3.org/2000/svg>"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          vectorEffect={"non-scaling-stroke"}
          className="stroke-primary stroke-global"
          r={radius}
          cx={SIZE / 2}
          cy={SIZE / 2}
          fill="none"
          strokeLinecap="round"
        />
        <line
          vectorEffect={"non-scaling-stroke"}
          className="stroke-secondary"
          x1={lineCoordinates.x1}
          y1={lineCoordinates.y1}
          x2={lineCoordinates.x2}
          y2={lineCoordinates.y2}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </ControlBase>
  );
};

export default Dial;
