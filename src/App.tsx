import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';
import ChecklistForm from './components/ChecklistForm';
import Home from './pages/Home';
import ResourcesArchive from './pages/ResourcesArchive';
import SiteGuide from './pages/SiteGuide';
import Legal from './pages/Legal';

// Helper to scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const openDiagnostic = () => setIsDiagnosticOpen(true);
  const closeDiagnostic = () => setIsDiagnosticOpen(false);

  const openChecklist = () => setIsChecklistOpen(true);
  const closeChecklist = () => setIsChecklistOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-bg font-sans text-slate-300 selection:bg-neon-cyan selection:text-dark-bg">
        <Navbar onOpenDiagnostic={openDiagnostic} />
        
        <Routes>
          <Route path="/" element={<Home onOpenDiagnostic={openDiagnostic} onOpenChecklist={openChecklist} />} />
          <Route path="/resources" element={<ResourcesArchive onOpenChecklist={openChecklist} />} />
          <Route path="/site-guide" element={<SiteGuide />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>

        <Footer />

        {/* Pop-up Diagnostic Form */}
        <Modal isOpen={isDiagnosticOpen} onClose={closeDiagnostic}>
          <div className="p-6 sm:p-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-6 sm:mb-8">
              SCHEDULE YOUR <br />
              <span className="text-transparent bg-clip-text vapor-gradient">DIAGNOSTIC</span>
            </h2>
            <ContactForm />
          </div>
        </Modal>
        {/* Pop-up Checklist Form */}
        <Modal isOpen={isChecklistOpen} onClose={closeChecklist}>
          <ChecklistForm />
        </Modal>
      </div>
    </BrowserRouter>
  );
}

export default App;
