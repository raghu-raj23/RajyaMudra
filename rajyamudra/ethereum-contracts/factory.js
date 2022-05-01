import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xAbBbDd51634a3CDc418F0a140652A946B688b4e2"
);

export default instance;
