import { Equalizer } from "../../ControlModel";
import { Parameter, useParameter } from "../hooks/useParameter";

interface SvgEqualizerProps extends Equalizer {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  strokeWidth: number;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export function SvgEqualizer({ value = 0.5, ...props }: SvgEqualizerProps) {
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
      {(props.mode === "all" || props.mode === "static-parts") && (
        <>
          <Title {...props} />
          <Labels parameter={parameter} {...props} />
        </>
      )}
      {(props.mode === "all" || props.mode === "dynamic-parts") && (
        <Band value={value} {...props} />
      )}
    </>
  );
}
function Title(props: {
  x: number;
  y: number;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  name: string;
  width: number;
}) {
  return (
    <text
      x={props.x + props.width / 2}
      y={props.y - 30}
      fontSize={props.fontSize}
      fontFamily={props.fontFamily}
      fontWeight={props.fontWeight}
      textAnchor="middle"
      fill="url(#primary)"
    >
      {props.name.toUpperCase()}
    </text>
  );
}

function Band(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  steps: number;
  strokeWidth: number;
  value: number;
  band: "low" | "mid" | "high";
}) {
  const segmentHeight = props.height / (props.steps - 1);
  const segmentWidth = props.width / props.steps;
  const gapSize = 4;

  const middleIndex = Math.round(props.steps / 2 - 1);
  const adjustedValue = props.value * (props.steps - 1);
  const selectedIndex = Math.round(adjustedValue);
  const decimals = adjustedValue - selectedIndex;

  const getOpacity = (index: number) => {
    let output = 0;

    if (index > middleIndex) {
      if (index > selectedIndex) {
        output = 0;
      } else {
        output = 1;
      }
      if (index === selectedIndex) {
        output += decimals;
      }
    } else {
      if (index < selectedIndex) {
        output = 0;
      } else {
        output = 1;
      }
      if (index === selectedIndex - 1) {
        output -= decimals;
      }
    }

    if (index === middleIndex) {
      output = 1;
    }

    return output;
  };

  return (
    <>
      {[...Array(props.steps)].map((_, i) => {
        const index = props.steps - 1 - i;

        let adjustedIndex = 0;
        let gap = 0;

        if (index === (props.steps - 1) / 2) {
        } else if (index < props.steps / 2) {
          adjustedIndex = index;
          gap = gapSize;
        } else if (index > props.steps / 2) {
          adjustedIndex = props.steps - index - 1;
          gap = -gapSize;
        }

        let x1, y1, x2, y2, x3, y3;

        if (props.band === "low") {
          x1 = props.x;
          y1 = props.y + index * segmentHeight;
          x2 = props.x + props.width / 2;
          y2 = y1;
          x3 = props.x + props.width - adjustedIndex * segmentWidth;
          y3 = props.y + props.height / 2 - gap;
        } else if (props.band === "mid") {
          x1 = props.x + adjustedIndex * segmentWidth;
          y1 = props.y + props.height / 2 - gap;
          x2 = props.x + props.width / 2;
          y2 = props.y + index * segmentHeight;
          x3 = props.x + props.width - adjustedIndex * segmentWidth;
          y3 = props.y + props.height / 2 - gap;
        } else if (props.band === "high") {
          x1 = props.x + adjustedIndex * segmentWidth;
          y1 = props.y + props.height / 2 - gap;
          x2 = props.x + props.width / 2;
          y2 = props.y + index * segmentHeight;
          x3 = props.x + props.width;
          y3 = y2;
        }

        return (
          <path
            key={i}
            d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`}
            strokeWidth={props.strokeWidth}
            stroke="url(#primary)"
            strokeLinecap="round"
            fill="none"
            opacity={getOpacity(i) * 0.8 + 0.2}
          />
        );
      })}
    </>
  );
}

function Labels(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  parameter: Parameter;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  strokeWidth: number;
  labels: number;
  rangeMin: number;
  rangeMax: number;
  exponent: number;
  name: string;
  suffix: string;
  bipolar: boolean;
  band: "low" | "mid" | "high";
}) {
  const labels = [];
  for (let i = props.labels - 1; i >= 0; i--) {
    const fraction = i / (props.labels - 1);
    const value = props.parameter.getDenormalizedValue(fraction);
    const roundedValue = value > 0 ? Math.ceil(value) : Math.floor(value);
    const label = {
      index: fraction,
      name: roundedValue.toString(),
    };
    if (props.bipolar && roundedValue > 0) {
      label.name = "+" + label.name;
    }
    if (i === props.labels - 1) {
      label.name += " " + props.parameter.suffix;
    }

    labels.push(label);
  }

  const segmentHeight = props.height / (props.labels - 1);

  let x: number;
  switch (props.band) {
    case "low":
      x = props.x - 6;
      break;
    case "high":
      x = props.x + props.width + 6 + props.fontSize * 1.5;
      break;
  }

  return (
    <>
      {props.band !== "mid" &&
        labels.map(({ index, name }, i) => {
          const y = props.y + i * segmentHeight + props.fontSize / 3;
          return (
            <text
              key={index}
              x={x}
              y={y}
              fontSize={props.fontSize}
              fontFamily={props.fontFamily}
              fontWeight={props.fontWeight}
              fill="url(#primary)"
              textAnchor={"end"}
              strokeLinecap="round"
            >
              {name}
            </text>
          );
        })}
    </>
  );
}
