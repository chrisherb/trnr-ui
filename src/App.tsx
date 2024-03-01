import { useState } from "react";
import { Dialog } from "./components/Dialog";
import { CogIcon } from "./components/Icons";
import { UIConfig } from "./ControlModel";
import { ControlsList } from "./components/ControlsList";
import { ControlDetails } from "./components/ControlDetails";
import { SvgViewer } from "./components/svg/SvgViewer";
import { Settings } from "./components/Settings";
import { IOButtons } from "./components/IO";

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedControlIndex, setSelectedControlIndex] = useState(-1);
  const [uiConfig, setUiConfig] = useState<UIConfig>({
    width: 800,
    height: 600,
    controls: [],
    fontFamily: "Arial",
    fontWeight: "bold",
    backgroundColor: "#000000",
    primaryColor: "#ff0000",
    secondaryColor: "#00ff00",
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
        <IOButtons config={uiConfig} onChange={setUiConfig} />
      </div>
      <div className="flex-auto">
        <button
          onClick={() => setSettingsOpen(true)}
          className="btn btn-xs btn-circle fixed right-0 m-4"
        >
          <CogIcon />
        </button>
        <div className="w-full h-full flex justify-center items-center">
          <SvgViewer config={uiConfig} mode="all" />{" "}
        </div>
      </div>
      <Dialog isOpened={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Settings config={uiConfig} onChange={(conf) => setUiConfig(conf)} />
      </Dialog>
    </div>
  );
}

export default App;
