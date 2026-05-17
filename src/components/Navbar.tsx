const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              AI Visibility<span className="text-blue-600">Services</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#methodology" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Methodology</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Services</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
              <a href="#resources" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Resources</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
              <a 
                href="#diagnostic" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Free Diagnostic
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
