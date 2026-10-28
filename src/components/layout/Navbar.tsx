import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storageService';
import type { ApplicationDraft } from '../../types';
import { Shield, Search, PlusCircle, HelpCircle, Menu, X, Bookmark, Trash2 } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenPolicy: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenPolicy }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [draft, setDraft] = useState<ApplicationDraft | null>(null);

  const checkDraft = () => {
    setDraft(StorageService.getDraft());
  };

  useEffect(() => {
    checkDraft();
    const handleDraftUpdate = () => checkDraft();
    window.addEventListener('newid_draft_updated', handleDraftUpdate);
    return () => window.removeEventListener('newid_draft_updated', handleDraftUpdate);
  }, []);

  const handleResumeDraft = () => {
    if (draft) {
      onNavigate('apply', { step: draft.currentStep });
    }
  };

  const handleDeleteDraft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to discard your saved application draft?')) {
      StorageService.deleteDraft();
      setDraft(null);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Website Title */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 group text-left focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 rounded-xl p-1 transition-transform active:scale-[0.99]"
          >
            {/* Preserved NEWID logo */}
            <div className="h-12 w-auto flex items-center justify-center overflow-hidden rounded-xl bg-[#101B32] shadow-[0_0_20px_rgba(56,189,248,0.15)] border border-slate-700/60 p-1 group-hover:border-[#38BDF8]/60 transition-all duration-300">
              <img
                src="/newid-logo.png"
                alt="NEWID Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-[#F8FAFC] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#38BDF8] group-hover:to-[#8B5CF6] transition-all">
                  Digital ID Replacement
                </span>
                <span className="hidden sm:inline-flex text-[11px] font-bold uppercase tracking-wider bg-blue-950/80 text-[#38BDF8] px-2 py-0.5 rounded-md border border-blue-800/70 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                  NEWID
                </span>
              </div>
              <p className="text-xs text-[#A7B4C8] font-medium">
                Official College Student Portal
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'home'
                  ? 'text-[#38BDF8] bg-blue-950/60 border border-blue-800/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                  : 'text-[#A7B4C8] hover:text-[#F8FAFC] hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('apply', { step: 1 })}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'apply'
                  ? 'text-[#38BDF8] bg-blue-950/60 border border-blue-800/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                  : 'text-[#A7B4C8] hover:text-[#F8FAFC] hover:bg-slate-800/50'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-[#38BDF8]" />
              <span>Apply Replacement</span>
            </button>

            <button
              onClick={() => onNavigate('track')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'track'
                  ? 'text-[#38BDF8] bg-blue-950/60 border border-blue-800/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                  : 'text-[#A7B4C8] hover:text-[#F8FAFC] hover:bg-slate-800/50'
              }`}
            >
              <Search className="w-4 h-4 text-[#8B5CF6]" />
              <span>Track My Request</span>
            </button>

            <button
              onClick={onOpenPolicy}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-[#A7B4C8] hover:text-[#F8FAFC] hover:bg-slate-800/50 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Fee & Policy</span>
            </button>

            <div className="h-6 w-px bg-slate-800 mx-1.5" />

            {/* Admin Dashboard Entry */}
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                currentView === 'admin'
                  ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white border-transparent shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  : 'bg-[#111C30]/80 text-[#A7B4C8] border-slate-700/60 hover:text-[#F8FAFC] hover:border-[#38BDF8]/50 hover:bg-[#17243B]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Admin Portal</span>
            </button>
          </nav>

          {/* Draft banner or Mobile Toggle */}
          <div className="flex items-center gap-2">
            {draft && (
              <div
                onClick={handleResumeDraft}
                className="hidden sm:flex items-center gap-2 bg-violet-950/70 hover:bg-violet-900/80 border border-violet-700/60 text-violet-200 px-3.5 py-1.5 rounded-xl cursor-pointer text-xs font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all animate-pulse"
                title="Click to resume your saved draft"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#8B5CF6] fill-[#8B5CF6]" />
                <span>Resume Draft (Step {draft.currentStep})</span>
                <button
                  onClick={handleDeleteDraft}
                  className="p-1 hover:bg-violet-800/60 rounded text-violet-300 hover:text-[#FB7185]"
                  title="Discard Draft"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-[#A7B4C8] hover:text-[#F8FAFC] hover:bg-slate-800/60 border border-slate-700/60 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1220]/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-fade-slide">
          {draft && (
            <div className="flex items-center justify-between p-3 bg-violet-950/80 rounded-xl border border-violet-700/60 mb-2">
              <button
                onClick={() => {
                  handleResumeDraft();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs font-bold text-violet-200 text-left"
              >
                <Bookmark className="w-4 h-4 text-[#8B5CF6] fill-[#8B5CF6]" />
                <span>Resume Saved Draft (Step {draft.currentStep})</span>
              </button>
              <button
                onClick={handleDeleteDraft}
                className="p-1.5 text-slate-400 hover:text-[#FB7185]"
                title="Discard Draft"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentView === 'home' ? 'bg-blue-950/70 text-[#38BDF8] font-bold border border-blue-800/60' : 'text-[#A7B4C8] hover:bg-slate-800/50'
            }`}
          >
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              onNavigate('apply', { step: 1 });
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 ${
              currentView === 'apply' ? 'bg-blue-950/70 text-[#38BDF8] font-bold border border-blue-800/60' : 'text-[#A7B4C8] hover:bg-slate-800/50'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#38BDF8]" />
            <span>Start Replacement Request</span>
          </button>

          <button
            onClick={() => {
              onNavigate('track');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2.5 ${
              currentView === 'track' ? 'bg-blue-950/70 text-[#38BDF8] font-bold border border-blue-800/60' : 'text-[#A7B4C8] hover:bg-slate-800/50'
            }`}
          >
            <Search className="w-4 h-4 text-[#8B5CF6]" />
            <span>Track My Request</span>
          </button>

          <button
            onClick={() => {
              onOpenPolicy();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-[#A7B4C8] hover:bg-slate-800/50 flex items-center gap-2.5"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Fee & College Policy</span>
          </button>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#2563EB] to-[#7C3AED] shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#38BDF8]" />
              <span>Open Administrator Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
