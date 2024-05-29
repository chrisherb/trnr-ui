import { Digital } from "../../ControlModel";
import { useParameter } from "../hooks/useParameter";

interface DigitalProps extends Digital {
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  strokeWidth: number;
  mode: "all" | "static-parts" | "dynamic-parts";
}

const SvgDigital = ({ mode = "all", value = 0.5, ...props }: DigitalProps) => {
  const parameter = useParameter(
    props.rangeMin,
    props.rangeMax,
    value,
    props.name,
    props.suffix,
    props.exponent
  );
  const rangeMaxLength = Math.abs(parameter.rangeMax).toString().length;
  const rangeMinLength = Math.abs(parameter.rangeMin).toString().length;
  const length = Math.max(rangeMaxLength, rangeMinLength);
  const padded = Math.abs(Math.round(parameter.value))
    .toString()
    .padStart(length, " ");
  const digits = padded.split("");

  const bipolar = parameter.rangeMax < 0 || parameter.rangeMin < 0;

  const width = digits.length * 28 + (digits.length - 1) * 2;
  const height = 48;
  const margin = 6;
  const radius = 6;

  return (
    <>
      {(mode === "all" || mode === "static-parts") && (
        <Title {...props} y={props.y - 25} />
      )}
      {(mode === "all" || mode === "dynamic-parts") && bipolar && (
        <PlusMinusSigns
          {...props}
          value={parameter.value}
          x={props.x - width / 2}
        />
      )}
      {(mode === "all" || mode === "static-parts") && (
        <Suffix {...props} x={props.x + 20 + width / 2} y={props.y + 28} />
      )}
      <g transform={`translate(${props.x - width / 2}, ${props.y})`}>
        {(mode === "all" || mode === "static-parts") && (
          <rect
            {...props}
            x={-margin}
            y={-margin}
            width={width + margin * 2 - 1}
            height={height + margin * 2}
            fill="none"
            stroke="url(#primary)"
            rx={radius}
            ry={radius}
          />
        )}
        {(mode === "all" || mode === "dynamic-parts") &&
          digits.map((value, index) => (
            <DigitalNumber x={index * 30} key={index} value={value} />
          ))}
      </g>
    </>
  );
};

export default SvgDigital;

const Title = (props: {
  x: number;
  y: number;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  name: string;
}) => {
  return (
    <text
      x={props.x}
      y={props.y}
      fontSize={props.fontSize}
      fontFamily={props.fontFamily}
      fontWeight={props.fontWeight}
      textAnchor="middle"
      fill="url(#primary)"
    >
      {props.name.toUpperCase()}
    </text>
  );
};

const Suffix = (props: {
  x: number;
  y: number;
  suffix: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
}) => {
  return (
    <text
      x={props.x}
      y={props.y}
      fontSize={props.fontSize}
      fontFamily={props.fontFamily}
      fontWeight={props.fontWeight}
      textAnchor="left"
      fill="url(#primary)"
    >
      {props.suffix}
    </text>
  );
};

const PlusMinusSigns = (props: {
  value: number;
  x: number;
  y: number;
  fontFamily: string;
  fontWeight: string;
}) => {
  return (
    <>
      <text
        x={props.x - 25}
        y={props.y + 20}
        fontSize={24}
        fontFamily={props.fontFamily}
        fontWeight={props.fontWeight}
        textAnchor="middle"
        fill="url(#primary)"
        opacity={props.value > 0 ? 1 : 0.5}
      >
        +
      </text>
      <text
        x={props.x - 25}
        y={props.y + 43}
        fontSize={24}
        fontFamily={props.fontFamily}
        fontWeight={props.fontWeight}
        textAnchor="middle"
        fill="url(#primary)"
        opacity={props.value < 0 ? 1 : 0.5}
      >
        -
      </text>
    </>
  );
};

const DigitalNumber = (props: { x: number; value: string }) => {
  const getSegmentState = (number: string) => {
    switch (number) {
      case "-":
        return [0, 0, 0, 0, 0, 0, 1]; // segments: G
      case "0":
        return [1, 1, 1, 1, 1, 1, 0]; // segments: ABCDEF
      case "1":
        return [0, 1, 1, 0, 0, 0, 0]; // segments: BC
      case "2":
        return [1, 1, 0, 1, 1, 0, 1]; // segments: ABDEG
      case "3":
        return [1, 1, 1, 1, 0, 0, 1]; // segments: ABCDG
      case "4":
        return [0, 1, 1, 0, 0, 1, 1]; // segments: BCFG
      case "5":
        return [1, 0, 1, 1, 0, 1, 1]; // segments: ACDFG
      case "6":
        return [1, 0, 1, 1, 1, 1, 1]; // segments: ACDEFG
      case "7":
        return [1, 1, 1, 0, 0, 0, 0]; // segments: ABC
      case "8":
        return [1, 1, 1, 1, 1, 1, 1]; // segments: ABCDEFG
      case "9":
        return [1, 1, 1, 1, 0, 1, 1]; // segments: ABCDFG
      default:
        return [0, 0, 0, 0, 0, 0, 0]; // segments: none
    }
  };

  const getSegmentOpacity = (state: number) => {
    return state ? 1 : 0.2;
  };

  return (
    <g transform={`translate(${props.x}, 0)`}>
      <path
        d="M 22.754166,2.6458333 20.902083,0.79375033 H 5.5562497 l -1.852083,1.85208297 1.852083,1.852083 H 20.902083 Z"
        id="A"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[0])}
      />
      <path
        d="M 23.8125,3.7041667 21.960417,5.55625 v 15.345834 l 1.852083,1.852083 1.852084,-1.852083 V 5.55625 Z"
        id="B"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[1])}
      />
      <path
        d="m 23.8125,24.870833 -1.852083,1.852084 v 15.345834 l 1.852083,1.852083 1.852084,-1.852083 V 26.722917 Z"
        id="C"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[2])}
      />
      <path
        d="M 22.754166,44.979166 20.902083,43.127083 H 5.5562503 l -1.852083,1.852083 1.852083,1.852083 H 20.902083 Z"
        id="D"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[3])}
      />
      <path
        d="m 2.6458338,24.870833 -1.8520833,1.852084 10e-9,15.345834 1.85208329,1.852083 1.8520834,-1.852083 -1e-7,-15.345834 z"
        id="E"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[4])}
      />
      <path
        d="M 2.6458333,3.7041667 0.79375001,5.55625 l 10e-9,15.345834 1.85208328,1.852083 1.8520834,-1.852083 -1e-7,-15.345834 z"
        id="F"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[5])}
      />
      <path
        d="M 22.754166,23.8125 20.902083,21.960417 H 5.5562502 l -1.852083,1.852083 1.852083,1.852083 H 20.902083 Z"
        id="G"
        fill="url(#secondary)"
        opacity={getSegmentOpacity(getSegmentState(props.value)[6])}
      />
    </g>
  );
};
