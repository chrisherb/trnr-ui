import { useEffect, useState } from "react";

export const useSize = (size: "small" | "medium" | "large") => {
  const [sizeStyle, setSizeStyle] = useState("");

  useEffect(() => {
    switch (size) {
      case "small":
        setSizeStyle("h-16 w-24");
        break;
      case "medium":
        setSizeStyle("h-20 w-32");
        break;
      case "large":
        setSizeStyle("h-28 w-44");
        break;
      default:
        setSizeStyle("h-20 w-32");
    }
  }, [size]);

  return sizeStyle;
};
