import Trnr from "./components/layout/Trnr";
import Grid from "./components/layout/Grid";
import GridCell from "./components/layout/GridCell";
import Slider from "./components/controls/Slider";
import Dial from "./components/controls/Dial";
import Button from "./components/controls/Button";
import Checkbox from "./components/controls/Checkbox";
import Dropdown from "./components/controls/Dropdown";

function App() {
  return (
    <Trnr thickness={3} crt>
      <Grid rows={3} columns={10}>
        <GridCell colSpan={2}>
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
          <Grid rows={2} columns={1}>
            <Button label="Button" />
            <Checkbox label="Checkbox" />
          </Grid>
        </GridCell>
        <GridCell colSpan={2}>
          <Grid rows={2} columns={1}>
            <Dropdown
              label="Dropdown"
              options={["option 1", "option 2", "option 3"]}
            />
          </Grid>
        </GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell>
          <Slider
            defaultValue={0.5}
            label="Slider"
            orientation="vertical"
            onChange={() => null}
            width={32}
          />
        </GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
        <GridCell></GridCell>
      </Grid>
    </Trnr>
  );
}

export default App;
