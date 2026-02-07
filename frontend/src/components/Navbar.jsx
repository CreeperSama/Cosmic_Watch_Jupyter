import { Link } from 'react-router-dom';
import { Globe, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-8 px-6 py-3 rounded-full bg-surface-glass backdrop-blur-xl border border-white/10 shadow-2xl">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 text-white font-display font-medium tracking-tight hover:opacity-80 transition-opacity">
          <Globe className="w-5 h-5 text-primary" />
          <span className="text-sm">Cosmic Watch</span>
        </Link>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10"></div>

        {/* Minimal Actions */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-text-main font-medium hover:text-white transition-colors">
            Monitor
          </Link>
          <Link to="/login" className="text-sm text-text-muted hover:text-white transition-colors">
            Research
          </Link>
        </div>

        {/* User Icon */}
        <Link to="/login" className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          <User className="w-4 h-4 text-text-main" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;