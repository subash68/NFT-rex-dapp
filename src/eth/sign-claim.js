import { ethers } from "ethers";
import { createInstance } from "./forwarder";
import { signMetaTxRequest } from "./signer";
import { createCollectionInstance } from "./contract";

async function sendMetaTx(collection, provider, signer) {
  console.log(`Sending register meta-tx`);
  const url = process.env.REACT_APP_WEBHOOK_URL;
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();

  const data = dao.interface.encodeFunctionData("mintToCaller", [
    "somerandomTokenURI",
  ]);
  const to = collection.address;

  const request = await signMetaTxRequest(signer.provider, forwarder, {
    to,
    from,
    data,
  });

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  });
}

export async function claimReward(collection, provider) {
  if (!window.ethereum) throw new Error(`User wallet not found`);

  await window.ethereum.enable();
  const userProvider = new ethers.providers.Web3Provider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 80001)
    throw new Error(`Please switch to matic for signing`);

  const signer = userProvider.getSigner();

  const result = await sendMetaTx(collection, provider, signer);

  result.json().then(async (response) => {
    const tx = JSON.parse(response.result);
    console.log(tx);
    const txReceipt = await provider.waitForTransaction(tx.txHash);
    console.log(txReceipt);
  });

  //   dao.on("NewClone", async (address) => {
  //     console.log(`Clone created at following address ${address}`);
  //     const deployedDAO = createDAOInstance(provider, address);

  //     const treasuryAddress = await deployedDAO.functions.getTreasury();
  //     console.log(`treasury is deployed to ${treasuryAddress}`);
  //   });

  return result;
}
