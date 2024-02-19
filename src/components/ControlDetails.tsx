import { useState } from "react";

export function ControlDetails() {
  const [activeTab, setActiveTab] = useState(0);

  return (
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
  );
}
