import { useEffect, useState } from "react";

interface DialProps {
  size: number;
  value: number;
  onChange: (progress: number) => void;
  strokeWidth?: number;
  gear?: number;
  gap?: number;
  ringGap?: boolean;
  lineOffset?: number;
  className?: string;
}

const Dial = ({
  size,
  value,
  onChange,
  strokeWidth = 3,
  gear = 200,
  gap = 0.25,
  ringGap = false,
  lineOffset = 0.1,
}: DialProps) => {
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const gapSize = gap * circumference;
  const adjustedCircumference = ringGap
    ? circumference - gapSize
    : circumference;
  const dashOffset = adjustedCircumference * (1 - value);

  // Calculate the rotation angle to center the gap at the bottom
  const rotationAngle = (gap * 360) / 2;
  const rotation = 90 + rotationAngle;

  // Calculate the inner coordinates of the line
  const innerRadius = (size / 2) * lineOffset;
  const adjustedValue1 = value * (1 - gap);
  const theta1 = 2 * Math.PI * (adjustedValue1 + 0.25 + gap / 2);
  const lineX1 = size / 2 + innerRadius * Math.cos(theta1);
  const lineY1 = size / 2 + innerRadius * Math.sin(theta1);

  // Calculate the outer coordinates of the line
  const adjustedValue2 = value * (1 - gap);
  const theta2 = 2 * Math.PI * (adjustedValue2 + 0.25 + gap / 2);
  const lineX2 = size / 2 + radius * Math.cos(theta2);
  const lineY2 = size / 2 + radius * Math.sin(theta2);

  const [origin, setOrigin] = useState(0);
  const [tempVal, setTempVal] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startDrag = (ev: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOrigin(ev.clientY);
    setTempVal(value);
  };
  const endDrag = () => setDragging(false);

  const handleDrag = (ev: MouseEvent) => {
    if (dragging) {
      const relativeDrag = (ev.clientY - origin) / gear;

      const clamp = (val: number) => {
        if (val > 1) return 1;
        else if (val < 0) return 0;
        return val;
      };

      onChange(clamp(tempVal - relativeDrag));
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", endDrag);
  });

  useEffect(() => {
    if (dragging) {
      window.onmousemove = handleDrag;
    } else {
      window.onmousemove = null;
    }
  });

  return (
    <div onMouseDown={startDrag} className="active:cursor-none">
      <svg height={size} width={size} xmlns="<http://www.w3.org/2000/svg>">
        <circle
          className="stroke-trnr-secondary"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={`${adjustedCircumference} ${circumference}`}
          transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
        {ringGap && (
          <circle
            className="stroke-trnr-primary"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={`${adjustedCircumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
            strokeLinecap="round"
          />
        )}
        <line
          className="stroke-trnr-primary"
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

export default Dial;
