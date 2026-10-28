import React from 'react';
import { X, ShieldAlert, CheckCircle2, Clock, IndianRupee, FileText, Camera } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070B14]/80 backdrop-blur-md animate-fade-slide">
      <div className="bg-[#0B1220] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700/80">
        {/* Header */}
        <div className="sticky top-0 bg-[#111C30] border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F8FAFC]">
                Replacement Fee & College Policy Guidelines
              </h3>
              <p className="text-xs text-[#A7B4C8]">Official Student ID Regulation Handbook</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-[#A7B4C8]">
          {/* Notice banner */}
          <div className="p-4 rounded-xl bg-blue-950/40 border border-[#38BDF8]/40 text-[#F8FAFC] flex items-start gap-3 shadow-[0_0_20px_rgba(56,189,248,0.12)]">
            <IndianRupee className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-[#38BDF8]">Official Replacement Fee:</span> ₹250 (Standard Placeholder — To be confirmed by the college authority). Fee covers RFID chip programming, secure lamination, and administrative re-issuance.
            </div>
          </div>

          {/* Section 1: Valid Reasons & Requirements */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#38BDF8] uppercase tracking-wider text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>1. Valid Grounds for Replacement</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#111C30]/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-[#F8FAFC] block mb-1">Lost ID Card</span>
                <p className="text-[#A7B4C8]">Requires a loss declaration undertaking form. In case of wallet theft, police non-traceable receipt is recommended.</p>
              </div>
              <div className="p-3.5 bg-[#111C30]/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-[#F8FAFC] block mb-1">Damaged Card</span>
                <p className="text-[#A7B4C8]">Old card (or fragments) MUST be surrendered to Counter 3 before collection of new card.</p>
              </div>
              <div className="p-3.5 bg-[#111C30]/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-[#F8FAFC] block mb-1">Faded / Unreadable</span>
                <p className="text-[#A7B4C8]">Barcode or photo wear-and-tear requires an updated formal photograph upload.</p>
              </div>
              <div className="p-3.5 bg-[#111C30]/80 border border-slate-800 rounded-xl">
                <span className="font-bold text-[#F8FAFC] block mb-1">Data / Branch Correction</span>
                <p className="text-[#A7B4C8]">Requires Academic Section approval letter or updated college enrolment memo.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Photo Requirements */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#8B5CF6] uppercase tracking-wider text-xs flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#8B5CF6]" />
              <span>2. Photograph Guidelines</span>
            </h4>
            <div className="p-4 bg-[#111C30]/80 border border-slate-800 rounded-xl text-xs space-y-2">
              <p>• <strong className="text-[#F8FAFC]">Background:</strong> Must be plain white or light off-white.</p>
              <p>• <strong className="text-[#F8FAFC]">Attire:</strong> Formal college attire or collared shirt. No sunglasses, caps, or side angles.</p>
              <p>• <strong className="text-[#F8FAFC]">Resolution & Size:</strong> Minimum 300 DPI, max 2MB in JPG/PNG format.</p>
              <p className="text-[#FB7185] font-semibold">• Note: Selfies or casual party pictures will be rejected by the admin team.</p>
            </div>
          </div>

          {/* Section 3: Timeline & Collection */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#22D3EE] uppercase tracking-wider text-xs flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#22D3EE]" />
              <span>3. Processing Timeline & Collection</span>
            </h4>
            <div className="p-4 bg-[#111C30]/80 border border-slate-800 rounded-xl text-xs space-y-2">
              <p>• <strong className="text-[#F8FAFC]">Estimated Timeline:</strong> 3 to 5 college working days from application approval.</p>
              <p>• <strong className="text-[#F8FAFC]">Collection Venue:</strong> Student Affairs Section / Examination Branch, Admin Block Ground Floor, Counter 3.</p>
              <p>• <strong className="text-[#F8FAFC]">Hours:</strong> Monday to Saturday, 10:00 AM – 4:00 PM.</p>
              <p>• <strong className="text-[#F8FAFC]">Verification:</strong> The student must personally present the printed Acknowledgement Slip along with original College Fee Receipt.</p>
            </div>
          </div>

          {/* Warning & Disciplinary Note */}
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-[#FB7185] text-xs flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-300 block">Disciplinary Action Warning:</span>
              College ID cards are official identification instruments. Possessing duplicate active cards, impersonation, or filing false loss claims is a severe disciplinary offense under institutional code 4.19.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#111C30] border-t border-slate-800 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="btn-glow-primary text-xs px-6 py-2.5 text-white"
          >
            I Understand & Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
