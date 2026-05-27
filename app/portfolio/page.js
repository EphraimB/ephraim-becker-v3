'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import PROJECTS from '../../data/projects.json';


const CATEGORIES = [
  "All",
  "Web development",
  "3D modeling",
  "Calculator apps",
  "VR development",
  "Computer building"
];

export default function PortfolioDome() {
  const [transitState, setTransitState] = useState('slide-active');
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minYear, setMinYear] = useState(2014);
  const [maxYear, setMaxYear] = useState(2026);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const walkDir = window.sessionStorage.getItem('walk-direction');
      if (walkDir === 'left') {
        setTransitState('slide-right');
      } else if (walkDir === 'right') {
        setTransitState('slide-left');
      }
      window.sessionStorage.removeItem('walk-direction');
      
      const timer = setTimeout(() => {
        setTransitState('slide-active');
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const getProjectYear = (project) => {
    if (!project.finished) return 2026;
    const year = parseInt(project.finished.substring(0, 4));
    return isNaN(year) ? 2026 : year;
  };

  const filteredProjects = PROJECTS.filter(project => {
    // 1. Category Filter
    if (category !== 'All' && project.category !== category) {
      return false;
    }

    // 2. Year Filter
    const projectYear = getProjectYear(project);
    if (projectYear < minYear || projectYear > maxYear) {
      return false;
    }

    // 3. Search Query Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTech = project.technologies.some(tech => tech.toLowerCase().includes(q));
      const matchCategory = project.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTech && !matchCategory) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="citizen-card-shell" style={{ flexDirection: 'column' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Bubbly floating content area */}
      <div className={`walking-content-container ${transitState}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        
        {/* Upper Information Panel */}
        <div className="bubbly-panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
            Holographic Project Archives
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Browse the engineering software systems, predictive engines, and physical configurations developed by Ephraim Becker. Filter projects instantly by category tag, keywords, or completed year, and click any card to open a conversational hologram details bubble!
          </p>
        </div>

        {/* Advanced Holographic Filter Deck */}
        <div className="bubbly-panel" style={{ padding: '20px 24px', marginBottom: '20px', background: 'rgba(6,9,20,0.85)' }}>
          
          <div className="filter-deck-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
            
            {/* Search Input Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              <label style={{ fontFamily: 'var(--font-tech)', fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '1.5px', fontWeight: 700 }}>
                SECTOR ARCHIVE KEYWORD SEARCH
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  placeholder="🔍 Search titles, descriptions, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="net-input"
                  suppressHydrationWarning
                  style={{
                    width: '100%',
                    background: '#04060c',
                    border: '1.5px solid var(--color-accent)',
                    borderRadius: '8px',
                    padding: '10px 14px 10px 36px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '0.75rem',
                    outline: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.1)'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-accent)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-tech)',
                      fontWeight: 'bold'
                    }}
                  >
                    [✕]
                  </button>
                )}
              </div>
            </div>

            {/* Date Range Control (Sliders side-by-side) */}
            <div className="filter-sliders-container" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div className="range-slider-group" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="range-slider-label">MIN COMPLETED YEAR</span>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.68rem', color: 'var(--color-accent)', fontWeight: 700 }}>{minYear}</span>
                </div>
                <input 
                  type="range"
                  min="2014"
                  max="2026"
                  value={minYear}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setMinYear(val);
                    if (val > maxYear) setMaxYear(val);
                  }}
                  className="range-slider-control"
                />
              </div>

              <div className="range-slider-group" style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="range-slider-label">MAX COMPLETED YEAR</span>
                  <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.68rem', color: 'var(--color-accent)', fontWeight: 700 }}>{maxYear}</span>
                </div>
                <input 
                  type="range"
                  min="2014"
                  max="2026"
                  value={maxYear}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setMaxYear(val);
                    if (val < minYear) setMinYear(val);
                  }}
                  className="range-slider-control"
                />
              </div>
            </div>

          </div>

          {/* Category Tag Pills Row */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-tech)', fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', marginBottom: '8px', textAlign: 'center', fontWeight: 700 }}>
              SECTOR CLASSIFICATION TAGS
            </span>
            <div className="category-pills-row">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`category-pill ${category === cat ? 'active' : ''}`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          
          <div className="portfolio-grid-deck" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', paddingBottom: '10px' }}>
            {filteredProjects.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '48px 24px', background: 'rgba(6, 9, 20, 0.5)', border: '1.5px dashed rgba(var(--color-accent-rgb), 0.25)', borderRadius: '14px', textAlign: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🛰️</span>
                <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--color-accent)', marginBottom: '8px', letterSpacing: '1px' }}>NO PROJECTS MATCHED SECTOR QUERY</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.4 }}>
                  Try broadening your keyword search parameters or adjusting the completed year range sliders.
                </p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="project-card"
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    padding: '18px', 
                    borderRadius: '14px', 
                    background: 'rgba(6, 9, 20, 0.72)', 
                    border: '1.5px solid rgba(255,255,255,0.06)', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                    cursor: 'pointer',
                    height: '280px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.55rem', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                        {project.category.toUpperCase()}
                      </span>
                      {/* Finished Green Stamp removed */}
                    </div>
                    
                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.88rem', color: 'var(--text-primary)', textAlign: 'left', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                      {project.title}
                    </h4>
                    
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.45', textAlign: 'left', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} style={{ fontSize: '0.58rem', background: 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: '3px', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                      <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-tech)' }}>
                        {project.finished || "Active"}
                      </span>
                      <span style={{ fontSize: '0.58rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 700 }}>
                        [ ACTIVATE HOLOGRAM ⚡ ]
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

      {/* FULL-SCREEN IMMERSIVE HOLOGRAPHIC MODAL OVERLAY */}
      {activeProject && (
        <div 
          className="portfolio-modal-overlay"
          onClick={() => setActiveProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(4, 6, 12, 0.85)',
            backdropFilter: 'blur(20px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'modal-fade-in 0.25s ease-out forwards'
          }}
        >
          <div 
            className="portfolio-modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing on click inside content
            style={{
              width: '100%',
              maxWidth: '960px',
              maxHeight: '90vh',
              background: 'rgba(10, 14, 30, 0.94)',
              border: '2px solid var(--color-accent)',
              borderRadius: '16px',
              boxShadow: '0 0 40px rgba(var(--color-accent-rgb), 0.35)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'modal-scale-up 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1.5px solid rgba(var(--color-accent-rgb), 0.25)', background: 'rgba(6, 9, 20, 0.4)' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.62rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1px', marginRight: '10px' }}>
                  // HOLOGRAM_SECTOR: {activeProject.category.toUpperCase()}
                </span>
                {/* Finished Green Stamp badge removed */}
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="hud-btn"
                style={{
                  padding: '4px 12px',
                  fontSize: '0.65rem',
                  borderColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  color: '#fff'
                }}
              >
                [ ✕ CLOSE ARCHIVE ]
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="custom-scroll" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div className="modal-columns-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
                
                {/* Left Column: Embed Media & Visual Canvas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem', color: 'var(--color-accent)', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px', textAlign: 'left' }}>
                    VISUAL MEDIA COMPONENT
                  </h4>
                  
                  {/* YouTube Embed Player */}
                  {activeProject.video ? (
                    <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '10px', overflow: 'hidden', border: '1.5px solid var(--color-accent)', boxShadow: '0 0 15px rgba(var(--color-accent-rgb), 0.2)' }}>
                      <iframe 
                        src={activeProject.video}
                        title={activeProject.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : activeProject.images ? (
                    /* Double side-by-side or stacked image showcase (e.g. calculator screens or computer monitors) */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {activeProject.images.map((img, idx) => (
                        <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)', padding: '6px' }}>
                          <img 
                            src={img} 
                            alt={`${activeProject.title} screenshot ${idx + 1}`} 
                            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px', objectFit: 'contain', maxHeight: '180px', margin: '0 auto' }} 
                          />
                        </div>
                      ))}
                    </div>
                  ) : activeProject.image ? (
                    /* Single large screenshot */
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1.5px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)', padding: '8px' }}>
                      <img 
                        src={activeProject.image} 
                        alt={activeProject.title} 
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px', maxHeight: '320px', objectFit: 'contain' }} 
                      />
                    </div>
                  ) : (
                    /* Default Visual placeholder if zero media */
                    <div style={{ height: '220px', borderRadius: '10px', background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.05) 0%, rgba(4,6,12,0.8) 100%)', border: '1.5px dashed rgba(var(--color-accent-rgb), 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '2.5rem' }}>🗃️</span>
                      <span style={{ fontFamily: 'var(--font-tech)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)' }}>HOLOGRAPHIC COMPONENT LOCALIZED</span>
                    </div>
                  )}

                  {/* Metadata Timelines */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                      <span style={{ display: 'block', fontSize: '0.52rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)' }}>COMMENCED</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-tech)' }}>{activeProject.started || "--"}</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                      <span style={{ display: 'block', fontSize: '0.52rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)' }}>COMPLETED</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-tech)' }}>{activeProject.finished || "ACTIVE"}</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Holographic Details & Telemetry - Reverted to clean standard columns */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '0.5px', fontWeight: 700 }}>
                      {activeProject.title}
                    </h3>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 700, display: 'block', marginBottom: '14px' }}>
                      CATEGORY // {activeProject.category.toUpperCase()}
                    </span>

                    {/* Quick Tech Summary Panel */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                      <span style={{ display: 'block', fontSize: '0.55rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', letterSpacing: '1px', marginBottom: '4px', fontWeight: 700 }}>
                        SYSTEM DESCRIPTION
                      </span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        {activeProject.description}
                      </p>
                    </div>

                    {/* High-Tech Details Panel (Standard professional view, not direct dialogue bubble) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: 'var(--color-accent)', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                          DEVELOPMENT DETAILS & CHALLENGES
                        </h4>
                        <p style={{ fontSize: '0.76rem', color: 'var(--text-primary)', lineHeight: '1.45', margin: 0 }}>
                          {activeProject.details}
                        </p>
                      </div>

                      <div>
                        <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: 'var(--neon-emerald)', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                          CORE RETROSPECTIVE TAKEAWAYS
                        </h4>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.45', margin: 0 }}>
                          {activeProject.takeaways}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ display: 'block', fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-tech)', marginBottom: '6px' }}>
                        TECHNOLOGICAL STACK UTILIZED:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {activeProject.technologies.map((tech, idx) => (
                          <span key={idx} style={{ fontSize: '0.6rem', background: 'rgba(var(--color-accent-rgb), 0.08)', padding: '3px 8px', borderRadius: '4px', border: '1.5px solid rgba(var(--color-accent-rgb), 0.25)', color: 'var(--text-primary)', fontWeight: 500 }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Operational Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderTop: '1.5px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                      {activeProject.links && activeProject.links.map((link, idx) => (
                        <a 
                          key={idx}
                          href={link.src}
                          target={link.type === 'download' ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          download={link.type === 'download'}
                          className="hud-btn"
                          style={{
                            padding: '10px 20px',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            borderRadius: '8px',
                            borderColor: link.type === 'download' ? 'var(--neon-emerald)' : 'var(--neon-cyan)',
                            background: link.type === 'download' ? 'rgba(0, 255, 136, 0.08)' : 'rgba(0, 240, 255, 0.08)',
                            color: '#fff',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: link.type === 'download' ? '0 0 10px rgba(0, 255, 136, 0.15)' : '0 0 10px rgba(0, 240, 255, 0.15)'
                          }}
                        >
                          {link.type === 'download' ? '📥 ' : link.type === 'youtube' ? '🎬 ' : '📂 '}
                          {link.description.toUpperCase()}
                        </a>
                      ))}
                      {(!activeProject.links || activeProject.links.length === 0) && (
                        <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-tech)', fontStyle: 'italic' }}>
                          NO OUTBOUND EXTERNAL DATA PORT DETECTED.
                        </span>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}



      <style jsx global>{`
        /* Immersive Holographic Modal Overlay Animations */
        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modal-scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Hover animations for standard cards */
        .project-card:hover {
          border-color: rgba(var(--color-accent-rgb), 0.4) !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 15px rgba(var(--color-accent-rgb), 0.18) !important;
          transform: translateY(-3px);
        }

        /* Responsive Modal & Filters Rules */
        @media (max-width: 900px) {
          .filter-deck-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 15px !important;
          }
          .filter-sliders-container {
            flex-direction: column !important;
            gap: 12px !important;
            width: 100% !important;
          }
          .range-slider-group {
            width: 100% !important;
          }
          .dialogue-novel-row {
            flex-direction: column !important;
            gap: 15px !important;
          }
          .novel-avatar-container {
            width: 100% !important;
          }
        }

        @media (max-width: 900px) {
          .portfolio-modal-overlay {
            align-items: flex-start !important;
            padding: 108px 10px 20px 10px !important; /* Pushes content below the 98px sticky mobile header mask */
            overflow-y: auto !important;
          }
          .portfolio-modal-content {
            max-height: none !important;
            height: auto !important;
          }
        }

        @media (max-width: 800px) {
          .modal-columns-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
