const Legal = () => {
  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            LEGAL <span className="text-transparent bg-clip-text vapor-gradient">PROTOCOLS</span>
          </h1>
          <p className="text-slate-400 font-medium uppercase text-xs tracking-widest leading-loose max-w-2xl">
            Privacy Policy and Terms of Service for AI Visibility Services by Carder Creative.
          </p>
        </div>
      </div>

      <section className="py-16 bg-dark-bg text-slate-400 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Privacy Policy */}
          <div id="privacy">
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-cyan mr-4">//</span> Privacy Policy
            </h2>
            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                At AI Visibility Services, operated by Carder Creative LLC ("we," "us," or "our"), we respect your privacy and are committed to protecting it. This policy describes the types of information we may collect from you when you visit our website and our practices for collecting, using, maintaining, and protecting that information.
              </p>
              
              <h3 className="text-white font-bold uppercase tracking-widest text-xs">01. Information We Collect</h3>
              <p>
                We collect information that you provide directly to us through our contact and download forms, including your name, work email address, company name, website URL, and phone number (if provided). We also use Google Tag Manager to collect anonymous analytical data about how you interact with our site.
              </p>

              <h3 className="text-white font-bold uppercase tracking-widest text-xs">02. How We Use Your Information</h3>
              <p>
                We use the information you provide to respond to your inquiries, schedule diagnostic calls, and deliver requested resources (such as the AI Visibility Checklist). We do not sell or share your personal information with third parties for marketing purposes.
              </p>

              <h3 className="text-white font-bold uppercase tracking-widest text-xs">03. Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Terms of Service */}
          <div id="terms">
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-purple mr-4">//</span> Terms of Service
            </h2>
            <div className="space-y-6 text-sm leading-relaxed">
              <p>
                By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>

              <h3 className="text-white font-bold uppercase tracking-widest text-xs">01. Use License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Carder Creative's website for personal, non-commercial transitory viewing only.
              </p>

              <h3 className="text-white font-bold uppercase tracking-widest text-xs">02. Disclaimer</h3>
              <p>
                The materials on this website are provided "as is". AI Visibility Services makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>

              <h3 className="text-white font-bold uppercase tracking-widest text-xs">03. Limitations</h3>
              <p>
                In no event shall Carder Creative LLC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the site.
              </p>

              <h3 className="text-white font-bold uppercase tracking-widest text-xs">04. Governing Law</h3>
              <p>
                Any claim relating to Carder Creative LLC's website shall be governed by the laws of the State of Ohio without regard to its conflict of law provisions.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Legal;
