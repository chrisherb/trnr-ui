import { useSize } from "../hooks/useSize";

interface RadioProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  size?: "small" | "medium" | "large";
}

const Radio = ({ value, onChange, options, size = "medium" }: RadioProps) => {
  const sizeStyle = useSize(size);

  return (
    <div className="flex flex-wrap gap-4 justify-center content-start">
      {options.map((option: string, index: number) => (
        <div
          key={index}
          className={`grid shrink-0 justify-center rounded-1 border border-1 border-secondary px-2 uppercase cursor-pointer truncate ${sizeStyle} ${
            value === option ? "opacity-100" : "opacity-30"
          }`}
          onClick={() => onChange(option)}
        >
          <input
            type="radio"
            name="radio"
            className="appearance-none"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </div>
      ))}
    </div>
  );
};

export default Radio;
