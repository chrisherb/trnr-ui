import { useState } from "react";
import { Dialog } from "./components/Dialog";
import { CogIcon, PlusIcon } from "./components/Icons";

const CONTROL_TYPES = ["Panel", "Dial"];
type ControlType = (typeof CONTROL_TYPES)[number];

interface Control {
  name: ControlType;
  x: number;
  y: number;
  width: number;
  height: number;
}

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controls, setControls] = useState<Control[]>([]);

  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral flex flex-col">
        <div className="grow">
          <Controls items={controls} onItemsChange={setControls} />
        </div>
        <Details />
        <Navbar />
      </div>
      <div className="flex-auto">
        <button
          onClick={() => setSettingsOpen(true)}
          className="btn btn-xs btn-circle fixed right-0 m-4"
        >
          <CogIcon />
        </button>
      </div>
      <Dialog isOpened={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div>Settings</div>
      </Dialog>
    </div>
  );
}

function Navbar() {
  return (
    <div className="ml-4 mt-6 mr-4 space-x-4">
      <button className="btn btn-neutral">Load</button>
      <button className="btn btn-neutral">Save</button>
      <button className="btn btn-neutral">Export</button>
    </div>
  );
}

function Controls(props: {
  items: Control[];
  onItemsChange: (items: Control[]) => void;
}) {
  const [active, setActive] = useState(-1);
  return (
    <ul className="menu">
      <li className="menu-title ">
        <div className="flex justify-between">
          <span>Controls</span>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-xs btn-circle">
              <PlusIcon />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {CONTROL_TYPES.map((controlType, index) => (
                <li key={index}>
                  <a
                    onClick={() =>
                      props.onItemsChange([
                        ...props.items,
                        {
                          name: controlType,
                          x: 0,
                          y: 0,
                          width: 100,
                          height: 100,
                        },
                      ])
                    }
                  >
                    {controlType}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      {props.items.map((item, index) => (
        <li key={index}>
          <a
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Details() {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <a role="tab" className="tab">
        Common
      </a>
      <a role="tab" className="tab tab-active">
        Stuff
      </a>
    </div>
  );
}

export default App;
