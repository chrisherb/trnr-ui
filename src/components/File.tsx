import { renderToString } from "react-dom/server";
import { UIConfig, isControl } from "../ControlModel";
import { SvgControlViewer, SvgViewer } from "./svg/SvgViewer";
import {
  DocumentUploadIcon,
  DocumentDownloadIcon,
  DownloadIcon,
  CogIcon,
} from "./Icons";
import { useState } from "react";
import { Modal } from "./Modal";
import { Settings } from "./Settings";

export function File(props: {
  config: UIConfig;
  onChange: (config: UIConfig) => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const handleLoad = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();

    fileInput.addEventListener("change", (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // e.target.result contains the file content
          const fileContent = e.target.result;
          const config = JSON.parse(fileContent);
          props.onChange(config);
        };
        reader.readAsText(file);
      }
    });
  };

  const handleSave = () => {
    downloadFile(JSON.stringify(props.config), "config.json", "text/json");
  };

  const handleExport = () => {
    const backgroundSvg = renderToString(
      <SvgViewer config={props.config} mode="static-parts" />
    );
    downloadFile(backgroundSvg, "background.svg", "text/svg");

    props.config.controls.forEach((control) => {
      if (isControl(control)) {
        const controlSvg = renderToString(
          <SvgControlViewer config={props.config} exportControl={control} />
        );
        downloadFile(controlSvg, `${control.type}.svg`, "text/svg");
      }
    });
  };

  return (
    <>
      <div className="tooltip tooltip-bottom" data-tip="Load Config">
        <button onClick={handleLoad} className="btn btn-xs btn-circle m-4">
          <DocumentUploadIcon />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Save Config">
        <button onClick={handleSave} className="btn btn-xs btn-circle m-4">
          <DocumentDownloadIcon />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Export">
        <button onClick={handleExport} className="btn btn-xs btn-circle m-4">
          <DownloadIcon />
        </button>
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Settings">
        <button
          onClick={() => setSettingsOpen(true)}
          className="btn btn-xs btn-circle m-4"
        >
          <CogIcon />
        </button>
      </div>
      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <Settings
          config={props.config}
          onChange={(conf) => props.onChange(conf)}
        />
      </Modal>
    </>
  );
}

function downloadFile(data: any, fileName: string, fileType: string) {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
}
