import { ArrowUpRight, AlertCircle, Circle } from 'lucide-react';

const AsteroidCard = ({ data }) => {
  const isHazardous = data.hazardous;

  return (
    <div className="group relative bg-surface-glass backdrop-blur-md border border-white/5 rounded-2xl p-5 transition-all duration-300 hover:bg-white/5 hover:border-white/10">
      
      {/* Top Row: Identification & Status */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-display font-medium text-white">{data.name}</h3>
          <p className="text-xs font-light text-text-muted mt-0.5">ID • {data.id}</p>
        </div>
        
        {/* Minimal Status Badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
          isHazardous 
            ? 'bg-danger/10 border-danger/20 text-danger' 
            : 'bg-success/10 border-success/20 text-success'
        }`}>
          {isHazardous ? <AlertCircle className="w-3 h-3" /> : <Circle className="w-3 h-3 fill-current" />}
          <span className="text-[10px] font-medium tracking-wide uppercase">
            {isHazardous ? 'Hazard' : 'Safe'}
          </span>
        </div>
      </div>

      {/* Data Grid: Clean Typography */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Diameter</span>
          <span className="text-2xl font-light text-white tracking-tight">
            {Number(data.diameter_km).toFixed(3)} <span className="text-sm text-text-muted font-normal">km</span>
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">Velocity</span>
          <span className="text-2xl font-light text-white tracking-tight">
            {(Number(data.velocity_kph)/1000).toFixed(1)}k <span className="text-sm text-text-muted font-normal">km/h</span>
          </span>
        </div>
      </div>

      {/* Visualizer: Proximity */}
      <div className="mb-5">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">Miss Distance</span>
          <span className="text-xs font-medium text-white">{Number(data.miss_distance_km).toLocaleString()} km</span>
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${isHazardous ? 'bg-danger' : 'bg-primary'}`} 
            style={{ width: `${Math.min((384400 / data.miss_distance_km) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Action: Subtle Link */}
      <button className="flex items-center justify-between w-full pt-4 border-t border-white/5 text-xs font-medium text-text-muted group-hover:text-white transition-colors">
        <span>View Trajectory</span>
        <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

export default AsteroidCard;