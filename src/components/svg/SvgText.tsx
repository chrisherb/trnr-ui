import { Text } from "../../ControlModel";

interface TextProps extends Text {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
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
          fontSize={props.fontSize}
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
