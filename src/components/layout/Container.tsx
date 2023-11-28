import { Tab } from "@headlessui/react";
import { Children, PropsWithChildren } from "react";

interface TabProps extends PropsWithChildren {
  label?: string;
  tabs?: string[];
}

const Container = ({ label, tabs, children }: TabProps) => {
  return (
    <Tab.Group>
      <div className="flex flex-col h-full w-full px-8 pt-3 pb-8">
        <Tab.List className={"h-10 flex gap-9 px-roundness"}>
          <div className="grow uppercase grid content-center select-none">
            {label}
          </div>
          {tabs &&
            tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) => {
                  return selected
                    ? "uppercase text-secondary"
                    : "uppercase text-secondary opacity-50";
                }}
              >
                {tab}
              </Tab>
            ))}
        </Tab.List>
        <Tab.Panels className="flex grow rounded-1 border border-1 border-secondary p-8 overflow-hidden">
          {Children.map(children, (child) => (
            <Tab.Panel className="grow">{child}</Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default Container;
