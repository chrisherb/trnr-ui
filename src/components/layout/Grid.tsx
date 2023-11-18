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

  return (
    <div
      className={`grid ${getColStyle(columns)} ${getRowStyle(
        rows
      )} gap-4 h-full ${borderStyle}`}
    >
      {children}
    </div>
  );
};

const getColStyle = (cols: number): string => {
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    case 9:
      return "grid-cols-9";
    case 10:
      return "grid-cols-10";
    case 11:
      return "grid-cols-11";
    case 12:
      return "grid-cols-12";
    default:
      return "";
  }
};

const getRowStyle = (rows: number): string => {
  switch (rows) {
    case 1:
      return "grid-rows-1";
    case 2:
      return "grid-rows-2";
    case 3:
      return "grid-rows-3";
    case 4:
      return "grid-rows-4";
    case 5:
      return "grid-rows-5";
    case 6:
      return "grid-rows-6";
    case 7:
      return "grid-rows-7";
    case 8:
      return "grid-rows-8";
    case 9:
      return "grid-rows-9";
    case 10:
      return "grid-rows-10";
    case 11:
      return "grid-rows-11";
    case 12:
      return "grid-rows-12";
    default:
      return "";
  }
};

export default Grid;
