"use client";

export function BackgroundShapes() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#fdfdfd'
    }}>
      
      {/* Background Soft Glows */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50vw', height: '50vw', background: '#d4af37', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', background: '#d4af37', filter: 'blur(180px)', opacity: 0.04, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '40%', left: '60%', width: '40vw', height: '40vw', background: '#d4af37', filter: 'blur(120px)', opacity: 0.03, borderRadius: '50%' }} />

      {/* Organic Topographic / Blob Lines */}
      {/* Top Right Organic Shapes */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-25%', right: '-15%', width: '70vw', minWidth: '600px', opacity: 0.25, transform: 'rotate(15deg)' }}>
        <path fill="none" stroke="#d4af37" strokeWidth="0.4" d="M43.5,-73.4C55.6,-64.8,64.2,-51,71.2,-36.8C78.2,-22.6,83.7,-8,81.4,5.4C79.2,18.8,69.2,30.9,59.3,42.4C49.4,53.8,39.6,64.6,26.4,71.9C13.2,79.2,-3.3,83.1,-19.4,79.9C-35.4,76.6,-50.9,66.1,-63.3,53.1C-75.7,40.1,-84.8,24.5,-86.6,8.2C-88.3,-8.1,-82.7,-25.1,-72.2,-38.3C-61.7,-51.5,-46.3,-60.8,-32.1,-68.1C-17.9,-75.4,-4.9,-80.7,9.3,-83.4C23.6,-86,47.1,-86,43.5,-73.4Z" transform="translate(100 100)" />
        <path fill="none" stroke="#d4af37" strokeWidth="0.4" d="M38.5,-64.4C49.6,-56.8,58.2,-44,64.2,-30.8C70.2,-17.6,73.7,-4,71.4,8.4C69.2,20.8,61.2,31.9,52.3,41.4C43.4,50.8,32.6,58.6,19.4,63.9C6.2,69.2,-9.3,71.1,-24.4,67.9C-39.4,64.6,-53.9,56.1,-64.3,45.1C-74.7,34.1,-80.8,20.5,-82.6,6.2C-84.3,-8.1,-81.7,-23.1,-73.2,-35.3C-64.7,-47.5,-51.3,-56.8,-38.1,-63.1C-24.9,-69.4,-11.9,-72.7,2.3,-75.4C16.6,-78,33.1,-80,38.5,-64.4Z" transform="translate(100 100)" />
        <path fill="none" stroke="#d4af37" strokeWidth="0.4" d="M33.5,-55.4C43.6,-48.8,52.2,-37,57.2,-24.8C62.2,-12.6,63.7,0,61.4,11.4C59.2,22.8,53.2,32.9,45.3,40.4C37.4,47.8,25.6,53.6,12.4,57.9C-0.8,62.2,-15.3,64.1,-29.4,60.9C-43.4,57.6,-56.9,49.1,-65.3,39.1C-73.7,29.1,-76.8,17.5,-78.6,5.2C-80.3,-7.1,-78.7,-20.1,-72.2,-31.3C-65.7,-42.5,-55.3,-51.8,-43.1,-57.1C-30.9,-62.4,-17.9,-64.7,-3.7,-60.4C10.6,-56,23.1,-45,33.5,-55.4Z" transform="translate(100 100)" />
      </svg>

      {/* Bottom Left Organic Shapes */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '-20%', left: '-20%', width: '80vw', minWidth: '600px', opacity: 0.25, transform: 'rotate(-25deg)' }}>
        <path fill="none" stroke="#d4af37" strokeWidth="0.4" d="M46.7,-76.1C60.4,-68.8,71.2,-55.5,78.9,-40.4C86.7,-25.3,91.4,-8.4,87.8,6.8C84.3,22,72.4,35.6,59.8,47.1C47.1,58.6,33.6,68,18.5,73.5C3.3,79,-13.4,80.7,-28.9,76.5C-44.5,72.4,-58.9,62.4,-70.2,49.5C-81.5,36.5,-89.6,20.5,-90.6,4.1C-91.5,-12.3,-85.4,-29.1,-74.6,-42.2C-63.7,-55.2,-48.2,-64.4,-33.1,-70.7C-18,-76.9,-3.2,-80.1,11.8,-79.8C26.9,-79.5,53.8,-83.4,46.7,-76.1Z" transform="translate(100 100)" />
        <path fill="none" stroke="#d4af37" strokeWidth="0.4" d="M41.7,-67.1C53.4,-60.8,62.2,-48.5,68.9,-34.4C75.7,-20.3,80.4,-4.4,76.8,9.8C73.3,24,62.4,35.6,51.8,45.1C41.1,54.6,29.6,62,15.5,66.5C1.3,71,-11.4,71.7,-23.9,67.5C-36.5,63.4,-47.9,54.4,-57.2,43.5C-66.5,32.5,-73.6,18.5,-74.6,3.1C-75.5,-12.3,-70.4,-26.1,-61.6,-37.2C-52.7,-48.2,-40.2,-56.4,-28.1,-61.7C-16,-66.9,-4.2,-69.1,8.8,-68.8C21.9,-68.5,35.8,-69.4,41.7,-67.1Z" transform="translate(100 100)" />
        <path fill="none" stroke="#d4af37" strokeWidth="0.4" d="M36.7,-58.1C46.4,-52.8,53.2,-41.5,58.9,-28.4C64.7,-15.3,69.4,-2.4,65.8,7.8C62.3,18,52.4,25.6,43.8,33.1C35.1,40.6,25.6,48,12.5,51.5C-0.7,55,-15.4,54.7,-25.9,49.5C-36.5,44.4,-45.9,34.4,-53.2,25.5C-60.5,16.5,-65.6,6.5,-66.6,-4.9C-67.5,-16.3,-64.4,-29.1,-56.6,-39.2C-48.7,-49.2,-37.2,-56.4,-26.1,-61.7C-15,-66.9,-2.2,-68.1,8.8,-67.8C19.9,-67.5,30.8,-64.4,36.7,-58.1Z" transform="translate(100 100)" />
      </svg>
      
      {/* Delicate Wavy Lines */}
      <svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ position: 'absolute', top: '40%', left: '0', width: '100vw', height: '20vh', opacity: 0.15 }}>
        <path fill="none" stroke="#d4af37" strokeWidth="1" d="M0,100 C200,200 300,0 500,100 C700,200 800,0 1000,100" />
        <path fill="none" stroke="#d4af37" strokeWidth="0.5" d="M0,110 C210,210 290,10 500,110 C710,210 790,10 1000,110" />
      </svg>
      <svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ position: 'absolute', top: '70%', left: '0', width: '100vw', height: '15vh', opacity: 0.1, transform: 'scaleX(-1)' }}>
        <path fill="none" stroke="#d4af37" strokeWidth="1" d="M0,100 C150,150 350,50 500,100 C650,150 850,50 1000,100" />
      </svg>
    </div>
  );
}
