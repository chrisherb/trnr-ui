import ControlBase, { ExternalControlBaseProps } from "./ControlBase";

interface DigitalProps extends ExternalControlBaseProps {
  size?: "small" | "medium" | "large";
  showSuffix?: boolean;
}

const Digital = ({
  parameter,
  size = "medium",
  showSuffix = true,
  ...props
}: DigitalProps) => {
  let sizeStyle = "";

  switch (size) {
    case "small":
      sizeStyle = "h-16";
      break;
    case "medium":
      sizeStyle = "h-20";
      break;
    case "large":
      sizeStyle = "h-28";
      break;
    default:
      sizeStyle = "";
  }

  const rangeMaxLength = Math.abs(parameter.rangeMax).toString().length;
  const rangeMinLength = Math.abs(parameter.rangeMin).toString().length;
  const length = Math.max(rangeMaxLength, rangeMinLength);
  const padded = Math.abs(Math.round(parameter.value))
    .toString()
    .padStart(length, " ");
  const digits = padded.split("");

  const bipolar = parameter.rangeMax < 0 || parameter.rangeMin < 0;

  return (
    <ControlBase parameter={parameter} {...props} header={parameter.name}>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2 justify-center text-3xl select-none w-4">
          {bipolar && (
            <>
              <span
                className={`h-5 leading-4 -m-[1px] ${
                  parameter.value > 0 ? "" : "opacity-20"
                }`}
              >
                +
              </span>
              <span
                className={`h-5 leading-4 ${
                  parameter.value < 0 ? "" : "opacity-20"
                }`}
              >
                -
              </span>
            </>
          )}
        </div>
        <div
          className={`flex fill-secondary justify-center gap-1 rounded-1 border border-1 border-secondary p-2 ${sizeStyle} cursor-pointer`}
        >
          {digits.map((value, index) => (
            <DigitalNumber key={index} value={value} />
          ))}
        </div>
        <div className="flex flex-col justify-center select-none w-4">
          {showSuffix && (
            <span className="h-5 leading-none">{parameter.suffix}</span>
          )}
        </div>
      </div>
    </ControlBase>
  );
};

export default Digital;

const DigitalNumber = (props: { value: string }) => {
  const styleOn = "fill-primary";
  const styleOff = "fill-primary opacity-20";

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

  const getSegmentStyle = (state: number) => {
    return state ? styleOn : styleOff;
  };

  return (
    <svg
      viewBox="0 0 26.458333 47.625"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 22.754166,2.6458333 20.902083,0.79375033 H 5.5562497 l -1.852083,1.85208297 1.852083,1.852083 H 20.902083 Z"
        id="A"
        className={getSegmentStyle(getSegmentState(props.value)[0])}
      />
      <path
        d="M 23.8125,3.7041667 21.960417,5.55625 v 15.345834 l 1.852083,1.852083 1.852084,-1.852083 V 5.55625 Z"
        id="B"
        className={getSegmentStyle(getSegmentState(props.value)[1])}
      />
      <path
        d="m 23.8125,24.870833 -1.852083,1.852084 v 15.345834 l 1.852083,1.852083 1.852084,-1.852083 V 26.722917 Z"
        id="C"
        className={getSegmentStyle(getSegmentState(props.value)[2])}
      />
      <path
        d="M 22.754166,44.979166 20.902083,43.127083 H 5.5562503 l -1.852083,1.852083 1.852083,1.852083 H 20.902083 Z"
        id="D"
        className={getSegmentStyle(getSegmentState(props.value)[3])}
      />
      <path
        d="m 2.6458338,24.870833 -1.8520833,1.852084 10e-9,15.345834 1.85208329,1.852083 1.8520834,-1.852083 -1e-7,-15.345834 z"
        id="E"
        className={getSegmentStyle(getSegmentState(props.value)[4])}
      />
      <path
        d="M 2.6458333,3.7041667 0.79375001,5.55625 l 10e-9,15.345834 1.85208328,1.852083 1.8520834,-1.852083 -1e-7,-15.345834 z"
        id="F"
        className={getSegmentStyle(getSegmentState(props.value)[5])}
      />
      <path
        d="M 22.754166,23.8125 20.902083,21.960417 H 5.5562502 l -1.852083,1.852083 1.852083,1.852083 H 20.902083 Z"
        id="G"
        className={getSegmentStyle(getSegmentState(props.value)[6])}
      />
    </svg>
  );
};
