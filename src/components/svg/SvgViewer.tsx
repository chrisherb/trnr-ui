import {
  Control,
  Dial,
  Digital,
  Slider,
  UIConfig,
  isDial,
  isDigital,
  isLogo,
  isPanel,
  isSlider,
  isText,
} from "../../ControlModel";
import SvgDial from "./SvgDial";
import SvgDigital from "./SvgDigital";
import { SvgLogo } from "./SvgLogo";
import { SvgPanel } from "./SvgPanel";
import { SvgSlider } from "./SvgSlider";
import { SvgText } from "./SvgText";

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
      />
      {getComponents(props.config, props.mode)}
    </svg>
  );
}

export function SvgControlViewer(props: {
  config: UIConfig;
  exportControl: Control;
}) {
  if (isDial(props.exportControl)) {
    return (
      <SvgDialViewer
        config={props.config}
        exportControl={props.exportControl}
      />
    );
  } else if (isDigital(props.exportControl)) {
    return (
      <SvgDigitalViewer
        config={props.config}
        exportControl={props.exportControl}
      />
    );
  } else if (isSlider(props.exportControl)) {
    return (
      <SvgSliderViewer
        config={props.config}
        exportControl={props.exportControl}
      />
    );
  }
}

export function SvgDialViewer(props: {
  config: UIConfig;
  exportControl: Dial;
}) {
  const viewBox = `${
    props.exportControl.x - props.exportControl.diameter / 2
  } ${props.exportControl.y - props.exportControl.diameter / 2} ${
    props.exportControl.diameter
  } ${props.exportControl.diameter}`;

  const frames =
    props.exportControl.segments * props.exportControl.exportResolution + 1;

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.exportControl.diameter}
      height={frames * props.exportControl.diameter}
    >
      {Array.from(Array(frames).keys()).map((i) => {
        return (
          <svg
            width={props.exportControl.diameter}
            height={props.exportControl.diameter}
            y={i * props.exportControl.diameter}
            viewBox={viewBox}
            key={i}
          >
            <Honeycomb
              primary={props.config.primaryColor}
              secondary={props.config.secondaryColor}
            />
            {getComponents(props.config, "dynamic-parts", i / (frames - 1))}
          </svg>
        );
      })}
    </svg>
  );
}

export function SvgDigitalViewer(props: {
  config: UIConfig;
  exportControl: Digital;
}) {
  const rangeMaxLength = Math.abs(props.exportControl.rangeMax).toString()
    .length;
  const rangeMinLength = Math.abs(props.exportControl.rangeMin).toString()
    .length;
  const digits = Math.max(rangeMaxLength, rangeMinLength);

  const signOffset = 16;

  const width = digits * 35 + signOffset;
  const height = 48;

  const viewBox = `${props.exportControl.x - width / 2 - signOffset} ${
    props.exportControl.y
  } ${width} ${height}`;

  const frames =
    props.exportControl.rangeMax - props.exportControl.rangeMin + 1;

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={frames * height}
    >
      {Array.from(Array(frames).keys()).map((i) => {
        return (
          <svg
            width={width}
            height={height}
            y={i * height}
            viewBox={viewBox}
            key={i}
          >
            <Honeycomb
              primary={props.config.primaryColor}
              secondary={props.config.secondaryColor}
            />
            {getComponents(props.config, "dynamic-parts", i / (frames - 1))}
          </svg>
        );
      })}
    </svg>
  );
}

const SvgSliderViewer = (props: {
  config: UIConfig;
  exportControl: Slider;
}) => {
  const frames =
    props.exportControl.segments * props.exportControl.exportResolution + 1;

  const orientation = props.exportControl.orientation;
  const width =
    orientation === "horizontal"
      ? props.exportControl.length
      : props.exportControl.width;
  const height =
    orientation === "horizontal"
      ? props.exportControl.width
      : props.exportControl.length;

  const viewBox = `${props.exportControl.x - width / 2} ${
    props.exportControl.y
  } ${width} ${height}`;

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={frames * height}
    >
      {Array.from(Array(frames).keys()).map((i) => {
        return (
          <svg
            width={width}
            height={height}
            y={i * height}
            viewBox={viewBox}
            key={i}
          >
            <Honeycomb
              primary={props.config.primaryColor}
              secondary={props.config.secondaryColor}
            />
            {getComponents(props.config, "dynamic-parts", i / (frames - 1))}
          </svg>
        );
      })}
    </svg>
  );
};

function getComponents(
  config: UIConfig,
  mode: "all" | "static-parts" | "dynamic-parts",
  value: number = 0.5
) {
  return config.controls.map((control, index) => {
    if (isPanel(control)) {
      return <SvgPanel {...control} key={index} />;
    } else if (isDial(control)) {
      return (
        <SvgDial
          {...control}
          key={index}
          fontFamily={config.fontFamily}
          fontWeight={config.fontWeight}
          mode={mode}
          value={value}
        />
      );
    } else if (isDigital(control)) {
      return (
        <SvgDigital
          {...control}
          key={index}
          fontFamily={config.fontFamily}
          fontWeight={config.fontWeight}
          mode={mode}
          value={value}
        />
      );
    } else if (isText(control)) {
      return (
        <SvgText
          {...control}
          key={index}
          fontFamily={config.fontFamily}
          fontWeight={config.fontWeight}
        />
      );
    } else if (isLogo(control)) {
      return <SvgLogo {...control} key={index} />;
    } else if (isSlider(control)) {
      return (
        <SvgSlider
          {...control}
          key={index}
          fontFamily={config.fontFamily}
          fontWeight={config.fontWeight}
          mode={mode}
          value={value}
        />
      );
    }
  });
}

function Honeycomb(props: { primary: string; secondary: string }) {
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
            opacity={0.5}
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
            opacity={0.5}
          />
        </pattern>
      </defs>
    </>
  );
}
