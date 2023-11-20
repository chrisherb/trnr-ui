import Trnr from "./components/layout/Trnr";
import Grid from "./components/layout/Grid";
import GridCell from "./components/layout/GridCell";
import Slider from "./components/controls/Slider";
import Dial from "./components/controls/Dial";
import Button from "./components/controls/Button";

function App() {
  return (
    <Trnr strokeWidth={2}>
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
        <GridCell></GridCell>
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
