'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ParkPlazaLandingPage() {
  const [activePlaque, setActivePlaque] = useState(null);

  const DISTRICTS = [
    {
      id: 'sports',
      title: '🏃 Sports Lawn (0.38g)',
      subtitle: 'Region-4 Athletic Utilities',
      route: null,
      desc: 'Low-gravity fields designed for soccer, discus, and flying lawn games. Features soft boundary netting and flexible lighting configurations for easy, low-demand play.',
      color: '#ffb300',
      rgb: '255, 179, 0',
      details: {
        location: 'South-East Quad, Dome Sector 4',
        elevation: '+12m above base level',
        specs: '0.38g active gravity mitigation fields, soft impact landing turf, low-glare twilight illumination loops.',
        activities: 'Zero-friction lacrosse, low-G athletic matches, public movement workshops, community flying games.',
        story: 'Designed as a physical recreation space to help colony residents adapt to Martian gravity coordinates. The lawn uses subterranean localized magnetic fields to dampen impact stress.'
      }
    },
    {
      id: 'conservatory',
      title: '🌿 Oxygen Conservatory',
      subtitle: 'Region-7 Oxygen Canopy',
      route: null,
      desc: 'Towering bioengineered redwoods and mist trails cycling fresh atmospheric oxygen through the habitat core.',
      color: '#00ff88',
      rgb: '0, 255, 136',
      details: {
        location: 'Central Vaults, Dome Sector 7',
        elevation: '+0m base level',
        specs: 'Automated micro-misting humidity emitters, bioengineered redwood canopy, low-spectrum light paths.',
        activities: 'Forest walking, botanical cataloging, respiratory relaxation, quiet reflection.',
        story: 'A massive living lung that anchors the dome’s ecological life-support system. The foliage has been customized to optimize gas-exchange rates, producing over 35% more oxygen than standard terrestrial pines.'
      }
    },
    {
      id: 'observatory',
      title: '🔭 Observatory Terrace',
      subtitle: 'Region-9 Perimeter Overlook',
      route: null,
      desc: 'High-altitude overlook at the dome perimeter offering panoramic views of the Martian desert, dust storms, and the stars beyond.',
      color: '#00f0ff',
      rgb: '0, 240, 255',
      details: {
        location: 'North Perimeter, Upper Ring',
        elevation: '+45m upper terrace',
        specs: 'Triple-reinforced quartz sky-windows, optical stargazing lenses, outer storm telemetry displays.',
        activities: 'Perimeter scanning, celestial stargazing, dust storm observation, night sky meditation.',
        story: 'Built into the structural steel collar of the dome, the Terrace provides clear, unmagnified sightlines into the vast landscape of Acidalia Planitia. An architectural transition point between human dome society and the Martian desert.'
      }
    },
    {
      id: 'amphitheater',
      title: '🎭 Geode Amphitheater',
      subtitle: 'Region-12 Cultural Vaults',
      route: null,
      desc: 'An open-air amphitheater nestled inside natural stone vaults, hosting public assemblies, acoustic concerts, and cultural gatherings under holographic skies.',
      color: '#c259ff',
      rgb: '194, 89, 255',
      details: {
        location: 'West Ravine, Dome Sector 12',
        elevation: '-8m sunken vaults',
        specs: 'Basalt acoustics, floating holographic projection mesh, comfortable stone tier seating.',
        activities: 'Acoustic musical concerts, colony assemblies, community storytelling, cultural forums.',
        story: 'Carved directly from a natural basalt hollow found during early dome excavation. The amphitheater’s crystal basalt columns provide superb natural sound amplification without requiring high-power speaker rigs.'
      }
    },
    {
      id: 'neurodiversity',
      title: '🧠 Neurodiversity District',
      subtitle: 'Region-2 Pride Biome',
      route: '/neurodiversity',
      desc: 'A public park biome designed for sensory comfort, clear communication, and community connection.',
      color: '#00ff88',
      rgb: '0, 255, 136'
    },
    {
      id: 'commons',
      title: '👥 Community Commons',
      subtitle: 'Region-1 Civic Hearth',
      route: null,
      desc: 'Central plaza featuring outdoor cafes, public study tables, misting fountains, and interactive bulletin boards for social gathering.',
      color: '#ff5722',
      rgb: '255, 87, 34',
      details: {
        location: 'Central Ring, Sector 1',
        elevation: '+2m base level',
        specs: 'Translucent shade sails, solar-powered study tables, soft-misted cooling fountains.',
        activities: 'Public socializing, outdoor study, shared community dining, casual board game meetups.',
        story: 'The primary social crossroads of Ares City Park. The commons acts as a decentralized town square where civic groups gather and residents from all sectors relax, share ideas, and mingle under the dome.'
      }
    }
  ];

  return (
    <div className="citizen-card-shell neuro-page-shell" style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', margin: '0 auto', maxWidth: '800px', padding: '10px 0 30px 0', justifyContent: 'center' }}>
        
        {/* Main Architectural Signage / Park Welcome Plaque */}
        <div className="bubbly-panel" style={{ textAlign: 'center', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#00ff88', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
            // CIVIC SPACE // GEODESIC DOME // RECREATIONAL COMMON
          </span>
          <h1 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.5rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
            Ares City Park
          </h1>
          
          <div style={{ fontSize: '0.8rem', color: '#8a9bb5', lineHeight: '1.65', margin: '0 auto', maxWidth: '520px', textAlign: 'center', fontFamily: 'monospace' }}>
            Welcome to the central recreational biodome of Ares City. This civic space bridges human social life, botanical ecosystems, and district pathways under the geodesic dome. Select an architectural sign card below to explore and discover the habitat.
          </div>
        </div>

        {/* Spatial Grid of District & Park Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {DISTRICTS.map((dest) => {
            const isRouteLink = dest.route !== null;
            
            const cardContent = (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.52rem', fontFamily: 'monospace', color: dest.color, letterSpacing: '1px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {dest.subtitle}
                  </span>
                  <span style={{ fontSize: '0.55rem', color: dest.color, fontFamily: 'monospace' }}>
                    {isRouteLink ? '[ ENTER PORTAL ➔ ]' : '[ VIEW SIGN 🔍 ]'}
                  </span>
                </div>
                <strong style={{ fontSize: '0.86rem', color: '#fff', display: 'block', fontFamily: 'monospace', marginBottom: '6px' }}>
                  {dest.title}
                </strong>
                <p style={{ fontSize: '0.72rem', color: '#8a9bb5', lineHeight: 1.45, margin: 0, textAlign: 'left' }}>
                  {dest.desc}
                </p>
              </>
            );

            if (isRouteLink) {
              return (
                <Link
                  key={dest.id}
                  href={dest.route}
                  style={{
                    background: 'rgba(6, 9, 20, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = dest.color;
                    e.currentTarget.style.boxShadow = `0 8px 30px rgba(${dest.rgb}, 0.12)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
                  }}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={dest.id}
                onClick={() => setActivePlaque(dest)}
                style={{
                  background: 'rgba(6, 9, 20, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = dest.color;
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(${dest.rgb}, 0.12)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
                }}
              >
                {cardContent}
              </div>
            );
          })}
        </div>

      </div>

      {/* Immersive Architectural Sign Details Overlay */}
      {activePlaque && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setActivePlaque(null)}
        >
          <div 
            style={{
              background: 'rgba(6, 9, 20, 0.85)',
              border: `1.5px solid ${activePlaque.color}`,
              borderRadius: '16px',
              padding: '24px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(${activePlaque.rgb}, 0.1)`,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              color: '#fff',
              fontFamily: 'monospace',
              textAlign: 'left'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: activePlaque.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {activePlaque.subtitle}
              </span>
              <button 
                onClick={() => setActivePlaque(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8a9bb5',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                [ ✕ ]
              </button>
            </div>

            <div>
              <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-tech)', margin: '0 0 6px 0', color: '#fff', fontWeight: 'bold' }}>
                {activePlaque.title}
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#8a9bb5', margin: 0, lineHeight: '1.5', textAlign: 'justify' }}>
                {activePlaque.desc}
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.74rem' }}>
              <div>
                <strong style={{ color: activePlaque.color }}>📍 LOCATION:</strong> {activePlaque.details.location}
              </div>
              <div>
                <strong style={{ color: activePlaque.color }}>📐 ELEVATION:</strong> {activePlaque.details.elevation}
              </div>
              <div>
                <strong style={{ color: activePlaque.color }}>⚙️ ENVIRONMENTAL SYSTEM:</strong> {activePlaque.details.specs}
              </div>
              <div>
                <strong style={{ color: activePlaque.color }}>🏃 IN-WORLD USAGE:</strong> {activePlaque.details.activities}
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${activePlaque.color}`, paddingLeft: '10px', lineHeight: '1.5', fontStyle: 'italic', textAlign: 'justify' }}>
              {activePlaque.details.story}
            </div>

            <button 
              onClick={() => setActivePlaque(null)}
              style={{
                marginTop: '4px',
                padding: '10px',
                border: `1px solid ${activePlaque.color}`,
                borderRadius: '8px',
                color: activePlaque.color,
                background: 'rgba(255,255,255,0.01)',
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = `rgba(${activePlaque.rgb}, 0.08)`}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              [ ✕ CLOSE SIGN ]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
