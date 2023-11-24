import { useState } from "react";
import { ButtonProps } from "./Button";
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
      <div
        onClick={handleClick}
        className={`rounded-global outline outline-global outline-primary outline-offset-global m-thickness-2 grow ${
          checked && "bg-secondary"
        }`}
      />
    </Stack>
  );
};

export default Checkbox;
