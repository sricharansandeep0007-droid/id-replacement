import React from 'react';
import type { ApplicationRecord } from '../../types';

interface PrintAcknowledgementProps {
  application: ApplicationRecord;
}

export const PrintAcknowledgement: React.FC<PrintAcknowledgementProps> = ({ application }) => {
  return (
    <div className="hidden print:block p-8 max-w-3xl mx-auto bg-white text-black font-sans">
      {/* Header with NEWID branding */}
      <div className="flex items-center justify-between border-b-2 border-[#243F59] pb-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/newid-logo.png"
            alt="NEWID Logo"
            className="h-12 w-auto object-contain rounded"
          />
          <div>
            <h1 className="text-xl font-bold text-[#243F59] tracking-tight uppercase">
              Digital ID Replacement — NEWID
            </h1>
            <p className="text-xs text-gray-600">
              Office of Student Affairs & Examination Section • Official College ID Service
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-gray-100 border border-gray-300 px-3 py-1 text-xs font-mono font-bold">
            {application.id}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Official E-Acknowledgement</p>
        </div>
      </div>

      {/* Main Notice */}
      <div className="bg-blue-50 border-l-4 border-[#243F59] p-3 mb-6 text-xs text-gray-700">
        <p className="font-semibold text-[#243F59]">
          Student Replacement Request Acknowledgement Slip
        </p>
        <p className="mt-0.5">
          Present this printed slip along with your original college fee receipt when collecting your replacement ID card.
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-2 gap-4 text-xs mb-6 border border-gray-200 p-4 rounded">
        <div>
          <span className="text-gray-500 block uppercase text-[10px] font-semibold">Student Name:</span>
          <span className="font-bold text-sm text-gray-900">{application.student.fullName}</span>
        </div>
        <div>
          <span className="text-gray-500 block uppercase text-[10px] font-semibold">Student Roll Number:</span>
          <span className="font-bold text-sm text-gray-900 font-mono">{application.student.rollNumber}</span>
        </div>
        <div>
          <span className="text-gray-500 block uppercase text-[10px] font-semibold">Branch & Department:</span>
          <span className="font-medium text-gray-800">{application.student.department}</span>
        </div>
        <div>
          <span className="text-gray-500 block uppercase text-[10px] font-semibold">Year & Section:</span>
          <span className="font-medium text-gray-800">
            {application.student.academicYear} • {application.student.section}
          </span>
        </div>
        <div>
          <span className="text-gray-500 block uppercase text-[10px] font-semibold">Contact Email & Phone:</span>
          <span className="font-medium text-gray-800">
            {application.student.email} • {application.student.phone}
          </span>
        </div>
        <div>
          <span className="text-gray-500 block uppercase text-[10px] font-semibold">Replacement Reason:</span>
          <span className="font-medium text-gray-800">{application.replacement.reason}</span>
        </div>
      </div>

      {/* Status & Key Dates Table */}
      <table className="w-full text-xs border-collapse border border-gray-300 mb-6">
        <tbody>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 p-2 font-semibold text-gray-600 w-1/3">Application Submission Date</td>
            <td className="border border-gray-300 p-2 font-medium">
              {new Date(application.submissionDate).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </td>
          </tr>
          {/* CRITICAL FIELD: ID Card Issued Date */}
          <tr className="bg-blue-50/40">
            <td className="border border-gray-300 p-2 font-bold text-[#243F59] w-1/3">
              ID Card Issued Date
            </td>
            <td className="border border-gray-300 p-2 font-bold text-[#243F59]">
              {application.idCardIssuedDate ? (
                <span>{application.idCardIssuedDate}</span>
              ) : (
                <span className="text-gray-500 italic">Not issued yet (Pending administrative issuance)</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-semibold text-gray-600">Current Request Status</td>
            <td className="border border-gray-300 p-2 font-semibold">{application.status}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 p-2 font-semibold text-gray-600">Replacement Fee & Payment</td>
            <td className="border border-gray-300 p-2">
              ₹{application.payment.amount} (Status: {application.payment.status} • Ref: {application.payment.transactionRef || 'N/A'})
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2 font-semibold text-gray-600">Card Collection Location</td>
            <td className="border border-gray-300 p-2">{application.collectionLocation}</td>
          </tr>
        </tbody>
      </table>

      {/* Instructions */}
      <div className="border border-gray-200 p-3 rounded mb-8 text-[11px] text-gray-600">
        <h4 className="font-bold text-gray-800 uppercase mb-1">Collection Requirements & Policy:</h4>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>Carry this acknowledgement slip and a valid government photo ID card for identification.</li>
          {application.replacement.reason === 'ID card damaged' && (
            <li className="font-semibold text-red-700">
              Surrender of your existing damaged ID card is mandatory at the time of card pickup.
            </li>
          )}
          <li>College office pickup hours: 10:00 AM – 4:00 PM on official working days.</li>
          <li>For status tracking, visit the portal anytime using your reference number: <strong>{application.id}</strong></li>
        </ul>
      </div>

      {/* Signature blocks */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-dashed border-gray-400 text-center text-xs">
        <div>
          <div className="h-12"></div>
          <div className="border-t border-gray-400 pt-1 font-semibold text-gray-700">
            Student Signature
          </div>
        </div>
        <div>
          <div className="h-12"></div>
          <div className="border-t border-gray-400 pt-1 font-semibold text-gray-700">
            Authorised Seal & Signatory (Student Affairs)
          </div>
        </div>
      </div>
    </div>
  );
};
