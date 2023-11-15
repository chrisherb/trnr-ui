interface LabelProps {
  label: string;
  showValue?: boolean;
  value?: number;
  decimals?: number;
  rangeMin?: number;
  rangeMax?: number;
  hAlign?: "left" | "center" | "right";
  suffix?: string;
}

const Label = ({
  label,
  showValue = false,
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  hAlign = "center",
  suffix = "",
}: LabelProps) => {
  let adjustedValue = 0;

  if (showValue && value)
    adjustedValue = value * (rangeMax - rangeMin) + rangeMin;

  const horizontalAlignment =
    hAlign == "left"
      ? "text-left"
      : hAlign == "center"
      ? "text-center"
      : "text-right";

  return (
    <div
      className={`text-trnr-primary select-none w-32 ${horizontalAlignment}`}
    >
      {!showValue && label}
      {showValue &&
        value != undefined &&
        adjustedValue.toFixed(decimals) + " " + suffix}
    </div>
  );
};

export default Label;
