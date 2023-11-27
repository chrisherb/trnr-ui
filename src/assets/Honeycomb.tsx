export const Honeycomb = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern
          id="honeycomb"
          x="0"
          y="0"
          width="7"
          height="12.25"
          patternUnits="userSpaceOnUse"
        >
          <path
            transform="scale(0.25)"
            d="M 12.980469 0 L 12.980469 7.5 L 0 15 L 0 33.509766 L 12.980469 41 L 12.980469 49 L 15 49 L 15 41 L 28 33.5 L 28 15 L 15 7.5 L 15 0 L 12.980469 0 z M 13.990234 9.25 L 26.990234 16.75 L 26.990234 31.75 L 13.990234 39.25 L 1 31.75 L 1 16.75 L 13.990234 9.25 z "
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#honeycomb)"
        opacity={0.5}
      ></rect>
    </svg>
  );
};
