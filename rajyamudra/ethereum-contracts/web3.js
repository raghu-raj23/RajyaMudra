import Web3 from "web3";

let web3;
require("dotenv").config();

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and meta mask is installed
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server *OR* meta mask is not running
  // creating our own provider
  const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/19843606664e4670a7d74f673845bbc4");

  web3 = new Web3(provider);
}

export default web3;
