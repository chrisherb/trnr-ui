import { UIConfig, isDial, isPanel } from "../../ControlModel";
import SvgDial from "./SvgDial";
import { SvgPanel } from "./SvgPanel";

export function SvgViewer(props: { conf: UIConfig }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg width={props.conf.width} height={props.conf.height}>
        <rect width="100%" height="100%" fill="black" />
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
