import { useEffect } from "react";
import { Parameter, useParameter } from "../hooks/useParameter";
import { Dial } from "../../ControlModel";

const strokeWidth = 2;

interface SvgDialProps extends Dial {
  fontFamily: string;
  fontWeight: string;
  isExport?: boolean;
}

const SvgDial = ({
  x,
  y,
  name,
  diameter,
  labels,
  segments,
  showSuffix,
  fontFamily,
  fontWeight,
  rangeMin,
  rangeMax,
  isExport = false,
}: SvgDialProps) => {
  const parameter = useParameter(rangeMin, rangeMax, 5);
  const radius = diameter / 2;
  const labelRadius = radius * 1.2;
  const outerRadius = radius * 1.06;
  const middleRadius = radius;
  const innerRadius = radius * 0.6;

  return (
    <g>
      {!isExport && (
        <>
          <text
            x={x}
            y={y - radius * 1.5}
            fontSize={18}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            textAnchor="middle"
            fill="url(#primary)"
          >
            {name}
          </text>
          <ArcPath x={x} y={y} radius={middleRadius} />
          <ArcPath x={x} y={y} radius={innerRadius} />
          <Lines
            x={x}
            y={y}
            numLines={labels}
            innerRadius={middleRadius}
            outerRadius={outerRadius}
          />
          <Labels
            x={x}
            y={y}
            numLabels={labels}
            parameter={parameter}
            radius={labelRadius}
            showSuffix={showSuffix}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
          />
        </>
      )}
      <Segments
        x={x}
        y={y}
        value={parameter.normalizedValue}
        segments={segments}
        innerRadius={innerRadius}
        outerRadius={middleRadius}
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
  fontFamily,
  fontWeight,
}: {
  x: number;
  y: number;
  parameter: Parameter;
  radius: number;
  numLabels: number;
  showSuffix: boolean;
  fontFamily: string;
  fontWeight: string;
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
            key={index}
            text={name.toString()}
            value={index}
            radius={radius}
            textAnchor={textAnchor}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
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
  fontFamily: string;
  fontWeight: string;
}) => {
  const [x, y] = getPointCoordinates(props.value, props.radius);

  return (
    <text
      x={props.x + x}
      y={props.y + y}
      fontSize={18}
      fontFamily={props.fontFamily}
      fontWeight={props.fontWeight}
      textAnchor={props.textAnchor}
      fill="url(#primary)"
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
}) => {
  const lines = [];
  for (let i = 0; i < props.numLines; i++) {
    lines.push(i / (props.numLines - 1));
  }

  return lines.map((value, index) => (
    <Line
      x={props.x}
      y={props.y}
      key={index}
      degree={value}
      innerRadius={props.innerRadius}
      outerRadius={props.outerRadius}
    />
  ));
};

const Line = (props: {
  x: number;
  y: number;
  degree: number;
  innerRadius: number;
  outerRadius: number;
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
      stroke="url(#primary)"
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
}) => {
  const outerRadius = props.outerRadius - 4;
  const innerRadius = props.innerRadius + 4;

  const [x1, y1] = getPointCoordinates(props.from, innerRadius);
  const [x2, y2] = getPointCoordinates(props.from, outerRadius);
  const [x3, y3] = getPointCoordinates(props.to, outerRadius);
  const [x4, y4] = getPointCoordinates(props.to, innerRadius);

  return (
    <polygon
      fill="url(#primary)"
      opacity={props.opacity}
      points={`${props.x + x1},${props.y + y1} ${props.x + x2},${
        props.y + y2
      } ${props.x + x3},${props.y + y3} ${props.x + x4},${props.y + y4}`}
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
      stroke="url(#primary)"
      strokeWidth={strokeWidth}
      fill="none"
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
