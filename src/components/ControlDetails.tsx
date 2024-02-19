import { useState } from "react";
import { Control, Panel, isPanel } from "../ControlModel";

export function ControlDetails(props: {
  control: Control | undefined;
  onControlChange: (control: Control) => void;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="h-96 flex flex-col">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab ${activeTab === 0 && "tab-active"}`}
          onClick={() => setActiveTab(0)}
        >
          Common
        </a>
        <a
          role="tab"
          className={`tab ${activeTab === 1 && "tab-active"}`}
          onClick={() => setActiveTab(1)}
        >
          Stuff
        </a>
      </div>
      <div className="flex-grow overflow-y-auto">
        {props.control && (
          <table className="table">
            <tbody>
              <CommonFieldRows
                control={props.control}
                onControlChange={props.onControlChange}
              />
              {isPanel(props.control) && (
                <SizeFieldRows
                  control={props.control}
                  onControlChange={props.onControlChange}
                />
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function CommonFieldRows(props: {
  control: Control;
  onControlChange: (control: Control) => void;
}) {
  return (
    <>
      <tr>
        <th>Name</th>
        <td>
          <input
            type="text"
            className="input input-sm w-full max-w-xs"
            value={props.control.name}
            onChange={(e) =>
              props.control &&
              props.onControlChange({
                ...props.control,
                name: e.target.value,
              })
            }
          />
        </td>
      </tr>
      <tr>
        <th>X</th>
        <td>
          <input
            type="number"
            className="input input-sm w-full max-w-xs"
            value={props.control.x}
            onChange={(e) =>
              props.onControlChange({
                ...props.control,
                x: parseInt(e.target.value),
              })
            }
          />
        </td>
      </tr>
      <tr>
        <th>Y</th>
        <td>
          <input
            type="number"
            className="input input-sm w-full max-w-xs"
            value={props.control.y}
            onChange={(e) =>
              props.onControlChange({
                ...props.control,
                y: parseInt(e.target.value),
              })
            }
          />
        </td>
      </tr>
    </>
  );
}

function SizeFieldRows(props: {
  control: Panel;
  onControlChange: (control: Panel) => void;
}) {
  return (
    <>
      <tr>
        <th>Width</th>
        <td>
          <input
            type="number"
            className="input input-sm w-full max-w-xs"
            value={props.control.width}
            onChange={(e) =>
              props.onControlChange({
                ...props.control,
                width: parseInt(e.target.value),
              })
            }
          />
        </td>
      </tr>
      <tr>
        <th>Height</th>
        <td>
          <input
            type="number"
            className="input input-sm w-full max-w-xs"
            value={props.control.height}
            onChange={(e) =>
              props.onControlChange({
                ...props.control,
                height: parseInt(e.target.value),
              })
            }
          />
        </td>
      </tr>
    </>
  );
}
