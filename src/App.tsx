import { useState } from "react";
import { Dialog } from "./components/Dialog";
import { CogIcon, PlusIcon } from "./components/Icons";

function App() {

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral">
        <Controls items={["Item 1", "Item 2", "Item 3", "Item 4"]} />
        <Details />
        <Navbar />
      </div>
      <div className="flex-auto">
        <button onClick={() => setSettingsOpen(true)} className="btn btn-xs btn-circle fixed right-0 m-4">
          <CogIcon />
        </button>
      </div>
      <Dialog isOpened={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div>
          Settings
        </div>
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
    </div>);
}

function Controls(props: { items: string[] }) {
  const [active, setActive] = useState("");
  return (
    <ul className="menu">
      <li className="menu-title ">
        <div className="flex justify-between">
          <span>Controls</span>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-xs btn-circle"><PlusIcon /></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div>
        </div>
      </li>
      {props.items.map((item, index) =>
        <li key={index}>
          <a className={item === active ? "active" : ""} onClick={() => setActive(item)}>{item}</a>
        </li>)}
    </ul>
  )
}

function Details() {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <a role="tab" className="tab">Common</a>
      <a role="tab" className="tab tab-active">Stuff</a>
    </div>
  );
}

export default App;