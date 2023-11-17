import ControlBase, {
  ExternalControlBaseProps,
  InternalControlBaseProps,
} from "./ControlBase";
import { ExternalLabelProps } from "./Label";

export interface ExternalBaseDialProps {
  size: number;
  strokeWidth?: number;
  gear?: number;
  lineOffset?: number;
}

interface InternalDialBaseProps
  extends ExternalBaseDialProps,
    InternalControlBaseProps {}

const DialBase = ({
  size,
  value,
  strokeWidth = 2,
  lineOffset = 0.1,
}: InternalDialBaseProps) => {
  const internalValue = value ? value : 0;

  const radius = size / 2 - strokeWidth;
  const gap = 0.25;

  // Calculate the inner coordinates of the line
  const innerRadius = (size / 2) * lineOffset;
  const adjustedValue1 = internalValue * (1 - gap);
  const theta1 = 2 * Math.PI * (adjustedValue1 + 0.25 + gap / 2);
  const lineX1 = size / 2 + innerRadius * Math.cos(theta1);
  const lineY1 = size / 2 + innerRadius * Math.sin(theta1);

  // Calculate the outer coordinates of the line
  const adjustedValue2 = internalValue * (1 - gap);
  const theta2 = 2 * Math.PI * (adjustedValue2 + 0.25 + gap / 2);
  const lineX2 = size / 2 + radius * Math.cos(theta2);
  const lineY2 = size / 2 + radius * Math.sin(theta2);

  return (
    <div className="w-32 h-32">
      <svg xmlns="<http://www.w3.org/2000/svg>" viewBox={`0 0 ${size} ${size}`}>
        <circle
          vectorEffect={"non-scaling-stroke"}
          className="stroke-primary"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <line
          vectorEffect={"non-scaling-stroke"}
          className="stroke-secondary"
          x1={lineX1}
          y1={lineY1}
          x2={lineX2}
          y2={lineY2}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

interface DialProps
  extends ExternalBaseDialProps,
    ExternalLabelProps,
    ExternalControlBaseProps {}

const Dial = ({ ...props }: DialProps) => {
  return (
    <div>
      <ControlBase {...props}>
        <DialBase {...props} />
      </ControlBase>
    </div>
  );
};

export default Dial;
