import { Panel } from "../../ControlModel";

export function SvgPanel(props: { panel: Panel }) {
  return (
    <rect
      x={props.panel.x}
      y={props.panel.y}
      width={props.panel.width}
      height={props.panel.height}
      fill="none"
      stroke="red"
      rx={5}
      ry={5}
    />
  );
}
