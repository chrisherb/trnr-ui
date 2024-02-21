import { useState } from "react";
import { Dialog } from "./components/Dialog";
import { CogIcon } from "./components/Icons";
import { UIConfig } from "./ControlModel";
import { ControlsList } from "./components/ControlsList";
import { ControlDetails } from "./components/ControlDetails";
import { SvgViewer } from "./components/svg/SvgViewer";
import { Settings } from "./components/Settings";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedControlIndex, setSelectedControlIndex] = useState(-1);
  const [uiConfig, setUiConfig] = useState<UIConfig>({
    width: 800,
    height: 600,
    controls: [],
    backgroundColor: "#000000",
  });

  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral flex flex-col">
        <div className="grow">
          <ControlsList
            controls={uiConfig.controls}
            onControlsChange={(controls) => {
              setUiConfig({ ...uiConfig, controls });
            }}
            onControlSelect={(_, index) => setSelectedControlIndex(index)}
          />
        </div>
        <ControlDetails
          control={uiConfig.controls[selectedControlIndex]}
          onControlChange={(ctrl) =>
            setUiConfig({
              ...uiConfig,
              controls: uiConfig.controls.map((c, i) =>
                i === selectedControlIndex ? ctrl : c
              ),
            })
          }
        />
        <Navbar />
      </div>
      <div className="flex-auto">
        <button
          onClick={() => setSettingsOpen(true)}
          className="btn btn-xs btn-circle fixed right-0 m-4"
        >
          <CogIcon />
        </button>
        <SvgViewer conf={uiConfig} />
      </div>
      <Dialog isOpened={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Settings config={uiConfig} onChange={(conf) => setUiConfig(conf)} />
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
