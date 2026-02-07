import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, ShieldCheck, Activity, Rocket } from 'lucide-react';
import EarthBackground from '../components/EarthBackground';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleUplink = () => {
    setIsExiting(true);
    // Wait for the zoom animation to finish before navigating
    setTimeout(() => {
      navigate('/login');
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white selection:bg-blue-500/30">
      
      {/* 3D Background Layer - Appears First */}
      <div className="absolute inset-0 z-0">
        <EarthBackground />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/40 to-black pointer-events-none" />

      {/* Content Layer with Animations */}
      <motion.div 
        className="relative z-20 container mx-auto px-6 h-screen flex flex-col justify-center items-center text-center"
        animate={isExiting ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        
        {/* Main Title Animation - Delayed to let BG show first */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }} // Increased delay
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">System Nominal</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4">
            COSMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">WATCH</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Global Defense & Trajectory Analysis System for Near-Earth Objects.
          </p>
        </motion.div>

        {/* Feature Grid - Delayed Sequence */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full"
        >
           {[
             { icon: Globe, label: "Global Coverage", desc: "Full planetary monitoring" },
             { icon: Activity, label: "Real-time Telemetry", desc: "Live velocity & distance data" },
             { icon: ShieldCheck, label: "Risk Assessment", desc: "Impact probability analysis" }
           ].map((item, idx) => (
             <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center">
               <item.icon className="w-6 h-6 text-blue-400 mb-2" />
               <h3 className="font-semibold text-sm">{item.label}</h3>
               <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
             </div>
           ))}
        </motion.div>

        {/* The Activation Button */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 2.2, duration: 0.5 }}
        >
          <motion.button
            onClick={handleUplink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-blue-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] cursor-pointer"
          >
            <Rocket className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
            <span>Establish Uplink</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-6 text-[10px] text-gray-500 font-mono uppercase tracking-widest opacity-60"
        >
          Authorized Personnel Only • Secure Connection
        </motion.p>

      </motion.div>
    </div>
  );
};

export default LandingPage;