import { useContext, useEffect, useState } from "react";
import ControlBase, { ExternalControlBaseProps } from "./ControlBase";
import { TrnrContext } from "../layout/Trnr";

const SVG_SIZE = 100;

interface DialProps extends ExternalControlBaseProps {
  segments?: number;
}

const Dial = ({
  onChange,
  defaultValue,
  value,
  segments = 48,
  ...props
}: DialProps) => {
  const context = useContext(TrnrContext);
  const [innerRadius, setInnerRadius] = useState(0);
  const [middleRadius, setMiddleRadius] = useState(0);
  const [outerRadius, setOuterRadius] = useState(0);

  useEffect(() => {
    const strokeWidth = context.thickness || 0;
    const radius = SVG_SIZE / 2 - strokeWidth;
    const outer = radius - strokeWidth * 2;
    setOuterRadius(outer * 0.97);
    setMiddleRadius(outer * 0.9);
    setInnerRadius(outer * 0.55);
  }, [context.thickness, outerRadius]);

  return (
    <ControlBase
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      polarity="uni"
      {...props}
    >
      <svg
        className="w-full h-full drop-shadow-glow"
        xmlns="<http://www.w3.org/2000/svg>"
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      >
        <ArcPath x={SVG_SIZE / 2} y={SVG_SIZE / 2} radius={middleRadius} />
        <ArcPath x={SVG_SIZE / 2} y={SVG_SIZE / 2} radius={innerRadius} />
        <Segments
          value={value}
          segments={segments}
          innerRadius={innerRadius}
          outerRadius={middleRadius}
        />
        <Line degree={0} innerRadius={middleRadius} outerRadius={outerRadius} />
        <Line
          degree={0.25}
          innerRadius={middleRadius}
          outerRadius={outerRadius}
        />
        <Line
          degree={0.5}
          innerRadius={middleRadius}
          outerRadius={outerRadius}
        />
        <Line
          degree={0.75}
          innerRadius={middleRadius}
          outerRadius={outerRadius}
        />
        <Line degree={1} innerRadius={middleRadius} outerRadius={outerRadius} />
      </svg>
    </ControlBase>
  );
};

export default Dial;

const getPointCoordinates = (value: number, radius: number) => {
  const gap = 0.255;
  const adjustedValue = value * (1 - gap);
  const theta = 2 * Math.PI * (adjustedValue + 0.25 + gap / 2);
  const x = SVG_SIZE / 2 + radius * Math.cos(theta);
  const y = SVG_SIZE / 2 + radius * Math.sin(theta);
  return [x, y];
};

const Line = (props: {
  degree: number;
  innerRadius: number;
  outerRadius: number;
}) => {
  const [point1, setPoint1] = useState([0, 0]);
  const [point2, setPoint2] = useState([0, 0]);

  useEffect(() => {
    setPoint1(getPointCoordinates(props.degree, props.innerRadius));
    setPoint2(getPointCoordinates(props.degree, props.outerRadius));
  }, [props.degree, props.innerRadius, props.outerRadius]);

  return (
    <line
      x1={point1[0]}
      y1={point1[1]}
      x2={point2[0]}
      y2={point2[1]}
      vectorEffect={"non-scaling-stroke"}
      className="stroke-secondary stroke-global"
      strokeLinecap="round"
    />
  );
};

const Segments = (props: {
  value: number;
  segments: number;
  innerRadius: number;
  outerRadius: number;
}) => {
  const getSegments = (parts: number, span: number) => {
    const internalParts = parts * 3;
    const getSegment = (index: number, parts: number) => {
      return (1 / parts) * index;
    };
    const segments = [];
    for (let i = 0; i < internalParts; i += span) {
      const from = getSegment(i, internalParts);
      const to = getSegment(i + (span - 1), internalParts);
      segments.push({ from, to });
    }
    return segments;
  };

  const adjustedValue = props.value * 0.75 * props.segments;
  const value = Math.floor(adjustedValue);
  const decimals = (adjustedValue - value) * 0.9 + 0.1;

  return (
    <>
      {getSegments(props.segments, 4).map((segment, index) => (
        <SegmentPolygon
          key={index}
          from={segment.from}
          to={segment.to}
          outerRadius={props.outerRadius}
          innerRadius={props.innerRadius}
          opacity={index < value ? 1 : index > value ? 0.1 : decimals}
        />
      ))}
    </>
  );
};

const SegmentPolygon = (props: {
  from: number;
  to: number;
  outerRadius: number;
  innerRadius: number;
  opacity: number;
}) => {
  const context = useContext(TrnrContext);
  const [innerPoints1, setInnerPoints1] = useState([0, 0]);
  const [outerPoints1, setOuterPoints1] = useState([0, 0]);
  const [innerPoints2, setInnerPoints2] = useState([0, 0]);
  const [outerPoints2, setOuterPoints2] = useState([0, 0]);

  useEffect(() => {
    const from = props.from;
    const to = props.to;

    const outerRadius = props.outerRadius - context.thickness! * 12;
    const innerRadius = props.innerRadius + context.thickness! * 12;

    setInnerPoints1(getPointCoordinates(from, innerRadius));
    setOuterPoints1(getPointCoordinates(from, outerRadius));
    setInnerPoints2(getPointCoordinates(to, innerRadius));
    setOuterPoints2(getPointCoordinates(to, outerRadius));
  }, [
    context.thickness,
    props.from,
    props.to,
    props.innerRadius,
    props.outerRadius,
  ]);

  return (
    <polygon
      className={`fill-secondary`}
      style={{ opacity: props.opacity }}
      points={`${innerPoints1[0]},${innerPoints1[1]} ${outerPoints1[0]},${outerPoints1[1]} ${outerPoints2[0]},${outerPoints2[1]} ${innerPoints2[0]},${innerPoints2[1]}`}
    />
  );
};

const ArcPath = (props: { x: number; y: number; radius: number }) => {
  const x = props.x;
  const y = props.y;
  const radius = props.radius;
  const startAngle = 226;
  const endAngle = 134;

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  return (
    <path
      d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 1 0 ${end.x} ${end.y}`}
      vectorEffect={"non-scaling-stroke"}
      className="stroke-secondary stroke-global"
    />
  );
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
