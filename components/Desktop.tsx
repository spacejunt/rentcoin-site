import React, { useState } from 'react';
import WindowBox from './WindowBox';

const icons = {
  dashboard: '/window.svg',
  memes: '/file.svg',
  tokenomics: '/globe.svg',
  howtobuy: '/vercel.svg', // Use vercel.svg as a placeholder for now
};

// Real content for each window
import Dashboard from '../pages/dashboard';
import MemeGallery from '../pages/memes';
import Tokenomics from '../pages/tokenomics';
import HowToBuy from '../pages/how-to-buy';

const windowsConfig = [
  { id: 'dashboard', title: 'Dashboard', icon: icons.dashboard, content: <Dashboard /> },
  { id: 'memes', title: 'Meme Gallery', icon: icons.memes, content: <MemeGallery /> },
  { id: 'tokenomics', title: 'Tokenomics', icon: icons.tokenomics, content: <Tokenomics /> },
  { id: 'howtobuy', title: 'How To Buy', icon: icons.howtobuy, content: <HowToBuy /> },
];

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const launchWindow = (id: string) => {
    if (!openWindows.includes(id)) setOpenWindows([...openWindows, id]);
  };
  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w !== id));
  };

  return (
    <div
      className="desktop-bg min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        background: `url('/hero-bg.png') center center/cover no-repeat, #222`,
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Desktop icons only, no nav tabs */}
      <div className="fixed left-6 top-1/4 flex flex-col gap-6 z-10">
        {windowsConfig.map(win => (
          <button key={win.id} className="windows-btn flex flex-col items-center" onClick={() => launchWindow(win.id)} style={{background:'none',boxShadow:'none',border:'none'}}>
            <img src={win.icon} alt={win.title + ' icon'} style={{width:'48px',height:'48px',marginBottom:'6px',filter:'drop-shadow(2px 2px 0 #d500f9)'}} />
            <span style={{fontFamily:'Press Start 2P',fontSize:'0.7rem',color:'#222',textShadow:'1px 1px 0 #ffb300'}}>{win.title}</span>
          </button>
        ))}
      </div>
      {/* Render open windows */}
      {openWindows.map(id => {
        const win = windowsConfig.find(w => w.id === id);
        if (!win) return null;
        return (
          <WindowBox key={id} title={win.title} onClose={() => closeWindow(id)}>
            <div style={{fontFamily:'Press Start 2P',fontSize:'1rem',color:'#222'}}>{win.content}</div>
          </WindowBox>
        );
      })}
    </div>
  );
}
