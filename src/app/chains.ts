import { defineChain } from "thirdweb";


export const lineaSepolia = defineChain({
      "chain": "ETH",
      "id": 59141,
      "blockExplorers": [
        {
          "name": "Etherscan",
          "url": "https://sepolia.lineascan.build",
        //   "standard": "EIP3091"
        }
      ],
      "name": "Linea Sepolia",
      "nativeCurrency": {
        "name": "Linea Ether",
        "symbol": "ETH",
        "decimals": 18
      },
      "networkId": 59141,
      "rpc": "https://rpc.sepolia.linea.build",
      "shortName": "linea-sepolia",
      "slip44": 1,
      "slug": "linea-sepolia",
      "status": "active",
      "testnet": true,
      "title": "Linea Sepolia Testnet"
});