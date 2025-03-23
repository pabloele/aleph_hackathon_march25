import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/config/web3Client";
import { baseSepolia, defineChain } from "thirdweb/chains";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";
import { ethers } from "ethers";

const contractAddress = "0xD85fa669BD63AaaB92BF91f7007dB9e60B1a80BF";

const tokens = [
	{ symbol: "ETH", name: "ETH" },
	// { symbol: "USDC", name: "USD Coin" },
	// { symbol: "DAI", name: "Dai" },
];

export default function Wallet() {
	const [amount, setAmount] = useState("");
	const [recipient, setRecipient] = useState("");
	const [selectedToken, setSelectedToken] = useState("ETH");
	const [rating, setRating] = useState(0);
	const [existingRating, setExistingRating] = useState(0);

	const account = useActiveAccount();
	const [balance, setBalance] = useState("0");

	const provider = ethers5Adapter.provider.toEthers({
		client,
		chain: baseSepolia,
	});

	const contract = new ethers.Contract(
		contractAddress,
		[
			// ABI
			"function getAverageScore(bytes32 worldId) external view returns (uint256)",
			"function rateUser(bytes32 worldId, uint8 score) external",
		],
		provider
	);

	useEffect(() => {
		const fetchBalance = async () => {
			if (account?.address) {
				const balanceWei = await provider.getBalance(account?.address);
				setBalance(ethers.utils.formatEther(balanceWei));
			}
		};
		fetchBalance();
	}, [account]);
	useEffect(() => {
		const fetchRating = async () => {
			console.log(contract);
			console.log(recipient);
			console.log("hola");

			if (recipient) {
				const worldId = ethers.utils.id(recipient);
				try {
					const score = await contract.getAverageScore(worldId);
					console.log("SCORE!", score.toString());
					setExistingRating(score.toNumber());
				} catch (error) {
					console.error("Error al obtener la calificación:", error);
				}
			}
		};
		fetchRating();
	}, [recipient]);
	useEffect(() => {
		const fetchExistingRating = async () => {
			if (account?.address) {
				const worldId = ethers.utils.id(account?.address);
				const currentRating = await contract.getAverageScore(worldId);
				setExistingRating(currentRating.toNumber());
				setRating(currentRating.toNumber());
			}
		};
		fetchExistingRating();
	}, [account]);

	const sendTransaction = async () => {
		if (!account) {
			alert("Conecta tu wallet primero.");
			return;
		}

		try {
			const signer = await ethers5Adapter.signer.toEthers({
				client: client,
				chain: baseSepolia,
				account: account,
			});
			const balanceWei = await provider.getBalance(account?.address);
			const amountWei = ethers.utils.parseEther(amount || "0");

			if (amountWei.gt(balanceWei)) {
				alert("Fondos insuficientes.");
				return;
			}

			// Enviar la transacción
			const tx = await signer.sendTransaction({
				to: recipient,
				value: amountWei.toString(),
			});

			alert(`Transacción enviada! Hash: ${tx.hash}`);

			const worldId = ethers.utils.id(recipient);
			const contractWithSigner = contract.connect(signer);
			await contractWithSigner.rateUser(worldId, rating);

			alert("Calificación guardada!");
		} catch (error) {
			console.error("Error en la transacción:", error);
			alert("Hubo un error al enviar el pago.");
		}
	};

	const handlePay = async () => {
		await sendTransaction();
	};

	return (
		<div className="p-4 max-w-md mx-auto">
			<div className="flex flex-row align-center justify-between mb-4">
				<ConnectButton
					client={client}
					chain={defineChain(baseSepolia)}
					connectButton={{
						label: "Conectar Wallet",
						style: {
							marginTop: 20,
							background: "#d5841b",
							color: "white",
							fontSize: 20,
							boxShadow:
								"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
						},
					}}
				/>
			</div>
			<div className="mt-4 mb-4 p-3 border rounded">
				<p className="font-medium">Balance: {balance} ETH</p>
			</div>
			<select
				value={selectedToken}
				onChange={(e) => setSelectedToken(e.target.value)}
				className="border p-2 w-full mb-2 text-black"
			>
				{tokens.map((token) => (
					<option key={token.symbol} value={token.symbol}>
						{token.name}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Dirección del destinatario"
				value={recipient}
				onChange={(e) => setRecipient(e.target.value)}
				className="border p-2 w-full mb-2 text-black"
			/>
			<input
				type="text"
				placeholder={`Monto en ${selectedToken}`}
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				className="border p-2 w-full mb-2 text-black"
			/>

			<div className="mb-4">
				<p className="font-medium">Calificación actual: {existingRating}</p>
				<p className="font-medium">Califica al destinatario:</p>
				<div className="flex justify-center mt-2">
					{[1, 2, 3, 4, 5].map((star) => (
						<Star
							key={star}
							onClick={() => setRating(star)}
							className={`cursor-pointer ${
								rating >= star ? "text-yellow-400" : "text-gray-400"
							}`}
						/>
					))}
				</div>
			</div>

			<Button onClick={handlePay} className="w-full" disabled={rating === 0}>
				Pagar
			</Button>
		</div>
	);
}

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Star } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
// import { ConnectButton, useActiveAccount } from "thirdweb/react";
// import { client } from "@/config/web3Client";
// import { baseSepolia, defineChain } from "thirdweb/chains";
// import { ethers5Adapter } from "thirdweb/adapters/ethers5";
// import { BigNumber, ethers } from "ethers";

// const tokens = [
// 	{ symbol: "ETH", name: "ETH" },
// 	// { symbol: "USDC", name: "USD Coin" },
// 	// { symbol: "DAI", name: "Dai" },
// ];

// export default function Wallet() {
// 	const [amount, setAmount] = useState("");
// 	const [recipient, setRecipient] = useState("");
// 	const [selectedToken, setSelectedToken] = useState("ETH");
// 	const [rating, setRating] = useState(0);
// 	const [modalOpen, setModalOpen] = useState(false);
// 	const account = useActiveAccount();
// 	const [balance, setBalance] = useState("0");
// 	const provider = ethers5Adapter.provider.toEthers({
// 		client,
// 		chain: baseSepolia,
// 	});

// 	useEffect(() => {
// 		const fetchBalance = async () => {
// 			console.log(account?.address);

// 			if (account?.address) {
// 				const balanceWei = await provider.getBalance(account?.address);
// 				setBalance(ethers.utils.formatEther(balanceWei));
// 			}
// 		};
// 		fetchBalance();
// 	}, [account]);

// 	const sendTransaction = async () => {
// 		if (!account) {
// 			alert("Conecta tu wallet primero.");
// 			return;
// 		}

// 		try {
// 			const signer = await ethers5Adapter.signer.toEthers({
// 				client: client,
// 				chain: baseSepolia,
// 				account: account,
// 			});

// 			const balanceWei = await provider.getBalance(account?.address);
// 			console.log("Balance Wei", balanceWei);

// 			const balanceEth = ethers.utils.formatEther(balanceWei);
// 			console.log("Balance ETH", balanceEth);

// 			const amountWei = ethers.utils.parseEther(amount || "0");
// 			console.log("Amount Wei", amountWei, amountWei.toString());

// 			if (amountWei.gt(balanceWei)) {
// 				alert("Fondos insuficientes.");
// 				return;
// 			}

// 			// Use the signer to send the transaction instead of provider
// 			const tx = await signer.sendTransaction({
// 				to: recipient,
// 				value: amountWei.toString(), // Convert BigNumber to string
// 			});

// 			alert(`Transacción enviada! Hash: ${tx.hash}`);
// 		} catch (error) {
// 			console.error("Error en la transacción:", error);
// 			alert("Hubo un error al enviar el pago.");
// 		}
// 	};

// 	const handlePay = async () => {
// 		await sendTransaction();
// 		setModalOpen(true);
// 	};

// 	return (
// 		<div className="p-4 max-w-md mx-auto">
// 			<div className="flex flex-row align-center justify-between mb-4">
// 				{/* <h1 className="text-3xl font-bold mb-4">Wallet</h1> */}
// 				<ConnectButton
// 					client={client}
// 					chain={defineChain(baseSepolia)}
// 					connectButton={{
// 						label: "Conectar Wallet",
// 						style: {
// 							marginTop: 20,
// 							background: "#d5841b",
// 							color: "white",
// 							fontSize: 20,
// 							boxShadow:
// 								"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
// 						},
// 					}}
// 				/>
// 			</div>

// 			<div className="mt-4 mb-4 p-3 border rounded">
// 				<p className="font-medium">Balance: {balance} ETH</p>
// 			</div>

// 			<select
// 				value={selectedToken}
// 				onChange={(e) => setSelectedToken(e.target.value)}
// 				className="border p-2 w-full mb-2 text-black"
// 			>
// 				{tokens.map((token) => (
// 					<option key={token.symbol} value={token.symbol}>
// 						{token.name}
// 					</option>
// 				))}
// 			</select>
// 			<input
// 				type="text"
// 				placeholder="Dirección del destinatario"
// 				value={recipient}
// 				onChange={(e) => setRecipient(e.target.value)}
// 				className="border p-2 w-full mb-2 text-black"
// 			/>
// 			<input
// 				type="text"
// 				placeholder={`Monto en ${selectedToken}`}
// 				value={amount}
// 				onChange={(e) => setAmount(e.target.value)}
// 				className="border p-2 w-full mb-2 text-black"
// 			/>
// 			<Button onClick={handlePay} className="w-full">
// 				Pagar
// 			</Button>

// 			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
// 				<DialogContent>
// 					<DialogHeader>
// 						<DialogTitle>Califica al vendedor</DialogTitle>
// 					</DialogHeader>
// 					<div className="flex justify-center mt-4">
// 						{[1, 2, 3, 4, 5].map((star) => (
// 							<Star
// 								key={star}
// 								onClick={() => setRating(star)}
// 								className={`cursor-pointer ${
// 									rating >= star ? "text-yellow-400" : "text-gray-400"
// 								}`}
// 							/>
// 						))}
// 					</div>
// 					<Button onClick={() => setModalOpen(false)}>Confirmar</Button>
// 				</DialogContent>
// 			</Dialog>
// 		</div>
// 	);
// }
