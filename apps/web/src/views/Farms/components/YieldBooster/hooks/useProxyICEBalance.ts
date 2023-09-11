import { getIceContract } from 'utils/contractHelpers'
import { getBalanceNumber } from '@pancakeswap/utils/formatBalance'
import { useBCakeProxyContractAddress } from 'views/Farms/hooks/useBCakeProxyContractAddress'
import BigNumber from 'bignumber.js'
import { useContractRead } from 'wagmi'
import useAccountActiveChain from 'hooks/useAccountActiveChain'

const useProxyICEBalance = () => {
  const { account, chainId } = useAccountActiveChain()
  const { proxyAddress } = useBCakeProxyContractAddress(account, chainId)
  const cakeContract = getIceContract()

  const { data, refetch } = useContractRead({
    chainId,
    ...cakeContract,
    enabled: Boolean(account && proxyAddress),
    functionName: 'balanceOf',
    args: [proxyAddress],
  })

  return {
    refreshProxyCakeBalance: refetch,
    proxyCakeBalance: data ? getBalanceNumber(new BigNumber(data.toString())) : 0,
  }
}

export default useProxyICEBalance
