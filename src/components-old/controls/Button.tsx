export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="uppercase truncate rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 grow hover:bg-secondary hover:text-background"
    >
      {label}
    </button>
  );
};

export default Button;
