import { useState } from "react";
import {
  CONTROL_TYPES,
  Control,
  ControlType,
  Dial,
  Panel,
} from "../ControlModel";
import { DeleteIcon, PlusIcon } from "./Icons";

export function ControlsList(props: {
  controls: Control[];
  onControlsChange: (items: Control[]) => void;
  onControlSelect: (control: Control, index: number) => void;
}) {
  const [active, setActive] = useState(-1);
  const [mouseOver, setMouseOver] = useState(-1);

  return (
    <ul className="menu">
      <li className="menu-title ">
        <div className="flex justify-between">
          <span>Controls</span>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-xs btn-circle">
              <PlusIcon />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {CONTROL_TYPES.map((controlType, index) => (
                <li key={index}>
                  <div
                    onClick={() =>
                      props.onControlsChange([
                        ...props.controls,
                        createControl(controlType),
                      ])
                    }
                    className="flex justify-between text-base-content"
                  >
                    <a>{controlType}</a>
                    <PlusIcon />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      {props.controls.map((item, index) => (
        <li key={index}>
          <a
            className={`${
              index === active ? "active" : ""
            } w-full flex justify-between`}
            onClick={() => {
              setActive(index);
              props.onControlSelect(item, index);
            }}
            onMouseEnter={() => setMouseOver(index)}
            onMouseLeave={() => setMouseOver(-1)}
          >
            <span>{item.name}</span>
            {index === mouseOver && (
              <button
                className="h-5"
                onClick={() =>
                  props.onControlsChange(
                    props.controls.filter((_, i) => i !== index)
                  )
                }
              >
                <DeleteIcon />
              </button>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

function createControl(type: ControlType): Control {
  switch (type) {
    case "Panel":
      return new Panel();
    case "Dial":
      return new Dial();
    default:
      return {
        type,
        name: type,
        x: 0,
        y: 0,
        color: "red",
      };
  }
}
