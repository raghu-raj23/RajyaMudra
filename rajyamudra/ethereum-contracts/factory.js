import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xf6AABc91cFCeDe7c515471b534459eBB780CF89f"
);

export default instance;
