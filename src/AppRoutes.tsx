import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';
import ChecklistForm from './components/ChecklistForm';
import Home from './pages/Home';
import ResourcesArchive from './pages/ResourcesArchive';
import NewsFeed, { type Article } from './pages/NewsFeed';
import SiteGuide from './pages/SiteGuide';
import Legal from './pages/Legal';
import { useDocumentMeta } from './seo/useDocumentMeta';

export interface InitialData {
  newsArticles?: Article[];
}

// Helper to scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Renders the app under whichever router wraps it (BrowserRouter on the client,
// StaticRouter during prerendering), so this component must stay router-agnostic.
// initialData is supplied only during prerender; on the client NewsFeed reads its
// seed from window instead.
function AppRoutes({ initialData }: { initialData?: InitialData }) {
  const { pathname } = useLocation();
  useDocumentMeta(pathname);

  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const openDiagnostic = () => setIsDiagnosticOpen(true);
  const closeDiagnostic = () => setIsDiagnosticOpen(false);

  const openChecklist = () => setIsChecklistOpen(true);
  const closeChecklist = () => setIsChecklistOpen(false);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-bg font-sans text-slate-300 selection:bg-neon-cyan selection:text-dark-bg">
        <Navbar onOpenDiagnostic={openDiagnostic} />

        <Routes>
          <Route path="/" element={<Home onOpenDiagnostic={openDiagnostic} onOpenChecklist={openChecklist} />} />
          <Route path="/resources" element={<ResourcesArchive onOpenChecklist={openChecklist} />} />
          <Route path="/news" element={<NewsFeed initialArticles={initialData?.newsArticles} />} />
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
    </>
  );
}

export default AppRoutes;
