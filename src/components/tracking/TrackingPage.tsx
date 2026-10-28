import React, { useState, useEffect } from 'react';
import type { ApplicationRecord } from '../../types';
import { StorageService } from '../../services/storageService';
import { StatusBadge } from '../common/Badge';
import { Timeline } from '../common/Timeline';
import { PrintAcknowledgement } from '../common/PrintAcknowledgement';
import {
  Search,
  User,
  Calendar,
  Clock,
  MapPin,
  Printer,
  Shield,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface TrackingPageProps {
  initialId?: string;
  initialRoll?: string;
  onOpenAdmin: (id: string) => void;
  onStartApplication: () => void;
}

export const TrackingPage: React.FC<TrackingPageProps> = ({
  initialId = '',
  initialRoll = '',
  onOpenAdmin,
}) => {
  const [refInput, setRefInput] = useState(initialId);
  const [rollInput, setRollInput] = useState(initialRoll);
  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // If initialId and initialRoll provided, automatically query
  useEffect(() => {
    if (initialId) {
      setRefInput(initialId);
      if (initialRoll) {
        setRollInput(initialRoll);
        handleSearchWithParams(initialId, initialRoll);
      } else {
        const app = StorageService.getApplicationById(initialId);
        if (app) {
          setRollInput(app.student.rollNumber);
          setApplication(app);
          setSearched(true);
        }
      }
    }
  }, [initialId, initialRoll]);

  // Listen to application updates from Admin actions
  useEffect(() => {
    const handleUpdate = () => {
      if (application) {
        const fresh = StorageService.getApplicationById(application.id);
        if (fresh) setApplication(fresh);
      }
    };
    window.addEventListener('newid_applications_updated', handleUpdate);
    return () => window.removeEventListener('newid_applications_updated', handleUpdate);
  }, [application]);

  const handleSearchWithParams = (refNum: string, rollNum: string) => {
    setSearchError(null);
    setSearched(true);

    if (!refNum.trim()) {
      setSearchError('Please enter your Request Reference Number.');
      setApplication(null);
      return;
    }

    if (!rollNum.trim()) {
      setSearchError('Student Roll Number is required for identity verification.');
      setApplication(null);
      return;
    }

    const result = StorageService.verifyAndGetApplication(refNum, rollNum);
    if (!result) {
      const checkRef = StorageService.getApplicationById(refNum);
      if (checkRef) {
        setSearchError(
          'Verification failed: The student roll number entered does not match records for this reference number.'
        );
      } else {
        setSearchError(
          `No application found with Reference "${refNum.trim()}". Please double check your reference number.`
        );
      }
      setApplication(null);
    } else {
      setApplication(result);
    }
  };

  const handleFormSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchWithParams(refInput, rollInput);
  };

  const handleQuickDemo = (ref: string, roll: string) => {
    setRefInput(ref);
    setRollInput(roll);
    handleSearchWithParams(ref, roll);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-2 sm:px-4 animate-fade-slide">
      {application && <PrintAcknowledgement application={application} />}

      {/* Header banner */}
      <div className="text-center max-w-xl mx-auto no-print">
        <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-1.5 block">
          Self-Service Tracking Portal
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
          Track Your ID Replacement Request
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#A7B4C8]">
          Enter your unique Request Reference Number and Student Roll Number to check the live progress of your ID card.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="card-glass p-6 sm:p-8 no-print shadow-2xl">
        <form onSubmit={handleFormSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="refInput" className="form-label-dark flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Request Reference Number *</span>
              </label>
              <input
                id="refInput"
                type="text"
                placeholder="e.g. NEWID-2026-1003"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="form-input-dark font-mono uppercase text-sm"
              />
            </div>

            <div>
              <label htmlFor="rollInput" className="form-label-dark flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Student Roll Number (Verification) *</span>
              </label>
              <input
                id="rollInput"
                type="text"
                placeholder="e.g. 24B91A1208"
                value={rollInput}
                onChange={(e) => setRollInput(e.target.value.toUpperCase())}
                className="form-input-dark font-mono uppercase text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-slate-500">
              * Verification prevents unauthorized access to student records.
            </span>
            <button
              type="submit"
              className="btn-glow-primary w-full sm:w-auto text-xs sm:text-sm px-7 py-3 text-white"
            >
              <Search className="w-4 h-4 text-[#38BDF8]" />
              <span>Track Request</span>
            </button>
          </div>
        </form>

        {/* Quick Demo Samples */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Quick Demonstration Scenarios (Click to test):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo('NEWID-2026-1001', '23B91A0542')}
              className="p-3 rounded-xl border border-slate-800 hover:border-slate-600 bg-[#0B1220]/80 hover:bg-[#111C30] text-left transition-all"
            >
              <span className="font-bold text-[#F8FAFC] block">NEWID-1001</span>
              <span className="text-[11px] text-slate-400">Status: Submitted</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('NEWID-2026-1002', '22B91A0419')}
              className="p-3 rounded-xl border border-slate-800 hover:border-blue-500/50 bg-[#0B1220]/80 hover:bg-[#111C30] text-left transition-all"
            >
              <span className="font-bold text-[#F8FAFC] block">NEWID-1002</span>
              <span className="text-[11px] text-[#38BDF8]">In Preparation</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('NEWID-2026-1003', '24B91A1208')}
              className="p-3 rounded-xl border border-emerald-800/60 bg-emerald-950/30 hover:bg-emerald-950/50 text-left transition-all"
            >
              <span className="font-bold text-emerald-300 block">NEWID-1003</span>
              <span className="text-[11px] text-emerald-400 font-semibold">Ready (Issued Oct 26)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('NEWID-2026-1004', '23B91A0231')}
              className="p-3 rounded-xl border border-rose-900/60 bg-rose-950/30 hover:bg-rose-950/50 text-left transition-all"
            >
              <span className="font-bold text-rose-300 block">NEWID-1004</span>
              <span className="text-[11px] text-[#FB7185]">Action Required</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      {searchError && (
        <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-800/80 text-[#FB7185] text-xs sm:text-sm flex items-start gap-3 no-print backdrop-blur-md shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-200 block">Application Not Found or Verification Error</span>
            <p className="mt-0.5">{searchError}</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {application && (
        <div className="space-y-6 animate-fade-slide">
          {/* Header Card */}
          <div className="card-glass p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Application Reference
                  </span>
                  <span className="text-[10px] bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 px-2 py-0.5 rounded font-mono font-semibold">
                    {application.student.department}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] font-mono tracking-wide">
                  {application.id}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={application.status} size="lg" />
                <StatusBadge status={application.payment.status} size="md" />
              </div>
            </div>

            {/* Quick Details Table */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">
                  Student Name
                </span>
                <span className="font-bold text-[#F8FAFC] text-sm mt-0.5 block">{application.student.fullName}</span>
              </div>
              <div>
                <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">
                  Roll Number
                </span>
                <span className="font-bold text-[#38BDF8] font-mono text-sm mt-0.5 block">
                  {application.student.rollNumber}
                </span>
              </div>
              <div>
                <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">
                  Submission Date
                </span>
                <span className="font-semibold text-slate-300 mt-0.5 block">
                  {new Date(application.submissionDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-[#A7B4C8] block uppercase text-[10px] font-semibold">
                  Replacement Reason
                </span>
                <span className="font-semibold text-slate-300 mt-0.5 block">{application.replacement.reason}</span>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="card-glass p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-[#F8FAFC]">Application Progress Timeline</h3>
              <p className="text-xs text-[#A7B4C8]">Live stages updated by College Administration</p>
            </div>

            <Timeline
              currentStatus={application.status}
              statusHistory={application.statusHistory}
              rejectionReason={application.rejectionReason}
              adminRemarks={application.adminRemarks}
            />
          </div>

          {/* CRITICAL REQUIREMENT: ID Card Issued Date & Collection Details */}
          <div className="card-glass border-2 border-[#38BDF8]/40 p-6 sm:p-8 space-y-6 shadow-[0_0_35px_rgba(56,189,248,0.15)]">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F8FAFC]">
                    ID Card Issued Date & Collection Information
                  </h3>
                  <p className="text-xs text-[#A7B4C8]">Official college credential recording</p>
                </div>
              </div>

              {/* Live sync indicator */}
              <button
                onClick={() => handleSearchWithParams(application.id, application.student.rollNumber)}
                className="text-xs text-[#38BDF8] hover:text-[#22D3EE] flex items-center gap-1.5 no-print"
                title="Refresh latest data"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID Card Issued Date Box */}
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
                      <span>Card Officially Recorded as Issued</span>
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-xl sm:text-2xl font-bold text-slate-500 font-mono block">
                      Not issued yet
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/60">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pending Physical Production</span>
                    </span>
                  </div>
                )}

                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 leading-relaxed">
                  <strong className="text-slate-300">Notice:</strong> The ID Card Issued Date is officially stamped when the physical smart card is printed by the Exam Section. It is distinct from the submission date ({new Date(application.submissionDate).toLocaleDateString('en-US')}).
                </p>
              </div>

              {/* Collection Box */}
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
                  <span>Working Hours: Mon–Sat, 10:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 no-print">
            <button
              onClick={handlePrint}
              className="btn-glass-secondary w-full sm:w-auto text-xs sm:text-sm px-5 py-3"
            >
              <Printer className="w-4 h-4 text-[#38BDF8]" />
              <span>Print Acknowledgement Slip</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => onOpenAdmin(application.id)}
                className="text-xs font-bold text-[#38BDF8] hover:text-[#22D3EE] bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/60 px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                title="Simulate Admin: update status, record ID card issued date, etc."
              >
                <Shield className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Simulate Admin Update</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state when visited initially without query */}
      {!searched && !application && (
        <div className="card-glass text-center py-12 space-y-4 no-print">
          <div className="w-16 h-16 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#F8FAFC]">Enter Your Reference Details Above</h3>
          <p className="text-xs sm:text-sm text-[#A7B4C8] max-w-md mx-auto">
            Or click on any of the live demonstration sample buttons above to preview different stages of the ID card lifecycle.
          </p>
        </div>
      )}
    </div>
  );
};
