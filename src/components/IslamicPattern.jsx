import React from 'react';

export default function IslamicPattern({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute top-0 right-0 w-64 h-64 opacity-5"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#10b981">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 100 + 60 * Math.cos(angle);
            const y = 100 + 60 * Math.sin(angle);
            return (
              <polygon
                key={i}
                points={`100,100 ${x},${y} ${100 + 60 * Math.cos(angle + 0.3)},${100 + 60 * Math.sin(angle + 0.3)}`}
                opacity="0.6"
              />
            );
          })}
          <circle cx="100" cy="100" r="40" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="100" cy="100" r="70" stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.3" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 100 + 40 * Math.cos(angle);
            const y1 = 100 + 40 * Math.sin(angle);
            const x2 = 100 + 70 * Math.cos(angle + Math.PI / 8);
            const y2 = 100 + 70 * Math.sin(angle + Math.PI / 8);
            return <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10b981" strokeWidth="0.5" opacity="0.4" />;
          })}
        </g>
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-48 h-48 opacity-5"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.5">
          <polygon points="100,20 180,70 180,130 100,180 20,130 20,70" />
          <polygon points="100,40 165,77.5 165,122.5 100,160 35,122.5 35,77.5" />
          <polygon points="100,60 150,85 150,115 100,140 50,115 50,85" />
        </g>
      </svg>
    </div>
  );
}
