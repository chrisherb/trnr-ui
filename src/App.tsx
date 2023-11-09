import { useState } from "react";
import Dial from "./components/Dial";

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
      <label>{dialValue}</label>
    </div>
  );
}

export default App;
