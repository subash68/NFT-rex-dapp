import React, { Component } from "react";
import { EthereumContext } from "../../eth/context";
import { createProvider } from "../../eth/provider";

import Game from "../Game";
import MessageCard from "../MessageCard";
import "./styles.css";

function App() {
  const provider = createProvider();
  const dao = createInstance(provider);
  const ethereumContext = { provider, dao };

  return (
    <div className="container">
      <div>
        <EthereumContext.Provider value={ethereumContext}>
          <Game />
          <MessageCard />
        </EthereumContext.Provider>
      </div>
      <div /> {/* placeholder */}
    </div>
  );
}

export default App;
