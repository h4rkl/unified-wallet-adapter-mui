# Unified Wallet Kit MUI

![Demo GIF](https://github.com/h4rkl/unified-wallet-adapter-mui/blob/master/public/mui-jup.gif?raw=true)

Unified Wallet Kit MUI is a Material UI (v6) implementation of `@jup-ag/wallet-adapter` with MUI styles over tailwind.

NPM: https://www.npmjs.com/package/@harkl/unified-wallet-adapter-mui

## Motives

- `@jup-ag/wallet-adapter` provides a great user experience 
- not everyone loves tailwind
- [legendsofsol.com](https://legendsofsol.com) uses MUI under the hood and needed a good wallet adapter

## Core features

- [x] Fully integrated with Material UI v6 components
- [x] Built-in Wallet Standard, Mobile Wallet Adapter support
- [x] Abstracted wallet adapter, with a BYOW (Bring your own wallets) approach
- [x] Mobile responsive design
- [x] MUI core notification system integration
- [x] Internationalization (i18n) with translation support
- [x] Theming - Light and Dark modes using native MUI theming

## Getting Started

1. Install the package:
```bash
npm i @harkl/unified-wallet-adapter-mui
```

2. Set up your wallet context:

First, create a wallet context provider that wraps your application:

```tsx
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { UnifiedWalletProvider } from "@harkl/unified-wallet-adapter-mui";
import theme from "./theme";

export const WalletContext = ({ children }) => {
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_NETWORK;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <UnifiedWalletProvider
        wallets={[]}
        config={{
          autoConnect: true,
          env: process.env.NODE_ENV === "production" ? "mainnet-beta" : "devnet",
          metadata: {
            name: "Your App Name",
            description: "Your App Description",
            url: "https://yourapp.com",
            iconUrls: ["/favicon.png"],
          },
          theme,
          lang: "en",
        }}
      >
        {children}
      </UnifiedWalletProvider>
    </ConnectionProvider>
  );
};
```

3. Wrap your app with the providers:

```tsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import { WalletContext } from "./WalletContext";

function App({ Component, pageProps }) {
  return (
    <WalletContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </WalletContext>
  );
}
```

4. Use the wallet components in your app:

```tsx
import { UnifiedWalletButton } from "@harkl/unified-wallet-adapter-mui";

const YourComponent = () => {
  return (
    <div>
      <UnifiedWalletButton />
    </div>
  );
};
```

## Configuration Options

The `UnifiedWalletProvider` accepts the following configuration:

- `wallets`: Array of wallet adapters you want to support
- `config`:
  - `autoConnect`: Boolean to enable automatic wallet connection
  - `env`: Solana network environment ('mainnet-beta' or 'devnet')
  - `metadata`: Your application metadata
  - `theme`: MUI theme object
  - `lang`: Language setting for i18n support

## Components

- `UnifiedWalletProvider` - Main context provider that manages wallet state
- `UnifiedWalletButton` - Button component to connect/disconnect wallet
- `CurrentUserBadge` - Display currently connected wallet with address
- `PreviewFunctionality` - Component to preview wallet functionality

## More features

All other features and philosophies are inline with the parent repo at `@jup-ag/wallet-adapter`.

## Support

Support @harkl by getting an upgradable Legends of SOL NFT with its own custom traits at [Tensor](https://www.tensor.trade/trade/legends_of_sol) or buying some [$LEGEND](https://app.meteora.ag/pools/wGE6ab1eDxT2pJenpLkF8SkHLxkqMP2rgdnviZnoQCN). All Legends NFTs can be customised at [legendsofsol.com](https://legendsofsol.com).

