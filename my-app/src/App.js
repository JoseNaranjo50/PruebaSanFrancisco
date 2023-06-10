import React, { Fragment, useState, useEffect } from "react";
import Master from "./containers/index"
import './App.css';
import { useGetSession } from "./hooks/index"
import { ProgressBar } from "./common/PorgressBar";

const App = () => {
  const { session } = useGetSession();

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content">
          {/* {session == null &&
            <ProgressBar />
          } */}
            <Master />
       
        </div>
      </header>
    </div>
  );
}

export default App;
