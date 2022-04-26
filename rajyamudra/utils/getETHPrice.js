import fetch from "node-fetch";

export const getETHPrice = async () => {
  try {
    //   Get the current price of ETH
    const ethAPI =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum";

    const response = await fetch(ethAPI);

    const data = await response.json();
    const ethPrice = data[0].current_price;
    // ethPrice will have the current value of ETH in USD
    return parseFloat(parseFloat(ethPrice).toFixed(2));
  } catch (error) {
    console.log(error);
  }
};

export const convertWeiToETH = (wei) => {
  return parseFloat(wei) / 10 ** 18;
};

export const getWEIPriceInUSD = (usd, wei) => {
  return parseFloat(convertWeiToETH(wei) * usd).toFixed(2);
};

export const getETHPriceInUSD = (usd, eth) => {
  return parseFloat(eth * usd).toFixed(2);
};
