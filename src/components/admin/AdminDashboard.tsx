import React, { useState, useEffect } from 'react';
import type { ApplicationRecord, RequestStatus, PaymentStatus } from '../../types';
import { StorageService } from '../../services/storageService';
import { StatusBadge } from '../common/Badge';
import {
  Shield,
  Search,
  CheckCircle2,
  Calendar,
  X,
  Save,
  RotateCcw,
  User,
  FileText,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardProps {
  initialSelectedId?: string;
  onNavigateTracking: (id: string, roll: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialSelectedId,
  onNavigateTracking,
}) => {
  // Simulated Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState('registrar.idcell@college.edu');
  const [adminPassword, setAdminPassword] = useState('••••••••');

  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  // Edit form state in drawer
  const [editStatus, setEditStatus] = useState<RequestStatus>('Submitted');
  const [editIssuedDate, setEditIssuedDate] = useState<string>('');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('Pending Verification');
  const [editLocation, setEditLocation] = useState('');
  const [editInstructions, setEditInstructions] = useState('');
  const [editRemarks, setEditRemarks] = useState('');
  const [editRejectionReason, setEditRejectionReason] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    const list = StorageService.getApplications();
    setApplications(list);
    if (initialSelectedId) {
      const match = list.find((a) => a.id.toUpperCase() === initialSelectedId.toUpperCase());
      if (match) openDrawer(match);
    }
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => {
      const list = StorageService.getApplications();
      setApplications(list);
    };
    window.addEventListener('newid_applications_updated', handleUpdate);
    return () => window.removeEventListener('newid_applications_updated', handleUpdate);
  }, [initialSelectedId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openDrawer = (app: ApplicationRecord) => {
    setSelectedApp(app);
    setEditStatus(app.status);
    setEditIssuedDate(app.idCardIssuedDate || '');
    setEditPaymentStatus(app.payment.status);
    setEditLocation(app.collectionLocation);
    setEditInstructions(app.collectionInstructions);
    setEditRemarks(app.adminRemarks || '');
    setEditRejectionReason(app.rejectionReason || '');
  };

  const closeDrawer = () => {
    setSelectedApp(null);
  };

  const handleSetTodayIssuedDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setEditIssuedDate(today);
  };

  const handleClearIssuedDate = () => {
    setEditIssuedDate('');
  };

  const handleSaveAppChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    StorageService.updateApplication(selectedApp.id, {
      status: editStatus,
      idCardIssuedDate: editIssuedDate ? editIssuedDate : null,
      paymentStatus: editPaymentStatus,
      collectionLocation: editLocation,
      collectionInstructions: editInstructions,
      adminRemarks: editRemarks,
      rejectionReason: editRejectionReason,
      historyNote: `Updated by Admin: Status changed to ${editStatus}${
        editIssuedDate ? `, ID Card Issued Date recorded as ${editIssuedDate}` : ''
      }`,
    });

    showToast(`Application ${selectedApp.id} updated successfully!`);
    loadData();
    closeDrawer();
  };

  const handleResetData = () => {
    if (window.confirm('Reset applications back to initial demonstration sample data?')) {
      StorageService.resetToDefaultData();
      loadData();
      showToast('Reset to default demonstration records.');
    }
  };

  // Filter and search
  const filteredApps = applications.filter((app) => {
    const matchesFilter =
      statusFilter === 'ALL' || app.status.toLowerCase() === statusFilter.toLowerCase();
    const cleanSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !cleanSearch ||
      app.id.toLowerCase().includes(cleanSearch) ||
      app.student.fullName.toLowerCase().includes(cleanSearch) ||
      app.student.rollNumber.toLowerCase().includes(cleanSearch) ||
      app.student.department.toLowerCase().includes(cleanSearch);
    return matchesFilter && matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.status === 'Submitted').length,
    inPrep: applications.filter((a) => a.status === 'ID Card in Preparation').length,
    ready: applications.filter((a) => a.status === 'Ready for Collection').length,
    issuedWithDate: applications.filter((a) => a.idCardIssuedDate !== null).length,
    completed: applications.filter((a) => a.status === 'Completed').length,
  };

  // If unauthenticated state
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 card-glass shadow-2xl animate-fade-slide">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#F8FAFC]">Administrator Sign In</h2>
          <p className="text-xs text-[#A7B4C8] mt-1">
            Student Affairs & Examination Section Personnel Only
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="form-label-dark">Admin Email</label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="form-input-dark text-xs"
            />
          </div>
          <div>
            <label className="form-label-dark">Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="form-input-dark text-xs"
            />
          </div>
          <button
            onClick={() => setIsAuthenticated(true)}
            className="btn-glow-primary w-full text-xs py-3 text-white"
          >
            <span>Sign In to Admin Portal</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-slide">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17243B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs sm:text-sm animate-fade-slide">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="card-glass-elevated p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-950/80 text-[#38BDF8] border border-blue-800/60 rounded-lg">
              <Shield className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Administrative Control Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            NEWID Student ID Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#A7B4C8]">
            Review submitted student requests, change processing states, and record official{' '}
            <strong className="text-[#38BDF8]">ID Card Issued Dates</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetData}
            className="px-4 py-2.5 rounded-xl bg-[#0B1220] hover:bg-[#111C30] text-[#A7B4C8] hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
            title="Reset to default mock requests"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Records</span>
          </button>
          <div className="h-6 w-px bg-slate-800" />
          <div className="text-right text-xs">
            <span className="text-slate-500 block text-[10px]">Logged in as</span>
            <span className="font-semibold text-[#F8FAFC]">College Registrar</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 bg-[#111C30]/80 rounded-2xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Requests
          </span>
          <span className="text-2xl font-extrabold text-[#F8FAFC] mt-1 block">{stats.total}</span>
        </div>

        <div className="p-4 bg-[#111C30]/80 rounded-2xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Submitted / New
          </span>
          <span className="text-2xl font-extrabold text-slate-300 mt-1 block">
            {stats.submitted}
          </span>
        </div>

        <div className="p-4 bg-violet-950/40 rounded-2xl border border-violet-800/60 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 block">
            In Preparation
          </span>
          <span className="text-2xl font-extrabold text-violet-200 mt-1 block">{stats.inPrep}</span>
        </div>

        <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
            Ready at Counter
          </span>
          <span className="text-2xl font-extrabold text-emerald-300 mt-1 block">{stats.ready}</span>
        </div>

        <div className="p-4 bg-blue-950/40 rounded-2xl border border-blue-800/60 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8] block">
            Issued with Date
          </span>
          <span className="text-2xl font-extrabold text-[#38BDF8] mt-1 block">
            {stats.issuedWithDate}
          </span>
        </div>

        <div className="p-4 bg-[#111C30]/80 rounded-2xl border border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Completed / Handover
          </span>
          <span className="text-2xl font-extrabold text-slate-300 mt-1 block">
            {stats.completed}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-glass p-6 sm:p-8 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by Reference ID, Roll Number, or Student Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input-dark pl-10 text-xs sm:text-sm"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
            {['ALL', 'Submitted', 'Under Review', 'Approved', 'ID Card in Preparation', 'Ready for Collection', 'Completed', 'Rejected'].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    statusFilter === f
                      ? 'bg-blue-950/90 text-[#38BDF8] border border-blue-700 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                      : 'bg-[#0B1220] hover:bg-[#17243B] text-[#A7B4C8] border border-slate-800'
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#0B1220]/70">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111C30] text-[#A7B4C8] uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-bold">Reference ID</th>
                <th className="py-3 px-4 font-bold">Student Name & Roll</th>
                <th className="py-3 px-4 font-bold">Branch / Year</th>
                <th className="py-3 px-4 font-bold">Reason</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-[#38BDF8]">ID Card Issued Date</th>
                <th className="py-3 px-4 font-bold">Payment</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No requests match your current filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#111C30]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#38BDF8]">
                      {app.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#F8FAFC] block">{app.student.fullName}</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {app.student.rollNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#A7B4C8]">
                      <span className="block truncate max-w-[140px] font-medium text-slate-300">
                        {app.student.department}
                      </span>
                      <span className="text-[10px] text-slate-500">{app.student.academicYear}</span>
                    </td>

                    <td className="py-3.5 px-4 text-[#A7B4C8]">
                      <span className="font-medium text-slate-300">{app.replacement.reason}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    {/* CRITICAL COLUMN: ID Card Issued Date */}
                    <td className="py-3.5 px-4">
                      {app.idCardIssuedDate ? (
                        <span className="font-mono font-bold text-[#38BDF8] bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800/60 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                          {app.idCardIssuedDate}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic text-[11px]">Not issued yet</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.payment.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openDrawer(app)}
                        className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over / Modal Management Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#070B14]/80 backdrop-blur-md animate-fade-slide">
          <div className="bg-[#0B1220] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-700/80">
            {/* Header */}
            <div className="sticky top-0 bg-[#111C30] border-b border-slate-800 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8] block">
                  Manage Application Record
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="text-xl font-extrabold text-[#F8FAFC] font-mono">
                    {selectedApp.id}
                  </h3>
                  <StatusBadge status={selectedApp.status} size="sm" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTracking(selectedApp.id, selectedApp.student.rollNumber)}
                  className="text-xs font-semibold text-[#38BDF8] hover:text-[#22D3EE] flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800/60"
                  title="Open this request in Student Tracking View"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </button>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form & details */}
            <form onSubmit={handleSaveAppChanges} className="p-6 space-y-6 text-xs text-[#A7B4C8]">
              {/* Student Summary Banner */}
              <div className="p-4 bg-[#111C30]/80 border border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Student</span>
                  <span className="font-bold text-[#F8FAFC] text-sm">{selectedApp.student.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Roll No</span>
                  <span className="font-mono font-bold text-[#38BDF8] text-sm">
                    {selectedApp.student.rollNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Contact</span>
                  <span className="text-slate-300">{selectedApp.student.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Branch</span>
                  <span className="text-slate-300">{selectedApp.student.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Reason</span>
                  <span className="font-semibold text-[#38BDF8]">{selectedApp.replacement.reason}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Submission Date</span>
                  <span className="text-slate-300">
                    {new Date(selectedApp.submissionDate).toLocaleString('en-US', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>

              {/* Photo & doc verification preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#111C30]/60 border border-slate-800 rounded-xl flex items-center gap-3">
                  {selectedApp.replacement.photoUrl ? (
                    <img
                      src={selectedApp.replacement.photoUrl}
                      alt="Student"
                      className="w-14 h-16 object-cover rounded border border-slate-700"
                    />
                  ) : (
                    <div className="w-14 h-16 bg-slate-800 rounded flex items-center justify-center text-slate-500">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-[#F8FAFC] block text-xs">Photograph for Card</span>
                    <span className="text-[11px] text-[#A7B4C8]">
                      {selectedApp.replacement.photoFileName || 'Using official student records photo'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#111C30]/60 border border-slate-800 rounded-xl flex items-center gap-3">
                  <div className="w-14 h-16 bg-violet-950/80 text-[#8B5CF6] border border-violet-800/60 rounded flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-[#F8FAFC] block text-xs">Supporting Document</span>
                    <span className="text-[11px] text-[#A7B4C8]">
                      {selectedApp.replacement.docFileName || 'No uploaded document'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section: Administrative Status Actions */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h4 className="font-bold text-sm text-[#38BDF8] uppercase tracking-wider">
                  Update Processing Status
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Status Dropdown */}
                  <div>
                    <label className="form-label-dark">Request Status *</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as RequestStatus)}
                      className="form-input-dark text-xs"
                    >
                      <option value="Submitted" className="bg-[#0B1220]">Submitted (Queued)</option>
                      <option value="Under Review" className="bg-[#0B1220]">Under Review (Checking Records)</option>
                      <option value="Approved" className="bg-[#0B1220]">Approved (Authorized for Reprint)</option>
                      <option value="Payment Pending" className="bg-[#0B1220]">Payment Pending</option>
                      <option value="ID Card in Preparation" className="bg-[#0B1220]">
                        ID Card in Preparation (Printing / RFID encoding)
                      </option>
                      <option value="Ready for Collection" className="bg-[#0B1220]">Ready for Collection (At Counter 3)</option>
                      <option value="Completed" className="bg-[#0B1220]">Completed (Handed over)</option>
                      <option value="Action Required" className="bg-[#0B1220]">Action Required (Need Student Action)</option>
                      <option value="Rejected" className="bg-[#0B1220]">Rejected</option>
                    </select>
                  </div>

                  {/* Payment Status Dropdown */}
                  <div>
                    <label className="form-label-dark">Payment Verification Status *</label>
                    <select
                      value={editPaymentStatus}
                      onChange={(e) => setEditPaymentStatus(e.target.value as PaymentStatus)}
                      className="form-input-dark text-xs"
                    >
                      <option value="Paid / Verified" className="bg-[#0B1220]">Paid / Verified</option>
                      <option value="Pending Verification" className="bg-[#0B1220]">Pending Verification</option>
                      <option value="Pay at College Counter" className="bg-[#0B1220]">Pay at College Counter</option>
                      <option value="Exempted" className="bg-[#0B1220]">Exempted</option>
                      <option value="Demo Completed" className="bg-[#0B1220]">Demo Completed</option>
                    </select>
                  </div>
                </div>

                {/* CRITICAL ADMIN ACTION: Record ID Card Issued Date */}
                <div className="p-4 bg-blue-950/40 border border-[#38BDF8]/40 rounded-2xl space-y-3 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#38BDF8] text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#38BDF8]" />
                      <span>Record ID Card Issued Date *</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSetTodayIssuedDate}
                        className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-[11px] font-semibold transition-colors shadow-xs"
                      >
                        Set to Today
                      </button>
                      {editIssuedDate && (
                        <button
                          type="button"
                          onClick={handleClearIssuedDate}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="date"
                    value={editIssuedDate}
                    onChange={(e) => setEditIssuedDate(e.target.value)}
                    className="form-input-dark text-xs font-mono"
                  />

                  <p className="text-[11px] text-[#A7B4C8]">
                    <strong className="text-slate-300">Rule:</strong> If left empty, student tracking will display{' '}
                    <span className="font-semibold text-slate-300">"Not issued yet"</span>. When recorded, the exact date is displayed. It will not use or change the submission date.
                  </p>
                </div>

                {/* Rejection / Action required reason */}
                {(editStatus === 'Rejected' || editStatus === 'Action Required') && (
                  <div className="space-y-1.5">
                    <label className="form-label-dark text-[#FB7185]">
                      Reason for Rejection / Action Required *
                    </label>
                    <textarea
                      rows={2}
                      value={editRejectionReason}
                      onChange={(e) => setEditRejectionReason(e.target.value)}
                      placeholder="e.g. Photo provided does not adhere to plain white background requirements..."
                      className="form-input-dark text-xs resize-none border-rose-600/70"
                    />
                  </div>
                )}

                {/* Collection Venue & Instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label-dark">Collection Location</label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="form-input-dark text-xs"
                    />
                  </div>
                  <div>
                    <label className="form-label-dark">Collection Instructions for Student</label>
                    <input
                      type="text"
                      value={editInstructions}
                      onChange={(e) => setEditInstructions(e.target.value)}
                      className="form-input-dark text-xs"
                    />
                  </div>
                </div>

                {/* Internal Admin Remarks */}
                <div>
                  <label className="form-label-dark">Internal Administrator Notes / Print Batch</label>
                  <input
                    type="text"
                    value={editRemarks}
                    onChange={(e) => setEditRemarks(e.target.value)}
                    placeholder="e.g. Printed on Fargo DTC4500e printer, batch slot #3"
                    className="form-input-dark text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="btn-glass-secondary text-xs px-5 py-2.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glow-primary text-xs px-6 py-2.5 text-white"
                >
                  <Save className="w-4 h-4 text-[#38BDF8]" />
                  <span>Save Administrative Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
