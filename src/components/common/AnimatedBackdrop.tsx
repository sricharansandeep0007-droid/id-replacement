import React from 'react';

export const AnimatedBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 animated-backdrop-container">
      {/* Deep Canvas base */}
      <div className="absolute inset-0 bg-[#070B14]" />

      {/* Aurora Orb 1: Electric Blue / Primary Blue (Top-Left to Center) */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full blur-[130px] opacity-[0.22] animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, #1D4ED8 40%, transparent 70%)',
        }}
      />

      {/* Aurora Orb 2: Deep Violet / Purple Glow (Right side drifting down) */}
      <div
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] opacity-[0.20] animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, #6D28D9 45%, transparent 70%)',
        }}
      />

      {/* Aurora Orb 3: Cyan / Electric Sky (Bottom-Center upward drift) */}
      <div
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[120px] opacity-[0.16] animate-aurora-3"
        style={{
          background: 'radial-gradient(circle, #22D3EE 0%, #0284C7 40%, transparent 70%)',
        }}
      />

      {/* Aurora Orb 4: Subtle Deep Navy Ambient Floor */}
      <div
        className="absolute top-[60%] -left-[15%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[110px] opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, #38BDF8 0%, #101B32 50%, transparent 75%)',
        }}
      />

      {/* Subtle Micro-Grid Overlay for Modern Tech Feel */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
