import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

const DaragNDrop = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, 300px);
`;

const DndGroup = styled.div`
  background: red;
`;

const DnDItem = styled.div`
  text-align: center;
`;

function App() {
  return (
    <div className="App">
      <DaragNDrop>
        <DndGroup>
          <DnDItem>
            <p>ITEM</p>
          </DnDItem>
        </DndGroup>
      </DaragNDrop>
    </div>
  );
}

export default App;
