import { Logo } from "../../ControlModel";

interface SvgLogoProps extends Logo {
  mode: "all" | "static-parts" | "dynamic-parts";
}

export function SvgLogo(props: SvgLogoProps) {
  const scaleX = props.width / 100;
  const scaleY = props.height / 100;

  return (
    <>
      {props.mode !== "dynamic-parts" && (
        <g
          transform={`translate(${props.x}, ${props.y}) scale(${scaleX}, ${scaleY})`}
          fill="url(#primary)"
        >
          <path d="M 45.454545,9.1433453 27.272727,9.0909089 V 45.454545 H 18.181818 L 18.129383,9.0909089 H -5e-7 V -2.5e-7 H 45.454545 Z" />
          <path d="M 45.454545,54.545454 V 100 H 36.363636 L 9.0909084,68.18182 V 100 H -5e-7 V 54.545454 h 8.801538 L 36.363636,86.363638 V 54.545454 Z" />
          <path d="M 100,54.545454 V 81.818182 H 88.636362 L 100,93.181819 V 100 H 93.181819 L 75,81.818182 H 63.636363 V 100 l -9.090909,-1.9e-5 V 54.545454 Z m -9.09091,9.090909 H 63.636363 v 9.09091 H 90.90909 Z" />
          <path d="M 100,-2.5e-7 V 27.272727 H 88.636362 L 100,38.636364 v 6.818181 H 93.181819 L 75,27.272727 H 63.636363 v 18.181818 l -9.090909,-1.9e-5 V -2.5e-7 Z M 90.90909,9.0909089 H 63.636363 V 18.181818 H 90.90909 Z" />
        </g>
      )}
    </>
  );
}
