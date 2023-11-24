import Stack from "./Stack";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <Stack>
      <button
        onClick={onClick}
        className="uppercase rounded-global outline outline-global outline-primary outline-offset-global m-thickness-2 grow hover:bg-secondary hover:text-background"
      >
        {label}
      </button>
    </Stack>
  );
};

export default Button;
