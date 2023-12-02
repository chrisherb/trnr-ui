import packageJson from "../package.json";
import { Container, Grid, GridCell, Trnr } from "./components";
import Digital from "./components/controls/Digital";
import Dial from "./components/controls/Dial";
import Radio from "./components/controls/Radio";
import {
  useOptionParameter,
  useParameter,
} from "./components/hooks/useParameter";

function Showcase() {
  const parameter = useParameter(-78, 12, 0, "Parameter", "dB", 0.5);
  const optionParameter = useOptionParameter(
    ["Option 1", "Option 2", "Option 3"],
    0,
    "Option Parameter"
  );

  return (
    <Trnr theme={{ thickness: 0.15, roundness: 1, effects: ["honeycomb"] }}>
      <Container
        label={`${packageJson.name} System ${packageJson.version}`}
        tabs={["Tab 1", "Tab 2"]}
      >
        <Grid rows={3} columns={4}>
          <GridCell>
            <Dial parameter={parameter} segments={36} />
          </GridCell>
          <GridCell>
            <Digital parameter={parameter} />
          </GridCell>
          <GridCell>
            <Radio parameter={optionParameter} />
          </GridCell>
        </Grid>
      </Container>
    </Trnr>
  );
}

export default Showcase;
