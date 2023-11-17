import { InternalControlBaseProps } from "./ControlBase";
import { ExternalValueProps } from "./Value";

export interface ExternalLabelProps extends ExternalValueProps {
  label: string;
  showValueOnLabel?: boolean;
}

export interface InternalLabelProps
  extends ExternalLabelProps,
    InternalControlBaseProps {}

const Label = ({
  label,
  showValueOnLabel: showValue = false,
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  hAlign = "center",
  suffix = "",
}: InternalLabelProps) => {
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
