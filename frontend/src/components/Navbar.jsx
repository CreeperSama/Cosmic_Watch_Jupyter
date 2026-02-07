// import { Link } from 'react-router-dom';
// import { User } from 'lucide-react';
// import Logo from './Logo';

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
//       <div className="pointer-events-auto flex items-center gap-6 pl-4 pr-2 py-2.5 rounded-full bg-surface-glass backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:border-white/20">
        
//         {/* Brand with Custom Logo */}
//         <Link to="/" className="flex items-center gap-3 text-white group">
//           <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
//             <Logo className="w-6 h-6 text-white" />
//           </div>
          
//           <div className="flex flex-col">
//             <span className="text-[13px] font-display font-bold tracking-tight leading-tight">COSMIC</span>
//             <span className="text-[10px] font-display font-medium tracking-[0.2em] text-text-muted leading-tight uppercase">Watch</span>
//           </div>
//         </Link>

//         {/* Divider */}
//         <div className="w-px h-5 bg-white/10 mx-1"></div>

//   {/* Navigation Links */}
//         <div className="flex items-center gap-7 mr-2">
//           <Link to="/" className="text-[13px] text-text-main font-semibold hover:text-white transition-colors">
//             Monitor
//           </Link>
//           <Link to="/login" className="text-[13px] text-text-muted font-medium hover:text-white transition-colors">
//             Research
//           </Link>
//         </div>

//         {/* User Action */}
//         <Link to="/login" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90">
//           <User className="w-4 h-4 text-white" />
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Satellite, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return null; // Don't show navbar on login page

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-[1600px] mx-auto bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">
        
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
            <Satellite className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide font-display">COSMIC WATCH</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Orbital Surveillance</p>
          </div>
        </Link>

        {/* User Profile Section */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-medium text-white">{user.name}</span>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'researcher' ? 'bg-purple-400' : 'bg-green-400'}`} />
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">{user.affiliation} • {user.role}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10 mx-2" />

          <button 
            onClick={logout} 
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="Disconnect"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;