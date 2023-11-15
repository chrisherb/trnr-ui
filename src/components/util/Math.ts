export const clamp = (val: number) => {
  if (val > 1) return 1;
  else if (val < 0) return 0;
  return val;
};
