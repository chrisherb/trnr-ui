import { useState } from "react";
import packageJson from "../package.json";
import {
  Button,
  Checkbox,
  Container,
  Dial,
  Dropdown,
  Grid,
  GridCell,
  Slider,
  Trnr,
  Value,
} from "./components";

function Showcase() {
  const [value, setValue] = useState(0.5);
  const [checked, setChecked] = useState(false);

  return (
    <Trnr theme={{ thickness: 0.2, roundness: 0.1 }}>
      <Container
        label={`${packageJson.name} System ${packageJson.version}`}
        tabs={["Tab 1", "Tab 2", "Tab 3"]}
      >
        <Grid rows={3} columns={10}>
          <GridCell
            colSpan={2}
            header={"Dial"}
            footer={<Value value={value} />}
          >
            <Dial value={value} onChange={setValue} defaultValue={0.5} />
          </GridCell>
          <GridCell
            header="Slider"
            footer={
              <Value value={value} rangeMax={100} suffix="%" decimals={0} />
            }
          >
            <Slider value={value} onChange={setValue} defaultValue={0.5} />
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
              <GridCell
                colSpan={2}
                header="Horizontal Slider"
                footer={<Value value={value} />}
              >
                <Slider
                  value={value}
                  onChange={setValue}
                  defaultValue={0.5}
                  orientation="horizontal"
                />
              </GridCell>
            </Grid>
          </GridCell>
        </Grid>
        <Grid columns={2} rows={2}></Grid>
      </Container>
    </Trnr>
  );
}

export default Showcase;
