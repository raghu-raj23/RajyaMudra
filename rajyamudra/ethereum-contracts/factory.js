import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  // "0xf6AABc91cFCeDe7c515471b534459eBB780CF89f"
  // "0x243e04FF9511F1b7c8630F8CE20c6632A14BAE01"
  "0xAbBbDd51634a3CDc418F0a140652A946B688b4e2"
);

export default instance;
