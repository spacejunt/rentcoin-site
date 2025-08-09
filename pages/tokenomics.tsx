import Head from 'next/head';

/**
 * Tokenomics page (Lease Agreement) for the $RENT memecoin.
 * This page outlines the total supply, tax structure, and rules for the
 * Landlord Vault and Tenant Relief Fund. The content is static and can be
 * updated by modifying the table rows below. Tailwind CSS is used for styling.
 */
export default function Tokenomics() {
  return (
    <>
      <Head>
        <title>$RENT Tokenomics – Lease Agreement</title>
        <meta
          name="description"
          content="Learn about $RENT's supply, transaction taxes and vault mechanics."
        />
      </Head>
      <main className="min-h-screen px-4 py-8">
        <div className="windows-frame flex flex-col items-center justify-center min-h-screen">
          <div className="windows-window w-full max-w-4xl mx-auto border border-[#222] rounded-lg shadow-[4px_4px_0_#222] bg-[#f3f3f3]">
            <div className="windows-titlebar flex items-center px-4 py-2 bg-gradient-to-r from-[#1565c0] to-[#42a5f5] border-b border-[#222] rounded-t-lg">
              <span className="font-bold text-white text-lg tracking-wide drop-shadow">The Lease Agreement</span>
            </div>
            <div className="windows-content p-6">
              <h1 className="text-3xl md:text-5xl font-bold text-center mb-8" style={{color:'#1565c0',textShadow:'1px 1px 0 #b0b0b0'}}>The Lease Agreement</h1>
              <p className="mb-4 text-lg text-center">Dive into the mechanics that make $RENT a satirical take on the rent extraction economy. Below you'll find the total supply, tax distribution and vault rules.</p>
              {/* Tokenomics Table */}
              <div className="overflow-x-auto mb-8">
                <table className="windows-table min-w-full text-left text-sm" style={{border:'2px solid #222',boxShadow:'2px 2px 0 #222'}}>
                  <thead className="uppercase text-xs bg-[#e3e3e3] text-gray-700">
                    <tr>
                      <th className="py-3 px-4">Parameter</th>
                      <th className="py-3 px-4">Value</th>
                      <th className="py-3 px-4">Mechanic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ...existing table rows... */}
                  </tbody>
                </table>
                <h2 className="text-2xl font-semibold text-[color:var(--foreground)] mb-2 mt-8">
                  Tenant Relief Fund (TRF) Rules
                </h2>
                <ul className="list-disc list-inside mb-6 text-[color:var(--foreground)]">
                  <li>
                    <strong>Security Deposit Airdrops:</strong> Weekly (Sunday at
                    20:00&nbsp;UTC), 10% of the TRF is randomly distributed to 100
                    wallets holding more than 1&nbsp;million $RENT.
                  </li>
                  <li>
                    <strong>Rent Strike Voting:</strong> Holders with at least
                    10&nbsp;million $RENT can vote monthly on how to use the TRF:
                    buyback/burn, LP acquisition, or meme contest prizes.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}