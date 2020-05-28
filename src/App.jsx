import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DragNDrop from "./components/DragNDrop";

const data = [
  { title: "group 1", items: ["1", "2", "3"] },
  { title: "group 2", items: ["4", "5"] },
];

function App() {
  return (
    <div className="App">
      <DragNDrop data={data} />
    </div>
  );
}

export default App;
