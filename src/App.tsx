import { useState } from "react";
import { UIConfig } from "./ControlModel";
import { ControlsList } from "./components/ControlsList";
import { ControlDetails } from "./components/ControlDetails";
import { SvgViewer } from "./components/svg/SvgViewer";
import { File } from "./components/File";

function App() {
  const [selectedControlIndex, setSelectedControlIndex] = useState(-1);
  const [uiConfig, setUiConfig] = useState<UIConfig>({
    width: 800,
    height: 600,
    controls: [],
    fontFamily: "Arial",
    fontWeight: "bold",
    strokeWidth: 1.5,
    backgroundColor: "#000000",
    primaryColor: "#ff0000",
    secondaryColor: "#00ff00",
    honeycombOpacity: 0.4,
  });

  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral flex flex-col">
        <div className="grow">
          <ControlsList
            config={uiConfig}
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
      </div>
      <div className="flex-auto">
        <div className="fixed right-0 ">
          <File config={uiConfig} onChange={setUiConfig} />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <SvgViewer config={uiConfig} mode="all" />{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
