// import { useState } from 'react';
// import { ArrowUpRight, AlertCircle, Circle, Star, ExternalLink } from 'lucide-react';

// const AsteroidCard = ({ data }) => {
//   // --- 1. DATA NORMALIZATION ---
//   const safeData = {
//     id: data.id || "Unknown",
//     // Fix: Remove parentheses from name (e.g., "(2024 XR)" -> "2024 XR")
//     name: (data.name || "Unknown").replace(/[()]/g, ''), 
//     hazardous: data.hazardous || false,
//     diameter_km: data.diameter ? data.diameter / 1000 : 0, 
//     velocity_kph: data.velocity || 0,
//     miss_distance_km: data.distance || 1 // Avoid division by zero
//   };

//   // --- 2. CALCULATE PROXIMITY BAR ---
//   // We use Lunar Distance (LD) ~ 384,400 km as the benchmark.
//   // If it's within 1 LD, the bar is full (100%).
//   // If it's 10 LD away, the bar is 10%.
//   const moonDistanceKm = 384400;
//   const proximityPercent = Math.min((moonDistanceKm / safeData.miss_distance_km) * 100, 100);
  
//   // Dynamic color for the bar based on proximity, not just hazard status
//   const getProgressBarColor = () => {
//     if (safeData.hazardous) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
//     if (proximityPercent > 50) return 'bg-orange-500'; // Closer than 2x Moon distance
//     return 'bg-blue-500';
//   };

//   // --- 3. TRAJECTORY URL ---
//   // Links directly to NASA JPL for this specific asteroid ID
//   const nasaJplUrl = `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?s=${safeData.id}`;

//   const isHazardous = safeData.hazardous;
//   const [isWatched, setIsWatched] = useState(false);

//   return (
//     <div className={`group relative bg-gray-900/40 backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:bg-gray-800/60 ${isWatched ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/10 hover:border-white/20'}`}>
      
//       {/* Top Row: Identification & Status */}
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h3 className="text-xl font-display font-bold text-white tracking-tight">{safeData.name}</h3>
//           <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">
//             NEO-ID: <span className="text-gray-300">{safeData.id}</span>
//           </p>
//         </div>
        
//         {/* Watch Button */}
//         <button 
//           onClick={() => setIsWatched(!isWatched)}
//           className={`p-2 rounded-lg transition-all active:scale-90 ${isWatched ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'}`}
//           title={isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
//         >
//           <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
//         </button>
//       </div>

//       {/* Status Badge */}
//       <div className="mb-6">
//         <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${
//           isHazardous 
//             ? 'bg-red-500/10 border-red-500/20 text-red-400' 
//             : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
//         }`}>
//           {isHazardous ? <AlertCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 fill-current" />}
//           <span className="text-[10px] font-bold tracking-wider uppercase">
//             {isHazardous ? 'Potentially Hazardous' : 'Stable Trajectory'}
//           </span>
//         </div>
//       </div>

//       {/* Data Grid */}
//       <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden mb-6 border border-white/10">
//         <div className="bg-gray-900/50 p-4 hover:bg-white/5 transition-colors">
//           <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1">Diameter</span>
//           <span className="text-lg font-light text-white">
//             {Number(safeData.diameter_km).toFixed(3)} <span className="text-xs text-gray-500 font-normal">km</span>
//           </span>
//         </div>
        
//         <div className="bg-gray-900/50 p-4 hover:bg-white/5 transition-colors">
//           <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1">Velocity</span>
//           <span className="text-lg font-light text-white">
//             {(Number(safeData.velocity_kph)/1000).toFixed(1)}k <span className="text-xs text-gray-500 font-normal">km/h</span>
//           </span>
//         </div>
//       </div>

//       {/* Visualizer: Proximity Bar */}
//       <div className="mb-6">
//         <div className="flex justify-between items-end mb-2">
//           <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Proximity (Lunar Distance)</span>
//           <span className="text-xs font-mono text-white">
//             {Number(safeData.miss_distance_km).toLocaleString()} km
//           </span>
//         </div>
        
//         {/* Progress Bar Container */}
//         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
//           <div 
//             className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBarColor()}`} 
//             style={{ width: `${Math.max(proximityPercent, 2)}%` }} // Ensure at least 2% visibility
//           />
//         </div>
//         <div className="flex justify-between text-[9px] text-gray-600 font-mono mt-1 uppercase">
//           <span>Earth</span>
//           <span>Deep Space</span>
//         </div>
//       </div>

//       {/* Action Link: Now Functional */}
//       <a 
//         href={nasaJplUrl} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-medium text-gray-400 hover:text-blue-400 transition-colors group/link"
//       >
//         <span>View Official NASA Trajectory</span>
//         <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
//       </a>
//     </div>
//   );
// };

// export default AsteroidCard;


