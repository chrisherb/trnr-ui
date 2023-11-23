import Frame from "./Frame";
import Stack from "./Stack";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <Stack>
      <Frame isButton onClick={onClick}>
        <span className="uppercase">{label}</span>
      </Frame>
    </Stack>
  );
};

export default Button;
