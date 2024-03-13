import { Panel } from "../../ControlModel";

interface SvgPanelProps extends Panel {
  mode: "all" | "static-parts" | "dynamic-parts";
}

export function SvgPanel(props: SvgPanelProps) {
  const radius = 6;
  return (
    <>
      {props.mode !== "dynamic-parts" && (
        <rect
          x={props.x}
          y={props.y}
          width={props.width}
          height={props.height}
          fill="none"
          stroke="url(#primary)"
          strokeWidth={2}
          rx={radius}
          ry={radius}
        />
      )}
    </>
  );
}
