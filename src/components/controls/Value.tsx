export interface ExternalValueProps {
  decimals?: number;
  rangeMin?: number;
  rangeMax?: number;
  hAlign?: "left" | "center" | "right";
  suffix?: string;
}

interface InternalValueProps extends ExternalValueProps {
  value: number;
}

const Value = ({
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  hAlign = "center",
  suffix = "",
}: InternalValueProps) => {
  const adjustedValue = value * (rangeMax - rangeMin) + rangeMin;

  const horizontalAlignment =
    hAlign == "left"
      ? "text-left"
      : hAlign == "center"
      ? "text-center"
      : "text-right";

  return (
    <span className={horizontalAlignment}>
      {adjustedValue.toFixed(decimals) + " " + suffix}
    </span>
  );
};

export default Value;
