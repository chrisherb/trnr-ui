export const clamp = (val: number, polarity: "bi" | "uni" = "uni") => {
  if (polarity === "uni") {
    return clampUni(val);
  } else {
    return clampBi(val);
  }
};

export const clampUni = (val: number) => {
  if (val > 1) return 1;
  else if (val < 0) return 0;
  return val;
};

export const clampBi = (val: number) => {
  if (val > 1) return 1;
  else if (val < -1) return -1;
  return val;
};
