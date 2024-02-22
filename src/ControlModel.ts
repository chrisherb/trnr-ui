export const CONTROL_TYPES = ["Panel", "Dial"];
export type ControlType = (typeof CONTROL_TYPES)[number];

export interface UIConfig {
  controls: Element[];
  width: number;
  height: number;
  fontFamily: string;
  fontWeight: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Element {
  readonly type: ControlType;
  name: string;
  x: number;
  y: number;
}

export interface Control extends Element {
  rangeMin: number;
  rangeMax: number;
}

export class Panel implements Element {
  readonly type: ControlType = "Panel";
  name: string = "Panel";
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
}

export class Dial implements Control {
  readonly type: ControlType = "Dial";
  name: string = "Dial";
  x: number = 0;
  y: number = 0;
  diameter: number = 100;
  segments: number = 48;
  labels: number = 5;
  showSuffix: boolean = false;
  rangeMin: number = 0;
  rangeMax: number = 10;
}

export function isControl(obj: any): obj is Control {
  return (
    obj &&
    typeof obj.type === "string" &&
    (obj.type === "Dial" || obj.type === "Panel")
  );
}

export function isPanel(obj: any): obj is Panel {
  return obj && typeof obj.type === "string" && obj.type === "Panel";
}

export function isDial(obj: any): obj is Dial {
  return obj && typeof obj.type === "string" && obj.type === "Dial";
}
