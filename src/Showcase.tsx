import { useState } from "react";
import packageJson from "../package.json";
import { Container, Grid, GridCell, Trnr } from "./components";
import Digital from "./components/controls/Digital";
import Dial from "./components/controls/Dial";

function Showcase() {
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(false);

  return (
    <Trnr theme={{ thickness: 0.15, roundness: 1, effects: ["honeycomb"] }}>
      <Container
        label={`${packageJson.name} System ${packageJson.version}`}
        tabs={["Tab 1", "Tab 2"]}
      >
        <Grid rows={2} columns={4}>
          <GridCell header="Dial">
            <Dial value={value} defaultValue={0.5} onChange={setValue} />
          </GridCell>
          <GridCell header="Digital">
            <Digital
              value={value}
              onChange={setValue}
              defaultValue={0.5}
              polarity="uni"
            />
          </GridCell>
        </Grid>
      </Container>
    </Trnr>
  );
}

export default Showcase;
