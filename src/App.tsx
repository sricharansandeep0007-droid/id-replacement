import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PolicyModal } from './components/policy/PolicyModal';
import { LandingPage } from './components/home/LandingPage';
import { WizardContainer } from './components/wizard/WizardContainer';
import { TrackingPage } from './components/tracking/TrackingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AnimatedBackdrop } from './components/common/AnimatedBackdrop';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'apply' | 'track' | 'admin'>('home');
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // View parameters
  const [wizardStep, setWizardStep] = useState(1);
  const [trackParams, setTrackParams] = useState<{ id?: string; roll?: string }>({});
  const [adminSelectedId, setAdminSelectedId] = useState<string | undefined>(undefined);

  const handleNavigate = (view: string, params?: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'apply') {
      setWizardStep(params?.step || 1);
      setCurrentView('apply');
    } else if (view === 'track') {
      if (params) {
        setTrackParams({ id: params.id, roll: params.roll });
      }
      setCurrentView('track');
    } else if (view === 'admin') {
      if (params?.id) {
        setAdminSelectedId(params.id);
      }
      setCurrentView('admin');
    } else {
      setCurrentView('home');
    }
  };

  const handleStartApplication = () => {
    handleNavigate('apply', { step: 1 });
  };

  const handleTrackRequest = () => {
    handleNavigate('track');
  };

  const handleQuickTrackDemo = (id: string, roll: string) => {
    handleNavigate('track', { id, roll });
  };

  const handleOpenAdminFromConfirm = (id: string) => {
    handleNavigate('admin', { id });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B14] text-[#F8FAFC] antialiased relative selection:bg-[#38BDF8]/30 selection:text-[#38BDF8]">
      {/* Animated Gradient Aurora Backdrop */}
      <AnimatedBackdrop />

      {/* Policy and Regulations Modal */}
      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />

      {/* Main Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenPolicy={() => setIsPolicyOpen(true)}
      />

      {/* Content Area with Smooth Page Transition */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
        <div key={currentView} className="animate-fade-slide">
          {currentView === 'home' && (
            <LandingPage
              onStartApplication={handleStartApplication}
              onTrackRequest={handleTrackRequest}
              onOpenPolicy={() => setIsPolicyOpen(true)}
              onQuickTrackDemo={handleQuickTrackDemo}
            />
          )}

          {currentView === 'apply' && (
            <WizardContainer
              initialStep={wizardStep}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateTrack={(id, roll) => handleNavigate('track', { id, roll })}
              onNavigateAdmin={handleOpenAdminFromConfirm}
            />
          )}

          {currentView === 'track' && (
            <TrackingPage
              initialId={trackParams.id}
              initialRoll={trackParams.roll}
              onOpenAdmin={handleOpenAdminFromConfirm}
              onStartApplication={handleStartApplication}
            />
          )}

          {currentView === 'admin' && (
            <AdminDashboard
              initialSelectedId={adminSelectedId}
              onNavigateTracking={(id, roll) => handleNavigate('track', { id, roll })}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenPolicy={() => setIsPolicyOpen(true)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
