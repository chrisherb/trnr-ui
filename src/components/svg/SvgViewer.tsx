import { Dial, UIConfig, isDial, isPanel } from "../../ControlModel";
import SvgDial from "./SvgDial";
import { SvgPanel } from "./SvgPanel";

export function SvgViewer(props: { config: UIConfig }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        id="svg"
        width={props.config.width}
        height={props.config.height}
      >
        <rect width="100%" height="100%" fill={props.config.backgroundColor} />
        <Honeycomb
          primary={props.config.primaryColor}
          secondary={props.config.secondaryColor}
        />
        {getComponents(props.config)}
      </svg>
    </div>
  );
}

export function SvgExportViewer(props: {
  config: UIConfig;
  exportControl: Dial;
}) {
  const viewBox = `${
    props.exportControl.x - props.exportControl.diameter / 2
  } ${props.exportControl.y - props.exportControl.diameter / 2} ${
    props.exportControl.diameter
  } ${props.exportControl.diameter}`;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        id="svg"
        width={props.exportControl.diameter}
        viewBox={viewBox}
      >
        <Honeycomb
          primary={props.config.primaryColor}
          secondary={props.config.secondaryColor}
        />
        {getComponents(props.config, true)}
      </svg>
    </div>
  );
}

function getComponents(config: UIConfig, isExport = false) {
  return config.controls.map((control, index) => {
    if (isPanel(control)) {
      return <SvgPanel {...control} key={index} />;
    } else if (isDial(control)) {
      return (
        <SvgDial
          {...control}
          key={index}
          isExport={isExport}
          fontFamily={config.fontFamily}
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
