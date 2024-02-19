export const CONTROL_TYPES = ["Panel", "Dial"];
export type ControlType = (typeof CONTROL_TYPES)[number];

export interface UIConfig {
  controls: Control[];
  width: number;
  height: number;
}

export interface Control {
  name: string;
  type: ControlType;
  x: number;
  y: number;
}

export class Panel implements Control {
  type: string = "Panel";
  name: string = "Panel";
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
}

export class Dial implements Control {
  type: string = "Dial";
  name: string = "Dial";
  x: number = 0;
  y: number = 0;
  radius: number = 100;
}

export function isPanel(obj: any): obj is Panel {
  return obj && typeof obj.type === "string" && obj.type === "Panel";
}

export function isDial(obj: any): obj is Dial {
  return obj && typeof obj.type === "string" && obj.type === "Dial";
}
