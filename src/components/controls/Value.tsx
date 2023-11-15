export interface ValueProps {
  value: number;
  decimals?: number;
  rangeMin?: number;
  rangeMax?: number;
  hAlign?: "left" | "center" | "right";
  suffix?: string;
}

const Value = ({
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  hAlign = "center",
  suffix = "",
}: ValueProps) => {
  const adjustedValue = value * (rangeMax - rangeMin) + rangeMin;

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
      {adjustedValue.toFixed(decimals) + " " + suffix}
    </div>
  );
};

export default Value;
