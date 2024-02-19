import { useState } from "react";
import { Dialog } from "./components/Dialog";
import { CogIcon } from "./components/Icons";
import { Control } from "./ControlModel";
import { ControlsList } from "./ControlsList";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controls, setControls] = useState<Control[]>([]);

  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral flex flex-col">
        <div className="grow">
          <ControlsList items={controls} onItemsChange={setControls} />
        </div>
        <div className="h-96">
          <Details />
        </div>
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
