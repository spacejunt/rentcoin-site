import { ReactNode } from 'react';
import Nav from './Nav';

/**
 * Layout component that wraps pages in a common navigation and optionally other
 * shared UI elements. Every page gets the Nav bar at the top by default.
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="windows-frame min-h-screen bg-[#bdbdbd] flex flex-col items-center justify-start py-8">
      <Nav />
      <div className="windows-window w-full max-w-5xl mx-auto mt-8 border border-[#222] rounded-lg shadow-[4px_4px_0_#222] bg-[#f3f3f3]">
        <div className="windows-titlebar flex items-center px-4 py-2 bg-gradient-to-r from-[#1565c0] to-[#42a5f5] border-b border-[#222] rounded-t-lg">
          <span className="font-bold text-white text-lg tracking-wide drop-shadow">$RENT Tenant Portal</span>
          <div className="ml-auto flex items-center space-x-2">
            <button className="windows-btn bg-[#e3e3e3] border border-[#b0b0b0] rounded px-2 py-1 text-xs font-bold text-[#1a237e] shadow-[1px_1px_0_#b0b0b0] hover:bg-[#cfd8dc]">_</button>
            <button className="windows-btn bg-[#e3e3e3] border border-[#b0b0b0] rounded px-2 py-1 text-xs font-bold text-[#1a237e] shadow-[1px_1px_0_#b0b0b0] hover:bg-[#cfd8dc]">□</button>
            <button className="windows-btn bg-[#e3e3e3] border border-[#b0b0b0] rounded px-2 py-1 text-xs font-bold text-[#d32f2f] shadow-[1px_1px_0_#b0b0b0] hover:bg-[#cfd8dc]">✕</button>
          </div>
        </div>
        <div className="windows-content p-6">
          {children}
        </div>
      </div>
    </div>
  );
}