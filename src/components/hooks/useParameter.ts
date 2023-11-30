import { useState } from "react";
import { clamp } from "../util/Math";

export type Parameter = {
  value: number;
  normalizedValue: number;
  rangeMin: number;
  rangeMax: number;
  name: string;
  setNormalizedValue: (value: number) => void;
  reset: () => void;
};

export function useParameter(
  rangeMin: number,
  rangeMax: number,
  defaultValue: number,
  name: string = ""
): Parameter {
  const normalize = (value: number) => {
    return (value - rangeMin) / (rangeMax - rangeMin);
  };

  const denormalize = (value: number) => {
    return value * (rangeMax - rangeMin) + rangeMin;
  };

  const [normalized, setNormalized] = useState(normalize(defaultValue));

  const setNormalizedValue = (value: number) => {
    setNormalized(clamp(value));
  };

  const resetToDefault = () => {
    setNormalized(normalize(defaultValue));
  };

  return {
    value: denormalize(normalized),
    normalizedValue: normalized,
    setNormalizedValue: setNormalizedValue,
    reset: resetToDefault,
    name: name,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
  };
}
