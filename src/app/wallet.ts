import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";

export const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "google",
          "apple",
          "facebook",
          "email",
          "phone",
        ],
      },
    }),
    createWallet("com.trustwallet.app"),
    createWallet("io.zerion.wallet"),
    createWallet("me.rainbow"),
];
