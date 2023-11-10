import { useState } from "react";
import Dial from "./components/Dial";
import Value from "./components/Value";

function App() {
  const [dialValue, setDialValue] = useState(0.5);

  return (
    <div className="container mx-auto bg-trnr-background">
      <Dial size={200} value={dialValue} onChange={setDialValue} />
      <Value value={dialValue} rangeMax={100} suffix="%" />
    </div>
  );
}

export default App;
