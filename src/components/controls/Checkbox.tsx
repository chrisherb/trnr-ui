import { useState } from "react";
import { ButtonProps } from "./Button";

interface StateButtonProps extends ButtonProps {}

const Checkbox = ({ label, onClick }: StateButtonProps) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (onClick) onClick();
    setChecked((prevCheck) => !prevCheck);
  };

  return (
    <label className="w-full h-full flex flex-col">
      <span className={`text-secondary`}>{label}</span>
      <input
        type="checkbox"
        className="hidden"
        onChange={(ev) => setChecked(ev.target.checked)}
      />
      <div
        className="border-global flex-grow rounded-md border-primary p-global"
        onClick={handleClick}
      >
        {checked && <div className="w-full h-full rounded-sm bg-secondary" />}
      </div>
    </label>
  );
};

export default Checkbox;
