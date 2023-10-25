import { ChainId } from "@icecreamswap/constants"

export const setRouteApiChainName = (chainId: ChainId) => {
    switch (chainId) {
        case ChainId.CORE:
            return "core"
        case ChainId.BITGERT:
            return "bitgert"
        case ChainId.XDC:
            return "xdc"
        case ChainId.TELOS:
            return "teloschain"
        case ChainId.BASE:
            return "base"
        case ChainId.SHIMMER:
            return "shimmer"
        default:
            return ""
    }
}
