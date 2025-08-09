import React, { useState } from 'react';

interface WindowBoxProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function WindowBox({ title, children, onClose }: WindowBoxProps) {
  const [minimized, setMinimized] = useState(false);
  // Simple draggable logic
  const [pos, setPos] = useState({ x: 100 + Math.random()*200, y: 100 + Math.random()*200 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Resizing logic
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [resizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 400, height: 300 });

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  const onMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging) setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    if (resizing) {
      const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };
  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, width: size.width, height: size.height });
  };

  return (
    <div
      className="windowbox fixed z-20"
      style={{ left: pos.x, top: pos.y, width: size.width, height: size.height, minWidth: 300, minHeight: 200 }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        className="windows-titlebar flex items-center justify-between px-3 py-2 cursor-move"
        style={{ userSelect: 'none' }}
        onMouseDown={onMouseDown}
      >
        <span style={{fontFamily:'Press Start 2P',fontSize:'1rem'}}>{title}</span>
        <div className="flex gap-2">
          <button className="windows-btn" onClick={() => setMinimized(!minimized)}>{minimized ? '🔼' : '🔽'}</button>
          <button className="windows-btn" onClick={onClose}>❌</button>
        </div>
      </div>
      {!minimized && (
        <div className="windows-content p-4" style={{fontFamily:'Press Start 2P',background:'linear-gradient(135deg,#fffde7 0%,#f3f3f3 100%)',height:size.height-48}}>
          {children}
        </div>
      )}
      {/* Resize handle */}
      <div
        style={{position:'absolute',right:0,bottom:0,width:'18px',height:'18px',cursor:'nwse-resize',zIndex:30}}
        onMouseDown={onResizeMouseDown}
      >
        <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="14" width="14" height="2" fill="#d500f9"/><rect x="14" y="2" width="2" height="14" fill="#d500f9"/></svg>
      </div>
    </div>
  );
}
