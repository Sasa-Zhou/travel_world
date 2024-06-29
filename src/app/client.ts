import { createThirdwebClient, defineChain, getContract } from "thirdweb";


// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || "392beea7b8561e63c3257c056bb75f37";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({ 
  client, 
  chain: defineChain(59141), 
  // address: "0xAf01DcE235146E906B19C55efba95F9173adE663"
  address: "0xE2a7Fc267432bCfb08cbD88113cc6CEF534b6B45"
});