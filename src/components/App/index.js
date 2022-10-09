import React, { Component } from "react";
import { EthereumContext } from "../../eth/context";
import { createProvider } from "../../eth/provider";
import { createCollectionInstance } from "../../eth/contract";

import Game from "../Game";
import MessageCard from "../MessageCard";
import "./styles.css";

function App() {
  const provider = createProvider();
  const collection = createCollectionInstance(provider);
  const ethereumContext = { provider, collection };

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
