import { UIConfig } from "../ControlModel";

export function IOButtons(props: {
  config: UIConfig;
  onChange: (config: UIConfig) => void;
}) {
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
    const svg = document.getElementById("svg");
    const htmlString = svg?.outerHTML;
    downloadFile(htmlString, "ui.svg", "text/svg");
  };

  return (
    <div className="m-2 space-x-2 flex flex-row">
      <button className="btn btn-sm btn-neutral" onClick={handleLoad}>
        Load
      </button>
      <button className="btn btn-sm btn-neutral" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-sm btn-neutral" onClick={handleExport}>
        Export
      </button>
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
