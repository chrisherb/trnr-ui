import { useContext, useEffect } from "react";
import ControlBase, { ExternalControlBaseProps } from "./ControlBase";
import { TrnrContext } from "../layout/Trnr";
import { Parameter } from "../hooks/useParameter";

const SVG_SIZE = 100;
const SVG_OFFSET = 10;

interface DialProps extends ExternalControlBaseProps {
  parameter: Parameter;
  segments?: number;
  labels?: number;
  showSuffix?: boolean;
}

const Dial = ({
  parameter,
  labels = 5,
  segments = 48,
  showSuffix = true,
  ...props
}: DialProps) => {
  const context = useContext(TrnrContext);
  const strokeWidth = context.thickness || 0;
  const radius = SVG_SIZE / 2 - strokeWidth;
  const outer = radius - strokeWidth * 2;
  const labelRadius = outer * 0.9;
  const outerRadius = outer * 0.85;
  const middleRadius = outer * 0.8;
  const innerRadius = outer * 0.45;

  return (
    <ControlBase
      parameter={parameter}
      polarity="uni"
      header={parameter.name}
      {...props}
    >
      <svg
        className="w-full h-full select-none"
        xmlns="<http://www.w3.org/2000/svg>"
        viewBox={`${SVG_OFFSET * -1} 0 ${
          SVG_SIZE + SVG_OFFSET * 2
        } ${SVG_SIZE}`}
      >
        <ArcPath x={SVG_SIZE / 2} y={SVG_SIZE / 2} radius={middleRadius} />
        <ArcPath x={SVG_SIZE / 2} y={SVG_SIZE / 2} radius={innerRadius} />
        <Segments
          value={parameter.normalizedValue}
          segments={segments}
          innerRadius={innerRadius}
          outerRadius={middleRadius}
        />
        <Lines
          numLines={labels}
          innerRadius={middleRadius}
          outerRadius={outerRadius}
        />
        <Labels
          numLabels={labels}
          parameter={parameter}
          radius={labelRadius}
          showSuffix={showSuffix}
        />
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

const Labels = ({
  numLabels,
  parameter,
  radius,
  showSuffix,
}: {
  parameter: Parameter;
  radius: number;
  numLabels: number;
  showSuffix: boolean;
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
            key={name}
            text={name.toString()}
            value={index}
            radius={radius}
            textAnchor={textAnchor}
          />
        );
      })}
    </>
  );
};

const Label = (props: {
  text: string;
  value: number;
  radius: number;
  textAnchor: string;
}) => {
  const [x, y] = getPointCoordinates(props.value, props.radius);

  return (
    <text
      x={x}
      y={y}
      fontSize={6}
      textAnchor={props.textAnchor}
      className="fill-secondary"
    >
      {props.text}
    </text>
  );
};

const Lines = (props: {
  numLines: number;
  innerRadius: number;
  outerRadius: number;
}) => {
  const lines = [];
  for (let i = 0; i < props.numLines; i++) {
    lines.push(i / (props.numLines - 1));
  }

  return lines.map((value) => (
    <Line
      key={value}
      degree={value}
      innerRadius={props.innerRadius}
      outerRadius={props.outerRadius}
    />
  ));
};

const Line = (props: {
  degree: number;
  innerRadius: number;
  outerRadius: number;
}) => {
  const [x1, y1] = getPointCoordinates(props.degree, props.innerRadius);
  const [x2, y2] = getPointCoordinates(props.degree, props.outerRadius);

  useEffect(() => {}, [props.degree, props.innerRadius, props.outerRadius]);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
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
  const outerRadius = props.outerRadius - context.thickness! * 12;
  const innerRadius = props.innerRadius + context.thickness! * 12;

  const [x1, y1] = getPointCoordinates(props.from, innerRadius);
  const [x2, y2] = getPointCoordinates(props.from, outerRadius);
  const [x3, y3] = getPointCoordinates(props.to, outerRadius);
  const [x4, y4] = getPointCoordinates(props.to, innerRadius);

  return (
    <polygon
      className={`fill-secondary`}
      style={{ opacity: props.opacity }}
      points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
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
