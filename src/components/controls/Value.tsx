import { InternalControlBaseProps } from "./ControlBase";

export interface ExternalValueProps {
  decimals?: number;
  rangeMin?: number;
  rangeMax?: number;
  hAlign?: "left" | "center" | "right";
  suffix?: string;
}

export interface InternalValueProps
  extends ExternalValueProps,
    InternalControlBaseProps {}

const Value = ({
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  hAlign = "center",
  suffix = "",
}: InternalValueProps) => {
  const internalValue = value ? value : 0;

  const adjustedValue = internalValue * (rangeMax - rangeMin) + rangeMin;

  const horizontalAlignment =
    hAlign == "left"
      ? "text-left"
      : hAlign == "center"
      ? "text-center"
      : "text-right";

  return (
    <div className={`text-secondary select-none w-32 ${horizontalAlignment}`}>
      {adjustedValue.toFixed(decimals) + " " + suffix}
    </div>
  );
};

export default Value;
