import { useState } from "react";

function App() {
  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral">
        <Controls items={["Item 1", "Item 2", "Item 3", "Item 4"]} />
        <Details />
        <Navbar />
      </div>
      <div className="flex-auto"></div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="ml-4 mt-6 mr-4 space-x-4">
      <button className="btn btn-neutral">Load</button>
      <button className="btn btn-neutral">Save</button>
      <button className="btn btn-neutral">Export</button>
    </div>);
}

function Controls(props: { items: string[] }) {
  const [active, setActive] = useState("");
  return (
    <ul className="menu">
      <li className="menu-title">Controls</li>
      {props.items.map(item =>
        <li>
          <a className={item === active ? "active" : ""} onClick={() => setActive(item)}>{item}</a>
        </li>)}
    </ul>
  )
}

function Details() {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      <a role="tab" className="tab">Common</a>
      <a role="tab" className="tab tab-active">Stuff</a>
    </div>
  );
}

export default App;