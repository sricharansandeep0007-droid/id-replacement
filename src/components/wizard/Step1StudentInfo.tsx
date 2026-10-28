import React, { useState } from 'react';
import type { StudentFormData } from '../../types';
import { Info, ArrowRight, User, Hash, GraduationCap, Calendar, Mail, Phone, Layers } from 'lucide-react';

interface Step1Props {
  data: StudentFormData;
  onChange: (data: Partial<StudentFormData>) => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

export const Step1StudentInfo: React.FC<Step1Props> = ({
  data,
  onChange,
  onNext,
  onSaveDraft,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!data.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (data.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full legal name (at least 3 characters).';
    }

    if (!data.rollNumber.trim()) {
      errs.rollNumber = 'Student Roll Number is required.';
    } else if (data.rollNumber.trim().length < 5) {
      errs.rollNumber = 'Please enter a valid college roll number.';
    }

    if (!data.department.trim()) {
      errs.department = 'Department / Branch is required.';
    }

    if (!data.academicYear.trim()) {
      errs.academicYear = 'Academic Year is required.';
    }

    if (!data.email.trim()) {
      errs.email = 'College email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!data.phone.trim()) {
      errs.phone = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(data.phone.trim().replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      rollNumber: true,
      department: true,
      academicYear: true,
      email: true,
      phone: true,
    });
    if (validate()) {
      onNext();
    }
  };

  const departments = [
    'Computer Science & Engineering',
    'CSE (Artificial Intelligence & ML)',
    'CSE (Data Science)',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Civil Engineering',
    'Master of Business Administration (MBA)',
  ];

  const years = [
    '1st Year (Undergraduate)',
    '2nd Year (Undergraduate)',
    '3rd Year (Undergraduate)',
    '4th Year (Undergraduate)',
    'Post-Graduate / Masters',
  ];

  const sections = ['Section A', 'Section B', 'Section C', 'Section D', 'Not Applicable'];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-slide">
      {/* Guidance Banner */}
      <div className="bg-[#101B32]/85 border border-[#38BDF8]/30 rounded-2xl p-5 flex items-start gap-3.5 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.12)]">
        <Info className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-[#F8FAFC] space-y-1">
          <p className="font-bold text-[#38BDF8]">
            Guidance: Enter your details as they appear in your college records.
          </p>
          <p className="text-[#A7B4C8]">
            Your roll number will be used to identify your application. Please note that this portal records your details for administrative processing and will be validated against institutional records during review.
          </p>
        </div>
      </div>

      {/* Form Fields Card */}
      <div className="card-glass p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-[#F8FAFC]">Student Profile & Academic Record</h3>
          <p className="text-xs text-[#A7B4C8]">All fields marked with an asterisk (*) are required.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label-dark flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Full Name *</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              onBlur={() => handleBlur('fullName')}
              className={`form-input-dark ${
                touched.fullName && errors.fullName
                  ? 'border-[#F43F5E] focus:ring-[#F43F5E]/40'
                  : ''
              }`}
            />
            {touched.fullName && errors.fullName && (
              <p className="mt-1.5 text-xs text-[#FB7185] font-semibold">{errors.fullName}</p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Why needed: Required for embossing on the face of your new card.
            </p>
          </div>

          {/* Roll Number */}
          <div>
            <label htmlFor="rollNumber" className="form-label-dark flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Student Roll Number *</span>
            </label>
            <input
              id="rollNumber"
              type="text"
              placeholder="e.g. 23B91A0542"
              value={data.rollNumber}
              onChange={(e) => onChange({ rollNumber: e.target.value.toUpperCase() })}
              onBlur={() => handleBlur('rollNumber')}
              className={`form-input-dark font-mono uppercase ${
                touched.rollNumber && errors.rollNumber
                  ? 'border-[#F43F5E] focus:ring-[#F43F5E]/40'
                  : ''
              }`}
            />
            {touched.rollNumber && errors.rollNumber && (
              <p className="mt-1.5 text-xs text-[#FB7185] font-semibold">{errors.rollNumber}</p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Why needed: Primary identifier for student verification and RFID coding.
            </p>
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="form-label-dark flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Department & Branch *</span>
            </label>
            <select
              id="department"
              value={data.department}
              onChange={(e) => onChange({ department: e.target.value })}
              onBlur={() => handleBlur('department')}
              className={`form-input-dark ${
                touched.department && errors.department
                  ? 'border-[#F43F5E] focus:ring-[#F43F5E]/40'
                  : ''
              }`}
            >
              <option value="" className="bg-[#0B1220] text-slate-400">Select your department / branch...</option>
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-[#0B1220] text-[#F8FAFC]">
                  {dept}
                </option>
              ))}
            </select>
            {touched.department && errors.department && (
              <p className="mt-1.5 text-xs text-[#FB7185] font-semibold">{errors.department}</p>
            )}
          </div>

          {/* Academic Year */}
          <div>
            <label htmlFor="academicYear" className="form-label-dark flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Academic Year *</span>
            </label>
            <select
              id="academicYear"
              value={data.academicYear}
              onChange={(e) => onChange({ academicYear: e.target.value })}
              onBlur={() => handleBlur('academicYear')}
              className={`form-input-dark ${
                touched.academicYear && errors.academicYear
                  ? 'border-[#F43F5E] focus:ring-[#F43F5E]/40'
                  : ''
              }`}
            >
              <option value="" className="bg-[#0B1220] text-slate-400">Select current academic year...</option>
              {years.map((yr) => (
                <option key={yr} value={yr} className="bg-[#0B1220] text-[#F8FAFC]">
                  {yr}
                </option>
              ))}
            </select>
            {touched.academicYear && errors.academicYear && (
              <p className="mt-1.5 text-xs text-[#FB7185] font-semibold">{errors.academicYear}</p>
            )}
          </div>

          {/* Section */}
          <div>
            <label htmlFor="section" className="form-label-dark flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Section (If applicable)</span>
            </label>
            <select
              id="section"
              value={data.section}
              onChange={(e) => onChange({ section: e.target.value })}
              className="form-input-dark"
            >
              <option value="" className="bg-[#0B1220] text-slate-400">Select section...</option>
              {sections.map((sec) => (
                <option key={sec} value={sec} className="bg-[#0B1220] text-[#F8FAFC]">
                  {sec}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-slate-500">
              Helps classroom coordinators dispatch your card if needed.
            </p>
          </div>

          {/* College Email Address */}
          <div>
            <label htmlFor="email" className="form-label-dark flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>College Email Address *</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g. rollnumber@college.edu"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              onBlur={() => handleBlur('email')}
              className={`form-input-dark ${
                touched.email && errors.email
                  ? 'border-[#F43F5E] focus:ring-[#F43F5E]/40'
                  : ''
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1.5 text-xs text-[#FB7185] font-semibold">{errors.email}</p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Why needed: Application status updates and confirmation slips will be sent here.
            </p>
          </div>

          {/* Mobile Number */}
          <div className="md:col-span-2">
            <label htmlFor="phone" className="form-label-dark flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Mobile Number *</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-medium">
                +91
              </span>
              <input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value.replace(/\D/g, '') })}
                onBlur={() => handleBlur('phone')}
                className={`form-input-dark pl-14 ${
                  touched.phone && errors.phone
                    ? 'border-[#F43F5E] focus:ring-[#F43F5E]/40'
                    : ''
                }`}
              />
            </div>
            {touched.phone && errors.phone && (
              <p className="mt-1.5 text-xs text-[#FB7185] font-semibold">{errors.phone}</p>
            )}
            <p className="mt-1 text-[11px] text-slate-500">
              Why needed: SMS notification when the replacement card is printed and ready at Counter 3.
            </p>
          </div>
        </div>
      </div>

      {/* Next Step Preview & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div className="text-xs text-[#A7B4C8] flex items-center gap-1.5 order-2 sm:order-1">
          <span className="font-semibold text-[#38BDF8]">Next Step:</span>
          <span>Next, tell us why you need a replacement ID card.</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
          <button
            type="button"
            onClick={onSaveDraft}
            className="btn-glass-secondary text-xs sm:text-sm px-5 py-3 flex-1 sm:flex-none"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="btn-glow-primary text-xs sm:text-sm px-7 py-3.5 flex-1 sm:flex-none text-white"
          >
            <span>Continue to Replacement Details</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>
      </div>
    </form>
  );
};
