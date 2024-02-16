interface StateButtonProps {
  stackOrientation?: "horizontal" | "vertical";
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ checked, onChange }: StateButtonProps) => {
  return (
    <>
      <input
        type="checkbox"
        className="hidden"
        onChange={(ev) => onChange(ev.target.checked)}
      />
      <div
        onClick={() => onChange(!checked)}
        className={`rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 grow ${
          checked && "bg-secondary"
        }`}
      />
    </>
  );
};

export default Checkbox;
