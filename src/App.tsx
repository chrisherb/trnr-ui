import { useState } from "react";
import Dial from "./components/Dial";
import Value from "./components/Value";

function App() {
  const [dialValue, setDialValue] = useState(0.5);

  return (
    <div className="container mx-auto">
      <Dial
        size={75}
        value={dialValue}
        onChange={setDialValue}
        className="stroke-green-500"
      />
      <Value value={dialValue} rangeMax={100} suffix="%" />
    </div>
  );
}

export default App;
