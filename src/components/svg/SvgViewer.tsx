import {
  Control,
  UIConfig,
  UIElement,
  getControlData,
  isDial,
  isDigital,
  isLogo,
  isWaveform,
  isPanel,
  isSlider,
  isText,
  isRadio,
  isEqualizer,
} from "../../ControlModel";
import SvgDial from "./SvgDial";
import SvgDigital from "./SvgDigital";
import { SvgLogo } from "./SvgLogo";
import { SvgWaveformDisplay } from "./SvgWaveformDisplay";
import { SvgPanel } from "./SvgPanel";
import { SvgSlider } from "./SvgSlider";
import { SvgText } from "./SvgText";
import { SvgRadio } from "./SvgRadio";
import { SvgEqualizer } from "./SvgEqualizer";

export function SvgViewer(props: {
  config: UIConfig;
  mode: "all" | "static-parts" | "dynamic-parts";
}) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.config.width}
      height={props.config.height}
    >
      <rect width="100%" height="100%" fill={props.config.backgroundColor} />
      <Honeycomb
        primary={props.config.primaryColor}
        secondary={props.config.secondaryColor}
        opacity={props.config.honeycombOpacity}
      />
      {getComponents(props.config, props.mode)}
    </svg>
  );
}

export function SvgControlViewer(props: {
  config: UIConfig;
  exportControl: Control;
  orientation: "horizontal" | "vertical";
}) {
  const [x, y, width, height, frames] = getControlData(props.exportControl);

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.orientation === "horizontal" ? width * frames : width}
      height={props.orientation === "vertical" ? height * frames : height}
    >
      {Array.from(Array(frames).keys()).map((i) => {
        return (
          <svg
            width={width}
            height={height}
            y={props.orientation === "vertical" ? i * height : 0}
            x={props.orientation === "horizontal" ? i * width : 0}
            viewBox={`${x} ${y} ${width} ${height}`}
            key={i}
          >
            <Honeycomb
              primary={props.config.primaryColor}
              secondary={props.config.secondaryColor}
              opacity={props.config.honeycombOpacity}
            />
            {getComponent(
              props.exportControl,
              0,
              props.config.fontFamily,
              props.config.fontWeight,
              props.config.fontSize,
              props.config.strokeWidth,
              "dynamic-parts",
              i / (frames - 1)
            )}
          </svg>
        );
      })}
    </svg>
  );
}

function getComponents(
  config: UIConfig,
  mode: "all" | "static-parts" | "dynamic-parts",
  value: number = 0.5
) {
  return config.controls.map((control, index) =>
    getComponent(
      control,
      index,
      config.fontFamily,
      config.fontWeight,
      config.fontSize,
      config.strokeWidth,
      mode,
      value
    )
  );
}

function getComponent(
  control: UIElement,
  index: number,
  fontFamily: string,
  fontWeight: string,
  fontSize: number,
  strokeWidth: number,
  mode: "all" | "static-parts" | "dynamic-parts",
  value: number = 0.5
) {
  if (isPanel(control)) {
    return (
      <SvgPanel
        {...control}
        key={index}
        mode={mode}
        strokeWidth={strokeWidth}
      />
    );
  } else if (isDial(control)) {
    return (
      <SvgDial
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        mode={mode}
        value={value}
      />
    );
  } else if (isDigital(control)) {
    return (
      <SvgDigital
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        mode={mode}
        value={value}
      />
    );
  } else if (isText(control)) {
    return (
      <SvgText
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        mode={mode}
      />
    );
  } else if (isLogo(control)) {
    return <SvgLogo {...control} key={index} mode={mode} />;
  } else if (isSlider(control)) {
    return (
      <SvgSlider
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        mode={mode}
        value={value}
      />
    );
  } else if (isWaveform(control)) {
    return (
      <SvgWaveformDisplay
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        mode={mode}
        value={1}
      />
    );
  } else if (isRadio(control)) {
    return (
      <SvgRadio
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        strokeWidth={strokeWidth}
        mode={mode}
        value={value}
      />
    );
  } else if (isEqualizer(control)) {
    return (
      <SvgEqualizer
        {...control}
        key={index}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontSize={fontSize}
        strokeWidth={strokeWidth}
        mode={mode}
        value={value}
      />
    );
  }
}

function Honeycomb(props: {
  primary: string;
  secondary: string;
  opacity: number;
}) {
  return (
    <>
      <defs>
        <pattern
          id="primary"
          x="0"
          y="0"
          width="7"
          height="12.25"
          patternUnits="userSpaceOnUse"
        >
          <rect width="7" height="12.25" fill={props.primary}></rect>
          <path
            transform="scale(0.25)"
            d="M 12.980469 0 L 12.980469 7.5 L 0 15 L 0 33.509766 L 12.980469 41 L 12.980469 49 L 15 49 L 15 41 L 28 33.5 L 28 15 L 15 7.5 L 15 0 L 12.980469 0 z M 13.990234 9.25 L 26.990234 16.75 L 26.990234 31.75 L 13.990234 39.25 L 1 31.75 L 1 16.75 L 13.990234 9.25 z "
            fill="black"
            opacity={props.opacity}
          />
        </pattern>
        <pattern
          id="secondary"
          x="0"
          y="0"
          width="7"
          height="12.25"
          patternUnits="userSpaceOnUse"
        >
          <rect width="7" height="12.25" fill={props.secondary}></rect>
          <path
            transform="scale(0.25)"
            d="M 12.980469 0 L 12.980469 7.5 L 0 15 L 0 33.509766 L 12.980469 41 L 12.980469 49 L 15 49 L 15 41 L 28 33.5 L 28 15 L 15 7.5 L 15 0 L 12.980469 0 z M 13.990234 9.25 L 26.990234 16.75 L 26.990234 31.75 L 13.990234 39.25 L 1 31.75 L 1 16.75 L 13.990234 9.25 z "
            fill="black"
            opacity={props.opacity}
          />
        </pattern>
      </defs>
    </>
  );
}
