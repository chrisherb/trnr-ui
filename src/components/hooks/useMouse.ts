import { useCallback, useEffect, useState } from "react";

export const useMouse = (onMouseUp?: () => void) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const handleMouseMove = useCallback(
    (ev: MouseEvent) => {
      setPosX(ev.clientX);
      setPosY(ev.clientY);
    },
    [setPosX, setPosY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (onMouseUp) window.addEventListener("mouseup", onMouseUp);

    return () => {
      if (onMouseUp) window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  return [posX, posY];
};
