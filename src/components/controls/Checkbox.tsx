import { useState } from "react";
import { ButtonProps } from "./Button";
import Frame from "./Frame";
import Stack from "./Stack";

interface StateButtonProps extends ButtonProps {}

const Checkbox = ({ label, onClick }: StateButtonProps) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    setChecked((prevCheck) => !prevCheck);
  };

  return (
    <Stack header={<span className={`text-secondary`}>{label}</span>}>
      <input
        type="checkbox"
        className="hidden"
        onChange={(ev) => setChecked(ev.target.checked)}
      />
      <Frame onClick={handleClick}>
        {checked && <div className="w-full h-full rounded-sm bg-secondary" />}
      </Frame>
    </Stack>
  );
};

export default Checkbox;
