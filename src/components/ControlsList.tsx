import { useState } from "react";
import {
  CONTROL_TYPES,
  UIElement,
  ControlType,
  Dial,
  Panel,
  Digital,
  UIConfig,
  Text,
  isControl,
  Logo,
  Slider,
  Meter,
} from "../ControlModel";
import { DeleteIcon, DuplicateIcon, MagnifierIcon, PlusIcon } from "./Icons";
import { Modal } from "./Modal";
import { SvgControlViewer } from "./svg/SvgViewer";

export function ControlsList(props: {
  config: UIConfig;
  onControlsChange: (items: UIElement[]) => void;
  onControlSelect: (control: UIElement, index: number) => void;
}) {
  const [active, setActive] = useState(-1);
  const [mouseOver, setMouseOver] = useState(-1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateControl = (controlType: ControlType) => {
    props.onControlsChange([
      ...props.config.controls,
      createControl(controlType),
    ]);
    handleControlSelect(
      createControl(controlType),
      props.config.controls.length
    );

    // close dropdown by removing focus
    const elem = document.activeElement;
    if (elem && elem instanceof HTMLElement) {
      elem.blur();
    }
  };

  const handleControlSelect = (control: UIElement, index: number) => {
    setActive(index);
    props.onControlSelect(control, index);
  };

  return (
    <>
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
        {props.config.controls.map((item, index) => (
          <li key={index}>
            <a
              className={`${
                index === active ? "active" : ""
              } w-full flex justify-between`}
              onClick={() => handleControlSelect(item, index)}
              onMouseEnter={() => setMouseOver(index)}
              onMouseLeave={() => setMouseOver(-1)}
            >
              <span className="flex-grow">
                {item.name ? item.name : item.type}
              </span>
              {index === mouseOver && (
                <>
                  {isControl(item) && (
                    <button className="h-5" onClick={() => setDialogOpen(true)}>
                      <MagnifierIcon />
                    </button>
                  )}
                  <button
                    className="h-5"
                    onClick={() =>
                      props.onControlsChange([
                        ...props.config.controls,
                        { ...item },
                      ])
                    }
                  >
                    <DuplicateIcon />
                  </button>
                  <button
                    className="h-5"
                    onClick={() =>
                      props.onControlsChange(
                        props.config.controls.filter((_, i) => i !== index)
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
      {props.config.controls[active] && dialogOpen && (
        <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <div className="flex justify-center">
            <SvgControlViewer
              config={props.config}
              exportControl={props.config.controls[active] as Dial}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

function createControl(type: ControlType): UIElement {
  switch (type) {
    case "Panel":
      return new Panel();
    case "Dial":
      return new Dial();
    case "Digital":
      return new Digital();
    case "Text":
      return new Text();
    case "Logo":
      return new Logo();
    case "Slider":
      return new Slider();
    case "Meter":
      return new Meter();
    default:
      return {
        type,
        name: type,
        x: 0,
        y: 0,
      };
  }
}
