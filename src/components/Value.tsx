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
  return <span>{(value * rangeMax).toFixed(decimals) + " " + suffix}</span>;
};

export default Value;
