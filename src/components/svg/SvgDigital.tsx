import { Digital } from "../../ControlModel";
import { useParameter } from "../hooks/useParameter";

interface DigitalProps extends Digital {
  fontFamily: string;
  fontWeight: string;
  isExport?: boolean;
}

const SvgDigital = ({
  x,
  y,
  name,
  suffix,
  rangeMin,
  rangeMax,
  exponent,
  fontFamily,
  fontWeight,
}: DigitalProps) => {
  const parameter = useParameter(rangeMin, rangeMax, 5, name, suffix, exponent);
  const rangeMaxLength = Math.abs(parameter.rangeMax).toString().length;
  const rangeMinLength = Math.abs(parameter.rangeMin).toString().length;
  const length = Math.max(rangeMaxLength, rangeMinLength);
  const padded = Math.abs(Math.round(parameter.value))
    .toString()
    .padStart(length, " ");
  const digits = padded.split("");

  const bipolar = parameter.rangeMax < 0 || parameter.rangeMin < 0;

  const width = digits.length * 30;

  return (
    <>
      <text
        x={x}
        y={y - 20}
        fontSize={18}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        textAnchor="middle"
        fill="url(#primary)"
      >
        {name.toUpperCase()}
      </text>
      {bipolar && (
        <PlusMinusSigns
          value={parameter.value}
          x={x - width / 2}
          y={y}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
        />
      )}
      <text
        x={x + 25 + width / 2}
        y={y + 28}
        fontSize={18}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        textAnchor="middle"
        fill="url(#primary)"
      >
        {suffix}
      </text>
      <g transform={`translate(${x - width / 2}, ${y})`}>
        <rect
          x={-5}
          y={-5}
          width={width + 7}
          height={58}
          fill="none"
          stroke="url(#primary)"
          strokeWidth={2}
          rx={5}
          ry={5}
        />
        {digits.map((value, index) => (
          <DigitalNumber x={index * 30} key={index} value={value} />
        ))}
      </g>
    </>
  );
};

export default SvgDigital;

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
