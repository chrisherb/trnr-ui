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
        <Tab.List className={"h-9 flex gap-9 px-3"}>
          <div className="grow uppercase">{label}</div>
          {tabs &&
            tabs.map((tab) => (
              <Tab
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
        <Tab.Panels className="flex grow rounded-1 ring ring-1 ring-primary ring-offset-1 ring-offset-background m-2 px-8 overflow-hidden">
          {Children.map(children, (child) => (
            <Tab.Panel className="grow">{child}</Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default Container;
