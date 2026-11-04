import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SchemaFacts from './components/SchemaFacts';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';
import ChecklistForm from './components/ChecklistForm';
import Home from './pages/Home';
import SiteGuide from './pages/SiteGuide';
import Legal from './pages/Legal';
import ServicePage from './pages/ServicePage';
import AiVisibilityServices from './pages/AiVisibilityServices';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AiInfo from './pages/AiInfo';
import NotFound from './pages/NotFound';
import { SEO_SERVICE, PPC_SERVICE } from './data/servicePages';
import { useDocumentMeta } from './seo/useDocumentMeta';
import type { NeedSlug } from './data/inquiry';

// Scroll to top on page change, or to the #hash target when the URL has one
// (e.g. /contact/?need=seo#form from a service CTA).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

// Renders the app under whichever router wraps it (BrowserRouter on the client,
// StaticRouter during prerendering), so this component must stay router-agnostic.
// /news (src/pages/NewsFeed.tsx) is unpublished but kept on disk; to restore it,
// re-add its route here plus the feed fetch in prerender.mjs (see git history).
function AppRoutes() {
  const { pathname } = useLocation();
  useDocumentMeta(pathname);

  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Category preselected in the modal form; undefined = generic diagnostic.
  const [modalNeed, setModalNeed] = useState<NeedSlug | undefined>(undefined);

  const openDiagnostic = () => { setModalNeed(undefined); setIsDiagnosticOpen(true); };
  const openContact = (need: NeedSlug) => { setModalNeed(need); setIsDiagnosticOpen(true); };
  const closeDiagnostic = () => setIsDiagnosticOpen(false);

  const openChecklist = () => setIsChecklistOpen(true);
  const closeChecklist = () => setIsChecklistOpen(false);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-bg font-sans text-slate-300 selection:bg-neon-cyan selection:text-dark-bg">
        <Navbar onOpenDiagnostic={openDiagnostic} />

        <Routes>
          <Route path="/" element={<Home onOpenDiagnostic={openDiagnostic} onOpenChecklist={openChecklist} onOpenContact={openContact} />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost onOpenDiagnostic={openDiagnostic} />} />
          <Route path="/site-guide" element={<SiteGuide />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-info" element={<AiInfo />} />
          <Route path="/seo-services" element={<ServicePage data={SEO_SERVICE} onOpenContact={openContact} />} />
          <Route path="/ppc-services" element={<ServicePage data={PPC_SERVICE} onOpenContact={openContact} />} />
          <Route path="/ai-visibility-services" element={<AiVisibilityServices onOpenContact={openContact} onOpenChecklist={openChecklist} />} />
          {/* Catch-all: prerendered to dist/404.html, which Cloudflare Pages serves with HTTP 404. */}
          <Route path="*" element={<NotFound onOpenDiagnostic={openDiagnostic} />} />
        </Routes>

        <SchemaFacts />
        <Footer />

        {/* Pop-up Diagnostic Form */}
        <Modal isOpen={isDiagnosticOpen} onClose={closeDiagnostic}>
          <div className="p-6 sm:p-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-6 sm:mb-8">
              {modalNeed ? 'TELL US ABOUT' : 'BOOK A FREE'} <br />
              <span className="text-transparent bg-clip-text vapor-gradient">{modalNeed ? 'THE PROBLEM' : 'INTRO CALL'}</span>
            </h2>
            {/* key remounts the form so a new preset takes effect */}
            <ContactForm key={modalNeed ?? 'diagnostic'} defaultNeed={modalNeed} />
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
