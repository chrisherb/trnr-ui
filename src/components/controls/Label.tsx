import { ExternalValueProps } from "./Value";

export interface ExternalLabelProps extends ExternalValueProps {
  label: string;
  showValueOnLabel?: boolean;
}

interface InternalLabelProps extends ExternalLabelProps {
  value: number;
}

const Label = ({
  label,
  showValueOnLabel = false,
  value,
  decimals = 2,
  rangeMin = 0,
  rangeMax = 10,
  hAlign = "center",
  suffix = "",
}: InternalLabelProps) => {
  let adjustedValue = 0;

  if (showValueOnLabel && value)
    adjustedValue = value * (rangeMax - rangeMin) + rangeMin;

  const horizontalAlignment =
    hAlign == "left"
      ? "text-left"
      : hAlign == "center"
      ? "text-center"
      : "text-right";

  return (
    <div className={`text-secondary select-none ${horizontalAlignment}`}>
      {!showValueOnLabel && label}
      {showValueOnLabel &&
        value != undefined &&
        adjustedValue.toFixed(decimals) + " " + suffix}
    </div>
  );
};

export default Label;
