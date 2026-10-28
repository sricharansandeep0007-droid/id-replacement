import React from 'react';
import type { RequestStatus } from '../../types';
import { Check, Clock, AlertTriangle, XCircle, PackageCheck, Printer, CheckCircle2 } from 'lucide-react';

interface TimelineProps {
  currentStatus: RequestStatus;
  statusHistory?: Array<{ status: RequestStatus; date: string; note?: string }>;
  rejectionReason?: string;
  adminRemarks?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  currentStatus,
  statusHistory = [],
  rejectionReason,
  adminRemarks,
}) => {
  // Standard happy path stages
  const standardStages: { key: RequestStatus; title: string; desc: string; icon: any }[] = [
    { key: 'Submitted', title: 'Submitted', desc: 'Application received', icon: Clock },
    { key: 'Under Review', title: 'Under Review', desc: 'Records verification', icon: Clock },
    { key: 'Approved', title: 'Approved', desc: 'Replacement authorized', icon: Check },
    { key: 'ID Card in Preparation', title: 'ID Card in Preparation', desc: 'RFID encoding & printing', icon: Printer },
    { key: 'Ready for Collection', title: 'Ready for Collection', desc: 'Available at Counter 3', icon: PackageCheck },
    { key: 'Completed', title: 'Completed', desc: 'Handed over to student', icon: CheckCircle2 },
  ];

  const getHistoryInfo = (statusKey: RequestStatus) => {
    return statusHistory.find((h) => h.status === statusKey);
  };

  const getStageIndex = (status: RequestStatus): number => {
    const map: Record<string, number> = {
      'Submitted': 0,
      'Under Review': 1,
      'Approved': 2,
      'Payment Pending': 2.5,
      'ID Card in Preparation': 3,
      'Ready for Collection': 4,
      'Completed': 5,
    };
    return map[status] ?? 0;
  };

  const currentIndex = getStageIndex(currentStatus);
  const isRejected = currentStatus === 'Rejected';
  const isActionRequired = currentStatus === 'Action Required';

  return (
    <div className="w-full">
      {/* Alert Banner if Rejected or Action Required */}
      {isRejected && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-[#FB7185] backdrop-blur-md flex items-start gap-3 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
          <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
          <div>
            <h4 className="font-bold text-sm sm:text-base text-rose-200">Application Not Approved</h4>
            <p className="text-xs sm:text-sm mt-1 text-[#FB7185]">
              {rejectionReason || 'The application did not fulfill college administrative criteria.'}
            </p>
            <p className="text-xs mt-2 text-rose-300 font-medium">
              Please contact the Student Affairs Office (Admin Block Ground Floor) during office hours (10:00 AM – 4:00 PM).
            </p>
          </div>
        </div>
      )}

      {isActionRequired && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-950/60 border border-amber-700/80 text-amber-200 backdrop-blur-md flex items-start gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
          <div>
            <h4 className="font-bold text-sm sm:text-base text-amber-300">Action Required by Student</h4>
            <p className="text-xs sm:text-sm mt-1 text-amber-200">
              {rejectionReason || 'Additional documents or an updated photo are needed before this request can proceed.'}
            </p>
            {adminRemarks && (
              <p className="text-xs mt-2 font-mono bg-[#0B1220]/80 p-2.5 rounded-xl border border-amber-800/50 text-amber-300">
                Admin Note: {adminRemarks}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Horizontal desktop timeline */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-2 relative">
        {/* Connecting background line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-800 rounded-full -z-0" />
        
        {/* Active progress fill line */}
        <div
          className="absolute top-5 left-8 h-1 bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#8B5CF6] rounded-full transition-all duration-500 -z-0 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          style={{
            width: isRejected
              ? '20%'
              : `${Math.min(100, Math.max(0, (currentIndex / (standardStages.length - 1)) * 90))}%`,
          }}
        />

        {standardStages.map((stage, idx) => {
          const isCompleted = !isRejected && idx < currentIndex;
          const isCurrent = !isRejected && idx === currentIndex;
          const historyItem = getHistoryInfo(stage.key);
          const StageIcon = stage.icon;

          return (
            <div key={stage.key} className="flex flex-col items-center text-center relative z-10 px-1">
              {/* Circle node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                  isCompleted
                    ? 'bg-[#2563EB] text-white ring-4 ring-blue-950/80 shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                    : isCurrent
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-white ring-4 ring-cyan-950/90 shadow-[0_0_18px_rgba(56,189,248,0.6)] animate-pulse'
                    : 'bg-[#101B32] text-slate-500 border border-slate-700/60'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : <StageIcon className="w-4 h-4" />}
              </div>

              {/* Title & info */}
              <h5
                className={`mt-2.5 text-xs font-bold leading-tight ${
                  isCurrent ? 'text-[#38BDF8]' : isCompleted ? 'text-[#F8FAFC]' : 'text-slate-500'
                }`}
              >
                {stage.title}
              </h5>
              <p className="text-[11px] text-[#A7B4C8] mt-0.5 line-clamp-1">{stage.desc}</p>
              {historyItem && (
                <span className="text-[10px] text-slate-400 mt-1 font-mono font-medium">
                  {new Date(historyItem.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Vertical mobile / tablet timeline */}
      <div className="lg:hidden space-y-4 relative pl-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {standardStages.map((stage, idx) => {
          const isCompleted = !isRejected && idx < currentIndex;
          const isCurrent = !isRejected && idx === currentIndex;
          const historyItem = getHistoryInfo(stage.key);
          const StageIcon = stage.icon;

          return (
            <div key={stage.key} className="relative flex items-start gap-3">
              {/* Marker */}
              <div
                className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  isCompleted
                    ? 'bg-[#2563EB] text-white'
                    : isCurrent
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-white ring-2 ring-cyan-500/50 shadow-[0_0_10px_rgba(56,189,248,0.5)] animate-pulse'
                    : 'bg-[#101B32] text-slate-500 border border-slate-700/60'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <StageIcon className="w-3 h-3" />}
              </div>

              {/* Details */}
              <div className="pt-0.5 pb-2">
                <div className="flex items-center gap-2">
                  <h5
                    className={`text-sm font-semibold ${
                      isCurrent ? 'text-[#38BDF8]' : isCompleted ? 'text-[#F8FAFC]' : 'text-slate-500'
                    }`}
                  >
                    {stage.title}
                  </h5>
                  {isCurrent && (
                    <span className="text-[10px] bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 font-semibold px-2 py-0.5 rounded-full">
                      Current Stage
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#A7B4C8] mt-0.5">{stage.desc}</p>
                {historyItem && (
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {new Date(historyItem.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
