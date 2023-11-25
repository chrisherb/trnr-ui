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
        className={`rounded-global ring ring-global ring-primary ring-offset-global ring-offset-background m-thickness-2 grow ${
          checked && "bg-secondary"
        }`}
      />
    </>
  );
};

export default Checkbox;
