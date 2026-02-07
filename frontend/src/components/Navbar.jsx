import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Menu, X, UserCircle, LogOut, ChevronDown, Shield, Telescope } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile Dropdown
  
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  
  // Ref for clicking outside to close dropdown
  const dropdownRef = useRef(null);

  // User State
  const [user, setUser] = useState({ name: 'Commander', role: 'enthusiast', email: '' });

  // Load User Data
  useEffect(() => {
    if (isDashboard) {
      const name = localStorage.getItem('userName') || localStorage.getItem('storedName') || 'Commander';
      const role = localStorage.getItem('userRole') || 'enthusiast';
      const email = localStorage.getItem('storedEmail') || 'unknown@cosmic.watch';
      setUser({ name, role, email });
    }
  }, [isDashboard]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/'); // Send to Landing Page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-space-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Rocket className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-wide">
            COSMIC<span className="text-primary">WATCH</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          
          {isDashboard ? (
            /* --- DASHBOARD MODE: SHOW PROFILE --- */
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-6">
                <span className="text-sm text-text-muted flex items-center gap-2">
                  Status: <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span> <span className="text-green-400">Online</span>
                </span>
                
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${isProfileOpen ? 'bg-white/10 border-primary/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-white leading-none">{user.name}</span>
                    <span className="text-[10px] text-primary uppercase tracking-wider leading-none mt-1">{user.role}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-space-950 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ring-1 ring-white/5"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 bg-white/5">
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <div className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-3 text-sm text-text-muted hover:text-white transition-colors cursor-pointer">
                        {user.role === 'researcher' ? <Shield className="w-4 h-4" /> : <Telescope className="w-4 h-4" />}
                        <span>My Clearance</span>
                      </div>
                      
                      <div className="px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-3 text-sm text-text-muted hover:text-white transition-colors cursor-pointer">
                        <UserCircle className="w-4 h-4" />
                        <span>Account Settings</span>
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-white/5">
                      <button 
                        onClick={handleLogout}
                        className="w-full px-3 py-2 rounded-lg hover:bg-red-500/10 flex items-center gap-3 text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* --- LANDING MODE: SHOW LOGIN --- */
            <>
              <Link to="/login" className="text-sm font-medium text-text-muted hover:text-white transition-colors">
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 rounded-full bg-white text-space-950 text-sm font-bold hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              >
                Get Access
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN (Simplified for Mobile) */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-space-950 border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
        >
          {isDashboard ? (
             <>
               <div className="text-white font-bold">{user.name} <span className="text-xs text-primary font-normal">({user.role})</span></div>
               <button onClick={handleLogout} className="text-red-400 text-left">Sign Out</button>
             </>
          ) : (
             <>
               <Link to="/login" className="text-white py-2" onClick={() => setIsOpen(false)}>Log In</Link>
               <Link to="/register" className="text-primary py-2 font-bold" onClick={() => setIsOpen(false)}>Register Account</Link>
             </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;