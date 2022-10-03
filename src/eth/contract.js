export function createInstance(provider) {
  return new ethers.Contract(address, abi, provider);
}
