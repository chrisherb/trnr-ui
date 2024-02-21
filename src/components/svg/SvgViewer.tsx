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
        {getComponent(props.config)}
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
        {getComponent(props.config)}
      </svg>
    </div>
  );
}

function getComponent(config: UIConfig) {
  return config.controls.map((control) => {
    if (isPanel(control)) {
      return <SvgPanel {...control} />;
    } else if (isDial(control)) {
      return <SvgDial {...control} />;
    }
  });
}
