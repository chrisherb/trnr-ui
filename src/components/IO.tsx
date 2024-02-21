import { UIConfig } from "../ControlModel";

export function IOButtons(props: { config: UIConfig }) {
  const handleSave = () => {
    downloadFile(JSON.stringify(props.config), "config.json", "text/json");
  };

  return (
    <div className="m-2 space-x-2 flex flex-row">
      <button className="btn btn-sm btn-neutral">Load</button>
      <button className="btn btn-sm btn-neutral" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-sm btn-neutral">Export</button>
    </div>
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
