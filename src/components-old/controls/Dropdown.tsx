import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface DropdownProps {
  options: string[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <div className="relative w-full h-full">
        <div className="w-full h-full flex">
          <Listbox.Button className="block truncate rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 grow hover:bg-secondary hover:text-background uppercase">
            {selectedOption}
          </Listbox.Button>
        </div>
        <div className="absolute p-2 w-full z-50 ">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            enter="transition ease-in duration-100"
          >
            <Listbox.Options className="bg-background rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background w-full mt-2 uppercase flex flex-col justify-center">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option}
                  className="flex-grow hover:bg-secondary hover:text-background rounded-1 flex content-center p-1"
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

export default Dropdown;
