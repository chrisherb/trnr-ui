import { UIConfig } from "../ControlModel";

export function Settings(props: {
  config: UIConfig;
  onChange: (conf: UIConfig) => void;
}) {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th>Width</th>
          <td>
            <input
              type="number"
              className="input input-sm w-full max-w-xs"
              value={props.config.width}
              onChange={(e) =>
                props.onChange({
                  ...props.config,
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
              value={props.config.height}
              onChange={(e) =>
                props.onChange({
                  ...props.config,
                  height: parseInt(e.target.value),
                })
              }
            />
          </td>
        </tr>
        <tr>
          <th>Background Color</th>
          <td>
            <input
              type="color"
              className="input input-sm w-full max-w-xs"
              value={props.config.backgroundColor}
              onChange={(e) =>
                props.onChange({
                  ...props.config,
                  backgroundColor: e.target.value,
                })
              }
            />
          </td>
        </tr>
        <tr>
          <th>Primary Color</th>
          <td>
            <input
              type="color"
              className="input input-sm w-full max-w-xs"
              value={props.config.primaryColor}
              onChange={(e) =>
                props.onChange({
                  ...props.config,
                  primaryColor: e.target.value,
                })
              }
            />
          </td>
        </tr>
        <tr>
          <th>Secondary Color</th>
          <td>
            <input
              type="color"
              className="input input-sm w-full max-w-xs"
              value={props.config.secondaryColor}
              onChange={(e) =>
                props.onChange({
                  ...props.config,
                  secondaryColor: e.target.value,
                })
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
