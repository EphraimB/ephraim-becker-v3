import Link from 'next/link';

export const metadata = {
  title: 'Ares City Park - Dome Plaza & Lawns',
  description: 'Hang out, play sports, relax, and explore unique biodome districts like the Neurodiversity District inside the Ares City Park dome.',
};

export default function ParkPlazaLandingPage() {
  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '850px', justifyContent: 'center' }}>
        
        {/* Main Header */}
        <div className="bubbly-panel" style={{ textAlign: 'center', padding: '24px 20px' }}>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
            // ARES CITY PARK // CENTRAL DOME LAWNS // SYSTEMS ACTIVE
          </span>
          <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.6rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
            Ares City Park Central Plaza
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#8a9bb5', lineHeight: '1.7', margin: '0 0 20px 0', textAlign: 'justify' }}>
            Welcome to the central grounds of **Ares City Park**. Underneath this towering geodesic dome, colony citizens gather to socialize, run trail lawns, play sports, and build community bonds. The park is home to multiple independent districts, including our state-of-the-art **Neurodiversity District**, built entirely around sensory accessibility and explicit communication templates.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
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
                fontSize: '0.72rem',
                textDecoration: 'none',
                fontFamily: 'monospace'
              }}
            >
              [ 🧠 ENTER THE NEURODIVERSITY DISTRICT ]
            </Link>
          </div>
        </div>

        {/* Other Park Attractions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          
          {/* Attraction 1: Sports Complex */}
          <div className="bubbly-panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#ffb300', display: 'block', marginBottom: '4px' }}>
              // SEC-4 // DOME SPORTS LAUNCH
            </span>
            <strong style={{ fontSize: '0.84rem', color: '#fff', display: 'block', fontFamily: 'monospace', marginBottom: '6px' }}>
              🏃 Low-Gravity Sports Complex
            </strong>
            <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: 0, textAlign: 'justify' }}>
              Play dome-discus, zero-friction lacrosse, or participate in soccer matches designed for Martian gravitational coordinates (0.38g). Features safe landing zones and adaptive rules for all ages and athletic structures.
            </p>
          </div>

          {/* Attraction 2: Botanical Trails */}
          <div className="bubbly-panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: '#ffb300', display: 'block', marginBottom: '4px' }}>
              // SEC-7 // BIODOME CONSERVATORY
            </span>
            <strong style={{ fontSize: '0.84rem', color: '#fff', display: 'block', fontFamily: 'monospace', marginBottom: '6px' }}>
              🌿 Botanical Conservatory & Trails
            </strong>
            <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.4, margin: 0, textAlign: 'justify' }}>
              Wander among towering bioengineered Martian redwoods and low-glare bioluminescent flora designed to cycle fresh oxygen through the colony core. Rest on comfortable benches next to quiet mist waterfalls.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
