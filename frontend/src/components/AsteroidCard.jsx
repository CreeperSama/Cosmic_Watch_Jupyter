import { useState } from 'react'; // Added state for interaction
import { ArrowUpRight, AlertCircle, Circle, Star } from 'lucide-react';

const AsteroidCard = ({ data }) => {
  const isHazardous = data.hazardous;
  const [isWatched, setIsWatched] = useState(false); // Local state for demo

  return (
    <div className={`group relative bg-surface-glass backdrop-blur-md border rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 ${isWatched ? 'border-primary/50 shadow-[0_0_20px_rgba(10,132,255,0.1)]' : 'border-white/5'}`}>
      
      {/* Top Row: Identification & Status */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-white tracking-tight">{data.name}</h3>
          <p className="text-[11px] font-medium text-text-muted mt-0.5 uppercase tracking-wide">ID • {data.id}</p>
        </div>
        
        {/* Watch Button (New Requirement) */}
        <button 
          onClick={() => setIsWatched(!isWatched)}
          className={`p-2 rounded-full transition-all ${isWatched ? 'bg-primary text-white' : 'bg-white/5 text-text-muted hover:bg-white/20 hover:text-white'}`}
          title="Add to Watchlist"
        >
          <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <div className={`inline-flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full border ${
          isHazardous 
            ? 'bg-danger/10 border-danger/20 text-danger' 
            : 'bg-success/10 border-success/20 text-success'
        }`}>
          {isHazardous ? <AlertCircle className="w-3 h-3" /> : <Circle className="w-3 h-3 fill-current" />}
          <span className="text-[10px] font-semibold tracking-wide uppercase">
            {isHazardous ? 'Hazardous Object' : 'Safe Trajectory'}
          </span>
        </div>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-6">
        <div className="flex flex-col border-l border-white/10 pl-3">
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Diameter</span>
          <span className="text-xl font-light text-white tracking-tight">
            {Number(data.diameter_km).toFixed(3)} <span className="text-xs text-text-muted font-normal ml-0.5">km</span>
          </span>
        </div>
        
        <div className="flex flex-col border-l border-white/10 pl-3">
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Velocity</span>
          <span className="text-xl font-light text-white tracking-tight">
            {(Number(data.velocity_kph)/1000).toFixed(1)}k <span className="text-xs text-text-muted font-normal ml-0.5">km/h</span>
          </span>
        </div>
      </div>

      {/* Visualizer: Proximity Bar */}
      <div className="mb-5 pt-2">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">Miss Distance</span>
          <span className="text-[11px] font-medium text-white font-mono">{Number(data.miss_distance_km).toLocaleString()} km</span>
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isHazardous ? 'bg-danger' : 'bg-primary'}`} 
            style={{ width: `${Math.min((384400 / data.miss_distance_km) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Action: Subtle Link */}
      <button className="flex items-center justify-between w-full pt-4 border-t border-white/5 text-[11px] font-medium text-text-muted group-hover:text-white transition-colors">
        <span>View Trajectory Analysis</span>
        <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

export default AsteroidCard;