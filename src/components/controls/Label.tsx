import { ValuePropsBase } from "./Value";

export interface LabelPropsBase extends ValuePropsBase {
  label: string;
  showValue?: boolean;
}

interface LabelProps extends LabelPropsBase {
  value?: number;
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
    <div className={`text-secondary select-none w-32 ${horizontalAlignment}`}>
      {!showValue && label}
      {showValue &&
        value != undefined &&
        adjustedValue.toFixed(decimals) + " " + suffix}
    </div>
  );
};

export default Label;
