import React from 'react';
import type { RequestStatus, PaymentStatus } from '../../types';

interface BadgeProps {
  status: RequestStatus | PaymentStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'md', showDot = true }) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs sm:text-sm px-3 py-1 font-medium',
    lg: 'text-sm px-4 py-1.5 font-semibold',
  };

  const getStyle = (s: string) => {
    switch (s) {
      case 'Submitted':
        return 'bg-slate-800/80 text-slate-300 border-slate-700/70 shadow-xs';
      case 'Under Review':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/60 shadow-xs';
      case 'Approved':
        return 'bg-blue-950/80 text-[#38BDF8] border-blue-800/60 shadow-[0_0_12px_rgba(56,189,248,0.15)]';
      case 'Payment Pending':
        return 'bg-amber-950/90 text-amber-300 border-amber-700 shadow-xs';
      case 'ID Card in Preparation':
        return 'bg-violet-950/80 text-violet-300 border-violet-800/60 shadow-[0_0_12px_rgba(139,92,246,0.15)]';
      case 'Ready for Collection':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/70 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'Completed':
        return 'bg-slate-900/90 text-slate-200 border-slate-700 shadow-xs';
      case 'Rejected':
        return 'bg-rose-950/80 text-[#FB7185] border-rose-800/70 shadow-[0_0_12px_rgba(244,63,94,0.15)]';
      case 'Action Required':
        return 'bg-rose-950/90 text-[#FB7185] border-rose-600/80 font-bold shadow-[0_0_15px_rgba(244,63,94,0.25)] animate-pulse';
      // Payment statuses
      case 'Paid / Verified':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/70 shadow-xs';
      case 'Pending Verification':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/60 shadow-xs';
      case 'Pay at College Counter':
        return 'bg-blue-950/70 text-sky-300 border-sky-800/60 shadow-xs';
      case 'Demo Completed':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/60 shadow-xs';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700 shadow-xs';
    }
  };

  const getDotColor = (s: string) => {
    switch (s) {
      case 'Submitted':
        return 'bg-slate-400';
      case 'Under Review':
        return 'bg-amber-400';
      case 'Approved':
        return 'bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]';
      case 'ID Card in Preparation':
        return 'bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]';
      case 'Ready for Collection':
        return 'bg-[#10B981] shadow-[0_0_8px_#10B981]';
      case 'Completed':
        return 'bg-slate-300';
      case 'Rejected':
      case 'Action Required':
        return 'bg-[#F43F5E] shadow-[0_0_6px_#F43F5E]';
      case 'Paid / Verified':
        return 'bg-[#10B981]';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md ${getStyle(
        status
      )} ${sizeClasses[size]}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(status)}`} />
      )}
      <span>{status}</span>
    </span>
  );
};
