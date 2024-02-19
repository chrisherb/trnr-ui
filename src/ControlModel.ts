export const CONTROL_TYPES = ["Panel", "Dial"];
export type ControlType = (typeof CONTROL_TYPES)[number];

export interface UIConfig {
  controls: Control[];
  width: number;
  height: number;
}

export interface Control {
  name: ControlType;
  x: number;
  y: number;
  width: number;
  height: number;
}
