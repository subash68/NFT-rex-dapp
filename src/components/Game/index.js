import React, { Component } from "react";
import { createProvider } from "../../eth/provider";
import { createCollectionInstance } from "../../eth/contract";

import "./styles.css";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outerContainerEl: null,
      data: {
        account: "0x4db8bcCF4385C7AA46F48eb42f70FA41Df917b44",
        collection: createCollectionInstance(),
        provider: createProvider()
      },
    };
  }

  async accountChangeHandler(account) {
    this.state.data = { account: account };
  }

  async componentDidMount() {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => this.accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }

    const config = {
      id: "runner",
      width: this.outerContainerEl.offsetWidth,
      caller: this.state.data.account, // ! HARDCODE THE CALLER HERE - LATER CAN BE CHANGED ACCORDINGLY...
      collection: this.state.data.collection,
      provider: this.state.data.provider
    };
    const { Runner } = await import("../Runner");
    const runner = new Runner(this.outerContainerEl, config); // * Send account info
    runner.init();
  }

  render() {
    return (
      <div>
        <div
          ref={(node) => (this.outerContainerEl = node)}
          className="runner-wrapper"
        />
      </div>
    );
  }
}

export default App;
