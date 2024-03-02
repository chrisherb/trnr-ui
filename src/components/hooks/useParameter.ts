import { useState } from "react";
import { clamp } from "../util/Math";

export interface Parameter {
  value: number;
  normalizedValue: number;
  rangeMin: number;
  rangeMax: number;
  name: string;
  setValue: (value: number) => void;
  getDenormalizedValue: (value: number) => number;
  setNormalizedValue: (value: number) => void;
  suffix: string;
}

export function useParameter(
  rangeMin: number,
  rangeMax: number,
  defaultValue: number,
  name: string = "",
  suffix: string = "",
  exponent: number = 1
): Parameter {
  const normalize = (value: number) => {
    return (value - rangeMin) / (rangeMax - rangeMin);
  };

  const denormalize = (value: number) => {
    return Math.pow(value, exponent) * (rangeMax - rangeMin) + rangeMin;
  };

  const [normalized, setNormalized] = useState(defaultValue);

  return {
    value: denormalize(normalized),
    normalizedValue: normalized,
    setValue: (value: number) => setNormalized(clamp(normalize(value))),
    getDenormalizedValue: (value: number) => denormalize(value),
    setNormalizedValue: (value: number) => setNormalized(clamp(value)),
    name: name,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
    suffix: suffix,
  };
}

export interface OptionParameter extends Parameter {
  options: string[];
}

export function useOptionParameter(
  options: string[],
  defaultValue: number,
  name: string = ""
): OptionParameter {
  return {
    options,
    ...useParameter(0, options.length - 1, defaultValue, name),
  };
}
