import Head from 'next/head';

/**
 * How To Buy page (Squatter’s Guide) for new users. It provides a simple
 * four‑step walkthrough explaining how to purchase $RENT through pump.fun
 * and, after graduation, on PumpSwap or Raydium. A swap widget should
 * eventually be embedded here (e.g. Birdeye widget), but a placeholder
 * call-to-action is provided for now.
 */
export default function HowToBuy() {
  const steps = [
    {
      title: 'Get a Solana Wallet',
      description:
        'Download a Solana wallet like Phantom or Solflare and fund it with a small amount of SOL.',
    },
    {
      title: 'Go to Pump.fun',
      description:
        'Visit pump.fun and search for the $RENT token. Connect your wallet when prompted.',
    },
    {
      title: 'Buy on the Bonding Curve',
      description:
        'Use the purchase panel to buy $RENT tokens directly from the bonding curve. You can always sell back to the curve as well.',
    },
    {
      title: 'Trade on PumpSwap/Raydium',
      description:
        'After $RENT graduates (around the 800 M sold mark), trading moves to PumpSwap automatically【962494713582683†L117-L159】. You can also provide liquidity on Raydium manually once the migration completes.',
    },
  ];
  return (
    <>
      <Head>
        <title>How to Buy $RENT – Squatter’s Guide</title>
      </Head>
      <main className="min-h-screen px-4 py-8">
        <div className="windows-frame flex flex-col items-center justify-center min-h-screen">
          <div className="windows-window w-full max-w-3xl mx-auto border border-[#222] rounded-lg shadow-[4px_4px_0_#222] bg-[#f3f3f3]">
            <div className="windows-titlebar flex items-center px-4 py-2 bg-gradient-to-r from-[#1565c0] to-[#42a5f5] border-b border-[#222] rounded-t-lg">
              <span className="font-bold text-white text-lg tracking-wide drop-shadow">Squatter’s Guide</span>
            </div>
            <div className="windows-content p-6">
              <h1 className="text-3xl md:text-5xl font-bold text-center mb-8" style={{color:'#1565c0',textShadow:'1px 1px 0 #b0b0b0'}}>Squatter’s Guide</h1>
              <p className="text-center text-lg mb-6">Ready to pay your rent? Follow these four simple steps to become a tenant in the $RENT ecosystem.</p>
              <ol className="max-w-2xl mx-auto space-y-6">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-8 w-8 rounded bg-[#1565c0] text-white flex items-center justify-center mr-4 font-bold windows-btn" style={{border:'2px solid #222'}}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1" style={{color:'#1565c0'}}>{step.title}</h3>
                      <p className="text-base text-gray-700">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}