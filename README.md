# trnr-ui

A zero-config, easy-to-use React library focused on components for audio applications. Currently under development.

## How to build

```
npm install  
npm run build
```

## How to run

```
npm install  
npm run dev
```

## How to use

``` jsx
<Trnr>
  <Grid rows={1} columns={2}>
    <GridCell>
      <Dial
        defaultValue={0.5}
        label="Dial" />
    </GridCell>
    <GridCell>
      <Slider
        defaultValue={0.5}
        label="Slider"
      />
    </GridCell>
  </Grid>
</Trnr>
```

## Components

- Dial
- Slider
- Grid
- GridCell
