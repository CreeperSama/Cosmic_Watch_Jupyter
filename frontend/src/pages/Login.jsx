import { useState } from 'react';
import { UserCheck, Fingerprint, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
<<<<<<< HEAD
    // Added 'pt-32' to push content down below the fixed Navbar
    // Changed 'min-h-screen' to ensure full height coverage
=======
    // Corrected padding-top (pt-32) to clear the Navbar
>>>>>>> frontend
    <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12 relative overflow-hidden">
      
      {/* Decorative background circle */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="w-full max-w-md px-8 pb-8 pt-10 bg-space-800/80 backdrop-blur-xl border border-space-700 rounded-2xl shadow-2xl relative overflow-hidden z-10">
        
<<<<<<< HEAD
        {/* Top Accent Line (Thinned down) */}
=======
        {/* Top Accent Line (Subtle) */}
>>>>>>> frontend
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80"></div>

        <h2 className="relative z-10 text-3xl font-orbitron font-bold text-center text-white mb-2">
          {isLogin ? 'Researcher Access' : 'New Clearance'}
        </h2>
        <p className="relative z-10 text-center text-space-accent text-sm mb-8 opacity-70">
          {isLogin ? 'Enter credentials for secure connection' : 'Apply for mission tracking authorization'}
        </p>
        
        <form className="space-y-5 relative z-10">
          {!isLogin && (
             <div>
              <label className="flex items-center gap-2 text-xs font-bold text-space-accent uppercase tracking-wider mb-2">
                <UserCheck className="w-3 h-3 text-cyan-400" /> Mission Callsign
              </label>
              <input type="text" className="w-full bg-space-900/50 border border-space-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-space-900 transition-all placeholder-gray-600" placeholder="Username" />
            </div>
          )}
          
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-space-accent uppercase tracking-wider mb-2">
              <Mail className="w-3 h-3 text-cyan-400" /> Secure Email
            </label>
            <input type="email" className="w-full bg-space-900/50 border border-space-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-space-900 transition-all placeholder-gray-600" placeholder="name@agency.gov" />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-space-accent uppercase tracking-wider mb-2">
              <Lock className="w-3 h-3 text-cyan-400" /> Passcode
            </label>
            <input type="password" className="w-full bg-space-900/50 border border-space-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-space-900 transition-all placeholder-gray-600" placeholder="••••••••" />
          </div>

          <button className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/50 flex justify-center items-center gap-2 uppercase tracking-wide text-sm">
            <Fingerprint className="w-5 h-5" />
            {isLogin ? 'Authenticate' : 'Request Access'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-space-700/50 text-center relative z-10">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have clearance? " : "Already verified? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-all ml-1">
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;