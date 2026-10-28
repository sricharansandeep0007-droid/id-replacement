import React, { useState } from 'react';
import type { PaymentFormData, PaymentMethod } from '../../types';
import {
  QrCode,
  CreditCard,
  Building2,
  Banknote,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

interface Step4Props {
  data: PaymentFormData;
  onChange: (data: Partial<PaymentFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSaveDraft: () => void;
}

export const Step4PaymentMethod: React.FC<Step4Props> = ({
  data,
  onChange,
  onNext,
  onPrev,
  onSaveDraft,
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const cardName = 'STUDENT DEMO HOLDER';
  const cardMockNumber = '•••• •••• •••• 4242';

  const methods: { id: PaymentMethod; title: string; subtitle: string; icon: any }[] = [
    {
      id: 'upi',
      title: 'UPI / QR Code',
      subtitle: 'Instant transfer via Google Pay, PhonePe, Paytm, or BHIM',
      icon: QrCode,
    },
    {
      id: 'card',
      title: 'Debit / Credit Card',
      subtitle: 'Visa, MasterCard, or RuPay (Demonstration mode)',
      icon: CreditCard,
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      subtitle: 'Direct online transfer through verified bank portals',
      icon: Building2,
    },
    {
      id: 'counter',
      title: 'Cash at College Office',
      subtitle: 'Pay ₹250 directly at Counter 3 during ID card collection',
      icon: Banknote,
    },
    {
      id: 'college_portal',
      title: 'College Fee Portal / Challan',
      subtitle: 'Challan voucher generation or offline payment verification',
      icon: HelpCircle,
    },
  ];

  const handleSelectMethod = (m: PaymentMethod) => {
    let newStatus = data.status;
    let newRef = data.transactionRef;

    if (m === 'counter') {
      newStatus = 'Pay at College Counter';
      newRef = `COUNTER-COLLECTION-${Math.floor(1000 + Math.random() * 9000)}`;
    } else if (m === 'college_portal') {
      newStatus = 'Pending Verification';
      newRef = `FEE-PORTAL-${Math.floor(10000 + Math.random() * 90000)}`;
    } else {
      newStatus = 'Demo Completed';
      if (!newRef || newRef.startsWith('COUNTER-')) {
        newRef = `DEMO-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      }
    }

    onChange({
      method: m,
      status: newStatus,
      transactionRef: newRef,
      isDemo: true,
    });
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('college.fees@sbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const autofillDemoCard = () => {
    onChange({
      transactionRef: `CARD-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Demo Completed',
    });
  };

  return (
    <div className="space-y-8 animate-fade-slide">
      {/* Explicit Demo Notice Banner */}
      <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-5 flex items-start gap-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.15)]">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-200 space-y-1">
          <p className="font-bold text-amber-300">
            Demonstration Mode: No Real Financial Transaction Is Processed
          </p>
          <p className="text-amber-200/90 leading-relaxed">
            This prototype demonstrates the complete multi-payment flow. For your security, this system will never request or record CVV numbers, UPI PINs, net-banking credentials, or debit/credit card security numbers.
          </p>
        </div>
      </div>

      {/* Main Grid: Payment Selector & Active Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Method Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-[#38BDF8]">
            Select Payment Option *
          </h3>

          <div className="space-y-3">
            {methods.map((item) => {
              const isSelected = data.method === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectMethod(item.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#38BDF8] bg-blue-950/60 shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-[#38BDF8]/60'
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
                      <span className="font-bold text-sm text-[#F8FAFC]">{item.title}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />}
                    </div>
                    <p className="text-xs text-[#A7B4C8] mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fee Summary */}
          <div className="p-5 rounded-2xl bg-[#0B1220]/90 border border-slate-800 space-y-2.5 text-xs">
            <div className="flex justify-between text-[#A7B4C8]">
              <span>Card Replacement Fee:</span>
              <span className="text-[#F8FAFC] font-semibold">₹250.00</span>
            </div>
            <div className="flex justify-between text-[#A7B4C8]">
              <span>Portal Processing Fee:</span>
              <span className="text-emerald-400 font-semibold">₹0.00 (Waived)</span>
            </div>
            <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-[#F8FAFC] text-sm">
              <span>Total Amount:</span>
              <span className="text-[#38BDF8]">₹250.00</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Payment Method Details (7 cols) */}
        <div className="lg:col-span-7 card-glass p-6 sm:p-8 space-y-6">
          {/* Header of details */}
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider block">
                Selected Method
              </span>
              <h3 className="text-lg font-bold text-[#F8FAFC]">
                {methods.find((m) => m.id === data.method)?.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Total Due</span>
              <span className="text-2xl font-extrabold text-[#38BDF8]">₹250</span>
            </div>
          </div>

          {/* Dynamic views based on method */}
          {data.method === 'upi' && (
            <div className="space-y-5">
              <p className="text-xs text-[#A7B4C8]">
                Scan the official college QR code with any UPI app (GPay, PhonePe, Paytm) to simulate your replacement fee payment.
              </p>

              <div className="p-5 bg-[#0B1220]/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
                {/* Simulated QR Code with high-contrast frame */}
                <div className="w-36 h-36 bg-white p-3 rounded-xl border-2 border-[#38BDF8]/40 shadow-[0_0_20px_rgba(56,189,248,0.2)] flex flex-col items-center justify-center shrink-0">
                  <div className="grid grid-cols-5 gap-1 w-full h-full p-1 border-2 border-[#101B32] rounded">
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-slate-200 rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-[#2563EB] rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-slate-200 rounded-xs"></div>
                    <div className="bg-[#2563EB] rounded-xs"></div>
                    <div className="bg-[#8B5CF6] rounded-xs"></div>
                    <div className="bg-slate-200 rounded-xs"></div>
                    <div className="bg-slate-200 rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-slate-200 rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-slate-200 rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                    <div className="bg-[#101B32] rounded-xs"></div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#101B32] mt-1">UPI DEMO QR</span>
                </div>

                <div className="space-y-3 flex-1 text-xs w-full">
                  <div>
                    <span className="text-[#A7B4C8] block mb-1">College UPI VPA:</span>
                    <div className="flex items-center gap-2 font-mono font-bold text-[#F8FAFC] bg-[#111C30] px-3.5 py-2.5 rounded-xl border border-slate-700/70">
                      <span>college.fees@sbi</span>
                      <button
                        type="button"
                        onClick={copyUpiId}
                        className="ml-auto text-[#38BDF8] hover:text-[#22D3EE] p-1"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#A7B4C8] block mb-1">
                      UPI Transaction ID / UTR Number:
                    </label>
                    <input
                      type="text"
                      value={data.transactionRef}
                      onChange={(e) => onChange({ transactionRef: e.target.value })}
                      placeholder="e.g. 482910482910"
                      className="form-input-dark font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {data.method === 'card' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#101B32] via-[#17243B] to-[#1E1B4B] text-white p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_25px_rgba(56,189,248,0.2)] relative overflow-hidden space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono tracking-widest text-[#38BDF8] uppercase font-bold">
                    College Demo Card
                  </span>
                  <span className="font-bold text-white tracking-wider">VISA / RuPay</span>
                </div>
                <div className="py-2">
                  <span className="font-mono text-xl tracking-widest block text-slate-100">
                    {cardMockNumber}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Card Holder</span>
                    <span className="font-semibold">{cardName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Expires</span>
                    <span className="font-semibold">12/29</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1220]/80 border border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-[#F8FAFC] block">Demonstration Card Simulation</span>
                  <span className="text-[#A7B4C8]">Click below to simulate approval without real charges.</span>
                </div>
                <button
                  type="button"
                  onClick={autofillDemoCard}
                  className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] shrink-0 transition-all"
                >
                  Generate Test Auth
                </button>
              </div>

              <div>
                <label className="form-label-dark">Simulated Card Authorization Code:</label>
                <input
                  type="text"
                  readOnly
                  value={data.transactionRef}
                  className="form-input-dark bg-[#0B1220]/50 text-xs font-mono"
                />
              </div>
            </div>
          )}

          {data.method === 'netbanking' && (
            <div className="space-y-4">
              <p className="text-xs text-[#A7B4C8]">
                Select your institution's affiliated banking partner to initiate demo direct debit:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Canara Bank', 'Punjab National Bank'].map(
                  (bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() =>
                        onChange({
                          transactionRef: `NETBANK-${bank.replace(/\s+/g, '')}-${Math.floor(10000 + Math.random() * 90000)}`,
                          status: 'Demo Completed',
                        })
                      }
                      className="p-3.5 rounded-xl border border-slate-800 hover:border-[#38BDF8] bg-[#0B1220]/80 hover:bg-[#111C30] text-center font-semibold text-slate-200 hover:text-white transition-all shadow-xs"
                    >
                      {bank}
                    </button>
                  )
                )}
              </div>
              <div className="pt-2">
                <label className="form-label-dark">Reference Ref No.:</label>
                <input
                  type="text"
                  value={data.transactionRef}
                  onChange={(e) => onChange({ transactionRef: e.target.value })}
                  className="form-input-dark text-xs font-mono"
                />
              </div>
            </div>
          )}

          {data.method === 'counter' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200 space-y-2">
                <p className="font-bold text-[#38BDF8] text-sm">
                  Pay ₹250 Cash Directly at College Counter 3
                </p>
                <p className="text-slate-300 leading-relaxed">
                  No online payment is required right now. You can pay cash to the cashier at the Student Affairs Section when collecting your new physical ID card.
                </p>
                <p className="text-[11px] text-[#38BDF8] font-semibold pt-1">
                  A cash collection token has been assigned to your request.
                </p>
              </div>

              <div>
                <label className="form-label-dark">Assigned Cashier Pickup Token:</label>
                <input
                  type="text"
                  readOnly
                  value={data.transactionRef}
                  className="form-input-dark font-mono text-xs font-bold text-[#38BDF8] bg-[#0B1220]/60"
                />
              </div>
            </div>
          )}

          {data.method === 'college_portal' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#0B1220]/80 border border-slate-800 text-xs text-[#A7B4C8] space-y-2">
                <p className="font-bold text-[#F8FAFC] text-sm">
                  Offline Challan / College Fee Portal Verification
                </p>
                <p className="leading-relaxed">
                  If you have already paid through your college ERP or tuition fee challan, enter your Challan Number below. It will be verified by the accountant before printing.
                </p>
              </div>

              <div>
                <label className="form-label-dark">Challan / ERP Payment Voucher Number:</label>
                <input
                  type="text"
                  placeholder="e.g. CHAL-2026-94812"
                  value={data.transactionRef}
                  onChange={(e) => onChange({ transactionRef: e.target.value })}
                  className="form-input-dark text-xs font-mono"
                />
              </div>
            </div>
          )}

          {/* Payment Status indicator */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[#A7B4C8]">Current Payment State:</span>
            <span className="font-bold text-[#38BDF8] bg-blue-950/80 px-3.5 py-1 rounded-full border border-blue-800/60 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
              {data.status} (Demo)
            </span>
          </div>
        </div>
      </div>

      {/* Next Step Preview & Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="text-xs text-[#A7B4C8] flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-[#38BDF8]">Next Step:</span>
          <span>Next, review all your information and confirm your request.</span>
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
            <span>Continue to Review & Submit</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>
      </div>
    </div>
  );
};
