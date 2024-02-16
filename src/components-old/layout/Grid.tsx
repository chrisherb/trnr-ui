import { PropsWithChildren } from "react";

interface Spannable {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}

interface GridProps extends Spannable, PropsWithChildren {
  rows: number;
  columns: number;
  borderEnabled?: boolean;
}

export const Grid = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  rows,
  columns,
  borderEnabled = false,
}: GridProps) => {
  const borderStyle =
    borderEnabled &&
    "rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 px-8";
  return (
    <div
      className={`grow grid gap-x-9 gap-y-2 ${getColStyle(
        columns
      )} ${getRowStyle(rows)} ${borderStyle} ${getSpans(colSpan, rowSpan)}`}
    >
      {children}
    </div>
  );
};

interface GridCellProps extends Spannable, PropsWithChildren {}

export const GridCell = ({
  children,
  colSpan = 1,
  rowSpan = 1,
}: GridCellProps) => {
  return <div className={getSpans(colSpan, rowSpan)}>{children}</div>;
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

const getSpans = (colSpan: number, rowSpan: number) => {
  let colSpanStyle = "";

  switch (colSpan) {
    case 1:
      colSpanStyle = "col-span-1";
      break;
    case 2:
      colSpanStyle = "col-span-2";
      break;
    case 3:
      colSpanStyle = "col-span-3";
      break;
    case 4:
      colSpanStyle = "col-span-4";
      break;
    case 5:
      colSpanStyle = "col-span-5";
      break;
    case 6:
      colSpanStyle = "col-span-6";
  }

  let rowSpanStyle = "";

  switch (rowSpan) {
    case 1:
      rowSpanStyle = "row-span-1";
      break;
    case 2:
      rowSpanStyle = "row-span-2";
      break;
    case 3:
      rowSpanStyle = "row-span-3";
      break;
    case 4:
      rowSpanStyle = "row-span-4";
      break;
    case 5:
      rowSpanStyle = "row-span-5";
      break;
    case 6:
      rowSpanStyle = "row-span-6";
      break;
  }

  return `${colSpanStyle} ${rowSpanStyle}`;
};
