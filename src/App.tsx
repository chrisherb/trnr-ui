import Trnr from "./components/layout/Trnr";
import Slider from "./components/controls/Slider";
import Dial from "./components/controls/Dial";
import Button from "./components/controls/Button";
import Checkbox from "./components/controls/Checkbox";
import Dropdown from "./components/controls/Dropdown";
import { useState } from "react";
import Value from "./components/controls/Value";
import { Grid, GridCell } from "./components";
import Container from "./components/layout/Container";

function App() {
  const [value, setValue] = useState(0.5);
  const [checked, setChecked] = useState(false);

  return (
    <Trnr theme={{ crt: true, thickness: 0.2, roundness: 0.1 }}>
      <Container label="Label" tabs={["Tab 1", "Tab 2", "Tab 3"]}>
        <Grid rows={3} columns={10}>
          <GridCell
            colSpan={2}
            header={"Dial"}
            footer={<Value value={value} />}
          >
            <Dial value={value} onChange={setValue} defaultValue={0.5} />
          </GridCell>
          <GridCell header="Slider" footer={<Value value={value} />}>
            <Slider
              value={value}
              onChange={setValue}
              defaultValue={0.5}
              orientation="vertical"
            />
          </GridCell>
          <Grid rows={2} columns={1}>
            <GridCell>
              <Button label="Button" />
            </GridCell>
            <GridCell header="Checkbox">
              <Checkbox checked={checked} onChange={setChecked} />
            </GridCell>
          </Grid>
          <Grid rows={2} columns={1} colSpan={2}>
            <GridCell header="Dropdown">
              <Dropdown options={["option 1", "option 2", "option 3"]} />
            </GridCell>
            <GridCell>
              <Grid rows={2} columns={1}>
                <GridCell header={"Dropdown"} orientation="horizontal">
                  <Dropdown options={["option 1", "option 2", "option 3"]} />
                </GridCell>
                <GridCell header="Ceckbox" orientation="horizontal">
                  <Checkbox checked={checked} onChange={setChecked} />
                </GridCell>
              </Grid>
            </GridCell>
          </Grid>
          <GridCell header="Grid Cell" colSpan={4}>
            <Grid columns={2} rows={2} borderEnabled>
              <GridCell header="Button Label">
                <Button label="Button" />
              </GridCell>
              <GridCell header="Button Label">
                <Button label="Button" />
              </GridCell>
              <GridCell header="Button Label">
                <Button label="Button" />
              </GridCell>
              <GridCell header="Button Label">
                <Button label="Button" />
              </GridCell>
            </Grid>
          </GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
          <GridCell header="Slider" footer={<Value value={value} />}>
            <Slider
              value={value}
              onChange={setValue}
              defaultValue={0.5}
              orientation="vertical"
            />
          </GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
          <GridCell></GridCell>
        </Grid>
        <Grid columns={2} rows={2}></Grid>
      </Container>
    </Trnr>
  );
}

export default App;
