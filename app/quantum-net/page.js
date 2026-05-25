'use client';

import { Suspense } from 'react';
import CitizenSuite from '../page';

export default function QuantumNetPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'var(--font-tech)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>
        🛰️ Aligning Sub-Atomic Channels...
      </div>
    }>
      <CitizenSuite />
    </Suspense>
  );
}
