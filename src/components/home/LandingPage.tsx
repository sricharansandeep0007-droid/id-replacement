import React from 'react';
import {
  CreditCard,
  FileCheck,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Building,
  UserCheck,
  Upload,
  Layers,
  Sparkles,
} from 'lucide-react';

interface LandingPageProps {
  onStartApplication: () => void;
  onTrackRequest: () => void;
  onOpenPolicy: () => void;
  onQuickTrackDemo: (id: string, roll: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartApplication,
  onTrackRequest,
  onOpenPolicy,
  onQuickTrackDemo,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-slide">
      {/* Hero Section */}
      <section className="relative pt-4 pb-12 sm:pt-10 sm:pb-20">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#101B32]/90 border border-[#38BDF8]/30 text-[#F8FAFC] text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] animate-pulse" />
            <span className="text-[#A7B4C8]">Official Student Affairs Portal</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-[#38BDF8] font-bold">NEWID System</span>
          </div>

          {/* Heading with Gradient-Clipped Text */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-[#F8FAFC] tracking-tight leading-[1.12]">
            Your New ID Starts Here.{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-animated block mt-1">
              Replace It The Smarter Way.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-[#A7B4C8] max-w-2xl mx-auto leading-relaxed">
            Apply for a replacement student ID, choose your payment method, and track your request through one simple guided process.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartApplication}
              className="btn-glow-primary w-full sm:w-auto text-base px-8 py-4 text-white"
            >
              <span>Start Replacement Request</span>
              <ArrowRight className="w-5 h-5 text-[#38BDF8]" />
            </button>
            <button
              onClick={onTrackRequest}
              className="btn-glass-secondary w-full sm:w-auto text-base px-7 py-4"
            >
              <Search className="w-5 h-5 text-[#8B5CF6]" />
              <span>Track My Request</span>
            </button>
          </div>

          {/* Workflow Summary Pill: 6 Simple Steps */}
          <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#111C30]/70 border border-slate-700/60 text-xs text-[#A7B4C8] backdrop-blur-md">
            <div className="flex items-center gap-1 text-[#38BDF8] font-bold">
              <Layers className="w-4 h-4 text-[#38BDF8]" />
              <span>6 Simple Steps</span>
            </div>
            <span className="text-slate-600">•</span>
            <span>Student Info ➔ Reason ➔ Fee ➔ Payment ➔ Review ➔ Confirmation</span>
          </div>

          {/* Quick Demo Preview Chips */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Quick Live Demonstration Samples:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <button
                onClick={() => onQuickTrackDemo('NEWID-2026-1001', '23B91A0542')}
                className="text-xs bg-[#111C30]/90 hover:bg-[#17243B] text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-500 px-3.5 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>#1001: Just Submitted</span>
              </button>
              <button
                onClick={() => onQuickTrackDemo('NEWID-2026-1002', '22B91A0419')}
                className="text-xs bg-[#111C30]/90 hover:bg-[#17243B] text-slate-300 hover:text-white border border-slate-700/60 hover:border-blue-500/50 px-3.5 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]" />
                <span>#1002: In Preparation</span>
              </button>
              <button
                onClick={() => onQuickTrackDemo('NEWID-2026-1003', '24B91A1208')}
                className="text-xs bg-[#111C30]/90 hover:bg-[#17243B] text-slate-300 hover:text-white border border-slate-700/60 hover:border-emerald-500/50 px-3.5 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
                <span>#1003: Ready (Issued Oct 26)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] mb-2">
            Seamless Guided Workflow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            How The Replacement Process Works
          </h3>
          <p className="mt-2 text-sm text-[#A7B4C8]">
            From submitting details to picking up your new RFID smart card at Counter 3.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="card-glass p-6 relative group hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 flex items-center justify-center mb-5 group-hover:bg-[#2563EB] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[#38BDF8] block mb-1">PHASE 01</span>
            <h4 className="font-bold text-[#F8FAFC] text-lg mb-2">Provide Student Info</h4>
            <p className="text-xs sm:text-sm text-[#A7B4C8] leading-relaxed">
              Enter your official college records (Roll number, Department, Academic Year, and contact details).
            </p>
          </div>

          {/* Step 2 */}
          <div className="card-glass p-6 relative group hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-violet-950/80 text-[#8B5CF6] border border-violet-800/60 flex items-center justify-center mb-5 group-hover:bg-[#8B5CF6] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[#8B5CF6] block mb-1">PHASE 02</span>
            <h4 className="font-bold text-[#F8FAFC] text-lg mb-2">State Reason & Upload</h4>
            <p className="text-xs sm:text-sm text-[#A7B4C8] leading-relaxed">
              Select lost, damaged, or unreadable ID. Upload your formal passport photograph and declaration.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card-glass p-6 relative group hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 text-[#22D3EE] border border-cyan-800/60 flex items-center justify-center mb-5 group-hover:bg-[#0284C7] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[#22D3EE] block mb-1">PHASE 03</span>
            <h4 className="font-bold text-[#F8FAFC] text-lg mb-2">Select Payment Method</h4>
            <p className="text-xs sm:text-sm text-[#A7B4C8] leading-relaxed">
              Choose UPI, card demo, net banking, or pay cash directly at the college office counter.
            </p>
          </div>

          {/* Step 4 */}
          <div className="card-glass p-6 relative group hover:border-[#38BDF8]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all">
              <Building className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">PHASE 04</span>
            <h4 className="font-bold text-[#F8FAFC] text-lg mb-2">Track & Collect Card</h4>
            <p className="text-xs sm:text-sm text-[#A7B4C8] leading-relaxed">
              Monitor live updates. When status is Ready, collect your embossed card at Admin Block Counter 3.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist & College Notice Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Required Information and Documents Card (2 cols) */}
          <div className="lg:col-span-2 card-glass p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-xl">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F8FAFC]">
                  Required Information & Documents Checklist
                </h3>
                <p className="text-xs text-[#A7B4C8]">
                  Have these ready before starting your replacement application
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220]/80 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC]">Student Roll Number</h5>
                  <p className="text-xs text-[#A7B4C8] mt-0.5">As per official college admission record & hall ticket.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220]/80 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC]">Formal Passport Photo</h5>
                  <p className="text-xs text-[#A7B4C8] mt-0.5">White background, formal attire, max 2MB (JPG or PNG).</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220]/80 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC]">Old Card (If Damaged)</h5>
                  <p className="text-xs text-[#A7B4C8] mt-0.5">Physical handover required upon collecting new card.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220]/80 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC]">Loss Undertaking (If Lost)</h5>
                  <p className="text-xs text-[#A7B4C8] mt-0.5">Digital declaration checkbox or signed undertaking letter.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220]/80 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC]">College Email & Phone</h5>
                  <p className="text-xs text-[#A7B4C8] mt-0.5">For notification alerts and dispatch SMS confirmation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220]/80 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC]">Payment Mode / Cash</h5>
                  <p className="text-xs text-[#A7B4C8] mt-0.5">₹250 official replacement fee (Demo or counter payment).</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-[#A7B4C8]">Need more clarification on documents?</span>
              <button
                onClick={onOpenPolicy}
                className="text-xs font-bold text-[#38BDF8] hover:text-[#22D3EE] flex items-center gap-1 transition-colors"
              >
                <span>Read Full Document Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* College Policy Notice */}
          <div className="card-glass p-6 sm:p-8 flex flex-col justify-between border-slate-700/60 bg-gradient-to-br from-[#111C30]/90 to-[#17243B]/80">
            <div>
              <div className="flex items-center gap-2 text-[#FB7185] mb-3">
                <AlertCircle className="w-5 h-5" />
                <h4 className="font-bold text-xs uppercase tracking-wider">
                  Important Institutional Notice
                </h4>
              </div>
              <h3 className="font-extrabold text-[#F8FAFC] text-lg mb-2">
                Fees & Processing Times Depend on College Policy
              </h3>
              <p className="text-xs text-[#A7B4C8] leading-relaxed mb-5">
                Replacement fees, fee concessions, and processing durations are determined by the institutional Examination Branch and College Administration.
              </p>
              
              <div className="space-y-2.5 text-xs bg-[#0B1220]/90 p-4 rounded-xl border border-slate-800 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B4C8]">Standard Fee:</span>
                  <span className="font-bold text-[#38BDF8]">₹250 (Configurable)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B4C8]">Estimated Turnaround:</span>
                  <span className="font-bold text-[#F8FAFC]">3–5 College Working Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B4C8]">Collection Point:</span>
                  <span className="font-bold text-[#F8FAFC]">Admin Block Counter 3</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenPolicy}
              className="btn-glass-secondary w-full text-xs py-3"
            >
              <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
              <span>View Official Regulation Details</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Features Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="card-glass-elevated p-8 sm:p-12 text-[#F8FAFC] relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold tracking-widest text-[#38BDF8] uppercase block mb-2">
              Why Use NEWID Portal?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Say Goodbye to Long Queues and Lost Paper Forms
            </h3>
            <p className="text-[#A7B4C8] text-sm sm:text-base leading-relaxed mb-8">
              The Digital ID Replacement system provides transparent real-time status updates, securely validates your student records, and verifies issue dates directly with the administrative office.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onStartApplication}
                className="btn-glow-primary text-sm px-7 py-3.5"
              >
                <span>Apply for Replacement Now</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
              </button>
              <button
                onClick={onTrackRequest}
                className="btn-glass-secondary text-sm px-6 py-3.5"
              >
                <Search className="w-4 h-4 text-[#8B5CF6]" />
                <span>Track Existing Request</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
