import Trnr from "./components/layout/Trnr";
import Grid from "./components/layout/Grid";
import GridCell from "./components/layout/GridCell";
import Slider from "./components/controls/Slider";
import Dial from "./components/controls/Dial";
import Button from "./components/controls/Button";
import Checkbox from "./components/controls/Checkbox";

function App() {
  return (
    <Trnr thickness={3}>
      <Grid rows={3} columns={4}>
        <GridCell>
          <Dial defaultValue={0.5} label="Dial" onChange={() => null} />
        </GridCell>
        <GridCell>
          <Slider
            defaultValue={0.5}
            label="Slider"
            orientation="vertical"
            onChange={() => null}
            width={32}
          />
        </GridCell>
        <GridCell>
          <Button label="Click" />
        </GridCell>
        <GridCell>
          <Checkbox label="State" />
        </GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
      </Grid>
    </Trnr>
  );
}

export default App;
