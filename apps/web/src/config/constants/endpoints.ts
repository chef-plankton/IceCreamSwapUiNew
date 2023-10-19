import { ChainId } from '@pancakeswap/sdk'

export const STABLESWAP_SUBGRAPH_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-stableswap'
export const GRAPH_HEALTH = 'https://the-graph-status.icecreamswap.com/graphql'

export const FARM_API = 'https://farms.pancake-swap.workers.dev'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const ACCESS_RISK_API = 'https://red.alert.pancakeswap.com/red-api'

export const CELER_API = 'https://api.celerscan.com/scan'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BITGERT]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v2-bitgert',
  [ChainId.XDC]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v2-xdc',
  [ChainId.CORE]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v2-core',
  [ChainId.SCROLL]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v2-scroll',
}

export const BLOCKS_CLIENT_WITH_CHAIN: Partial<Record<ChainId, string>> = {
  [ChainId.BITGERT]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/blocks-bitgert',
  [ChainId.XDC]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/blocks-xdc',
  [ChainId.CORE]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/blocks-core',
  [ChainId.SCROLL]: 'https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/blocks-scroll',
}

export const INFO_CLIENT_BITGERT = INFO_CLIENT_WITH_CHAIN[ChainId.BITGERT]
export const BLOCKS_CLIENT_BITGERT = BLOCKS_CLIENT_WITH_CHAIN[ChainId.BITGERT]

export const INFO_CLIENT_XDC = INFO_CLIENT_WITH_CHAIN[ChainId.XDC]
export const BLOCKS_CLIENT_XDC = BLOCKS_CLIENT_WITH_CHAIN[ChainId.XDC]

export const INFO_CLIENT_CORE = INFO_CLIENT_WITH_CHAIN[ChainId.CORE]
export const BLOCKS_CLIENT_CORE = BLOCKS_CLIENT_WITH_CHAIN[ChainId.CORE]

export const INFO_CLIENT_SCROLL = INFO_CLIENT_WITH_CHAIN[ChainId.SCROLL]
export const BLOCKS_CLIENT_SCROLL = BLOCKS_CLIENT_WITH_CHAIN[ChainId.SCROLL]
