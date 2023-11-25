import { PropsWithChildren } from "react";
import Stack, { StackProps } from "../controls/Stack";

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
    borderEnabled && "border-2 rounded-global border-primary p-4";

  return (
    <div
      className={`grid ${getColStyle(columns)} ${getRowStyle(
        rows
      )} h-full gap-x-7 ${borderStyle} ${getSpans(colSpan, rowSpan)} gap-y-2`}
    >
      {children}
    </div>
  );
};

interface GridCellProps extends Spannable, StackProps {}

export const GridCell = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  ...props
}: GridCellProps) => {
  return (
    <div className={getSpans(colSpan, rowSpan)}>
      <Stack {...props}>{children}</Stack>
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

const getSpans = (colSpan: number, rowSpan: number) => {
  let colSpanStyle = "";

  switch (colSpan) {
    case 1:
      colSpanStyle = "col-span-1";
      break;
    case 2:
      colSpanStyle = "col-span-2";
      break;
  }

  let rowSpanStyle = "";

  switch (rowSpan) {
    case 1:
      rowSpanStyle = "row-span-1";
      break;
    case 2:
      rowSpanStyle = "row-span-2";
      break;
  }

  return `${colSpanStyle} ${rowSpanStyle}`;
};
