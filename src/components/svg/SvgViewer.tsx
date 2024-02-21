import { UIConfig, isDial, isPanel } from "../../ControlModel";
import SvgDial from "./SvgDial";
import { SvgPanel } from "./SvgPanel";

export function SvgViewer(props: { conf: UIConfig }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        id="svg"
        width={props.conf.width}
        height={props.conf.height}
      >
        <rect width="100%" height="100%" fill={props.conf.backgroundColor} />
        {props.conf.controls.map((control) => {
          if (isPanel(control)) {
            return <SvgPanel {...control} />;
          } else if (isDial(control)) {
            return <SvgDial {...control} />;
          }
        })}
      </svg>
    </div>
  );
}
