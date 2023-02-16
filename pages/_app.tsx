import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
    provider: getDefaultProvider('testnet'),
    autoConnect: true
})

export default function App({ Component, pageProps } : any) {
    return (
        <WagmiConfig client={client}>
            <Component {...pageProps} />
        </WagmiConfig>
    )
}