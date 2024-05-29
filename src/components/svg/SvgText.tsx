import { Text } from "../../ControlModel";

interface TextProps extends Text {
  fontFamily: string;
  fontWeight: string;
  mode: "all" | "static-parts" | "dynamic-parts";
}

export function SvgText(props: TextProps) {
  return (
    <>
      {props.mode !== "dynamic-parts" && (
        <text
          className="text"
          x={props.x}
          y={props.y}
          fontSize={16}
          fontFamily={props.fontFamily}
          fontWeight={props.fontWeight}
          fill="url(#primary)"
        >
          {props.name.toLocaleUpperCase()}
        </text>
      )}
    </>
  );
}
