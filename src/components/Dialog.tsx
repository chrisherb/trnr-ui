import { useEffect, useRef } from "react";

export function Dialog(props: {
  isOpened: boolean;
  onClose: () => void;
  children: JSX.Element;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [props.isOpened]);

  return (
    <dialog
      ref={ref}
      className="modal"
      onClick={(e) =>
        ref.current &&
        !isClickInsideRectangle(e, ref.current) &&
        props.onClose()
      }
    >
      <div className="modal-box">{props.children}</div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={props.onClose}>close</button>
      </form>
    </dialog>
  );
}

const isClickInsideRectangle = (
  e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  element: HTMLElement
) => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};
