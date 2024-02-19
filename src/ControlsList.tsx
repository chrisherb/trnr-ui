import { useState } from "react";
import { CONTROL_TYPES, Control } from "./ControlModel";
import { DeleteIcon, PlusIcon } from "./components/Icons";

export function ControlsList(props: {
  items: Control[];
  onItemsChange: (items: Control[]) => void;
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
                      props.onItemsChange([
                        ...props.items,
                        {
                          name: controlType,
                          x: 0,
                          y: 0,
                          width: 100,
                          height: 100,
                        },
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
      {props.items.map((item, index) => (
        <li key={index}>
          <a
            className={`${
              index === active ? "active" : ""
            } w-full flex justify-between`}
            onClick={() => setActive(index)}
            onMouseEnter={() => setMouseOver(index)}
            onMouseLeave={() => setMouseOver(-1)}
          >
            <span>{item.name}</span>
            {index === mouseOver && (
              <button
                className="h-5"
                onClick={() =>
                  props.onItemsChange(props.items.filter((_, i) => i !== index))
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
