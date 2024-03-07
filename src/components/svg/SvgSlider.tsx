import { Slider } from "../../ControlModel";

interface SvgSliderProps extends Slider {
  fontFamily: string;
  fontWeight: string;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export function SvgSlider(props: SvgSliderProps) {
  return (
    <>
      <Title {...props} />
      <Indicators {...props} />
      <Lines {...props} />
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
}) {
  const x =
    props.orientation === "horizontal"
      ? props.x + props.length / 2
      : props.x + props.width / 2;

  const y = props.orientation === "horizontal" ? props.y : props.y + 40;

  const anchor = props.orientation === "horizontal" ? "middle" : "end";

  return (
    <>
      {Array.from(Array(props.labels).keys()).map((i) => {
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
              x={props.orientation === "horizontal" ? x1 : x1 + 24}
              y={props.orientation === "horizontal" ? y1 - 12 : y1 + 5}
              fontSize={18}
              fontFamily={props.fontFamily}
              fontWeight={props.fontWeight}
              fill="url(#primary)"
              textAnchor={anchor}
            >
              {i}
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
