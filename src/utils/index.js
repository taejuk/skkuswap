import { Contract } from "@ethersproject/contracts";

export const getSigner = (library, account) => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (library, account) => {
  return account ? getSigner(library, account) : library;
};

export const getContract = (address, ABI, library, account) => {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
};
