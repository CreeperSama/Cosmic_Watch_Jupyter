const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Outer Glow / Atmosphere */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-30" />
      
      {/* Orbital Ring */}
      <ellipse 
        cx="50" 
        cy="50" 
        rx="42" 
        ry="15" 
        stroke="currentColor" 
        strokeWidth="2" 
        transform="rotate(-25 50 50)" 
      />
      
      {/* Main Celestial Body */}
      <circle cx="50" cy="50" r="22" fill="currentColor" />
      
      {/* Tracking Satellite Dot (Animated) */}
      <circle cx="88" cy="33" r="4" fill="#0A84FF">
        <animate 
          attributeName="opacity" 
          values="1;0.3;1" 
          dur="2s" 
          repeatCount="indefinite" 
        />
      </circle>
    </svg>
  );
};

export default Logo;