import { Panel } from "../../ControlModel";

export function SvgPanel(props: Panel) {
  const radius = 6;
  return (
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
  );
}
