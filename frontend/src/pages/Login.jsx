import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, Database, ScanLine, ArrowRight, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import api from '../api/axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'enthusiast', affiliation: '' });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Auto-clear error after 4 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!isLogin) await api.post('/auth/signup', formData);
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Changed to motion.div for smooth page entry
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans"
    >
      
      {/* --- Error Popup Notification --- */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-6 z-50"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-red-500/10 border border-red-500/50 backdrop-blur-md text-red-200 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <AlertCircle size={20} />
              <span className="font-semibold uppercase tracking-wide text-xs">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0"></div>
      
      <div className="relative z-10 w-full max-w-5xl h-[650px] grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/80 backdrop-blur-3xl">
        
        {/* Left Panel: Static Visuals */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-white/5 border-r border-white/5 relative">
           <div className="absolute top-0 left-0 p-8 opacity-30">
              <ScanLine className="w-12 h-12 text-blue-400 animate-pulse" />
           </div>
           <div className="mt-20">
              <h1 className="text-6xl font-display font-bold tracking-tighter mb-4 leading-none">
                SECURE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ACCESS</span>
              </h1>
              <div className="flex items-center gap-3 mt-8">
                <div className="h-px w-12 bg-blue-500"></div>
                <p className="text-sm font-mono text-blue-400">RESTRICTED AREA</p>
              </div>
           </div>
           <p className="text-xs text-gray-600 font-mono uppercase tracking-widest leading-loose">
             System ID: CW-9001<br/>
             Encryption: AES-256<br/>
             Node: Orbital Relay Alpha
           </p>
        </div>

        {/* Right Panel: Dynamic Form */}
        <div className="relative p-8 md:p-12 flex flex-col justify-center overflow-hidden">
          
          <AnimatePresence mode='wait' initial={false}>
            {isLogin ? (
              // --- LOGIN VIEW ---
              <motion.div 
                key="login"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm mx-auto"
              >
                <div className="mb-8">
                   <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                     <ShieldCheck size={24} />
                   </div>
                   <h2 className="text-2xl font-bold">Identity Verification</h2>
                   <p className="text-gray-500 text-sm mt-1">Enter your credentials to access the grid.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Access ID</label>
                    <input type="email" name="email" required placeholder="name@agency.gov" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      onChange={handleInputChange} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Passcode</label>
                    <input type="password" name="password" required placeholder="••••••••" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:bg-white/10 outline-none transition-all"
                      onChange={handleInputChange} />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all">
                    {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Authenticate"}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <button onClick={() => setIsLogin(false)} className="text-gray-400 hover:text-white text-xs flex items-center gap-2 mx-auto group transition-colors">
                    Request Clearance <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

            ) : (
              // --- REGISTER VIEW ---
              <motion.div 
                key="register"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm mx-auto"
              >
                <button 
                  onClick={() => setIsLogin(true)}
                  className="mb-6 text-xs text-gray-500 hover:text-white flex items-center gap-2 uppercase tracking-wider font-bold transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Login
                </button>

                <div className="mb-6">
                   <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                     <UserPlus size={24} />
                   </div>
                   <h2 className="text-2xl font-bold">New Personnel</h2>
                   <p className="text-gray-500 text-sm mt-1">Submit your profile for database entry.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" name="name" required placeholder="Full Name" 
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none"
                      onChange={handleInputChange} />
                    <select name="role" className="bg-white/5 border border-white/10 rounded-lg px-2 py-3 text-sm focus:border-purple-500 outline-none text-gray-300" onChange={handleInputChange}>
                      <option value="enthusiast" className="bg-gray-900">Enthusiast</option>
                      <option value="researcher" className="bg-gray-900">Researcher</option>
                    </select>
                  </div>
                  <input type="text" name="affiliation" placeholder="Affiliation (Optional)" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none"
                    onChange={handleInputChange} />
                  <input type="email" name="email" required placeholder="Email Address" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none"
                    onChange={handleInputChange} />
                  <input type="password" name="password" required placeholder="Create Passcode" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none"
                    onChange={handleInputChange} />
                  
                  <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-lg font-bold uppercase text-xs tracking-widest transition-all mt-2">
                    {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Submit Profile"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};

export default Login;