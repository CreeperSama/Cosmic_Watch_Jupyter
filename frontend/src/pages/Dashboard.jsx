// import { useEffect, useState } from 'react';
// import AsteroidCard from '../components/AsteroidCard';
// import { Loader2, RefreshCw, AlertTriangle, Satellite } from 'lucide-react';
// import { motion } from 'framer-motion';
// import api from '../api/axios'; // Use our configured axios instance

// // --- Animation Variants ---
// const pageVariants = {
//   initial: { opacity: 0, scale: 0.95 },
//   animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
//   exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
// };

// const gridVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15, delayChildren: 0.2 }
//   }
// };

// const cardVariants = {
//   hidden: { opacity: 0, scale: 0.8, rotateX: -45, y: 50 },
//   visible: { 
//     opacity: 1, scale: 1, rotateX: 0, y: 0, 
//     transition: { type: "spring", stiffness: 120, damping: 12, mass: 0.8 }
//   }
// };

// // --- Helper: Get Random Date (Past 2 Years) ---
// const getRandomDate = () => {
//   const start = new Date(2022, 0, 1);
//   const end = new Date();
//   const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//   return date.toISOString().split('T')[0];
// };

// const Dashboard = () => {
//   const [asteroids, setAsteroids] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentDate, setCurrentDate] = useState(getRandomDate());

//   const fetchAsteroids = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // 1. Generate a new random date for variety
//       const randomDate = getRandomDate();
//       setCurrentDate(randomDate);

//       // 2. Fetch from Backend with query params
//       const response = await api.get(`/nasa/asteroids?start_date=${randomDate}&end_date=${randomDate}`);
      
//       // 3. Normalize Data (Match Backend keys to Dashboard UI expectations)
//       const formattedData = response.data.map(ast => ({
//         ...ast,
//         // Dashboard Stats relies on these specific keys:
//         diameter_km: ast.diameter / 1000, 
//         miss_distance_km: ast.distance,
//         velocity_kph: ast.velocity
//       }));

//       setAsteroids(formattedData);
//     } catch (err) {
//       console.error("Deep Space Network offline.", err);
//       setError("Unable to retrieve telemetry. Retrying...");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAsteroids();
//   }, []);

//   // --- Statistics Calculations ---
//   const hazardousCount = asteroids.filter(a => a.hazardous).length;
//   const closestObject = asteroids.reduce((prev, curr) => 
//     (prev.miss_distance_km < curr.miss_distance_km && prev.miss_distance_km > 0) ? prev : curr
//   , asteroids[0] || {});

//   return (
//     <motion.div 
//       className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto text-white"
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//     >
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-12">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
//              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
//                Live Telemetry Feed • {currentDate}
//              </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
//             Sector <span className="text-blue-500">Near-Earth</span>
//           </h1>
//           <p className="text-gray-400 font-normal text-lg max-w-xl leading-relaxed">
//             Real-time tracking and risk analysis of celestial objects passing within 0.05 AU.
//           </p>
//         </div>
        
//         {/* Stats Bar */}
//         <div className="flex items-center gap-8 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
//           <div className="text-center">
//             <div className="text-3xl font-light tracking-tighter">{asteroids.length}</div>
//             <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Objects Scanned</div>
//           </div>
//           <div className="w-px h-10 bg-white/10"></div>
//           <div className="text-center">
//             <div className="text-3xl font-light text-red-500 tracking-tighter drop-shadow-[0_0_10px_rgba(255,69,58,0.3)]">
//               {hazardousCount}
//             </div>
//             <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Hazardous</div>
//           </div>
//            <div className="w-px h-10 bg-white/10 hidden lg:block"></div>
//            <div className="text-center hidden lg:block">
//             <div className="text-3xl font-light text-blue-500 tracking-tighter">
//               {closestObject.miss_distance_km ? (closestObject.miss_distance_km / 384400).toFixed(1) : '-'} <span className="text-sm text-gray-500">LD</span>
//             </div>
//             <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Closest Approach</div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-xl font-display font-semibold flex items-center gap-2">
//           <Satellite className="w-5 h-5 text-blue-500" /> Active Trajectories
//         </h2>
        
//         <div className="flex gap-4">
//           {error && (
//             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-medium">
//               <AlertTriangle className="w-3 h-3" />
//               {error}
//             </div>
//           )}
          
//           <button 
//             onClick={fetchAsteroids}
//             className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-full transition-all active:scale-95 text-xs font-semibold uppercase tracking-wide cursor-pointer"
//           >
//             <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
//             Refresh Data
//           </button>
//         </div>
//       </div>

