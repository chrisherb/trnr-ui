function App() {
  return (
    <div className="h-screen flex">
      <div className="w-96 border-r border-neutral">
        <Navbar />
        <div className="divider"></div>
      </div>
      <div className="flex-auto"></div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="ml-4 mt-6 mr-4 space-x-4">
      <button className="btn btn-neutral">Load</button>
      <button className="btn btn-neutral">Save</button>
      <button className="btn btn-neutral">Export</button>
    </div>);
}

export default App;