export const CONTROL_TYPES = ["Panel", "Dial", "Digital", "Text", "Logo"];
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
  [key: string]: any;
  x: number;
  y: number;
}

export interface Control extends Element {
  rangeMin: number;
  rangeMax: number;
  exponent: number;
  suffix: string;
  exportResolution: number;
}

export class Panel implements Element {
  readonly type: ControlType = "Panel";
  name: string = "Panel";
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
}

export class Text implements Element {
  readonly type: ControlType = "Text";
  name: string = "Text";
  x: number = 100;
  y: number = 100;
}

export class Logo implements Element {
  readonly type: ControlType = "Logo";
  x: number = 0;
  y: number = 0;
  width: number = 25;
  height: number = 25;
}

export class Dial implements Control {
  [key: string]: any;
  readonly type: ControlType = "Dial";
  exponent: number = 1;
  name: string = "Dial";
  x: number = 200;
  y: number = 200;
  diameter: number = 200;
  segments: number = 48;
  labels: number = 5;
  suffix: string = "";
  rangeMin: number = 0;
  rangeMax: number = 10;
  exportResolution: number = 1;
  bipolar: boolean = false;
}

export class Digital implements Control {
  [key: string]: any;
  readonly type: ControlType = "Digital";
  exponent: number = 1;
  name: string = "Digital";
  x: number = 100;
  y: number = 100;
  diameter: number = 100;
  suffix: string = "";
  rangeMin: number = 0;
  rangeMax: number = 10;
  exportResolution: number = 1;
}

export function isControl(obj: any): obj is Control {
  return (
    obj &&
    typeof obj.type === "string" &&
    (obj.type === "Dial" || obj.type === "Digital")
  );
}

export function isPanel(obj: any): obj is Panel {
  return obj && typeof obj.type === "string" && obj.type === "Panel";
}

export function isDial(obj: any): obj is Dial {
  return obj && typeof obj.type === "string" && obj.type === "Dial";
}

export function isDigital(obj: any): obj is Digital {
  return obj && typeof obj.type === "string" && obj.type === "Digital";
}

export function isText(obj: any): obj is Text {
  return obj && typeof obj.type === "string" && obj.type === "Text";
}

export function isLogo(obj: any): obj is Logo {
  return obj && typeof obj.type === "string" && obj.type === "Logo";
}
