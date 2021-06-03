import { useMemo } from "react";
import { MULTICALL2_ADDRESSES } from "../constants/address";
import { getContract } from "../utils";
import { useActiveWeb3React } from "./web3";
import MULTICALL_ABI from "abis/multicall2.json";
export const useContract = (
  addressOrAddressMap,
  ABI,
  withSignerIfPossible = true
) => {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    library,
    chainId,
    withSignerIfPossible,
    account,
  ]);
};

export const useMulticall2Contract = () => {
  return useContract(MULTICALL2_ADDRESSES, MULTICALL_ABI, false);
};
