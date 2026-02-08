import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Download, FileText, Activity, TrendingUp } from 'lucide-react';

const ResearcherTools = ({ data }) => {
  // 1. Prepare Data for Bubble Chart
  // x: Distance, y: Velocity, z: Diameter (size)
  const chartData = data.map(ast => ({
    x: ast.miss_distance_km,
    y: ast.velocity_kph,
    z: ast.diameter_km * 1000, // Scale up for visibility
    name: ast.name,
    hazardous: ast.hazardous,
    actual_diameter: ast.diameter_km
  }));

  // 2. Calculate Averages for Reference Lines
  const avgVelocity = data.reduce((acc, curr) => acc + curr.velocity_kph, 0) / data.length;

  // 3. Generate Text Report
  const generateReport = () => {
    const hazardousCount = data.filter(d => d.hazardous).length;
    const avgDist = (data.reduce((acc, c) => acc + c.miss_distance_km, 0) / data.length / 1000000).toFixed(2);
    const date = new Date().toLocaleDateString();

    const reportContent = `
COSMIC WATCH - MISSION ANALYSIS REPORT
Date: ${date}
------------------------------------------------
SUMMARY STATISTICS
------------------------------------------------
Total Objects Scanned: ${data.length}
Hazardous Objects:     ${hazardousCount}
Average Velocity:      ${(avgVelocity).toFixed(2)} km/h
Average Miss Distance: ${avgDist} Million km

------------------------------------------------
THREAT ASSESSMENT
------------------------------------------------
${data.filter(d => d.hazardous).map(d => 
  `[CRITICAL] ${d.name} | Vel: ${d.velocity_kph.toFixed(0)} km/h | Dist: ${(d.miss_distance_km/1000).toFixed(0)}k km`
).join('\n')}

------------------------------------------------
END OF REPORT
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mission_Report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const downloadCSV = () => {
    const headers = "ID,Name,Diameter(km),Velocity(km/h),Distance(km),Hazardous\n";
    const rows = data.map(ast => 
      `${ast.id},${ast.name},${ast.diameter_km},${ast.velocity_kph},${ast.miss_distance_km},${ast.hazardous}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `telemetry_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Custom Tooltip for the Chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-black/90 border border-white/20 p-3 rounded-lg shadow-xl text-xs font-mono">
          <p className="text-white font-bold mb-1">{d.name}</p>
          <p className="text-blue-400">Vel: {d.y.toFixed(0)} km/h</p>
          <p className="text-purple-400">Dist: {(d.x/1000000).toFixed(2)}M km</p>
          <p className="text-gray-400">Dia: {d.actual_diameter.toFixed(3)} km</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-12 bg-gray-900/40 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <Activity size={18} />
            <h3 className="font-display font-bold text-lg tracking-tight">Analytical Workspace</h3>
          </div>
          <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
            Bubble Plot: Size = Diameter • Color = Hazard Status
          </p>
        </div>
        
        <div className="flex gap-3">
           <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]">
             <Download size={14} /> Export CSV
           </button>
           <button onClick={generateReport} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
             <FileText size={14} /> Gen. Report
           </button>
        </div>
      </div>

      {/* Bubble Chart */}
      <div className="h-96 w-full bg-black/20 rounded-xl border border-white/5 p-4 relative">
        <div className="absolute top-4 right-4 text-[10px] text-gray-600 font-mono text-right z-10">
          <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Hazardous</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Safe</div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            
            <XAxis 
              type="number" dataKey="x" name="Distance" unit="km" stroke="#666" 
              fontSize={10} tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} 
              label={{ value: 'Miss Distance (Million km)', position: 'insideBottom', offset: -10, fill: '#666', fontSize: 10 }}
            />
            
            <YAxis 
              type="number" dataKey="y" name="Velocity" unit="km/h" stroke="#666" 
              fontSize={10} 
              label={{ value: 'Velocity (km/h)', angle: -90, position: 'insideLeft', fill: '#666', fontSize: 10 }}
            />
            
            {/* Z Axis controls the bubble size range */}
            <ZAxis type="number" dataKey="z" range={[50, 400]} name="Diameter" />

            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            {/* Reference Line for Avg Velocity */}
            <ReferenceLine y={avgVelocity} stroke="orange" strokeDasharray="3 3" label={{ position: 'insideTopRight',  value: 'Avg Velocity', fill: 'orange', fontSize: 10 }} />

            <Scatter name="Asteroids" data={chartData}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.hazardous ? '#ef4444' : '#3b82f6'} fillOpacity={0.8} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResearcherTools;