interface ValueProps {
  value: number;
  decimals?: number;
  rangeMin?: number;
  rangeMax?: number;
  suffix?: string;
}

const Value = ({
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  suffix = "",
}: ValueProps) => {
  const adjustedValue = value * (rangeMax - rangeMin) + rangeMin;

  return (
    <span className="text-trnr-primary">
      {adjustedValue.toFixed(decimals) + " " + suffix}
    </span>
  );
};

export default Value;
