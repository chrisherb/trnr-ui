import { OptionParameter } from "../hooks/useParameter";
import Stack from "./Stack";

interface RadioProps {
  parameter: OptionParameter;
  size?: "none" | "small" | "medium" | "large";
}

const Radio = ({ parameter, size = "medium" }: RadioProps) => {
  let sizeStyle = "";

  switch (size) {
    case "small":
      sizeStyle = "h-16 w-24";
      break;
    case "medium":
      sizeStyle = "h-20 w-32";
      break;
    case "large":
      sizeStyle = "h-28 w-44";
      break;
    default:
      sizeStyle = "";
  }

  return (
    <Stack header={parameter.name}>
      <div className="flex flex-wrap gap-4 justify-center content-start">
        {parameter.options.map((option: string, index: number) => (
          <div
            key={index}
            className={`grid shrink-0 justify-center rounded-1 border border-1 border-secondary px-2 uppercase select-none cursor-pointer truncate ${sizeStyle} ${
              parameter.options[parameter.value] === option
                ? "opacity-100"
                : "opacity-30"
            }`}
            onClick={() => parameter.setValue(index)}
          >
            <input
              type="radio"
              name="radio"
              className="appearance-none"
              value={option}
              checked={parameter.options[parameter.value] === option}
              onChange={() => parameter.setValue(index)}
            />
            {option}
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default Radio;
