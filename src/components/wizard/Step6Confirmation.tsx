import React, { useEffect, useState } from 'react';
import { ApplicationRecord } from '../../types';
import { StatusBadge } from '../common/Badge';
import { Timeline } from '../common/Timeline';
import { PrintAcknowledgement } from '../common/PrintAcknowledgement';
import {
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Calendar,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step6Props {
  application: ApplicationRecord;
  onTrackView: (id: string, roll: string) => void;
  onOpenAdmin: (id: string) => void;
  onStartNew: () => void;
}

export const Step6Confirmation: React.FC<Step6Props> = ({
  application,
  onTrackView,
  onOpenAdmin,
  onStartNew,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Trigger celebratory confetti once on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#38BDF8', '#8B5CF6', '#22D3EE', '#ffffff'],
      });
    } catch (e) {
      // Ignore if canvas-confetti fails
    }
  }, []);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(application.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-slide">
      {/* Hidden print slip */}
      <PrintAcknowledgement application={application} />

      {/* Hero Success Card */}
      <div className="card-glass-elevated p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Success checkmark badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-950/80 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(16,185,129,0.35)] border border-emerald-600/70 ring-8 ring-emerald-950/50">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-700/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
          Application Successfully Received
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
          ID Replacement Request Submitted
        </h2>

        <p className="mt-3 text-xs sm:text-base text-[#A7B4C8] max-w-xl mx-auto leading-relaxed">
          Your request has been officially recorded in the NEWID College ID Portal. Please save your reference number for all future correspondence.
        </p>

        {/* Reference ID Pill */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-[#0B1220]/95 border-2 border-[#38BDF8]/40 px-6 py-4 rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.2)]">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#A7B4C8] block tracking-wider">
              Request Reference Number
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#38BDF8] tracking-wider">
              {application.id}
            </span>
          </div>

          <button
            onClick={handleCopyRef}
            className="sm:ml-4 px-4 py-2.5 bg-[#17243B] hover:bg-[#203252] text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700/80 transition-all shadow-xs"
            title="Copy reference number"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#38BDF8]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Quick summary grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left max-w-3xl mx-auto border-t border-slate-800 pt-6">
          <div className="p-3.5 bg-[#0B1220]/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] uppercase text-[#A7B4C8] font-semibold block">Student</span>
            <span className="text-xs sm:text-sm font-bold text-[#F8FAFC] truncate block mt-0.5">
              {application.student.fullName}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {application.student.rollNumber}
            </span>
          </div>

          <div className="p-3.5 bg-[#0B1220]/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] uppercase text-[#A7B4C8] font-semibold block">Submitted At</span>
            <span className="text-xs sm:text-sm font-bold text-[#F8FAFC] block mt-0.5">
              {new Date(application.submissionDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {new Date(application.submissionDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <div className="p-3.5 bg-[#0B1220]/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] uppercase text-[#A7B4C8] font-semibold block">Payment Status</span>
            <div className="mt-1">
              <StatusBadge status={application.payment.status} size="sm" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">₹{application.payment.amount}</span>
          </div>

          <div className="p-3.5 bg-[#0B1220]/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] uppercase text-[#A7B4C8] font-semibold block">Current Status</span>
            <div className="mt-1">
              <StatusBadge status={application.status} size="sm" />
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">In college review queue</span>
          </div>
        </div>
      </div>

      {/* Progress Timeline Section */}
      <div className="card-glass p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Request Status Timeline</h3>
            <p className="text-xs text-[#A7B4C8]">
              Real-time progression through college verification, printing, and pickup stages.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A7B4C8] font-medium">Estimated Turnaround:</span>
            <span className="text-xs font-bold text-[#38BDF8] bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-md">
              3–5 Working Days
            </span>
          </div>
        </div>

        <Timeline
          currentStatus={application.status}
          statusHistory={application.statusHistory}
          rejectionReason={application.rejectionReason}
          adminRemarks={application.adminRemarks}
        />
      </div>

      {/* CRITICAL SECTION: ID Card Issued Date & Collection Details */}
      <div className="card-glass border-2 border-[#38BDF8]/40 p-6 sm:p-8 space-y-6 shadow-[0_0_35px_rgba(56,189,248,0.15)]">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] block">
              Official Issuance & Handover Details
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
              ID Card Issued Date & Collection Venue
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: ID Card Issued Date */}
          <div className="p-5 bg-[#0B1220]/90 rounded-2xl border border-slate-800 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B4C8] block">
              ID Card Issued Date
            </span>

            {application.idCardIssuedDate ? (
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] font-mono block">
                  {application.idCardIssuedDate}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Card Officially Issued by Authority</span>
                </span>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-bold text-slate-500 font-mono block">
                  Not issued yet
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/60">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pending Administrative Printing</span>
                </span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
              <strong className="text-slate-300">Notice:</strong> The ID Card Issued Date is officially recorded by the college administration when the physical card is manufactured. It is distinct from the submission date.
            </p>
          </div>

          {/* Box 2: Collection Details */}
          <div className="p-5 bg-[#0B1220]/90 rounded-2xl border border-slate-800 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B4C8] block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Collection Location & Instructions</span>
            </span>

            <p className="text-xs sm:text-sm font-bold text-[#F8FAFC]">
              {application.collectionLocation}
            </p>

            <p className="text-xs text-[#A7B4C8] leading-relaxed">
              {application.collectionInstructions}
            </p>

            <div className="pt-2 text-[11px] text-[#38BDF8] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Counter Hours: Mon–Sat, 10:00 AM – 4:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Actions & Demo Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 no-print">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="btn-glass-secondary text-xs sm:text-sm px-5 py-3 flex-1 sm:flex-none"
          >
            <Printer className="w-4 h-4 text-[#38BDF8]" />
            <span>Print Acknowledgement Slip</span>
          </button>
          <button
            onClick={() => onTrackView(application.id, application.student.rollNumber)}
            className="btn-glow-primary text-xs sm:text-sm px-6 py-3 flex-1 sm:flex-none text-white font-bold"
          >
            <span>Open in Tracking Portal</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>

        {/* Demo convenience helper */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => onOpenAdmin(application.id)}
            className="text-xs font-bold text-[#38BDF8] hover:text-[#22D3EE] bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            title="Open Administrator Portal to advance status or record ID Card Issued Date"
          >
            <Shield className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Demo: Simulate Admin Approval / Issue Date</span>
          </button>

          <button
            onClick={onStartNew}
            className="text-xs text-[#A7B4C8] hover:text-white px-3 py-2 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    </div>
  );
};
