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
              type="text"
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
              type="text"
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
      </tbody>
    </table>
  );
}
