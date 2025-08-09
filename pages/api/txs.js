export default async function handler(req, res) {
  try {
    const address = String(req.query.address || "");
    const limit = Math.min(Number(req.query.limit || 10), 25); // cap at 25 for safety

    if (!address) {
      return res.status(400).json({ error: "Missing address parameter" });
    }

    const rpcUrl = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

    // 1) Get recent signatures for this address
    const sigResp = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "getSigs",
        method: "getSignaturesForAddress",
        params: [
          address,
          { limit }   // number of signatures to return
        ]
      })
    });

    if (!sigResp.ok) {
      throw new Error(`Helius RPC error: ${sigResp.statusText}`);
    }

    const sigJson = await sigResp.json();
    if (sigJson.error) {
      throw new Error(sigJson.error.message || "Unknown RPC error (getSignaturesForAddress)");
    }

    const sigs = (sigJson.result || []).map(s => s.signature);
    if (sigs.length === 0) {
      return res.status(200).json({ address, count: 0, txs: [] });
    }

    // 2) Fetch parsed transactions for those signatures
    const txResp = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "getParsedTxs",
        method: "getParsedTransactions",
        params: [
          sigs,
          { maxSupportedTransactionVersion: 0 } // standard parsed output
        ]
      })
    });

    if (!txResp.ok) {
      throw new Error(`Helius RPC error: ${txResp.statusText}`);
    }

    const txJson = await txResp.json();
    if (txJson.error) {
      throw new Error(txJson.error.message || "Unknown RPC error (getParsedTransactions)");
    }

    const parsed = txJson.result || [];

    const simplified = parsed.map((tx, i) => ({
      signature: sigs[i],
      slot: tx?.slot ?? null,
      // blockTime is UNIX seconds; may be null for very recent
      timestamp: tx?.blockTime ?? null,
      // try to extract a simple "type" hint from the first instruction if present
      type: tx?.transaction?.message?.instructions?.[0]?.programId || null
    }));

    return res.status(200).json({
      address,
      count: simplified.length,
      txs: simplified
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
