import DragListener from "../util/DragListener";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  polarity?: "uni" | "bi";
  style?: "bar" | "line";
  orientation?: "horizontal" | "vertical";
  width: number;
  gear?: number;
  onMouseDown?: (mouseDown: boolean) => void;
}

const Slider = ({
  value,
  onChange,
  polarity = "uni",
  style = "bar",
  orientation = "horizontal",
  width,
  gear = 400,
  onMouseDown,
}: SliderProps) => {
  let barWidth = "";

  switch (width) {
    case 16:
      barWidth = orientation == "horizontal" ? "h-16" : "w-16";
      break;
    case 32:
      barWidth = orientation == "horizontal" ? "h-32" : "w-32";
      break;
  }

  return (
    <DragListener
      value={value}
      onChange={onChange}
      gear={gear}
      onMouseDown={onMouseDown}
      orientation={orientation}
    >
      <div
        className={`border-2 rounded-md border-trnr-secondary p-1 ${barWidth}`}
      >
        <svg
          xmlns="<http://www.w3.org/2000/svg>"
          style={{ width: "100%", height: "100%" }}
        >
          {style == "bar" && (
            <rect
              className="fill-trnr-primary stroke-trnr-primary"
              rx={2}
              ry={2}
              stroke="2"
              strokeLinejoin="round"
              width={orientation == "horizontal" ? `${value * 100}%` : "100%"}
              height={orientation == "vertical" ? `${value * 100}%` : "100%"}
              y={orientation == "vertical" ? `${value * 100}%` : 0}
            />
          )}
        </svg>
      </div>
    </DragListener>
  );
};

export default Slider;
