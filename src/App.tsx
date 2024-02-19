import { useState } from "react";
import { Dialog } from "./components/Dialog";
import { CogIcon } from "./components/Icons";
import { Control } from "./ControlModel";
import { ControlsList } from "./components/ControlsList";
import { ControlDetails } from "./components/ControlDetails";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [controls, setControls] = useState<Control[]>([]);

  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral flex flex-col">
        <div className="grow">
          <ControlsList items={controls} onItemsChange={setControls} />
        </div>
        <ControlDetails />
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
    <div className="m-2 space-x-2 flex flex-row">
      <button className="btn btn-sm btn-neutral">Load</button>
      <button className="btn btn-sm btn-neutral">Save</button>
      <button className="btn btn-sm btn-neutral">Export</button>
    </div>
  );
}

export default App;
