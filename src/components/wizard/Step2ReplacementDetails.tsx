import React, { useState } from 'react';
import type { ReplacementFormData, ReplacementReason } from '../../types';
import {
  FileQuestion,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Check,
  ArrowRight,
  ArrowLeft,
  X,
  FileCheck,
} from 'lucide-react';

interface Step2Props {
  data: ReplacementFormData;
  onChange: (data: Partial<ReplacementFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSaveDraft: () => void;
}

export const Step2ReplacementDetails: React.FC<Step2Props> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSaveDraft,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [docError, setDocError] = useState<string | null>(null);

  const reasons: { id: ReplacementReason; title: string; desc: string; icon: any }[] = [
    {
      id: 'ID card lost',
      title: 'ID Card Lost',
      desc: 'Misplaced on campus, during transit, or theft.',
      icon: FileQuestion,
    },
    {
      id: 'ID card damaged',
      title: 'ID Card Damaged',
      desc: 'Physical crack, broken chip, snapped, or washed.',
      icon: AlertTriangle,
    },
    {
      id: 'Photograph or printed details unreadable',
      title: 'Photo / Details Unreadable',
      desc: 'Faded photo, erased text, or non-functional barcode.',
      icon: ImageIcon,
    },
    {
      id: 'Other reason',
      title: 'Other Reason',
      desc: 'Correction of name spelling, department transfer, etc.',
      icon: FileCheck,
    },
  ];

  const handleReasonSelect = (reason: ReplacementReason) => {
    onChange({ reason });
    setErrors((prev) => {
      const next = { ...prev };
      delete next.reason;
      return next;
    });
  };

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
      setPhotoError('Invalid format. Only JPEG, PNG, or WEBP photos are accepted.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('Photo file size exceeds 2MB limit. Please upload a compressed image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        photoUrl: reader.result as string,
        photoFileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onChange({ photoUrl: null, photoFileName: null });
  };

