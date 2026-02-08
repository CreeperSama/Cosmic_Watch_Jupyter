// import { useContext } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { Satellite, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const location = useLocation();

//   if (!user) return null; // Don't show navbar on login page

//   return (
//     <motion.nav 
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
//     >
//       <div className="max-w-[1600px] mx-auto bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">
        
//         {/* Logo Section */}
//         <Link to="/dashboard" className="flex items-center gap-3 group">
//           <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors">
//             <Satellite className="w-6 h-6 text-blue-400" />
//           </div>
//           <div>
//             <h1 className="text-lg font-bold text-white tracking-wide font-display">COSMIC WATCH</h1>
//             <p className="text-[10px] text-gray-400 uppercase tracking-widest">Orbital Surveillance</p>
//           </div>
//         </Link>

//         {/* User Profile Section */}
//         <div className="flex items-center gap-6">
//           <div className="hidden md:flex flex-col items-end mr-2">
//             <span className="text-sm font-medium text-white">{user.name}</span>
//             <div className="flex items-center gap-2">
//               <span className={`w-1.5 h-1.5 rounded-full ${user.role === 'researcher' ? 'bg-purple-400' : 'bg-green-400'}`} />
//               <span className="text-[10px] text-gray-400 uppercase tracking-wider">{user.affiliation} • {user.role}</span>
//             </div>
//           </div>

//           <div className="h-8 w-px bg-white/10 mx-2" />

//           <button 
//             onClick={logout} 
//             className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
//             title="Disconnect"
//           >
//             <LogOut size={20} />
//           </button>
//         </div>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;

import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Satellite, LogOut, Bell, X, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  // 1. POLL FOR NOTIFICATIONS (Every 5 seconds)
  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications');
        // Sort by newest first
        const sorted = res.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setNotifications(sorted);
      } catch (err) {
        console.error("Alert System Offline");
      }
    };

    fetchNotifications(); // Initial fetch
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [user]);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // 2. MARK ALL AS READ HANDLER
  const handleMarkRead = async () => {
    if (unreadCount > 0) {
      try {
        await api.put('/notifications/read-all');
        // Optimistically update UI
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch (err) {
        console.error("Failed to mark read");
      }
    }
  };

  const toggleDropdown = () => {
    if (!showDropdown && unreadCount > 0) {
      handleMarkRead(); // Auto-mark read when opening if you prefer
    }
    setShowDropdown(!showDropdown);
  };

  if (!user) return null; // Don't show on login page

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-[1600px] mx-auto bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg relative">
        
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          
          {/* --- NOTIFICATION BELL --- */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Bell size={20} />
              
              {/* Red Badge Logic */}
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-black"
                  />
                )}
              </AnimatePresence>
            </button>

            {/* --- DROPDOWN MENU --- */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-80 md:w-96 bg-gray-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl z-50"
                >
                  {/* Dropdown Header */}
                  <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300 flex items-center gap-2">
                      <Bell size={12} className="text-blue-400"/> System Alerts
                    </span>
                    <div className="flex gap-2">
                       <button onClick={handleMarkRead} className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase font-bold tracking-wider">
                         <CheckCheck size={12}/> Mark Read
                       </button>
                       <button onClick={() => setShowDropdown(false)}><X size={14} className="text-gray-500 hover:text-white" /></button>
                    </div>
                  </div>

                  {/* Dropdown Body */}
                  <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center flex flex-col items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCheck size={20} className="text-green-500" />
                        </div>
                        <p className="text-xs text-gray-500 font-mono">No Active Threats Detected</p>
                      </div>
                    ) : (
                      notifications.map((note, idx) => (
                        <div key={idx} className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors relative group ${!note.isRead ? 'bg-red-500/5' : ''}`}>
                          {!note.isRead && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></span>
                          )}
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              note.title.includes('CRITICAL') ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {note.title.includes('CRITICAL') ? 'CRITICAL' : 'INFO'}
                            </span>
                            <span className="text-[10px] text-gray-600 font-mono">
                              {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold text-white mb-1 mt-2">{note.title.replace('CRITICAL: ', '')}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed font-light">{note.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Section */}
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