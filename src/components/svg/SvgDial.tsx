import { useEffect } from "react";
import { Parameter, useParameter } from "../hooks/useParameter";
import { Dial } from "../../ControlModel";

interface SvgDialProps extends Dial {
  fontFamily: string;
  fontWeight: string;
  strokeWidth: number;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

const SvgDial = ({
  mode = "all",
  value = 0.5,
  bipolar = false,
  ...props
}: SvgDialProps) => {
  const parameter = useParameter(
    props.rangeMin,
    props.rangeMax,
    value,
    props.name,
    props.suffix,
    props.exponent
  );
  const radius = props.diameter / 2;
  const labelRadius = radius + 14;
  const indicatorRadius = radius + 6;
  const outerRadius = radius;
  const innerRadius = radius * props.innerDiameterFactor;

  return (
    <g>
      {(mode === "all" || mode === "static-parts") && (
        <>
          <text
            x={props.x}
            y={props.y - radius - 39}
            fontSize={16}
            fontFamily={props.fontFamily}
            fontWeight={props.fontWeight}
            textAnchor="middle"
            fill="url(#primary)"
          >
            {props.name.toUpperCase()}
          </text>
          <ArcPath radius={outerRadius} {...props} />
          <ArcPath radius={innerRadius} {...props} />
          <Lines
            numLines={props.labels}
            innerRadius={outerRadius}
            outerRadius={indicatorRadius}
            {...props}
          />
          <Labels
            numLabels={props.labels}
            parameter={parameter}
            radius={labelRadius}
            showSuffix={true}
            bipolar={bipolar}
            {...props}
          />
        </>
      )}
      {(mode === "all" || mode === "dynamic-parts") && (
        <Segments
          parameter={parameter}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          bipolar={bipolar}
          {...props}
        />
      )}
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
  bipolar,
}: {
  x: number;
  y: number;
  parameter: Parameter;
  radius: number;
  numLabels: number;
  showSuffix: boolean;
  fontFamily: string;
  fontWeight: string;
  bipolar: boolean;
}) => {
  const labels = [];
  for (let i = 0; i < numLabels; i++) {
    const fraction = i / (numLabels - 1);
    const value = parameter.getDenormalizedValue(fraction);
    const roundedValue = value > 0 ? Math.ceil(value) : Math.floor(value);
    const label = {
      index: fraction,
      name: roundedValue.toString(),
    };
    if (bipolar && roundedValue > 0) {
      label.name = "+" + label.name;
    }
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
      fontSize={16}
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
  strokeWidth: number;
}) => {
  const lines = [];
  for (let i = 0; i < props.numLines; i++) {
    lines.push(i / (props.numLines - 1));
  }

  return lines.map((value, index) => (
    <Line key={index} degree={value} {...props} />
  ));
};

const Line = (props: {
  x: number;
  y: number;
  degree: number;
  innerRadius: number;
  outerRadius: number;
  strokeWidth: number;
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
      strokeLinecap="round"
      strokeWidth={props.strokeWidth}
      stroke="url(#primary)"
    />
  );
};

const Segments = (props: {
  x: number;
  y: number;
  parameter: Parameter;
  segments: number;
  innerRadius: number;
  outerRadius: number;
  strokeWidth: number;
  bipolar: boolean;
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
          outerRadius={props.outerRadius}
          innerRadius={props.innerRadius}
          strokeWidth={props.strokeWidth}
          opacity={props.bipolar ? getBipolarOpacity(index) : getOpacity(index)}
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
  strokeWidth: number;
}) => {
  const outerRadius = props.outerRadius - props.strokeWidth * 2;
  const innerRadius = props.innerRadius + props.strokeWidth * 2;

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

const ArcPath = (props: {
  x: number;
  y: number;
  radius: number;
  strokeWidth: number;
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
      stroke="url(#primary)"
      strokeWidth={props.strokeWidth}
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
