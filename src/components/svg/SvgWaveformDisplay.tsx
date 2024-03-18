import { WaveformDisplay } from "../../ControlModel";
import { Parameter, useParameter } from "../hooks/useParameter";

interface SvgMeterProps extends WaveformDisplay {
  fontFamily: string;
  fontWeight: string;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export function SvgWaveformDisplay({
  mode,
  value = 0.5,
  ...props
}: SvgMeterProps) {
  const parameter = useParameter(-4, 4, value, props.name, props.suffix, 1);
  const columnWidth = Math.round(props.width / props.columns);
  const width = props.columns * columnWidth + 6;

  return (
    <>
      {(mode === "all" || mode === "static-parts") && (
        <>
          <Indicators parameter={parameter} {...props} width={width} />
          <Lines {...props} width={width} />
        </>
      )}
      {mode === "all" &&
        Array.from(Array(props.columns).keys()).map((i) => {
          return (
            <Segments
              key={i}
              parameter={parameter}
              {...props}
              x={props.x + i * columnWidth + 4}
              width={columnWidth - 2}
            />
          );
        })}
      {mode === "dynamic-parts" && (
        <Segments parameter={parameter} {...props} width={columnWidth} />
      )}
    </>
  );
}

function Indicators(props: {
  x: number;
  y: number;
  height: number;
  width: number;
  labels: number;
  fontFamily: string;
  fontWeight: string;
  parameter: Parameter;
}) {
  const x = props.x;
  const y = props.y;

  const labels = [];
  for (let i = 0; i < props.labels; i++) {
    const index = i / (props.labels - 1);

    const absolute = Math.abs(props.parameter.getDenormalizedValue(index));
    const value = 4 - absolute;
    const log = value === 0 ? 0 : Math.pow(2, value);

    const label = {
      index: index,
      name: log >= 16 ? "-inf" : Math.round(log * -1.5),
    };
    if (i === props.labels - 1) {
      label.name += " " + props.parameter.suffix;
    }
    labels.push(label);
  }

  labels.reverse();

  return (
    <>
      {labels.map((label, i) => {
        let x1, y1, x2, y2;

        const lengthFrac = props.height / (props.labels - 1);

        x1 = x - 6;
        y1 = y + lengthFrac * i;
        x2 = x;
        y2 = y + lengthFrac * i;

        return (
          <g key={i}>
            <text
              x={x1 - 12}
              y={y1 + 5}
              fontSize={18}
              fontFamily={props.fontFamily}
              fontWeight={props.fontWeight}
              fill="url(#primary)"
              textAnchor="end"
            >
              {label.name}
            </text>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={2}
              stroke="url(#primary)"
              strokeLinecap="round"
            />
            <line
              x1={x1 + props.width + 6}
              y1={y1}
              x2={x2 + props.width + 6}
              y2={y2}
              strokeWidth={2}
              stroke="url(#primary)"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </>
  );
}

function Lines(props: { x: number; y: number; height: number; width: number }) {
  const x = props.x;

  let x1, y1, x2, y2;
  let x3, y3, x4, y4;
  // line 1
  x1 = x;
  y1 = props.y;
  x2 = x;
  y2 = props.y + props.height;
  // line 2
  x3 = x + props.width;
  y3 = props.y;
  x4 = x + props.width;
  y4 = props.y + props.height;

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#primary)"
        strokeWidth={2}
      />{" "}
      <line
        x1={x3}
        y1={y3}
        x2={x4}
        y2={y4}
        stroke="url(#primary)"
        strokeWidth={2}
      />
    </>
  );
}

const Segments = (props: {
  x: number;
  y: number;
  parameter: Parameter;
  segments: number;
  bipolar: boolean;
  height: number;
  width: number;
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

  const adjustedValue = props.parameter.normalizedValue * props.segments;
  const value = Math.floor(adjustedValue);
  const decimals = (adjustedValue - value) * 0.9 + 0.1;
  const midPoint = Math.floor(
    props.parameter.getNormalizedValue(0) * props.segments
  );

  const getOpacity = (index: number) => {
    if (index < value) {
      return 1;
    } else if (index > value) {
      return 0.1;
    } else {
      return decimals;
    }
  };

  const getBipolarOpacity = (index: number) => {
    // if index is below 0
    if (index < midPoint) {
      // indices below the value are dark
      if (index < value) return 0.1;
      // rest is lit
      else return 1;
    }
    // if index is above 0
    else if (index >= midPoint) {
      // indices above the value are dark
      if (index > value - 1) return 0.1;
      // values above index are dark
      else return 1;
    }
    return 0.1;
  };

  const segments = getSegments(props.segments, 4);

  segments.reverse();

  return (
    <>
      {segments.map((segment, index) => (
        <SegmentPolygon
          x={props.x}
          y={props.y}
          key={index}
          from={segment.from}
          to={segment.to}
          opacity={props.bipolar ? getBipolarOpacity(index) : getOpacity(index)}
          height={props.height}
          width={props.width}
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
  opacity: number;
  width: number;
  height: number;
}) => {
  let x1, y1, x2, y2, x3, y3, x4, y4;
  const from = props.from;
  const to = props.to;
  const width = props.width;
  const length = props.height;

  [y1, x1] = getPointCoordinate(from, 0, length);
  [y2, x2] = getPointCoordinate(from, width, length);
  [y3, x3] = getPointCoordinate(to, width, length);
  [y4, x4] = getPointCoordinate(to, 0, length);

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

const getPointCoordinate = (value: number, width: number, length: number) => {
  const x = value * length;
  return [x, width];
};
