import { Panel } from "../../ControlModel";

export function SvgPanel(props: Panel) {
  return (
    <rect
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      fill="none"
      stroke="red"
      strokeWidth={2}
      rx={5}
      ry={5}
    />
  );
}
