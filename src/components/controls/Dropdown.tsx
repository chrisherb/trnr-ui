import { Listbox } from "@headlessui/react";
import Stack from "./Stack";
import { useState } from "react";

interface DropdownProps {
  label?: string;
  options: string[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Stack header={<span>{label}</span>}>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative w-full h-full">
          <div className="w-full h-full flex">
            <Listbox.Button className="block truncate rounded-global outline outline-global outline-primary outline-offset-global m-thickness-2 grow hover:bg-secondary hover:text-background uppercase">
              {selectedOption}
            </Listbox.Button>
          </div>
          <div className="absolute p-thickness-2 w-full">
            <Listbox.Options className="bg-background rounded-global outline outline-global outline-primary outline-offset-global w-full p-thickness-1 mt-4 uppercase flex flex-col justify-center">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className="flex-grow hover:bg-secondary hover:text-background rounded-global flex content-center"
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </div>
      </Listbox>
    </Stack>
  );
};

export default Dropdown;
