import React from 'react';
import {
  FileCheck2,
  Camera,
  RotateCcw,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Info,
  CreditCard,
} from 'lucide-react';

interface Step3Props {
  onNext: () => void;
  onPrev: () => void;
  onSaveDraft: () => void;
  reason: string;
}

export const Step3FeeAndRequirements: React.FC<Step3Props> = ({
  onNext,
  onPrev,
  onSaveDraft,
}) => {
  return (
    <div className="space-y-8 animate-fade-slide">
      {/* Guidance Banner */}
      <div className="bg-[#101B32]/85 border border-[#38BDF8]/30 rounded-2xl p-5 flex items-start gap-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.12)]">
        <Info className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#F8FAFC] space-y-1">
          <p className="font-bold text-[#38BDF8]">
            Fee Breakdown, Policy Requirements & Collection Instructions
          </p>
          <p className="text-[#A7B4C8]">
            Review the official college requirements below before proceeding to payment. All figures and processing timelines are governed by institutional policy.
          </p>
        </div>
      </div>

      {/* Main Fee & Policy Card */}
      <div className="card-glass p-6 sm:p-8 space-y-8">
        {/* Fee Highlight Card */}
        <div className="bg-gradient-to-br from-[#101B32]/95 via-[#111C30]/85 to-[#17243B]/90 border border-[#38BDF8]/35 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                Official Replacement Fee
              </span>
              <span className="text-[10px] bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 px-2 py-0.5 rounded font-semibold">
                Configurable College Placeholder
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC]">₹250</span>
              <span className="text-xs text-[#A7B4C8] font-medium">
                (To be confirmed by the college upon final verification)
              </span>
            </div>
            <p className="text-xs text-[#A7B4C8] max-w-lg leading-relaxed">
              Includes high-security PVC card stock, high-resolution thermal dye re-printing, and RFID proximity chip encoding.
            </p>
          </div>

          <div className="w-full md:w-auto bg-[#0B1220]/90 p-4 rounded-xl border border-slate-700/60 text-xs space-y-2 shrink-0">
            <div className="flex justify-between gap-8 text-[#A7B4C8]">
              <span>Base Replacement:</span>
              <span className="font-semibold text-[#F8FAFC]">₹150.00</span>
            </div>
            <div className="flex justify-between gap-8 text-[#A7B4C8]">
              <span>Smart Card & RFID Chip:</span>
              <span className="font-semibold text-[#F8FAFC]">₹100.00</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between gap-8 font-bold text-[#38BDF8] text-sm">
              <span>Total Payable:</span>
              <span>₹250.00</span>
            </div>
          </div>
        </div>

        {/* Detailed Grid of Policy Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item 1: Required Documents */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#0B1220]/75 hover:border-slate-700 transition-all space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-xl">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#F8FAFC]">1. Required Documents for Collection</h4>
            </div>
            <ul className="text-xs text-[#A7B4C8] space-y-1.5 pl-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span>Printed E-Acknowledgement Slip (generated after Step 5).</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span>Current semester admission fee receipt or Bonafide letter.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span>Valid Govt Photo ID (Aadhaar / Driving License / Voter ID).</span>
              </li>
            </ul>
          </div>

          {/* Item 2: Photograph Requirements */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#0B1220]/75 hover:border-slate-700 transition-all space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-xl">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#F8FAFC]">2. Photograph Specifications</h4>
            </div>
            <ul className="text-xs text-[#A7B4C8] space-y-1.5 pl-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span>Recent passport-size photo with plain white background.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span>Formal college attire. Face must be straight and fully visible.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FB7185]" />
                <span className="text-[#FB7185] font-semibold">No selfies, casual crops, filters, or patterned backgrounds.</span>
              </li>
            </ul>
          </div>

          {/* Item 3: Damaged Card Surrender Policy */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#0B1220]/75 hover:border-slate-700 transition-all space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-xl">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#F8FAFC]">3. Damaged Card Surrender Rule</h4>
            </div>
            <p className="text-xs text-[#A7B4C8] leading-relaxed">
              If your request is due to a damaged, broken, or washed card, <strong className="text-[#F8FAFC]">the old physical card must be surrendered</strong> at Counter 3 before the replacement card is issued. If not surrendered, the request may be treated as a lost card under administrative guidelines.
            </p>
          </div>

          {/* Item 4: Processing Time & Venue */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-[#0B1220]/75 hover:border-slate-700 transition-all space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#F8FAFC]">4. Processing Time & Collection</h4>
            </div>
            <div className="text-xs text-[#A7B4C8] space-y-1.5">
              <p>
                <strong className="text-[#F8FAFC]">Estimated Time:</strong> 3 to 5 College Working Days (Subject to verification by Examination Section).
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F8FAFC]">Location:</strong> Student Affairs Section / Exam Branch, Admin Block Ground Floor, Counter 3 (10:00 AM – 4:00 PM).
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Timing Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#0B1220]/90 border border-slate-700/60 flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
          <div className="text-xs text-[#A7B4C8] leading-relaxed">
            <span className="font-bold text-[#F8FAFC] block mb-0.5">
              When and how is the fee paid?
            </span>
            You can select your preferred payment mode in the next step. Payments can be submitted via online UPI / Card (Demo mode in this prototype) or opted to be paid in cash directly at the college office counter upon card pickup.
          </div>
        </div>
      </div>

      {/* Next Step Preview & Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="text-xs text-[#A7B4C8] flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-[#38BDF8]">Next Step:</span>
          <span>Next, select an available payment method.</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
          <button
            type="button"
            onClick={onPrev}
            className="btn-glass-secondary text-xs sm:text-sm px-5 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="btn-glass-secondary text-xs sm:text-sm px-5 py-3 hidden sm:flex"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onNext}
            className="btn-glow-primary text-xs sm:text-sm px-7 py-3.5 flex-1 sm:flex-none text-white"
          >
            <span>Continue to Payment Method</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>
      </div>
    </div>
  );
};
