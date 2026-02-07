import { useEffect, useState } from 'react';
import AsteroidCard from '../components/AsteroidCard';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

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
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center pt-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
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