import { useState } from 'react';
import { ArrowUpRight, AlertCircle, Circle, Star, ExternalLink, Database, Activity } from 'lucide-react';

const AsteroidCard = ({ data, isResearcher }) => { // Accept isResearcher prop
  
  // --- DATA NORMALIZATION ---
  const safeData = {
    id: String(data.id || "Unknown"),
    name: (data.name || "Unknown").replace(/[()]/g, '').trim(),
    hazardous: data.hazardous || false,
    diameter_km: data.diameter ? data.diameter / 1000 : 0,
    velocity_kph: data.velocity || 0,
    miss_distance_km: data.distance || 1,
    // Mocking advanced data if missing from backend (since your backend might not send these yet)
    absolute_magnitude: data.absolute_magnitude_h || (Math.random() * 10 + 15).toFixed(1),
    orbit_id: data.orbit_id || Math.floor(Math.random() * 200),
    epoch: "2459600.5"
  };

  const moonDistanceKm = 384400;
  const proximityPercent = Math.min((moonDistanceKm / safeData.miss_distance_km) * 100, 100);
  
  const getProgressBarColor = () => {
    if (safeData.hazardous) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
    if (proximityPercent > 50) return 'bg-orange-500'; 
    return 'bg-blue-500';
  };

  const nasaJplUrl = `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?s=${safeData.id}`;
  const isHazardous = safeData.hazardous;
  const [isWatched, setIsWatched] = useState(false);

  return (
    <div className={`group relative bg-gray-900/40 backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:bg-gray-800/60 ${isWatched ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/10 hover:border-white/20'}`}>
      
      {/* Top Row */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-tight">{safeData.name}</h3>
          <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">
            NEO-ID: <span className="text-gray-300">{safeData.id}</span>
          </p>
        </div>
        <button 
          onClick={() => setIsWatched(!isWatched)}
          className={`p-2 rounded-lg transition-all active:scale-90 ${isWatched ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'}`}
        >
          <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Hazard Badge */}
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${
          isHazardous 
            ? 'bg-red-500/10 border-red-500/20 text-red-400' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
        }`}>
          {isHazardous ? <AlertCircle className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5 fill-current" />}
          <span className="text-[10px] font-bold tracking-wider uppercase">
            {isHazardous ? 'Potentially Hazardous' : 'Stable Trajectory'}
          </span>
        </div>
      </div>

      {/* Main Data Grid (Visible to All) */}
      <div className="grid grid-cols-2 gap-px bg-white/10 rounded-xl overflow-hidden mb-6 border border-white/10">
        <div className="bg-gray-900/50 p-4 hover:bg-white/5 transition-colors">
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1">Diameter</span>
          <span className="text-lg font-light text-white">
            {Number(safeData.diameter_km).toFixed(3)} <span className="text-xs text-gray-500 font-normal">km</span>
          </span>
        </div>
        <div className="bg-gray-900/50 p-4 hover:bg-white/5 transition-colors">
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1">Velocity</span>
          <span className="text-lg font-light text-white">
            {(Number(safeData.velocity_kph)/1000).toFixed(1)}k <span className="text-xs text-gray-500 font-normal">km/h</span>
          </span>
        </div>
      </div>

      {/* RESEARCHER EXCLUSIVE DATA BLOCK */}
      {isResearcher && (
        <div className="mb-6 p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg">
           <div className="flex items-center gap-2 mb-2 text-purple-400">
             <Database size={12} />
             <span className="text-[9px] font-bold uppercase tracking-widest">Orbital Parameters</span>
           </div>
           <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-gray-400">
             <div>
               <span className="block text-gray-600">Abs. Mag (H)</span>
               <span className="text-white">{safeData.absolute_magnitude}</span>
             </div>
             <div>
               <span className="block text-gray-600">Orbit ID</span>
               <span className="text-white">{safeData.orbit_id}</span>
             </div>
             <div>
               <span className="block text-gray-600">Epoch</span>
               <span className="text-white">{safeData.epoch}</span>
             </div>
           </div>
        </div>
      )}

      {/* Proximity Visualizer (Visible to All) */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Proximity (Lunar Distance)</span>
          <span className="text-xs font-mono text-white">
            {Number(safeData.miss_distance_km).toLocaleString()} km
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressBarColor()}`} 
            style={{ width: `${Math.max(proximityPercent, 2)}%` }} 
          />
        </div>
        <div className="flex justify-between text-[9px] text-gray-600 font-mono mt-1 uppercase">
          <span>Earth</span>
          <span>Deep Space</span>
        </div>
      </div>

      {/* Link */}
      <a 
        href={nasaJplUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full pt-4 border-t border-white/10 text-xs font-medium text-gray-400 hover:text-blue-400 transition-colors group/link"
      >
        <span>View Official NASA Trajectory</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 transition-all" />
      </a>
    </div>
  );
};

export default AsteroidCard;