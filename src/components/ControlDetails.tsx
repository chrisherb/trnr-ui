import { Element } from "../ControlModel";

export function ControlDetails(props: {
  control: Element | undefined;
  onControlChange: (control: Element) => void;
}) {
  return (
    <div className="h-96 flex flex-col">
      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className={"tab tab-active"}>
          Properties
        </a>
      </div>
      <div className="flex-grow overflow-y-auto">
        {props.control && (
          <table className="table">
            <tbody>
              <IterateControlProps
                control={props.control}
                onControlChange={props.onControlChange}
              />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function IterateControlProps(props: {
  control: Element;
  onControlChange: (control: Element) => void;
}) {
  return Object.keys(props.control)
    .filter((key) => key !== "type") // skip type property
    .map((key) => {
      const handleChange = (key: string, value: any) => {
        props.control[key] = value;
        props.onControlChange(props.control);
      };

      const getType = (key: string) => {
        const type = typeof props.control[key];
        if (type === "string") {
          return "text";
        } else {
          return type;
        }
      };

      return (
        <tr key={key}>
          <th>{key}</th>
          <td>
            <Input
              control={props.control}
              onControlChange={props.onControlChange}
              type={getType(key)}
              value={props.control[key]}
              onChange={(value) => handleChange(key, value)}
            />
          </td>
        </tr>
      );
    });
}

function Input(props: {
  control: Element;
  onControlChange: (control: Element) => void;
  type: string;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
}) {
  if (props.type === "boolean") {
    return (
      <input
        type="checkbox"
        disabled={props.disabled}
        className="checkbox checkbox-xs"
        checked={props.value}
        onChange={(e) => props.onChange(e.target.checked)}
      />
    );
  } else if (props.type === "number") {
    return (
      <input
        type={props.type}
        disabled={props.disabled}
        className="input input-sm w-full max-w-xs"
        value={props.value}
        onChange={(e) => props.onChange(parseFloat(e.target.value))}
      />
    );
  } else {
    return (
      <input
        type={props.type}
        disabled={props.disabled}
        className="input input-sm w-full max-w-xs"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  }
}
