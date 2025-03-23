export const reputationABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "worldId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			}
		],
		"name": "Rated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "worldId",
				"type": "bytes32"
			}
		],
		"name": "getAverageScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "worldId",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			}
		],
		"name": "rateUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]