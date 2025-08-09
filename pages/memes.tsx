import Head from 'next/head';

/**
 * Meme Gallery page where users can explore community creations and generate
 * their own "Eviction Notice" memes. This template includes a grid of
 * placeholder images; in production you should fetch actual meme submissions
 * from your back‑end or a storage bucket. You can also integrate an image
 * upload feature and an Eviction Notice generator tool using a canvas API.
 */
export default function MemeGallery() {
  // Array of placeholder images. Replace these with real meme URLs.
  const placeholderMemes = Array.from({ length: 9 }).map((_, idx) => `https://via.placeholder.com/400x300/ffe57f/222?text=Meme+${idx + 1}`);
  return (
    <>
      <Head>
        <title>$RENT Meme Gallery – Tenant Complaints</title>
        {/* Import pixel font for retro look */}
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <main className="min-h-screen px-4 py-8" style={{background: 'linear-gradient(135deg, #6ee7f7 0%, #f3f3f3 100%)'}}>
        <div className="windows-frame flex flex-col items-center justify-center min-h-screen">
          <div className="windows-window w-full max-w-5xl mx-auto">
            <div className="windows-titlebar flex items-center px-4 py-2">
              <span className="font-bold text-white text-lg tracking-wide drop-shadow" style={{fontFamily: 'Press Start 2P', letterSpacing: '2px'}}>🗯️ Tenant Complaints</span>
            </div>
            <div className="windows-content p-6">
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-8" style={{color:'#d500f9',textShadow:'2px 2px 0 #222',fontFamily:'Press Start 2P',letterSpacing:'2px'}}>Tenant Complaints</h1>
              <p className="text-center text-lg mb-6" style={{color:'#f59e42',fontFamily:'Press Start 2P',textShadow:'1px 1px 0 #222'}}>Browse and share memes about your eviction struggles.<br/>Top submissions win <span style={{color:'#d500f9'}}>$RENT</span> from the Tenant Relief Fund every week.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {placeholderMemes.map((src, i) => (
                  <div key={i} className="card overflow-hidden flex flex-col items-center justify-center" style={{border:'4px solid #ffb300',boxShadow:'4px 4px 0 #d500f9',borderRadius:'12px',background:'linear-gradient(135deg,#fffde7 0%,#f3f3f3 100%)'}}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Meme ${i + 1}`} className="w-full h-auto object-cover" style={{borderRadius:'8px',border:'3px solid #d500f9',boxShadow:'2px 2px 0 #ffb300'}} />
                    <div className="mt-2 text-center" style={{fontFamily:'Press Start 2P',color:'#ec4899',fontSize:'0.9rem',textShadow:'1px 1px 0 #222'}}>Meme {i + 1}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <button
                  className="windows-btn font-semibold"
                  style={{fontFamily:'Press Start 2P',fontSize:'1rem',padding:'0.7rem 2.5rem',borderRadius:'10px',background:'linear-gradient(90deg,#f59e42 0%,#ec4899 100%)',boxShadow:'4px 4px 0 #ffb300'}}
                  onClick={() => alert('Meme upload and eviction notice generator coming soon!')}
                >
                  <span role="img" aria-label="upload">📤</span> Submit Your Meme
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}