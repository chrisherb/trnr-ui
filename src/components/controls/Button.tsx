import Frame from "./Frame";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <Frame isButton onClick={onClick}>
      {label}
    </Frame>
  );
};

export default Button;
