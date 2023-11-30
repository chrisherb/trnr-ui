import { Dispatch, SetStateAction, useState } from "react";

type Parameter = {
  value: number;
  defaultValue: number;
  normalizedValue: number;
  rangeMin: number;
  rangeMax: number;
  name: string;
  setNormalizedValue: Dispatch<SetStateAction<number>>;
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

  return {
    value: denormalize(normalized),
    normalizedValue: normalized,
    setNormalizedValue: setNormalized,
    defaultValue: defaultValue,
    name: name,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
  };
}
