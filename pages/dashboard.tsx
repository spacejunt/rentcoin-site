import Head from 'next/head';
import { useEffect, useState } from 'react';

// TODO: replace these with your real addresses when ready
const LANDLORD_VAULT_ADDRESS = '7vPHGVBpRe4DFih7CkZLzuVGEkWzdDnXTBWYADXfW9EB';
const TENANT_RELIEF_OWNER = 'GWsSBGcHMdXSLaaqKeRDkP3JcE4oT8oY4gG1ZMTiTLCt';
// This should be the token mint address for $RENT (once you deploy it)
const RENT_TOKEN_MINT = 'EnterYourRentTokenMintHere';

/**
 * Dashboard (Tenant Portal) for $RENT holders.
 *
 * In production this page will call the Helius API to fetch real-time
 * vault balances, burn history and compute eviction risk. To keep this
 * template self‑contained, the data is currently mocked via useState.
 *
 * Replace the `TODO` sections with actual API calls once you have your
 * Helius API key. See https://www.helius.dev/docs/api-reference for details.
 */
export default function Dashboard() {
  // Mocked state values
  const [landlordSol, setLandlordSol] = useState<number | null>(null);
  const [tenantRelief, setTenantRelief] = useState<number | null>(null);
  const [burnHistory, setBurnHistory] = useState<any[]>([]);
  const [evictionRisk, setEvictionRisk] = useState<number>(0);
  const [rentPaid, setRentPaid] = useState<number>(0);
  const [txs, setTxs] = useState<{ signature: string; timestamp: number | null; type?: string | null }[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  useEffect(() => {
  async function load() {
    try {
      setErrorMsg(null);

      // 1) Landlord Vault SOL balance
      if (LANDLORD_VAULT_ADDRESS) {
        const r1 = await fetch(`/api/sol-balance?address=${LANDLORD_VAULT_ADDRESS}`);
        const d1 = await r1.json();
        if (!r1.ok) throw new Error(d1.error || 'SOL balance fetch failed');
        setLandlordSol(d1.sol);
      }

      // 2) TRF $RENT balance — only fetch when you have a real mint set
      if (TENANT_RELIEF_OWNER && RENT_TOKEN_MINT !== 'EnterYourRentTokenMintHere') {
        const r2 = await fetch(`/api/token-balance?owner=${TENANT_RELIEF_OWNER}&mint=${RENT_TOKEN_MINT}`);
        const d2 = await r2.json();
        if (!r2.ok) throw new Error(d2.error || 'Token balance fetch failed');
        setTenantRelief(d2.uiAmount); // human-readable amount
      }

      // 3) Recent transactions for Landlord Vault
      if (LANDLORD_VAULT_ADDRESS) {
        const r3 = await fetch(`/api/txs?address=${LANDLORD_VAULT_ADDRESS}&limit=10`);
        const d3 = await r3.json();
        if (!r3.ok) throw new Error(d3.error || 'Tx fetch failed');
        setTxs(d3.txs || []);
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  }

  load();
}, []);


  return (
    <>
      <Head>
        <title>$RENT Dashboard – Tenant Portal</title>
        <meta name="description" content="View $RENT vault balances, burn history, and eviction risk." />
      </Head>
      <main className="min-h-screen px-4 py-8">
        <div className="windows-frame flex flex-col items-center justify-center min-h-screen">
          <div className="windows-window w-full max-w-5xl mx-auto border border-[#222] rounded-lg shadow-[4px_4px_0_#222] bg-[#f3f3f3]">
            <div className="windows-titlebar flex items-center px-4 py-2 bg-gradient-to-r from-[#1565c0] to-[#42a5f5] border-b border-[#222] rounded-t-lg">
              <span className="font-bold text-white text-lg tracking-wide drop-shadow">Tenant Portal</span>
            </div>
            <div className="windows-content p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Landlord Vault Widget */}
                <div className="card" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Landlord Vault (SOL)</h2>
                  <p className="text-2xl font-bold" style={{color:'#1976d2'}}>
                    {landlordSol !== null ? `${landlordSol.toFixed(2)} SOL` : '–'}
                  </p>
                  <p className="text-xs mt-1">Daily burns by the slumlord happen automatically at 4:20 UTC.</p>
                </div>
                {/* Tenant Relief Fund Widget */}
                <div className="card" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Tenant Relief Fund ($RENT)</h2>
                  <p className="text-2xl font-bold" style={{color:'#1976d2'}}>
                    {tenantRelief !== null ? tenantRelief.toLocaleString() : '–'}
                  </p>
                  <p className="text-xs mt-1">Next airdrop in: <span className="font-medium">6d 12h</span></p>
                </div>
                {/* Burn History */}
                <div className="card md:col-span-2" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Burn & Dump History</h2>
                  <table className="windows-table min-w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Burned (SOL)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {burnHistory.map((item) => (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>{item.amount} SOL</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card md:col-span-2" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Recent Vault Transactions</h2>
  {txs.length === 0 ? (
    <p className="text-sm text-gray-600 px-4 pb-4">No data yet (or invalid address).</p>
  ) : (
    <ul className="px-4 pb-4 space-y-2">
      {txs.map((t) => (
        <li key={t.signature}>
          <a
            href={`https://solscan.io/tx/${t.signature}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {t.signature.slice(0, 8)}…{t.signature.slice(-8)}
          </a>
          <span className="text-gray-600">
            {' '}— {t.timestamp ? new Date(t.timestamp * 1000).toLocaleString() : 'pending'}
          </span>
          {t.type ? <span className="text-gray-500"> ({t.type})</span> : null}
        </li>
      ))}
    </ul>
  )}
</div>
                {/* Eviction Risk Meter */}
                <div className="card" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Eviction Risk Meter</h2>
                  <div style={{ width: '100%', height: '16px', background: '#e5e9f7', borderRadius: '8px', overflow: 'hidden', border: '2px solid #222' }}>
                    <div
                      style={{
                        height: '100%',
                        background: '#d32f2f',
                        width: `${evictionRisk}%`,
                        transition: 'width 0.3s'
                      }}
                    ></div>
                  </div>
                  <p className="text-sm mt-2">
                    Current eviction risk: <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>{evictionRisk}%</span>
                  </p>
                </div>
                {/* Rent Calculator */}
                <div className="card" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Rent Calculator</h2>
                  <p className="text-sm mb-4">
                    Connect your Solana wallet to calculate the total rent (taxes) you've paid in SOL.
                  </p>
                  <button
                    className="windows-btn"
                    onClick={() => alert('Wallet connection coming soon!')}
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}