import Frame from "./Frame";
import Stack from "./Stack";

interface DropdownProps {
  label?: string;
  options: string[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  return (
    <Stack header={<span>{label}</span>}>
      <Frame>
        <select className="w-full h-full bg-background uppercase p-1">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      </Frame>
    </Stack>
  );
};

export default Dropdown;
