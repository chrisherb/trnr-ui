import { Slider } from "../../ControlModel";
import { Parameter, useParameter } from "../hooks/useParameter";

interface SvgSliderProps extends Slider {
  fontFamily: string;
  fontWeight: string;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export function SvgSlider({ value = 0.5, ...props }: SvgSliderProps) {
  const parameter = useParameter(
    props.rangeMin,
    props.rangeMax,
    value,
    props.name,
    props.suffix,
    props.exponent
  );

  return (
    <>
      <Title {...props} />
      <Indicators parameter={parameter} {...props} />
      <Lines {...props} />
      <Segments parameter={parameter} {...props} />
    </>
  );
}

function Title(props: {
  x: number;
  y: number;
  fontFamily: string;
  fontWeight: string;
  name: string;
  length: number;
  width: number;
  orientation: "horizontal" | "vertical";
}) {
  return (
    <text
      x={props.x}
      y={props.y - 46}
      fontSize={18}
      fontFamily={props.fontFamily}
      fontWeight={props.fontWeight}
      textAnchor="middle"
      fill="url(#primary)"
    >
      {props.name.toUpperCase()}
    </text>
  );
}

function Indicators(props: {
  x: number;
  y: number;
  length: number;
  width: number;
  orientation: "horizontal" | "vertical";
  labels: number;
  fontFamily: string;
  fontWeight: string;
  parameter: Parameter;
}) {
  const x =
    props.orientation === "horizontal"
      ? props.x + props.length / 2
      : props.x + props.width / 2;

  const y = props.orientation === "horizontal" ? props.y : props.y + 40;

  const anchor = props.orientation === "horizontal" ? "middle" : "start";

  const labels = [];
  for (let i = 0; i < props.labels; i++) {
    const value = i / (props.labels - 1);
    const label = {
      index: value,
      name: Math.round(props.parameter.getDenormalizedValue(value)).toString(),
    };
    if (i === props.labels - 1) {
      label.name += " " + props.parameter.suffix;
    }
    labels.push(label);
  }

  return (
    <>
      {labels.map((label, i) => {
        let x1, y1, x2, y2;

        const lengthFrac = props.length / (props.labels - 1);

        if (props.orientation === "horizontal") {
          x1 = x + lengthFrac * i - props.length;
          y1 = props.y - 6;
          x2 = x + lengthFrac * i - props.length;
          y2 = props.y;
        } else {
          x1 = x + 6;
          y1 = y + lengthFrac * i - props.width;
          x2 = x;
          y2 = y + lengthFrac * i - props.width;
        }

        return (
          <g key={i}>
            <text
              x={props.orientation === "horizontal" ? x1 : x1 + 12}
              y={props.orientation === "horizontal" ? y1 - 12 : y1 + 5}
              fontSize={18}
              fontFamily={props.fontFamily}
              fontWeight={props.fontWeight}
              fill="url(#primary)"
              textAnchor={anchor}
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
              vectorEffect={"non-scaling-stroke"}
              strokeLinecap="round"
              textAnchor={anchor}
            />
          </g>
        );
      })}
    </>
  );
}

function Lines(props: {
  x: number;
  y: number;
  length: number;
  width: number;
  orientation: string;
}) {
  const x =
    props.orientation === "horizontal"
      ? props.x + props.length / 2
      : props.x - props.width / 2;

  let x1, y1, x2, y2;
  let x3, y3, x4, y4;

  if (props.orientation === "horizontal") {
    // line 1
    x1 = x;
    y1 = props.y;
    x2 = x - props.length;
    y2 = props.y;
    // line 2
    x3 = x;
    y3 = props.y + props.width;
    x4 = x - props.length;
    y4 = props.y + props.width;
  } else {
    // line 1
    x1 = x;
    y1 = props.y;
    x2 = x;
    y2 = props.y + props.length;
    // line 2
    x3 = x + props.width;
    y3 = props.y;
    x4 = x + props.width;
    y4 = props.y + props.length;
  }

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#primary)"
        strokeWidth={2}
      />
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
  length: number;
  width: number;
  orientation: "horizontal" | "vertical";
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

  return (
    <>
      {getSegments(props.segments, 4).map((segment, index) => (
        <SegmentPolygon
          x={props.x}
          y={props.y}
          key={index}
          from={segment.from}
          to={segment.to}
          opacity={props.bipolar ? getBipolarOpacity(index) : getOpacity(index)}
          length={props.length}
          width={props.width}
          orientation={props.orientation}
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
  length: number;
  width: number;
  orientation: "horizontal" | "vertical";
}) => {
  let x1, y1, x2, y2, x3, y3, x4, y4;
  const from = props.from;
  const to = props.to;
  const width = props.width;
  const length = props.length;
  const or = props.orientation;

  if (props.orientation === "horizontal") {
    [x1, y1] = getPointCoordinate(from, 4, length, or);
    [x2, y2] = getPointCoordinate(from, width - 4, length, or);
    [x3, y3] = getPointCoordinate(to, width - 4, length, or);
    [x4, y4] = getPointCoordinate(to, 4, length, or);
  } else {
    [y1, x1] = getPointCoordinate(from, 4 - width / 2, length, or);
    [y2, x2] = getPointCoordinate(from, width / 2 - 4, length, or);
    [y3, x3] = getPointCoordinate(to, width / 2 - 4, length, or);
    [y4, x4] = getPointCoordinate(to, 4 - width / 2, length, or);
  }

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

const getPointCoordinate = (
  value: number,
  width: number,
  length: number,
  orientation: "horizontal" | "vertical"
) => {
  const x = value * length;

  if (orientation === "horizontal") {
    return [x - length / 2, width];
  } else {
    return [x, width];
  }
};
