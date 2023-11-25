import { Listbox } from "@headlessui/react";
import Stack from "./Stack";
import { useState } from "react";

interface DropdownProps {
  label?: string;
  options: string[];
  stackOrientation?: "horizontal" | "vertical";
}

const Dropdown = ({
  label,
  options,
  stackOrientation = "vertical",
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Stack header={<span>{label}</span>} orientation={stackOrientation}>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative w-full h-full">
          <div className="w-full h-full flex">
            <Listbox.Button className="block truncate rounded-global ring ring-global ring-primary ring-offset-global ring-offset-background m-thickness-2 grow hover:bg-secondary hover:text-background uppercase">
              {selectedOption}
            </Listbox.Button>
          </div>
          <div className="absolute p-thickness-2 w-full z-50 ">
            <Listbox.Options className="bg-background rounded-global ring ring-global ring-primary ring-offset-global ring-offset-background w-full mt-4 uppercase flex flex-col justify-center">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className="flex-grow hover:bg-secondary hover:text-background rounded-global flex content-center p-thickness-1"
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
