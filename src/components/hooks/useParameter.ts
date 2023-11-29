import { Dispatch, SetStateAction, useState } from "react";

type Parameter<T> = {
  value: T;
  defaultValue: T;
  name: string;
  setValue: Dispatch<SetStateAction<T>>;
};

export function useParameter<T = number>(
  defaultValue: T,
  name: string = ""
): Parameter<T> {
  const [value, setValue] = useState(defaultValue);

  return {
    value: value,
    defaultValue: defaultValue,
    name: name,
    setValue,
  };
}
