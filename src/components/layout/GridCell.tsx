interface GridCellProps extends React.PropsWithChildren {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}

const GridCell = ({ children, colSpan = 1, rowSpan = 1 }: GridCellProps) => {
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

  return <div className={`${colSpanStyle} ${rowSpanStyle}`}>{children}</div>;
};

export default GridCell;