  // Supporting document upload handler
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      setDocError('Invalid file type. Please upload a PDF or JPG/PNG image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setDocError('Document exceeds 5MB limit. Please compress the file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        docUrl: reader.result as string,
        docFileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDoc = () => {
    onChange({ docUrl: null, docFileName: null });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!data.reason) {
      errs.reason = 'Please select a replacement reason.';
    }

    if (data.reason === 'Other reason' && !data.reasonExplanation.trim()) {
      errs.reasonExplanation = 'Please explain the specific reason for requesting a replacement.';
    }

    if (data.reason === 'ID card lost' && !data.lossDeclarationAccepted) {
      errs.lossDeclaration = 'You must accept the formal lost ID card declaration.';
    }

    if (data.reason === 'ID card damaged' && !data.surrenderDamagedAcknowledged) {
      errs.surrenderDamaged = 'You must acknowledge that the damaged physical card must be surrendered.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-slide">
      {/* Step Guidance */}
      <div className="bg-[#101B32]/85 border border-[#38BDF8]/30 rounded-2xl p-5 flex items-start gap-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.12)]">
        <FileQuestion className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#F8FAFC] space-y-1">
          <p className="font-bold text-[#38BDF8]">
            Tell us why you require a replacement student ID card.
          </p>
          <p className="text-[#A7B4C8]">
            Select the applicable reason below and provide supporting details. For damaged cards, the physical card must be surrendered. For lost cards, an undertaking declaration is required.
          </p>
        </div>
      </div>

      {/* Select Reason Cards */}
      <div className="card-glass p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[#F8FAFC]">Reason for ID Replacement *</h3>
          <p className="text-xs text-[#A7B4C8]">Choose the option that describes your situation.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {reasons.map((r) => {
            const isSelected = data.reason === r.id;
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => handleReasonSelect(r.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-[#38BDF8] bg-blue-950/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/50'
                    : 'border-slate-800 bg-[#0B1220]/80 hover:border-slate-700 hover:bg-[#111C30]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#F8FAFC]">{r.title}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#38BDF8]" />}
                  </div>
                  <p className="text-xs text-[#A7B4C8] mt-1">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {errors.reason && (
          <p className="text-xs text-[#FB7185] font-semibold">{errors.reason}</p>
        )}

        {/* Additional explanation */}
        <div className="pt-2">
          <label htmlFor="reasonExplanation" className="form-label-dark">
            Additional Circumstances / Explanation{' '}
            {data.reason === 'Other reason' ? '*' : '(Optional)'}
          </label>
          <textarea
            id="reasonExplanation"
            rows={3}
            placeholder={
              data.reason === 'ID card lost'
                ? 'e.g. Lost on college bus route #12 on Monday afternoon.'
                : data.reason === 'ID card damaged'
                ? 'e.g. Card cracked accidentally while inside backpack.'
                : 'Provide any helpful context for the Student Affairs officer...'
            }
            value={data.reasonExplanation}
            onChange={(e) => onChange({ reasonExplanation: e.target.value })}
            className={`form-input-dark resize-none ${
              errors.reasonExplanation ? 'border-[#F43F5E]' : ''
            }`}
          />
          {errors.reasonExplanation && (
            <p className="mt-1 text-xs text-[#FB7185] font-semibold">
              {errors.reasonExplanation}
            </p>
          )}
        </div>
      </div>

      {/* Uploads Section */}
      <div className="card-glass p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-[#F8FAFC]">Photographs & Supporting Documents</h3>
          <p className="text-xs text-[#A7B4C8]">
            Upload clear digital files for identity verification and card thermal printing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Upload */}
          <div className="border border-slate-800 rounded-xl p-5 bg-[#0B1220]/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC] flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Student Formal Photograph</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400">Max 2MB</span>
            </div>

            <p className="text-xs text-[#A7B4C8]">
              White background, recent formal passport photograph. This photo will be embossed on your card.
            </p>

            {data.photoUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#111C30] p-2.5 flex items-center gap-3">
                <img
                  src={data.photoUrl}
                  alt="Student Preview"
                  className="w-16 h-20 object-cover rounded-lg border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#F8FAFC] truncate">
                    {data.photoFileName || 'Uploaded Photo'}
                  </p>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                    ✓ Photo Ready for Card
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="p-1.5 text-slate-400 hover:text-[#FB7185] hover:bg-slate-800 rounded-lg"
                  title="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-700 hover:border-[#38BDF8]/60 rounded-xl p-5 text-center cursor-pointer block transition-all bg-[#111C30]/50 hover:bg-[#111C30]/80">
                <Upload className="w-6 h-6 text-[#38BDF8] mx-auto mb-2" />
                <span className="text-xs font-bold text-[#F8FAFC] block">
                  Click to Browse Photograph
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Formats: JPG, JPEG, PNG, WEBP (Max 2MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}

            {photoError && (
              <p className="text-xs text-[#FB7185] font-semibold">{photoError}</p>
            )}
          </div>

          {/* Supporting Document Upload */}
          <div className="border border-slate-800 rounded-xl p-5 bg-[#0B1220]/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-[#F8FAFC] flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Supporting Document / Undertaking</span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400">Max 5MB</span>
            </div>

            <p className="text-xs text-[#A7B4C8]">
              {data.reason === 'ID card damaged'
                ? 'Photo of damaged ID card (optional) or fee memo.'
                : 'Loss affidavit undertaking, police report, or fee receipt.'}
            </p>

            {data.docUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-[#111C30] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-2 bg-violet-950/80 text-[#8B5CF6] border border-violet-800/60 rounded-lg">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-[#F8FAFC] truncate">
                      {data.docFileName || 'Attached Document'}
                    </p>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      ✓ Document Attached
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveDoc}
                  className="p-1.5 text-slate-400 hover:text-[#FB7185] hover:bg-slate-800 rounded-lg shrink-0"
                  title="Remove document"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-700 hover:border-[#8B5CF6]/60 rounded-xl p-5 text-center cursor-pointer block transition-all bg-[#111C30]/50 hover:bg-[#111C30]/80">
                <Upload className="w-6 h-6 text-[#8B5CF6] mx-auto mb-2" />
                <span className="text-xs font-bold text-[#F8FAFC] block">
                  Click to Upload Supporting Document
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Formats: PDF, JPG, PNG (Max 5MB)
                </span>
                <input
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/jpg"
                  onChange={handleDocUpload}
                  className="hidden"
                />
              </label>
            )}

            {docError && <p className="text-xs text-[#FB7185] font-semibold">{docError}</p>}
          </div>
        </div>
      </div>

      {/* Mandatory Declarations based on Reason */}
      {data.reason === 'ID card lost' && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.lossDeclarationAccepted}
              onChange={(e) => onChange({ lossDeclarationAccepted: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-700 bg-[#0B1220] text-[#38BDF8] focus:ring-[#38BDF8]"
            />
            <div className="text-xs text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-0.5">
                Statutory Loss Undertaking & Declaration *
              </span>
              I solemnly declare that my student identity card is genuine and has been lost/misplaced. I have not transferred it to any other person. If found subsequently, I undertake to surrender it immediately to the College Student Affairs Office.
            </div>
          </label>
          {errors.lossDeclaration && (
            <p className="mt-2 text-xs text-[#FB7185] font-semibold">
              {errors.lossDeclaration}
            </p>
          )}
        </div>
      )}

      {data.reason === 'ID card damaged' && (
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.surrenderDamagedAcknowledged}
              onChange={(e) => onChange({ surrenderDamagedAcknowledged: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-slate-700 bg-[#0B1220] text-[#38BDF8] focus:ring-[#38BDF8]"
            />
            <div className="text-xs text-blue-200 leading-relaxed">
              <span className="font-bold text-[#38BDF8] block mb-0.5">
                Damaged Card Physical Surrender Requirement *
              </span>
              I acknowledge that I must bring and surrender my existing damaged student ID card (or its fragments) to Counter 3 upon collecting the replacement card.
            </div>
          </label>
          {errors.surrenderDamaged && (
            <p className="mt-2 text-xs text-[#FB7185] font-semibold">
              {errors.surrenderDamaged}
            </p>
          )}
        </div>
      )}

      {/* Next Step Preview & Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="text-xs text-[#A7B4C8] flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-[#38BDF8]">Next Step:</span>
          <span>Next, review the replacement fee, required documents, and processing instructions.</span>
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
            type="submit"
            className="btn-glow-primary text-xs sm:text-sm px-7 py-3.5 flex-1 sm:flex-none text-white"
          >
            <span>Continue to Fee & Requirements</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>
      </div>
    </form>
  );
};
