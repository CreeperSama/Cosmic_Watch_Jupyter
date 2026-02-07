import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // To show error messages
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // --- RETRIEVE DATA FROM BROWSER MEMORY ---
      const storedEmail = localStorage.getItem('storedEmail');
      const storedPassword = localStorage.getItem('storedPassword');

      // --- VERIFY CREDENTIALS ---
      if (credentials.email === storedEmail && credentials.password === storedPassword) {
        // Success!
        localStorage.setItem('userRole', localStorage.getItem('storedRole')); // Set active role
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        // Fail!
        setError("Invalid credentials. Access Denied.");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-space-950 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-space-950 to-space-950 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-surface-glass border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Welcome Back</h2>
          <p className="text-text-muted text-sm mt-2">Enter your credentials to access the grid.</p>
        </div>

        {/* ERROR MESSAGE ALERT */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-white transition-colors" />
            <input 
              type="email" 
              name="email"
              placeholder="Email Address" 
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all" 
              required 
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-text-muted group-focus-within:text-white transition-colors" />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              onChange={handleInputChange}
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-all" 
              required 
            />
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-text-muted hover:text-white transition-colors">Forgot Password?</a>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-white text-space-950 font-bold py-3 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-2">
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
              <><span>Access Dashboard</span><ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-text-muted">
          Need access? <Link to="/register" className="text-white hover:text-primary transition-colors underline decoration-white/30 underline-offset-4">Request clearance</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;