//       {/* Grid Content */}
//       {loading ? (
//         <div className="flex flex-col items-center justify-center h-64 space-y-4">
//           <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//           <p className="text-gray-500 font-mono text-xs uppercase tracking-widest animate-pulse">Establishing Downlink...</p>
//         </div>
//       ) : (
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
//           variants={gridVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {asteroids.map((neo) => (
//             <motion.div 
//               key={neo.id} 
//               variants={cardVariants}
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               {/* Pass raw neo data; Card will handle internal formatting, but we normalized keys above */}
//               <AsteroidCard data={neo} />
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default Dashboard;

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AsteroidCard from '../components/AsteroidCard';
import ResearcherTools from '../components/ResearcherTools';
import { Loader2, RefreshCw, AlertTriangle, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api/axios';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  };

  const [currentDate, setCurrentDate] = useState(getRandomDate());

  const fetchAsteroids = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomDate = getRandomDate();
      setCurrentDate(randomDate);
      const res = await api.get(`/nasa/asteroids?start_date=${randomDate}&end_date=${randomDate}`);
      
      const cleaned = res.data.map(ast => ({
        ...ast,
        diameter_km: ast.diameter / 1000, 
        miss_distance_km: ast.distance,
        velocity_kph: ast.velocity
      }));
      
      setAsteroids(cleaned);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve telemetry. Retrying...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const isResearcher = user?.role === 'researcher';

  // --- STATS CALCULATION ---
  const hazardousCount = asteroids.filter(a => a.hazardous).length;
  // Safely find closest object (handles empty arrays)
  const closestObject = asteroids.length > 0 
    ? asteroids.reduce((prev, curr) => (prev.miss_distance_km < curr.miss_distance_km ? prev : curr)) 
    : {};
  const closestDistanceLD = closestObject.miss_distance_km 
    ? (closestObject.miss_distance_km / 384400).toFixed(1) 
    : '-';

  return (
    <motion.div 
      className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto text-white"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      {/* Header & Stats Container */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-12">
        
        {/* Title Section */}
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
               Live Telemetry Feed • {currentDate}
             </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-3">
            Sector <span className={isResearcher ? "text-purple-500" : "text-blue-500"}>Near-Earth</span>
          </h1>
          <p className="text-gray-400 font-normal text-lg max-w-xl leading-relaxed">
             {isResearcher 
               ? "Advanced orbital mechanics & risk assessment platform." 
               : "Real-time tracking of celestial objects passing within 0.05 AU."}
          </p>
        </div>

        {/* --- STATS BAR (Restored) --- */}
        <div className={`flex items-center gap-8 px-8 py-5 rounded-2xl backdrop-blur-xl shadow-2xl border ${isResearcher ? 'bg-purple-900/10 border-purple-500/20' : 'bg-white/5 border-white/10'}`}>
          <div className="text-center">
            <div className="text-3xl font-light tracking-tighter text-white">{asteroids.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Objects Scanned</div>
          </div>
          <div className="w-px h-10 bg-white/10"></div>
          <div className="text-center">
            <div className="text-3xl font-light text-red-500 tracking-tighter drop-shadow-[0_0_10px_rgba(255,69,58,0.3)]">
              {hazardousCount}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Hazardous</div>
          </div>
          <div className="w-px h-10 bg-white/10 hidden md:block"></div>
          <div className="text-center hidden md:block">
            <div className={`text-3xl font-light tracking-tighter ${isResearcher ? 'text-purple-400' : 'text-blue-400'}`}>
              {closestDistanceLD} <span className="text-sm text-gray-500">LD</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">Closest Approach</div>
          </div>
        </div>

      </div>

      {/* Researcher Tools */}
      {isResearcher && !loading && asteroids.length > 0 && (
         <ResearcherTools data={asteroids} />
      )}

      {/* Grid Controls */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-display font-semibold flex items-center gap-2">
          <Satellite className={`w-5 h-5 ${isResearcher ? 'text-purple-500' : 'text-blue-500'}`} /> 
          {isResearcher ? "Raw Telemetry Feed" : "Active Trajectories"}
        </h2>
        
        <div className="flex gap-4">
          {error && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-medium">
              <AlertTriangle className="w-3 h-3" />
              {error}
            </div>
          )}
          
          <button 
            onClick={fetchAsteroids}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-full transition-all active:scale-95 text-xs font-semibold uppercase tracking-wide cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Card Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className={`w-8 h-8 ${isResearcher ? 'text-purple-500' : 'text-blue-500'} animate-spin`} />
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest animate-pulse">Establishing Downlink...</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {asteroids.map((neo) => (
            <motion.div 
              key={neo.id} 
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AsteroidCard data={neo} isResearcher={isResearcher} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;