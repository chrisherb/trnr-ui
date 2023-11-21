export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="border-global rounded-md border-primary text-secondary p-2 h-full w-full"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
