export const CONTROL_TYPES = [
  "Panel",
  "Dial",
  "Slider",
  "Digital",
  "Text",
  "Logo",
  "Meter",
];
export type ControlType = (typeof CONTROL_TYPES)[number];

export interface UIConfig {
  controls: UIElement[];
  width: number;
  height: number;
  fontFamily: string;
  fontWeight: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  honeycombOpacity: number;
}

export interface UIElement {
  readonly type: ControlType;
  [key: string]: any;
  x: number;
  y: number;
}

export interface Control extends UIElement {
  name: string;
  exportResolution: number;
  exportOrientation: "horizontal" | "vertical";
}

export class Panel implements UIElement {
  readonly type: ControlType = "Panel";
  name: string = "Panel";
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
}

export class Text implements UIElement {
  readonly type: ControlType = "Text";
  name: string = "Text";
  x: number = 100;
  y: number = 100;
}

export class Logo implements UIElement {
  readonly type: ControlType = "Logo";
  x: number = 0;
  y: number = 0;
  width: number = 25;
  height: number = 25;
}

export class Dial implements Control {
  [key: string]: any;
  readonly type: ControlType = "Dial";
  name: string = "Dial";
  x: number = 200;
  y: number = 200;
  exponent: number = 1;
  segments: number = 48;
  diameter: number = 200;
  labels: number = 5;
  suffix: string = "";
  rangeMin: number = 0;
  rangeMax: number = 10;
  exportResolution: number = 1;
  bipolar: boolean = false;
  exportOrientation: "horizontal" | "vertical" = "vertical";
}

export class Slider implements Control {
  [key: string]: any;
  readonly type: ControlType = "Slider";
  name: string = "Slider";
  x: number = 150;
  y: number = 100;
  rangeMin: number = 0;
  rangeMax: number = 10;
  exponent: number = 1;
  segments: number = 20;
  labels: number = 5;
  suffix: string = "";
  exportResolution: number = 1;
  length: number = 200;
  width: number = 40;
  orientation: "horizontal" | "vertical" = "horizontal";
  bipolar: boolean = false;
  exportOrientation: "horizontal" | "vertical" = "vertical";
}

export class Digital implements Control {
  [key: string]: any;
  readonly type: ControlType = "Digital";
  name: string = "Digital";
  x: number = 100;
  y: number = 100;
  exponent: number = 1;
  diameter: number = 100;
  suffix: string = "";
  rangeMin: number = 0;
  rangeMax: number = 10;
  exportResolution: number = 1;
  exportOrientation: "horizontal" | "vertical" = "vertical";
}

export class Meter implements Control {
  [key: string]: any;
  readonly type: ControlType = "Meter";
  name: string = "Meter";
  x: number = 100;
  y: number = 100;
  width: number = 100;
  height: number = 100;
  segments: number = 10;
  columns: number = 10;
  labels: number = 5;
  suffix: string = "";
  exponent: number = 1;
  exportResolution: number = 1;
  bipolar: boolean = false;
  exportOrientation: "horizontal" | "vertical" = "horizontal";
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

export function isSlider(obj: any): obj is Slider {
  return obj && typeof obj.type === "string" && obj.type === "Slider";
}

export function isMeter(obj: any): obj is Meter {
  return obj && typeof obj.type === "string" && obj.type === "Meter";
}

export function isControl(obj: any): obj is Control {
  return isDial(obj) || isSlider(obj) || isDigital(obj) || isMeter(obj);
}

export function getControlData(control: Control): {
  x: number;
  y: number;
  width: number;
  height: number;
  frames: number;
} {
  if (isDial(control)) {
    return {
      width: control.diameter,
      height: control.diameter,
      x: control.x - control.diameter / 2,
      y: control.y - control.diameter / 2,
      frames: control.segments * control.exportResolution + 1,
    };
  } else if (isSlider(control)) {
    return {
      width:
        control.orientation === "horizontal" ? control.length : control.width,
      height:
        control.orientation === "horizontal" ? control.width : control.length,
      x: control.x,
      y: control.y,
      frames: control.segments * control.exportResolution + 1,
    };
  } else if (isDigital(control)) {
    const rangeMaxLength = Math.abs(control.rangeMax).toString().length;
    const rangeMinLength = Math.abs(control.rangeMin).toString().length;
    const digits = Math.max(rangeMaxLength, rangeMinLength);
    const signOffset = 16;
    const width = digits * 35 + signOffset;
    return {
      x: control.x - width / 2 - signOffset,
      y: control.y,
      width: width,
      height: 48,
      frames: control.rangeMax - control.exportControl.rangeMin + 1,
    };
  } else if (isMeter(control)) {
    return {
      width: control.width / control.columns,
      height: control.height,
      x: control.x,
      y: control.y,
      frames: control.segments * control.exportResolution + 1,
    };
  } else {
    return {
      width: 200,
      height: 200,
      x: control.x,
      y: control.y,
      frames: 1,
    };
  }
}
