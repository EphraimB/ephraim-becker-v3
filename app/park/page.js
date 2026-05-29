import Link from 'next/link';

export const metadata = {
  title: 'Ares City Park - Dome Plaza & Lawns',
  description: 'Hang out, play sports, relax, and explore unique biodome districts like the Neurodiversity District inside the Ares City Park dome.',
};

export default function ParkPlazaLandingPage() {
  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '720px', justifyContent: 'center' }}>
        
        {/* Main Header / Signage Plaque */}
        <div className="bubbly-panel" style={{ textAlign: 'center', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
            // PUBLIC DOME PARK // MAIN ENTRYWAY
          </span>
          <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.4rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
            Park Entrance
          </h1>
          
          <div style={{ fontSize: '0.8rem', color: '#8a9bb5', lineHeight: '1.65', margin: '0 auto 20px auto', maxWidth: '460px', textAlign: 'center', fontFamily: 'monospace' }}>
            Welcome to the entry lawns of Ares City Park. The low-gravity athletic fields, quiet botanical mist conservatories, and Neurodiversity District biomes are open to all colony residents.
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '4px' }}>
            <Link 
              href="/neurodiversity" 
              className="hud-btn" 
              style={{ 
                borderWidth: '1.5px', 
                borderStyle: 'solid', 
                borderColor: '#00f0ff', 
                color: '#00f0ff', 
                background: 'rgba(0, 240, 255, 0.08)',
                padding: '8px 16px',
                fontSize: '0.7rem',
                textDecoration: 'none',
                fontFamily: 'monospace'
              }}
            >
              [ 🧠 EXPLORE NEURODIVERSITY DISTRICT ]
            </Link>
          </div>
        </div>

        {/* Other Park Attractions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          
          {/* Attraction 1: Sports Complex */}
          <div className="bubbly-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#ffb300', display: 'block', marginBottom: '4px' }}>
              // REGION-4 // ATHLETIC UTILITIES
            </span>
            <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block', fontFamily: 'monospace', marginBottom: '6px' }}>
              🏃 Sports Lawn (0.38g)
            </strong>
            <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, maxWidth: '300px', textAlign: 'left' }}>
              Designed for low-gravity soccer, discus, and flying lawn games. Open to all players, featuring soft boundary netting and flexible lighting configurations for easy, low-demand play.
            </p>
          </div>

          {/* Attraction 2: Botanical Trails */}
          <div className="bubbly-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#ffb300', display: 'block', marginBottom: '4px' }}>
              // REGION-7 // OXYGEN CANOPY
            </span>
            <strong style={{ fontSize: '0.82rem', color: '#fff', display: 'block', fontFamily: 'monospace', marginBottom: '6px' }}>
              🌿 Oxygen Conservatory
            </strong>
            <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, maxWidth: '300px', textAlign: 'left' }}>
              Towering bioengineered canopy cycling fresh oxygen through the core. Features walking mist trails, low-glare twilight lanterns, and quiet reflection lawns.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
