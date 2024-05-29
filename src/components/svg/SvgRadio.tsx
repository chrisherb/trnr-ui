import { Radio } from "../../ControlModel";

interface SvgRadioProps extends Radio {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  strokeWidth: number;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export const SvgRadio = ({
  mode = "all",
  value = 0.5,
  ...props
}: SvgRadioProps) => {
  const labels = props.labels.split(",");

  const selectedIndex = Math.round(value * (labels.length - 1));

  const getOpacity = (index: number) => {
    if (index === selectedIndex) {
      return 1;
    } else {
      return 0.5;
    }
  };

  return (
    <>
      {(mode === "all" || mode === "dynamic-parts") &&
        labels.map((label, i) => (
          <>
            <rect
              key={i}
              x={props.x + i * (props.width + 8)}
              y={props.y}
              width={props.width}
              height={props.height}
              fill="none"
              stroke="url(#primary)"
              strokeWidth={props.strokeWidth}
              opacity={getOpacity(i)}
              rx={6}
              ry={6}
            />

            <text
              x={props.x + i * (props.width + 8) + props.width / 2}
              y={props.y + props.height / 2 + props.fontSize / 3}
              fontSize={props.fontSize}
              fontFamily={props.fontFamily}
              fontWeight={props.fontWeight}
              opacity={getOpacity(i)}
              fill="url(#primary)"
              textAnchor="middle"
            >
              {label.toUpperCase()}
            </text>
          </>
        ))}
    </>
  );
};
