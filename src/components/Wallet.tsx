import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/config/web3Client";
import { baseSepolia, defineChain } from "thirdweb/chains";

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
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="p-4 max-w-md mx-auto">
			<div className="flex flex-row align-center justify-between mb-4">
				{/* <h1 className="text-3xl font-bold mb-4">Wallet</h1> */}
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
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<select
					value={selectedToken}
					onChange={(e) => setSelectedToken(e.target.value)}
					className="border p-2 w-full mb-2"
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
					className="border p-2 w-full mb-2"
				/>
				<input
					type="text"
					placeholder={`Monto en ${selectedToken}`}
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="border p-2 w-full mb-2"
				/>
				<Button onClick={() => setModalOpen(true)}>Enviar Pago</Button>

				<DialogContent>
					<DialogHeader>
						<DialogTitle>Califica al vendedor</DialogTitle>
					</DialogHeader>
					<div className="flex justify-center mt-4">
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
					<Button onClick={() => setModalOpen(false)}>Confirmar</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
}
