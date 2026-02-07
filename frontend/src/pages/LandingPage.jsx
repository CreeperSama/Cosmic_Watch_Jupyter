import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, ShieldCheck, Activity } from 'lucide-react';
import EarthBackground from '../components/EarthBackground';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleInitialize = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      
      {/* 1. BACKGROUND LAYER */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }} 
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <EarthBackground />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent pointer-events-none z-0"></div>

      {/* 2. CONTENT LAYER (Opened as motion.div) */}
      <motion.div 
        className="relative z-10 max-w-5xl px-6 text-center"
        exit={{ 
          opacity: 0, 
          scale: 1.5, 
          filter: "blur(10px)", 
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
      >
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }} 
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-muted">System Online • v2.4</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-2xl"
        >
          Planetary Defense <br />
          <span className="text-white">Starts Here.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="text-lg md:text-xl text-text-muted font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Real-time monitoring of Near-Earth Objects (NEOs). Advanced risk analysis algorithms. 
          Global threat assessment at your fingertips.
        </motion.p>

        {/* Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16"
        >
          {[
            { icon: Globe, label: "Global Coverage", desc: "NASA JPL Feed" },
            { icon: ShieldCheck, label: "Risk Analysis", desc: "Hazard Detection" },
            { icon: Activity, label: "Live Telemetry", desc: "Real-time Data" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors">
              <item.icon className="w-6 h-6 text-primary mb-2" />
              <h3 className="text-sm font-semibold text-white">{item.label}</h3>
              <p className="text-xs text-text-muted">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.7 }}
        >
          <a onClick={handleInitialize} className="cursor-pointer group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-space-950 rounded-full font-bold tracking-tight hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
            <span>Initialize Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
        
      {/* FIX: Ensure we close with </motion.div>, not just </div> */}
      </motion.div>
    </div>
  );
};

export default LandingPage;