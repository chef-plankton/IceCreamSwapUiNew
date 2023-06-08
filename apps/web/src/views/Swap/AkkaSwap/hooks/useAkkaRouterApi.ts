import { ChainId, Currency, CurrencyAmount, NATIVE } from '@pancakeswap/sdk'
import { FAST_INTERVAL, NATIVE_TOKEN_ADDRESS } from 'config/constants'
import { useIsAkkaSwapModeActive, useIsAkkaSwapModeStatus } from 'state/global/hooks'
import { Field } from 'state/swap/actions'
import { useSwapState } from 'state/swap/hooks'
import useSWR, { Fetcher, useSWRConfig } from 'swr'
import { AkkaRouterArgsResponseType, AkkaRouterInfoResponseType } from './types'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCurrency } from 'hooks/Tokens'
import { captureMessage } from '@sentry/nextjs'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { getRoute, getSwap } from '../api'

// Call both apis route and args together in the same time
export const useAkkaRouterRouteWithArgs = (
  token0: Currency,
  token1: Currency,
  amount: CurrencyAmount<Currency>,
  slippage: number,
) => {
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const { chainId } = useActiveChainId()
  const { account, isConnected } = useActiveWeb3React()
  const API_URL = chainId === ChainId.CORE ? 'https://api.akka.foundation' : 'https://icecream.akka.finance'
  const [, , toggleSetAkkaModeToFalse, toggleSetAkkaModeToTrue] = useIsAkkaSwapModeStatus()
  // isAkkaSwapActive checks if akka router is generally active or not
  const [isAkkaSwapActive, toggleSetAkkaActive, toggleSetAkkaActiveToFalse, toggleSetAkkaActiveToTrue] =
    useIsAkkaSwapModeActive()

  const [route, setRoute] = useState(null);
  const [args, setArgs] = useState(null);
  const [routeLoading, setRouteLoading] = useState(true);
  const [argsLoading, setArgsLoading] = useState(true);
  
  useEffect(() => {
    setRouteLoading(true)
    setArgsLoading(true)
    if (token0 && token1 && amount && slippage && (chainId === ChainId.BITGERT || chainId === ChainId.XDC || chainId === ChainId.CORE) && isAkkaSwapActive) {
      const routeController = new AbortController();
      getRoute(
        API_URL,
        chainId,
        inputCurrencyId,
        outputCurrencyId,
        inputCurrency,
        account,
        token0,
        token1,
        amount,
        slippage,
        routeController
      )
        .then((data) => {
          setRoute(data);
          console.log("route:", data);
        })
        .catch((err) => {
          console.log("route:", err);
        })
        .finally(() => {
          setRouteLoading(false)
        })

      const swapController = new AbortController();
      isConnected &&
        account &&
        getSwap(
          API_URL,
          chainId,
          inputCurrencyId,
          outputCurrencyId,
          inputCurrency,
          account,
          token0,
          token1,
          amount,
          slippage,
          swapController
        )
          .then((data) => {
            setArgs(data);
            console.log("swap:", data);
          })
          .catch((err) => {
            console.log("swap:", err);
          })
          .finally(() => {
            setArgsLoading(false)
          })

      return () => {
        routeController.abort();
        swapController.abort();
      };
    }
  }, [
    chainId,
    inputCurrencyId,
    outputCurrencyId,
    inputCurrency,
    account,
    token0,
    token1,
    typedValue,
    slippage,
  ]);

  const mutateAkkaRoute = () => {
      
  }

  const isLoading = routeLoading || argsLoading

  return {
    route,
    args,
    mutateAkkaRoute,
    isLoading
  }
}