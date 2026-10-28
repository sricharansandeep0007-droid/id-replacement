# Digital ID Replacement — NEWID
### Official College Student ID Replacement Portal

A modern, high-contrast, premium dark-themed web application designed to help college students apply for a replacement student ID card when their existing card is lost, damaged, unreadable, or needs renewal.

Branded with the official **NEWID logo** and an elevated cyber-academic aesthetic, the portal features an **animated gradient aurora backdrop**, **flowing gradient-clipped typography**, **glassmorphism forms and cards**, a 6-step application workflow, client-side validation, demo payments, real-time status tracking with a configurable 7-stage timeline, statutory declarations, a local draft persistence system ("Save and Continue Later"), and an interactive **Administrator Portal** to approve applications, update payment status, and record the official **ID Card Issued Date**.

---

## 🎨 Darker, Premium Colour Palette

- **Primary Background (`#070B14`)**: Deep midnight canvas with subtle tech micro-grid.
- **Secondary Background (`#0B1220`)**: Recessed dark container surfaces.
- **Dark Navy (`#101B32`)**: Header surfaces, dark badges, and guidance banner backgrounds.
- **Card Background (`#111C30`)**: Translucent glassmorphic card bodies (`backdrop-blur-xl`).
- **Elevated Card Background (`#17243B`)**: Hover states, modals, and spotlight containers.
- **Electric Blue (`#38BDF8`) & Primary Blue (`#2563EB`)**: Primary action buttons, active glowing borders, and focus rings.
- **Gradient Violet (`#8B5CF6`) & Cyan (`#22D3EE`)**: Aurora light bloom accents and flowing text gradients.
- **Gradient Red (`#F43F5E`) & Alert Text (`#FB7185`)**: Field validation errors, loss statutory notices, and disciplinary warnings.
- **Main Text (`#F8FAFC`) & Secondary Text (`#A7B4C8`)**: High-contrast, crystal clear typography.
- **Official Logo**: Preserved original **NEWID logo** (`public/newid-logo.png`).

---

## ✨ Visual & Functional Highlights

### 🌌 1. Animated Gradient Backdrop
- Built into a reusable `<AnimatedBackdrop />` component rendering slowly drifting, large blurred radial-gradient light sources in electric blue, violet, and cyan across all pages without layout distraction or performance penalty.
- Overlayed with an ultra-subtle tech grid pattern for an authentic modern portal feel.

### ✨ 2. Flowing Gradient-Clipped Text
- Applied CSS gradient clipping (`linear-gradient` with `background-clip: text` and keyframe background-position shift) to:
  - Hero headline: *"Your New ID Starts Here. Replace It The Smarter Way."*
  - Brand titles and section headers
  - Confirmation celebratory headings
  - Application progress banners

### ⚡ 3. Animated Transitions & Micro-Interactions
- Smooth fade-in, scale (0.985 ➔ 1.0), and 14px slide-up transitions when navigating between form steps or routing between pages.
- Progress bar fills smoothly with an electric blue-violet gradient.
- Glowing hover lifts on buttons and interactive cards.

### 💳 4. Enhanced Dark Glassmorphism Cards & Forms
- Rounded corners (16px–24px) with subtle translucent borders (`rgba(148, 163, 184, 0.18)`).
- Input fields styled in dark translucent containers with bright electric blue focus glow (`focus:ring-2 focus:ring-[#38BDF8]/40`).
- Dedicated payment page with glowing selectable cards (UPI QR code simulation, demo credit card with hologram, net banking, cash at office counter).

### 🏷️ 5. ID Card Issued Date
- Prominent dedicated section on both the confirmation screen and tracking view.
- Strictly displays **"Not issued yet"** upon initial submission.
- Once officially recorded by an administrator in the Admin Portal, displays the actual issued date (e.g. `2026-10-26`), distinct from the submission date.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v3 + Custom Brand Utilities
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: CSS Keyframe Auroras + Canvas Confetti

---

## 🚀 How to Run Locally

### 1. Open Terminal in Project Directory
```powershell
cd c:\IDcardd
```

### 2. Start the Vite Development Server
On Windows PowerShell:
```powershell
npm.cmd run dev
```

### 3. Open in Browser
Visit the local URL shown in your terminal:
```
http://localhost:5173
```
