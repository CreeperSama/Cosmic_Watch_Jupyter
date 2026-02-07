import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import Logo from './Logo'; // Import your new custom logo

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-6 pl-4 pr-2 py-2.5 rounded-full bg-surface-glass backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:border-white/20">
        
        {/* Brand with Custom Logo */}
        <Link to="/" className="flex items-center gap-3 text-white group">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
            <Logo className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-[13px] font-display font-bold tracking-tight leading-tight">COSMIC</span>
            <span className="text-[10px] font-display font-medium tracking-[0.2em] text-text-muted leading-tight uppercase">Watch</span>
          </div>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1"></div>

        {/* Navigation */}
        <div className="flex items-center gap-7 mr-2">
          <Link to="/" className="text-[13px] text-text-main font-semibold hover:text-white transition-colors">
            Monitor
          </Link>
          <Link to="/login" className="text-[13px] text-text-muted font-medium hover:text-white transition-colors">
            Research
          </Link>
        </div>

        {/* User Action */}
        <Link to="/login" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90">
          <User className="w-4 h-4 text-white" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;