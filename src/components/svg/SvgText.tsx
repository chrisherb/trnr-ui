import { Text } from "../../ControlModel";

interface TextProps extends Text {
  fontFamily: string;
  fontWeight: string;
}

export function SvgText(props: TextProps) {
  return (
    <text
      className="text"
      x={props.x}
      y={props.y}
      fontSize={18}
      fontFamily={props.fontFamily}
      fontWeight={props.fontWeight}
      fill="url(#primary)"
    >
      {props.name.toLocaleUpperCase()}
    </text>
  );
}
