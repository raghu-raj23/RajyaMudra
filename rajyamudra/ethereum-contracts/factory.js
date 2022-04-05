import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x76dAc6925C975E8e6B58f0cFa172E05D8a3BABdb"
);

export default instance;
