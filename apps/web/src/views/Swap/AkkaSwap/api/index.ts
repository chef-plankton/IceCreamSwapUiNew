import axios, { AxiosResponse } from "axios";
import { HttpMethod, RequestPath } from "./types";
import { ChainId, Currency, CurrencyAmount, ERC20Token, NATIVE } from '@pancakeswap/sdk'
import { NATIVE_TOKEN_ADDRESS } from "config/constants";
import { AkkaRouterArgsResponseType, AkkaRouterInfoResponseType } from "../hooks/types";

const instance = axios.create();
const api = <R>(
  method: HttpMethod,
  path: RequestPath,
  config?: any
): Promise<AxiosResponse<R, any>> => {
  switch (method) {
    case "GET":
      return instance.get(path, config);
    case "POST":
      instance.post(path).then((res) => res);
      break;
  }
};
const getRoute = async (
  API_URL: string,
  chainId: ChainId,
  inputCurrencyId: string,
  outputCurrencyId: string,
  inputCurrency: Currency | ERC20Token,
  account: string,
  token0: Currency,
  token1: Currency,
  amount: CurrencyAmount<Currency>,
  slippage: number,
  controller: AbortController,
) =>
  await api<AkkaRouterInfoResponseType>(
    "GET",
    `${API_URL}/route?token0=${inputCurrencyId === NATIVE[chainId].symbol ? NATIVE_TOKEN_ADDRESS : token0?.wrapped?.address
    }&token1=${outputCurrencyId === NATIVE[chainId].symbol ? NATIVE_TOKEN_ADDRESS : token1?.wrapped?.address
    }&amount=${amount?.multiply(10 ** inputCurrency?.decimals)?.toExact()}&slipage=${slippage / 10000}&use_split=true&${chainId !== ChainId.CORE ? `chain_id=${chainId}` : `chain0=core&chain1=core`
    }`,
    {
      signal: controller.signal,
    }
  );

const getSwap = async (
  API_URL: string,
  chainId: ChainId,
  inputCurrencyId: string,
  outputCurrencyId: string,
  inputCurrency: Currency | ERC20Token,
  account: string,
  token0: Currency,
  token1: Currency,
  amount: CurrencyAmount<Currency>,
  slippage: number,
  controller: AbortController,
) =>
  await api<AkkaRouterArgsResponseType>(
    "GET",
    `${API_URL}/swap?token0=${inputCurrencyId === NATIVE[chainId].symbol ? NATIVE_TOKEN_ADDRESS : token0?.wrapped?.address
    }&token1=${outputCurrencyId === NATIVE[chainId].symbol ? NATIVE_TOKEN_ADDRESS : token1?.wrapped?.address
    }&amount=${amount?.multiply(10 ** inputCurrency?.decimals)?.toExact()}&slipage=${slippage / 10000}&use_split=true${account ? `&user_wallet_addr=${account}` : ''
    }&${chainId !== ChainId.CORE ? `chain_id=${chainId}` : `chain0=core&chain1=core`}`,
    {
      signal: controller.signal,
    }
  );

export { getSwap, getRoute };
