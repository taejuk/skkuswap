import {
  ChainId,
  Fetcher,
  Pair,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
  WETH,
} from "@uniswap/sdk";
import { Router } from "@uniswap/v2-sdk";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { injected } from "./connector";
import { useEagerConnect } from "./hooks";
import { useActiveWeb3React } from "./hooks/web3";

const EthToDai = async () => {
  const { account, chainId, library } = useActiveWeb3React();
  const tokenAddress = "0xad6d458402f60fd3bd25163575031acdce07538d";
  const DAI = await Fetcher.fetchTokenData(chainId, tokenAddress);
  const pair = await Fetcher.fetchPairData(DAI, WETH[chainId]);
  const route = new Route([pair], WETH[chainId]);
  const trade = new Trade(
    route,
    new TokenAmount(WETH[DAI.chainId], "100000000000000000"),
    TradeType.EXACT_INPUT
  );
  const allowedSlippage = new Percent(50, 10_100);
  const recipient = account;
  const deadline = undefined;
  const swapMethods = [];
};

const App = () => {
  const context = useWeb3React();
  const { account, activate } = context;
  const onActivate = () => {
    activate(injected);
  };
  return (
    <>
      <div>sdk example</div>
      <button onClick={onActivate}>connect</button>
      <div>account: {account}</div>
      <button onClick={EthToDai}>eth to dai</button>
    </>
  );
};

export default App;

/* 
const chainId = ChainId.MAINNET;
const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // must be checksummed
const decimals = 18;
const DAI = new Token(chainId, tokenAddress, decimals);
const pair = await Fetcher.fetchPairData(DAI, WETH[chainId]);
console.log(pair);
const route = new Route([pair], WETH[chainId]);
const trade = new Trade(
  route,
  new TokenAmount(WETH[DAI.chainId], "1000000000000000000"),
  TradeType.EXACT_INPUT
);
console.dir(trade);
*/
