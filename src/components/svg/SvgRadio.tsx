import { Radio } from "../../ControlModel";

interface SvgRadioProps extends Radio {
  fontFamily: string;
  fontWeight: string;
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

  const numPerRow = Math.ceil(labels.length / props.rows);
  let rowCount = 0;
  let colCount = 0;
  const gap = props.gap;

  return (
    <>
      {(mode === "all" || mode === "dynamic-parts") &&
        labels.map((label, i) => {
          if (i > 0) {
            if (i % numPerRow === 0) {
              rowCount += 1;
              colCount = 0;
            } else {
              colCount += 1;
            }
          }

          const adjustedWidth = props.width + gap;
          const adjustedHeight = props.height + gap;

          return (
            <>
              <rect
                key={i}
                x={props.x + colCount * adjustedWidth}
                y={props.y + rowCount * adjustedHeight}
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
                x={props.x + colCount * adjustedWidth + props.width / 2}
                y={
                  props.y +
                  rowCount * adjustedHeight +
                  props.height / 2 +
                  props.fontSize / 3
                }
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
          );
        })}
    </>
  );
};
