import { UIConfig } from "../ControlModel";

export function SvgViewer(props: { conf: UIConfig }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg width={props.conf.width} height={props.conf.height}>
        <rect width="100%" height="100%" fill="black" />
        {props.conf.controls.map((control) => {
          if (control.name === "Panel") {
            return (
              <rect
                x={control.x}
                y={control.y}
                width={control.width}
                height={control.height}
                fill="none"
                stroke="red"
                rx={5}
                ry={5}
              />
            );
          }
        })}
      </svg>
    </div>
  );
}
