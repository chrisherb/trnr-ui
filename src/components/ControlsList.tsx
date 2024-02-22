import { useState } from "react";
import {
  CONTROL_TYPES,
  Element,
  ControlType,
  Dial,
  Panel,
} from "../ControlModel";
import { DeleteIcon, DuplicateIcon, PlusIcon } from "./Icons";

export function ControlsList(props: {
  controls: Element[];
  onControlsChange: (items: Element[]) => void;
  onControlSelect: (control: Element, index: number) => void;
}) {
  const [active, setActive] = useState(-1);
  const [mouseOver, setMouseOver] = useState(-1);

  const handleCreateControl = (controlType: ControlType) => {
    props.onControlsChange([...props.controls, createControl(controlType)]);
    handleControlSelect(createControl(controlType), props.controls.length);

    // close dropdown by removing focus
    const elem = document.activeElement;
    if (elem && elem instanceof HTMLElement) {
      elem.blur();
    }
  };

  const handleControlSelect = (control: Element, index: number) => {
    setActive(index);
    props.onControlSelect(control, index);
  };

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
                    onClick={() => handleCreateControl(controlType)}
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
            onClick={() => handleControlSelect(item, index)}
            onMouseEnter={() => setMouseOver(index)}
            onMouseLeave={() => setMouseOver(-1)}
          >
            <span className="flex-grow">{item.name}</span>
            {index === mouseOver && (
              <>
                <button
                  className="h-5"
                  onClick={() =>
                    props.onControlsChange([...props.controls, item])
                  }
                >
                  <DuplicateIcon />
                </button>
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
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

function createControl(type: ControlType): Element {
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
      };
  }
}
