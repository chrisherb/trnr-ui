import { useState } from "react";
import { Control } from "../ControlModel";

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
              <tr>
                <th>X</th>
                <td>
                  <input
                    type="number"
                    className="input input-sm w-full max-w-xs"
                    value={props.control && props.control.x}
                    onChange={(e) =>
                      props.control &&
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
                    value={props.control && props.control.y}
                    onChange={(e) =>
                      props.control &&
                      props.onControlChange({
                        ...props.control,
                        y: parseInt(e.target.value),
                      })
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
