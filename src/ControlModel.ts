export const CONTROL_TYPES = [
  "Panel",
  "Dial",
  "Slider",
  "Digital",
  "Text",
  "Logo",
  "Meter",
  "Radio",
  "Equalizer",
];
export type ControlType = (typeof CONTROL_TYPES)[number];

export interface UIConfig {
  controls: UIElement[];
  width: number;
  height: number;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  strokeWidth: number;
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
  fontSize: number = 15;
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
  segments: number = 32;
  diameter: number = 85;
  innerDiameterFactor: number = 0.5;
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
  length: number = 100;
  width: number = 25;
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

export class WaveformDisplay implements Control {
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
  exportOrientation: "horizontal" | "vertical" = "horizontal";
  bipolar: boolean = false;
}

export class Radio implements Control {
  [key: string]: any;
  readonly type: ControlType = "Radio";
  name: string = "Radio";
  x: number = 100;
  y: number = 100;
  width: number = 35;
  height: number = 35;
  labels: string = "a,b,c";
  exportResolution: number = 1;
  exportOrientation: "horizontal" | "vertical" = "vertical";
  rows: number = 1;
  gap: number = 8;
  fontSize: number = 15;
  showPanel: boolean = true;
}

export class Equalizer implements Control {
  [key: string]: any;
  readonly type: ControlType = "Equalizer";
  name: string = "Equalizer";
  x: number = 100;
  y: number = 100;
  width: number = 100;
  height: number = 100;
  band: "low" | "mid" | "high" = "low";
  exportResolution: number = 1;
  exportOrientation: "horizontal" | "vertical" = "vertical";
  steps: number = 13;
  labels: number = 5;
  suffix: string = "";
  rangeMin: number = -12;
  rangeMax: number = 12;
  exponent: number = 1;
  bipolar: boolean = true;
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

export function isWaveform(obj: any): obj is WaveformDisplay {
  return obj && typeof obj.type === "string" && obj.type === "Meter";
}

export function isRadio(obj: any): obj is Radio {
  return obj && typeof obj.type === "string" && obj.type === "Radio";
}

export function isEqualizer(obj: any): obj is Equalizer {
  return obj && typeof obj.type === "string" && obj.type === "Equalizer";
}

export function isControl(obj: any): obj is Control {
  return (
    isDial(obj) ||
    isSlider(obj) ||
    isDigital(obj) ||
    isWaveform(obj) ||
    isRadio(obj) ||
    isEqualizer(obj)
  );
}

/**
 * @returns [x, y, width, height, frames]
 */
export function getControlData(
  control: Control
): [number, number, number, number, number] {
  if (isDial(control)) {
    return [
      control.x - control.diameter / 2,
      control.y - control.diameter / 2,
      control.diameter,
      control.diameter,
      control.segments * control.exportResolution + 1,
    ];
  } else if (isSlider(control)) {
    return [
      control.orientation !== "horizontal"
        ? control.x - control.width / 2
        : control.x,
      control.y,
      control.orientation === "horizontal" ? control.length : control.width,

      control.orientation === "horizontal" ? control.width : control.length,
      control.segments * control.exportResolution + 1,
    ];
  } else if (isDigital(control)) {
    const rangeMaxLength = Math.abs(control.rangeMax).toString().length;
    const rangeMinLength = Math.abs(control.rangeMin).toString().length;
    const digits = Math.max(rangeMaxLength, rangeMinLength);
    const signOffset = 16;
    const width = digits * 35 + signOffset;
    return [
      control.x - width / 2 - signOffset,
      control.y,
      width,
      48,
      control.rangeMax - control.exportControl.rangeMin + 1,
    ];
  } else if (isWaveform(control)) {
    return [
      control.x,
      control.y,
      Math.round(control.width / control.columns),
      Math.round(control.height / control.segments),
      1,
    ];
  } else if (isRadio(control)) {
    const numPerRow = Math.ceil(
      control.labels.split(",").length / control.rows
    );
    return [
      control.x - 1,
      control.y - 1,
      numPerRow * (control.width + control.gap),
      control.rows * (control.height + control.gap),
      control.labels.split(",").length,
    ];
  } else if (isEqualizer(control)) {
    return [
      control.x - 1,
      control.y - 1,
      control.width,
      control.height + 4,
      control.steps,
    ];
  } else {
    return [200, 200, control.x, control.y, 1];
  }
}
