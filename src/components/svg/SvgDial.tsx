import { useEffect } from "react";
import { Parameter, useParameter } from "../hooks/useParameter";
import { Dial } from "../../ControlModel";

const strokeWidth = 2;

const SvgDial = ({
  x,
  y,
  diameter,
  labels,
  segments,
  showSuffix,
  color,
}: Dial) => {
  const parameter = useParameter(0, 10, 5);
  const radius = diameter / 2 - strokeWidth;
  const outer = radius - strokeWidth * 2;
  const labelRadius = outer * 0.9;
  const outerRadius = outer * 0.85;
  const middleRadius = outer * 0.8;
  const innerRadius = outer * 0.45;

  return (
    <g>
      <ArcPath x={x} y={y} radius={middleRadius} color={color} />
      <ArcPath x={x} y={y} radius={innerRadius} color={color} />
      <Segments
        x={x}
        y={y}
        value={parameter.normalizedValue}
        segments={segments}
        innerRadius={innerRadius}
        outerRadius={middleRadius}
        color={color}
      />
      <Lines
        x={x}
        y={y}
        numLines={labels}
        innerRadius={middleRadius}
        outerRadius={outerRadius}
        color={color}
      />
      <Labels
        x={x}
        y={y}
        numLabels={labels}
        parameter={parameter}
        radius={labelRadius}
        showSuffix={showSuffix}
        color={color}
      />
    </g>
  );
};

export default SvgDial;

const getPointCoordinates = (value: number, radius: number) => {
  const gap = 0.255;
  const adjustedValue = value * (1 - gap);
  const theta = 2 * Math.PI * (adjustedValue + 0.25 + gap / 2);
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  return [x, y];
};

const Labels = ({
  x,
  y,
  numLabels,
  parameter,
  radius,
  showSuffix,
  color,
}: {
  x: number;
  y: number;
  parameter: Parameter;
  radius: number;
  numLabels: number;
  showSuffix: boolean;
  color: string;
}) => {
  const labels = [];
  for (let i = 0; i < numLabels; i++) {
    const value = i / (numLabels - 1);
    const label = {
      index: value,
      name: Math.round(parameter.getDenormalizedValue(value)).toString(),
    };
    if (showSuffix && i === numLabels - 1) {
      label.name += " " + parameter.suffix;
    }
    labels.push(label);
  }

  return (
    <>
      {labels.map(({ index, name }) => {
        let textAnchor = "middle";

        if (index < 0.5) {
          textAnchor = "end";
        } else if (index > 0.5) {
          textAnchor = "start";
        }

        return (
          <Label
            x={x}
            y={y}
            key={name}
            text={name.toString()}
            value={index}
            radius={radius}
            textAnchor={textAnchor}
            color={color}
          />
        );
      })}
    </>
  );
};

const Label = (props: {
  x: number;
  y: number;
  text: string;
  value: number;
  radius: number;
  textAnchor: string;
  color: string;
}) => {
  const [x, y] = getPointCoordinates(props.value, props.radius);

  return (
    <text
      x={props.x + x}
      y={props.y + y}
      fontSize={12}
      textAnchor={props.textAnchor}
      fill={props.color}
    >
      {props.text}
    </text>
  );
};

const Lines = (props: {
  x: number;
  y: number;
  numLines: number;
  innerRadius: number;
  outerRadius: number;
  color: string;
}) => {
  const lines = [];
  for (let i = 0; i < props.numLines; i++) {
    lines.push(i / (props.numLines - 1));
  }

  return lines.map((value) => (
    <Line
      x={props.x}
      y={props.y}
      key={value}
      degree={value}
      innerRadius={props.innerRadius}
      outerRadius={props.outerRadius}
      color={props.color}
    />
  ));
};

const Line = (props: {
  x: number;
  y: number;
  degree: number;
  innerRadius: number;
  outerRadius: number;
  color: string;
}) => {
  const [x1, y1] = getPointCoordinates(props.degree, props.innerRadius);
  const [x2, y2] = getPointCoordinates(props.degree, props.outerRadius);

  useEffect(() => {}, [props.degree, props.innerRadius, props.outerRadius]);

  return (
    <line
      x1={props.x + x1}
      y1={props.y + y1}
      x2={props.x + x2}
      y2={props.y + y2}
      vectorEffect={"non-scaling-stroke"}
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      stroke={props.color}
    />
  );
};

const Segments = (props: {
  x: number;
  y: number;
  value: number;
  segments: number;
  innerRadius: number;
  outerRadius: number;
  color: string;
}) => {
  const getSegments = (parts: number, span: number) => {
    const internalParts = parts * span - 1;
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

  const adjustedValue = props.value * props.segments;
  const value = Math.floor(adjustedValue);
  const decimals = (adjustedValue - value) * 0.9 + 0.1;

  return (
    <>
      {getSegments(props.segments, 4).map((segment, index) => (
        <SegmentPolygon
          x={props.x}
          y={props.y}
          key={index}
          from={segment.from}
          to={segment.to}
          outerRadius={props.outerRadius}
          innerRadius={props.innerRadius}
          opacity={index < value ? 1 : index > value ? 0.1 : decimals}
          color={props.color}
        />
      ))}
    </>
  );
};

const SegmentPolygon = (props: {
  x: number;
  y: number;
  from: number;
  to: number;
  outerRadius: number;
  innerRadius: number;
  opacity: number;
  color: string;
}) => {
  const outerRadius = props.outerRadius - 4;
  const innerRadius = props.innerRadius + 4;

  const [x1, y1] = getPointCoordinates(props.from, innerRadius);
  const [x2, y2] = getPointCoordinates(props.from, outerRadius);
  const [x3, y3] = getPointCoordinates(props.to, outerRadius);
  const [x4, y4] = getPointCoordinates(props.to, innerRadius);

  return (
    <polygon
      fill={props.color}
      opacity={props.opacity}
      points={`${props.x + x1},${props.y + y1} ${props.x + x2},${
        props.y + y2
      } ${props.x + x3},${props.y + y3} ${props.x + x4},${props.y + y4}`}
    />
  );
};

const ArcPath = (props: {
  x: number;
  y: number;
  radius: number;
  color: string;
}) => {
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
      stroke={props.color}
      strokeWidth={strokeWidth}
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
