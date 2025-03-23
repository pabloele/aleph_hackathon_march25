import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_CLIENT_ID;
console.log("CLIEEEEEEEEEEEEEEEEEEENT", clientId);

export const chain = baseSepolia;

export const client = createThirdwebClient({
	clientId: "89743bc439597ec42196953108a00bb5",
});

// export const accountAbstraction = {
// 	chain,
// 	factoryAddress: process.env.NEXT_PUBLIC_ACCOUNT_FACTORY,
// 	sponsorGas: true,
// };

// export const thirdwebRouterContract = getContract({
// 	address: process.env.NEXT_PUBLIC_ROUTER,
// 	chain,
// 	client,
// });

// export const thirdwebWethContract = getContract({
// 	address: process.env.NEXT_PUBLIC_WETH_ADDRESS,
// 	chain,
// 	client,
// });
