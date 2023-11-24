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
        <div className="hover:bg-secondary hover:text-background w-full h-full uppercase grid justify-center content-center rounded-sm">
          {label}
        </div>
      </Frame>
    </Stack>
  );
};

export default Button;
