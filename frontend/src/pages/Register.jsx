import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Shield, Telescope, Briefcase, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('enthusiast'); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institution: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // --- SAVE CREDENTIALS TO BROWSER MEMORY ---
      localStorage.setItem('storedEmail', formData.email);
      localStorage.setItem('storedPassword', formData.password); // (In real apps, never store passwords like this!)
      localStorage.setItem('storedName', formData.name);
      localStorage.setItem('storedRole', role);
      
      // Clear any previous login session
      localStorage.removeItem('isLoggedIn');

      setIsLoading(false);
      // Send them to Login page instead of Dashboard so they can test the login
      navigate('/login'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-950 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-space-950 to-space-950 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-surface-glass border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4 ring-1 ring-primary/50">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Request Clearance</h2>
          <p className="text-text-muted text-sm mt-2">Create your Cosmic Watch identity.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-muted uppercase tracking-wider ml-1">Clearance Level</label>
            <div className="relative">
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-primary transition-colors cursor-pointer">
                <option value="enthusiast">Space Enthusiast</option>
                <option value="researcher">Academic Researcher</option>
              </select>
            </div>
          </div>

          <div className="relative group">
            <User className="absolute left-4 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all" required />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all" required />
          </div>

          {role === 'researcher' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative group">
              <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input type="text" name="institution" placeholder="Institution ID" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all" required />
            </motion.div>
          )}

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all" required />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-white text-space-950 font-bold py-3 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-6">
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
              <><span>Initialize Account</span><ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-muted">
          Already have clearance? <Link to="/login" className="text-white hover:text-primary transition-colors underline decoration-white/30 underline-offset-4">Log in here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;