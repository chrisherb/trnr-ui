import { useEffect, useState } from "react";

export const useMouse = (onMouseUp?: () => void) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const handleMouseMove = (ev: MouseEvent) => {
    setPosX(ev.clientX);
    setPosY(ev.clientY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (onMouseUp) window.addEventListener("mouseup", onMouseUp);
  }, [onMouseUp]);

  return [posX, posY];
};
