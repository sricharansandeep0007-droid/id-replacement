import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: () => void;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onNavigate }) => {
  return (
    <footer className="bg-[#070B14]/95 text-[#A7B4C8] border-t border-slate-800/80 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto bg-[#101B32] rounded-xl p-1 border border-slate-700/60 shadow-[0_0_15px_rgba(56,189,248,0.15)] flex items-center justify-center">
                <img
                  src="/newid-logo.png"
                  alt="NEWID Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
              <span className="text-lg font-bold text-[#F8FAFC] tracking-tight">
                Digital ID Replacement
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A7B4C8] leading-relaxed">
              Official college digital portal powered by NEWID. Streamlining student identity credentialing, re-issuance, and live application tracking.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#38BDF8] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Authorized College Portal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider mb-4">
              Student Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A7B4C8]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Portal Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apply')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Start Replacement Request
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Track Request Status
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPolicy}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Replacement Fee & Document Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#38BDF8] transition-colors flex items-center gap-1 text-[#A7B4C8]"
                >
                  <span>Administrative Login</span>
                  <ExternalLink className="w-3 h-3 text-[#38BDF8]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Counter Info */}
          <div>
            <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider mb-4">
              ID Card Helpdesk & Counter
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A7B4C8]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>Student Affairs / Examination Branch, Admin Block Ground Floor, Counter 3</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>+91 (040) 2419-8000 (Ext. 204)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>idcell@college.edu</span>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                Counter Timings: Mon–Sat, 10:00 AM – 4:00 PM (Closed 2nd Saturday & Public Holidays)
              </li>
            </ul>
          </div>

          {/* Policy & Governance Notice */}
          <div>
            <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider mb-4">
              Institutional Policy
            </h4>
            <div className="bg-[#111C30]/80 border border-slate-700/50 rounded-xl p-3.5 text-xs text-[#A7B4C8] space-y-2 backdrop-blur-md">
              <p>
                Replacement fees and processing times are governed by College Examination & Student Affairs regulations.
              </p>
              <p className="text-[11px] text-slate-400">
                Surrender of damaged physical cards is mandatory. In case of lost cards, an undertaking affidavit must be submitted.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Digital ID Replacement — NEWID. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenPolicy} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={onOpenPolicy} className="hover:text-slate-300 transition-colors">
              Terms of Replacement
            </button>
            <button onClick={onOpenPolicy} className="hover:text-slate-300 transition-colors">
              ID Card Regulations
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
