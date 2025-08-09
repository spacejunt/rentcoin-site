export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: 'Missing address parameter' });
    }

    // Call Helius RPC for getBalance
    const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getBalance",
        params: [address]
      })
    });

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Unknown RPC error");
    }

    const lamports = data.result?.value ?? 0;
    const sol = lamports / 1e9;

    res.status(200).json({ address, sol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
