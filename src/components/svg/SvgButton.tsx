import { Button } from "../../ControlModel";

interface SvgButtonProps extends Button {
  fontFamily: string;
  fontWeight: string;
  strokeWidth: number;
  mode: "all" | "static-parts" | "dynamic-parts";
  value?: number;
}

export const SvgButton = ({
  mode = "all",
  value = 0.5,
  ...props
}: SvgButtonProps) => {
  const opacity = Math.floor(value) * 0.5 + 0.5;

  return (
    <>
      {(mode === "all" || mode === "dynamic-parts") && (
        <>
          {props.showPanel && (
            <rect
              x={props.x}
              y={props.y}
              width={props.width}
              height={props.height}
              fill="none"
              stroke="url(#primary)"
              strokeWidth={props.strokeWidth}
              opacity={opacity}
              rx={6}
              ry={6}
            />
          )}
          <text
            x={props.x + props.width / 2}
            y={props.y + props.height / 2 + props.fontSize / 3}
            fontSize={props.fontSize}
            fontFamily={props.fontFamily}
            fontWeight={props.fontWeight}
            opacity={opacity}
            fill="url(#primary)"
            textAnchor="middle"
          >
            {props.name.toUpperCase()}
          </text>
        </>
      )}
    </>
  );
};
