import { useEffect, useState } from 'react';
import AsteroidCard from '../components/AsteroidCard';
<<<<<<< HEAD
import { Loader2 } from 'lucide-react';
=======
import { Loader2, RefreshCw, AlertTriangle, Satellite } from 'lucide-react';
>>>>>>> frontend
import axios from 'axios';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

  // ... keep fetchAsteroids logic the same ...
  // Re-inserting logic here for completeness of the file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const res = await axios.get(`http://localhost:5000/api/asteroids/feed?startDate=${today}&endDate=${today}`);
        setAsteroids(res.data);
        setLoading(false);
      } catch (err) {
        // Mock data for display
        setAsteroids([
            { id: '1', name: '(2024 XR)', hazardous: true, diameter_km: 0.12, velocity_kph: 45000, miss_distance_km: 120000 },
            { id: '2', name: '(2021 GT3)', hazardous: false, diameter_km: 0.05, velocity_kph: 22000, miss_distance_km: 4500000 },
            { id: '3', name: 'Apophis', hazardous: true, diameter_km: 0.34, velocity_kph: 67000, miss_distance_km: 31000 },
        ]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
      
      {/* Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-medium text-white tracking-tight mb-2">
            Near-Earth Objects
          </h1>
          <p className="text-text-muted font-light text-lg max-w-xl">
            Real-time telemetry of celestial objects passing within 0.05 AU.
          </p>
        </div>
        
        {/* Stats Summary - New HUD Element */}
        <div className="flex items-center gap-8 px-6 py-3 bg-surface-glass border border-white/5 rounded-2xl backdrop-blur-md">
          <div className="text-center">
            <div className="text-2xl font-light text-white">{asteroids.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Objects</div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl font-light text-danger">
              {asteroids.filter(a => a.hazardous).length}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-text-muted font-medium">Hazardous</div>
=======
  const [error, setError] = useState(null);

  const fetchAsteroids = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      // Note: Ensure your backend is running on Port 5000
      const response = await axios.get(`http://localhost:5000/api/asteroids/feed?startDate=${today}&endDate=${today}`);
      setAsteroids(response.data);
    } catch (err) {
      console.warn("Deep Space Network offline. Switching to Simulation Data.");
      // Fallback Data for UI testing/demos
      setAsteroids([
        { id: '1', name: '(2024 XR)', hazardous: true, diameter_km: 0.12, velocity_kph: 45000, miss_distance_km: 120000 },
        { id: '2', name: '(2021 GT3)', hazardous: false, diameter_km: 0.05, velocity_kph: 22000, miss_distance_km: 4500000 },
        { id: '3', name: 'Apophis', hazardous: true, diameter_km: 0.34, velocity_kph: 67000, miss_distance_km: 31000 },
        { id: '4', name: '(2023 YZ)', hazardous: false, diameter_km: 0.02, velocity_kph: 15000, miss_distance_km: 2000000 },
        { id: '5', name: 'Bennu', hazardous: true, diameter_km: 0.49, velocity_kph: 101000, miss_distance_km: 150000 },
        { id: '6', name: '(2020 QG)', hazardous: false, diameter_km: 0.003, velocity_kph: 44000, miss_distance_km: 2950 },
      ]);
      setError("Simulation Mode Active");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const hazardousCount = asteroids.filter(a => a.hazardous).length;
  const closestObject = asteroids.reduce((prev, curr) => 
    (prev.miss_distance_km < curr.miss_distance_km) ? prev : curr
  , asteroids[0] || {});

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">Live Telemetry Feed</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-3">
            Sector <span className="text-primary">Near-Earth</span>
          </h1>
          <p className="text-text-muted font-normal text-lg max-w-xl leading-relaxed">
            Real-time tracking and risk analysis of celestial objects passing within 0.05 AU.
          </p>
        </div>
        
        {/* STATS HUD */}
        <div className="flex items-center gap-8 px-8 py-5 bg-surface-glass border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
          <div className="text-center">
            <div className="text-3xl font-light text-white tracking-tighter">{asteroids.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mt-1">Objects Scanned</div>
          </div>
          
          <div className="w-px h-10 bg-white/10"></div>
          
          <div className="text-center">
            <div className="text-3xl font-light text-danger tracking-tighter drop-shadow-[0_0_10px_rgba(255,69,58,0.3)]">
              {hazardousCount}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mt-1">Hazardous</div>
          </div>

           <div className="w-px h-10 bg-white/10 hidden lg:block"></div>

           <div className="text-center hidden lg:block">
            <div className="text-3xl font-light text-primary tracking-tighter">
              {closestObject.miss_distance_km ? (closestObject.miss_distance_km / 384400).toFixed(1) : '-'} <span className="text-sm text-text-muted">LD</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mt-1">Closest Approach</div>
>>>>>>> frontend
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Grid */}
      {loading ? (
        <div className="flex justify-center pt-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
=======
      {/* CONTROLS */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-display font-semibold text-white flex items-center gap-2">
          <Satellite className="w-5 h-5 text-primary" /> Active Trajectories
        </h2>
        
        <div className="flex gap-4">
          {error && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full text-warning text-xs font-medium">
              <AlertTriangle className="w-3 h-3" />
              {error}
            </div>
          )}
          
          <button 
            onClick={fetchAsteroids}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-glass border border-white/10 hover:bg-white/5 hover:border-white/20 rounded-full transition-all active:scale-95 text-xs font-semibold text-text-main uppercase tracking-wide"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* DATA GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-text-muted font-mono text-xs uppercase tracking-widest animate-pulse">Establishing Downlink...</p>
>>>>>>> frontend
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asteroids.map((neo) => (
            <AsteroidCard key={neo.id} data={neo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;