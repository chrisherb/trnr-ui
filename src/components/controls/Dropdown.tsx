import { Listbox } from "@headlessui/react";
import Stack from "./Stack";
import { useState } from "react";
import Frame from "./Frame";

interface DropdownProps {
  label?: string;
  options: string[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Stack header={<span>{label}</span>}>
      <div className="relative w-full h-full">
        <Listbox value={selectedOption} onChange={setSelectedOption}>
          <Frame>
            <Listbox.Button className="rounded-sm uppercase w-full h-full hover:bg-secondary hover:text-background">
              {selectedOption}
            </Listbox.Button>
          </Frame>
          <Listbox.Options className="border-global mt-2 border-primary bg-background rounded-md absolute w-full h-full p-global uppercase flex flex-col justify-center">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className="flex-grow hover:bg-secondary hover:text-background rounded-sm flex content-center"
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </Stack>
  );
};

export default Dropdown;
