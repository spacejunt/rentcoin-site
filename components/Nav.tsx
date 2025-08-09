import Link from 'next/link';

/**
 * Navigation bar for the $RENT site. Displays links to the major pages.
 */
export default function Nav() {
  return (
    <nav className="w-full bg-[#e5e9f7] border-b border-[#b0b0b0] shadow-[0_2px_0_#b0b0b0] py-2 font-[Segoe_UI,Arial,Tahoma,sans-serif]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <Link href="/" className="px-3 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-lg font-bold text-[#1a237e] hover:bg-[#cfd8dc] transition">
            $RENT
          </Link>
          <Link href="/dashboard" className="px-3 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-sm font-medium text-[#1a237e] hover:bg-[#cfd8dc] transition">
            Dashboard
          </Link>
          <Link href="/tokenomics" className="px-3 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-sm font-medium text-[#1a237e] hover:bg-[#cfd8dc] transition">
            Tokenomics
          </Link>
          <Link href="/memes" className="px-3 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-sm font-medium text-[#1a237e] hover:bg-[#cfd8dc] transition">
            Meme Gallery
          </Link>
          <Link href="/how-to-buy" className="px-3 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-sm font-medium text-[#1a237e] hover:bg-[#cfd8dc] transition">
            How To Buy
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {/* Example top-right menu buttons, add more as needed */}
          <button className="px-2 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-xs font-semibold text-[#1a237e] hover:bg-[#cfd8dc] transition" onClick={() => alert('Settings coming soon!')}>Settings</button>
          <button className="px-2 py-1 bg-white border border-[#b0b0b0] rounded shadow-[1px_1px_0_#b0b0b0] text-xs font-semibold text-[#1a237e] hover:bg-[#cfd8dc] transition" onClick={() => alert('Profile coming soon!')}>Profile</button>
        </div>
      </div>
    </nav>
  );
}