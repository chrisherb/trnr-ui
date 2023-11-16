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
    console.log("register mousemove");
    window.addEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    console.log("register mouseup");
    if (onMouseUp) window.addEventListener("mouseup", onMouseUp);
  }, [onMouseUp]);

  return [posX, posY];
};
