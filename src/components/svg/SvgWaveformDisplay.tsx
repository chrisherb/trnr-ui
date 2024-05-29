import { WaveformDisplay } from "../../ControlModel";
import { Parameter, useParameter } from "../hooks/useParameter";

interface SvgWaveformProps extends WaveformDisplay {
  fontFamily: string;
  fontWeight: string;
  strokeWidth: number;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export function SvgWaveformDisplay({
  mode,
  value = 0.5,
  bipolar,
  strokeWidth,
  ...props
}: SvgWaveformProps) {
  const parameter = bipolar
    ? useParameter(-4, 4, value, props.name, props.suffix, 1)
    : useParameter(0, 4, value, props.name, props.suffix, 1);
  const columnWidth = Math.round(props.width / props.columns);
  const width = props.columns * columnWidth + 6;

  const segmentHeight = Math.round(props.height / props.segments);
  const height = props.segments * segmentHeight;

  return (
    <>
      {(mode === "all" || mode === "static-parts") && (
        <>
          <Indicators
            parameter={parameter}
            {...props}
            width={width}
            height={height - 2}
          />
          <Lines
            {...props}
            width={width}
            height={height - 2}
            strokeWidth={strokeWidth}
          />
          {Array.from(Array(props.columns).keys()).map((i) => {
            return (
              <Segments
                key={i}
                {...props}
                x={props.x + i * columnWidth + 4}
                width={columnWidth - 2}
                height={height}
              />
            );
          })}
        </>
      )}

      {mode === "dynamic-parts" && (
        <Segments
          parameter={parameter}
          {...props}
          width={columnWidth - 2}
          height={height}
        />
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
              fontSize={16}
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

function Lines(props: {
  x: number;
  y: number;
  height: number;
  width: number;
  strokeWidth: number;
}) {
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
        strokeWidth={props.strokeWidth}
      />{" "}
      <line
        x1={x3}
        y1={y3}
        x2={x4}
        y2={y4}
        stroke="url(#primary)"
        strokeWidth={props.strokeWidth}
      />
    </>
  );
}

const Segments = (props: {
  x: number;
  y: number;
  parameter?: Parameter;
  segments: number;
  height: number;
  width: number;
}) => {
  let parameter = props.parameter ? props.parameter : useParameter(0, 1, 0);
  const opacity = parameter.normalizedValue * 0.9 + 0.1;

  const segmentHeight = Math.round(props.height / props.segments);

  debugger;

  return (
    <>
      {Array.from({ length: props.segments }, (_, i) => (
        <rect
          x={props.x}
          y={props.y + segmentHeight * i}
          width={props.width}
          height={segmentHeight - 2}
          fill="url(#secondary)"
          opacity={opacity}
          rx={1}
        />
      ))}
    </>
  );
};
