'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function CitizenSuite() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState('dossier');

  // Unified telemetry log state to render inside the dashboard tab
  const [logs] = useState([
    { id: 1, sol: 542, message: 'Subspace data matrix sync nominal. Credentials verified.' },
    { id: 2, sol: 541, message: 'Registry logs updated. Welcome back, University Student Becker.' }
  ]);

  const navigateToPortfolio = () => {
    startTransition(() => {
      router.push('/portfolio');
    });
  };

  return (
    <div 
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '580px',
        maxWidth: '92%',
        backgroundColor: 'rgba(10, 5, 5, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.95)',
        textAlign: 'left',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* Top Console Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontFamily: 'monospace', fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        {['dossier', 'transmitter', 'domes'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 'bold',
              letterSpacing: '2px',
              color: activeTab === t ? '#c259ff' : 'rgba(255, 255, 255, 0.4)',
              transition: 'color 0.3s ease'
            }}
          >
            // {t}
          </button>
        ))}
      </div>

      {/* Dynamic Module Content Viewport */}
      <div style={{ minHeight: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {activeTab === 'dossier' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', items: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontFamily: 'monospace', fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>
                EPHRAIM BECKER
              </span>
              <span style={{ fontSize: '9px', fontFamily: 'monospace', border: '1px solid #c259ff', color: '#c259ff', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                STUDENT_CADET
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.6', margin: 0, fontFamily: 'sans-serif', fontWeight: '300' }}>
              Remote Computer Science Student linked to Adelphi University. Developing clean frontend systems architectures, modular engineering logic, and predictive interface engines from Earth coordinates.
            </p>
          </div>
        )}

        {activeTab === 'transmitter' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>// COMM RELAY TIMELINE</span>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px', borderRadius: '6px' }}>
              {logs.map(log => (
                <div key={log.id} style={{ marginBottom: '4px' }}>
                  <span style={{ color: '#c259ff' }}>[Sol {log.sol}]</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'domes' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontFamily: 'monospace', fontSize: '11px' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '10px', borderRadius: '6px' }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '2px' }}>TRANSIT NET</div>
              <div style={{ color: '#fff', fontWeight: 'bold' }}>982 km/h</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '10px', borderRadius: '6px' }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '2px' }}>BIOMASS</div>
              <div style={{ color: '#34d399', fontWeight: 'bold' }}>94.6% STABLE</div>
            </div>
          </div>
        )}
      </div>

      {/* Gateway Transition Trigger Link */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
        <button 
          onClick={navigateToPortfolio}
          disabled={isPending}
          style={{
            width: '100%',
            padding: '10px',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
        >
          {isPending ? '[ ACCESSING ARCHIVES... ]' : '[ ACCESS PORTFOLIO ARCHIVES ]'}
        </button>
      </div>
    </div>
  );
}