import { PropsWithChildren } from "react";

interface GridProps extends PropsWithChildren {
  rows: number;
  columns: number;
  borderEnabled?: boolean;
}

const Grid = ({
  children,
  rows,
  columns,
  borderEnabled: hasBorder = false,
}: GridProps) => {
  const borderStyle = hasBorder ? "border-2 rounded-md border-primary p-4" : "";

  let colStyle;

  switch (columns) {
    case 1:
      colStyle = "grid-cols-1";
      break;
    case 2:
      colStyle = "grid-cols-2";
      break;
    case 3:
      colStyle = "grid-cols-3";
      break;
    case 4:
      colStyle = "grid-cols-4";
      break;
  }

  let rowStyle;

  switch (rows) {
    case 1:
      rowStyle = "grid-rows-1";
      break;
    case 2:
      rowStyle = "grid-rows-2";
      break;
    case 3:
      rowStyle = "grid-rows-3";
      break;
    case 4:
      rowStyle = "grid-rows-4";
      break;
  }

  return (
    <div className={`grid ${colStyle} ${rowStyle} gap-4 h-full ${borderStyle}`}>
      {children}
    </div>
  );
};

export default Grid;
