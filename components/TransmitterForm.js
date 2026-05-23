'use client';

import { useState } from 'react';

export default function TransmitterForm({ onNewLog }) {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('University Student Ephraim Becker');
  const [message, setMessage] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [statusText, setStatusText] = useState('ESTABLISH UPLINK & TRANSMIT');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTransmitting) return;

    setIsTransmitting(true);
    setStatusText('ALIGNING SUB-ATOMIC CHANNELS...');

    setTimeout(() => {
      setStatusText('SYNCHRONIZING PACKETS...');

      setTimeout(() => {
        setStatusText('TRANSMISSION SECURED & RECORDED');

        // Execute callback
        if (onNewLog) {
          onNewLog({
            sender,
            recipient,
            message,
            timestamp: new Date()
          });
        }

        // Reset fields
        setSender('');
        setMessage('');

        setTimeout(() => {
          setStatusText('ESTABLISH UPLINK & TRANSMIT');
          setIsTransmitting(false);
        }, 3000);
      }, 1200);
    }, 1000);
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }} onSubmit={handleSubmit}>
      <div className="net-form-group">
        <label className="net-label" htmlFor="comm-sender">Citizen Sender / Org Name</label>
        <input
          type="text"
          id="comm-sender"
          className="net-input"
          placeholder="e.g. Terra Fleet Command / Your Name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          required
          disabled={isTransmitting}
        />
      </div>

      <div className="net-form-group">
        <label className="net-label" htmlFor="comm-recipient">Subspace Channel Link</label>
        <select
          id="comm-recipient"
          className="net-input"
          style={{ cursor: 'pointer' }}
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isTransmitting}
        >
          <option value="University Student Ephraim Becker">Ephraim Becker (Citizen Suite Penthouse)</option>
          <option value="Ares City Admin Core">Ares City Administration (Metropolis Core)</option>
          <option value="Solar Grid Research">Solar Grid Research Labs (Biosphere Dome)</option>
        </select>
      </div>

      <div className="net-form-group" style={{ flex: 1 }}>
        <label className="net-label" htmlFor="comm-body">Quantum Packet Message</label>
        <textarea
          id="comm-body"
          className="net-textarea"
          placeholder="Type your coordinate packets or message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isTransmitting}
        ></textarea>
      </div>

      <button
        type="submit"
        className="hud-btn"
        style={{
          width: '100%',
          borderColor: isTransmitting && statusText.includes('SECURED') ? 'var(--neon-emerald)' : '',
          color: isTransmitting && statusText.includes('SECURED') ? 'var(--neon-emerald)' : ''
        }}
        disabled={isTransmitting}
      >
        {statusText}
      </button>
    </form>
  );
}
