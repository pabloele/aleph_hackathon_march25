import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'DAI', name: 'Dai' }
];

export default function Wallet() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [rating, setRating] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Wallet</h1>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>{token.name}</option>
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
                className={`cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <Button onClick={() => setModalOpen(false)}>Confirmar</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
