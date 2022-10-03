/* eslint-disable no-unused-vars */
import { ethers } from "ethers";

const MAIN_ENDPOINT = "https://rpc.goerli.mudit.blog";
const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;

export function createProvider() {
  return new ethers.providers.JsonRpcProvider(
    QUICKNODE_ENDPOINT || MAIN_ENDPOINT,
    5
  );
}
