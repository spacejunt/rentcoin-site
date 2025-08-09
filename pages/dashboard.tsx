import Head from 'next/head';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    // TODO: Replace this mock with real API calls
    // Example: fetch landlord vault balance
    // const response = await fetch(...);
    // setLandlordSol(...);
    // setTenantRelief(...);
    // setBurnHistory(...);
    // setEvictionRisk(...);
    // setRentPaid(...);
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
                  <p className="text-xs mt-1">Daily burns happen automatically at 00:00 UTC.</p>
                </div>
                {/* Tenant Relief Fund Widget */}
                <div className="card" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <h2 style={{background:'#e3e3e3',borderBottom:'2px solid #b0b0b0',padding:'0.5rem 1rem',margin:'-1.5rem -1.5rem 1rem -1.5rem',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',color:'#1565c0',fontWeight:'bold',fontSize:'1.2rem'}}>Tenant Relief Fund ($RENT)</h2>
                  <p className="text-2xl font-bold" style={{color:'#1976d2'}}>
                    {tenantRelief !== null ? `${(tenantRelief / 1e6).toFixed(2)}M` : '–'}
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