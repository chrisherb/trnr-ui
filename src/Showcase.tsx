import { useState } from "react";
import packageJson from "../package.json";
import { Container, Grid, GridCell, Trnr } from "./components";
import Digital from "./components/controls/Digital";
import Dial from "./components/controls/Dial";
import Radio from "./components/controls/Radio";
import { useParameter } from "./components/hooks/useParameter";

function Showcase() {
  const parameter = useParameter(0.5);
  const [selected, setSelected] = useState("Option 1");

  return (
    <Trnr theme={{ thickness: 0.15, roundness: 1, effects: ["honeycomb"] }}>
      <Container
        label={`${packageJson.name} System ${packageJson.version}`}
        tabs={["Tab 1", "Tab 2"]}
      >
        <Grid rows={3} columns={4}>
          <GridCell header="Dial">
            <Dial
              value={parameter.value}
              defaultValue={parameter.defaultValue}
              onChange={parameter.setValue}
            />
          </GridCell>
          <GridCell header="Digital">
            <Digital
              value={parameter.value}
              onChange={parameter.setValue}
              defaultValue={parameter.defaultValue}
              polarity="uni"
            />
          </GridCell>
          <GridCell header="Radio">
            <Radio
              options={["Option 1", "Option 2", "Option 3", "Option 4"]}
              onChange={setSelected}
              value={selected}
            />
          </GridCell>
        </Grid>
      </Container>
    </Trnr>
  );
}

export default Showcase;
