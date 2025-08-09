import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const address = String(req.query.address || '');
    if (!address) {
      res.status(400).json({ error: 'Missing address parameter' });
      return;
    }

    const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'getBalance',
        method: 'getBalance',
        params: [address],
      }),
    });

    if (!response.ok) {
      throw new Error(`Helius RPC error: ${response.statusText}`);
    }

    const data: any = await response.json();
    if (data?.error) {
      throw new Error(data.error.message || 'Unknown RPC error');
    }

    const lamports: number = data?.result?.value ?? 0;
    const sol = lamports / 1e9;

    res.status(200).json({ address, sol });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

