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
  "Computer building",
  "Concepts"
];

export default function PortfolioDome() {
  const [transitState, setTransitState] = useState('slide-active');
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minYear, setMinYear] = useState(2014);
  const [maxYear, setMaxYear] = useState(2026);
  const [activeProject, setActiveProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' by default (recents first)
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  const getLightboxImages = () => {
    if (!activeProject) return [];
    if (activeProject.images) return activeProject.images;
    if (activeProject.image) return [activeProject.image];
    return [];
  };

  const lightboxImages = getLightboxImages();

  const downloadLinks = activeProject && activeProject.links ? activeProject.links.filter(l => l.type === 'download') : [];
  const otherLinks = activeProject && activeProject.links ? activeProject.links.filter(l => l.type !== 'download') : [];

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

  useEffect(() => {
    setDownloadDropdownOpen(false);
  }, [activeProject]);


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

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const timeA = a.finished ? Date.parse(a.finished) : Date.now();
    const timeB = b.finished ? Date.parse(b.finished) : Date.now();
    
    // Handle invalid/custom date strings like "Concept Design" by falling back to May 2026
    const valA = isNaN(timeA) ? (a.finished === "Concept Design" ? Date.parse("2026-05-25") : Date.now()) : timeA;
    const valB = isNaN(timeB) ? (b.finished === "Concept Design" ? Date.parse("2026-05-25") : Date.now()) : timeB;

    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  return (
    <div className="citizen-card-shell portfolio-shell">
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay portfolio-walking-overlay"></div>

      {/* Bubbly floating content area */}
      <div className={`walking-content-container ${transitState} portfolio-content-container`}>
        
        {/* Upper Information Panel */}
        <div className="bubbly-panel portfolio-info-panel">
          <h3 className="portfolio-info-heading">
            Holographic Project Archives
          </h3>
          <p className="portfolio-info-text">
            Browse the engineering software systems, predictive engines, and physical configurations developed by Ephraim Becker. Filter projects instantly by category tag, keywords, or completed year, and click any card to open a conversational hologram details bubble!
          </p>
        </div>

        {/* Advanced Holographic Filter Deck */}
        <div className="bubbly-panel portfolio-filter-panel">
          
          <div className="filter-deck-layout">
            
            {/* Search Input Box */}
            <div className="filter-search-col">
              <label className="filter-col-label">
                SECTOR ARCHIVE KEYWORD SEARCH
              </label>
              <div className="filter-input-wrap">
                <input 
                  type="text"
                  placeholder="🔍 Search titles, descriptions, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="net-input filter-search-input"
                  suppressHydrationWarning
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="filter-clear-btn"
                  >
                    [✕]
                  </button>
                )}
              </div>
            </div>

            {/* Sort Order Selector */}
            <div className="filter-sort-col">
              <label className="filter-col-label">
                ARCHIVE CHRONO SORT ORDER
              </label>
              <div className="filter-sort-row">
                <button
                  onClick={() => setSortOrder('desc')}
                  className={`category-pill filter-sort-btn ${sortOrder === 'desc' ? 'active' : ''}`}
                >
                  ⏳ RECENTS
                </button>
                <button
                  onClick={() => setSortOrder('asc')}
                  className={`category-pill filter-sort-btn ${sortOrder === 'asc' ? 'active' : ''}`}
                >
                  ⌛ OLDEST
                </button>
              </div>
            </div>

            {/* Date Range Control (Sliders side-by-side) */}
            <div className="filter-sliders-container">
              <div className="range-slider-group">
                <div className="filter-year-header">
                  <span className="range-slider-label">MIN COMPLETED YEAR</span>
                  <span className="filter-year-value">{minYear}</span>
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

              <div className="range-slider-group">
                <div className="filter-year-header">
                  <span className="range-slider-label">MAX COMPLETED YEAR</span>
                  <span className="filter-year-value">{maxYear}</span>
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
          <div className="filter-category-section">
            <span className="filter-category-label">
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
        <div className="custom-scroll portfolio-scroll-area">
          
          <div className="portfolio-grid-deck">
            {sortedProjects.length === 0 ? (
              <div className="portfolio-empty-state">
                <span className="portfolio-empty-icon">🛰️</span>
                <h4 className="portfolio-empty-title">NO PROJECTS MATCHED SECTOR QUERY</h4>
                <p className="portfolio-empty-desc">
                  Try broadening your keyword search parameters or adjusting the completed year range sliders.
                </p>
              </div>
            ) : (
              sortedProjects.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="project-card"
                >
                  <div>
                    <div className="project-card-header">
                      <span className="project-card-category">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <h4 className="project-card-title">
                      {project.title}
                    </h4>
                    
                    <p className="project-card-desc">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="project-card-techs">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="project-tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-card-meta">
                      <span className="project-card-date">
                        {project.finished || "Active"}
                      </span>
                      <span className="project-card-cta">
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
          onClick={() => { setActiveProject(null); setLightboxIndex(null); setDownloadDropdownOpen(false); }}
        >
          <div 
            className="portfolio-modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing on click inside content
          >
            {/* Modal Header */}
            <div className="portfolio-modal-header">
              <div>
                <span className="portfolio-modal-title">
                  // HOLOGRAM_SECTOR: {activeProject.category.toUpperCase()}
                </span>
              </div>
              <button 
                onClick={() => { setActiveProject(null); setLightboxIndex(null); setDownloadDropdownOpen(false); }}
                className="hud-btn portfolio-modal-close"
              >
                [ ✕ CLOSE ARCHIVE ]
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="custom-scroll portfolio-modal-scroll">
              <div className="modal-columns-grid">
                
                {/* Left Column: Embed Media & Visual Canvas */}
                <div className="modal-left-col">
                  <h4 className="modal-left-heading">
                    VISUAL MEDIA COMPONENT
                  </h4>
                  
                  {/* YouTube Embed Player */}
                  {activeProject.video ? (
                    <div className="modal-video-wrapper">
                      <iframe 
                        src={activeProject.video}
                        title={activeProject.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="modal-video-frame"
                      />
                    </div>
                  ) : (
                    /* Holographic Media Gallery Grid */
                    <div className="modal-gallery-wrapper">
                      <div className="modal-gallery-grid" style={{ gridTemplateColumns: activeProject.images ? 'repeat(2, 1fr)' : '1fr' }}>
                        {activeProject.images ? (
                          activeProject.images.map((img, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setLightboxIndex(idx)}
                              className="gallery-thumbnail"
                            >
                              <img 
                                src={img} 
                                alt={`${activeProject.title} screenshot ${idx + 1}`} 
                                className="gallery-thumb-img"
                              />
                              <div className="gallery-thumb-label">
                                [ EXPAND SCREENSHOT {idx + 1} 🔍 ]
                              </div>
                            </div>
                          ))
                        ) : activeProject.image ? (
                          <div 
                            onClick={() => setLightboxIndex(0)}
                            className="gallery-thumbnail gallery-thumbnail--single"
                          >
                            <img 
                              src={activeProject.image} 
                              alt={activeProject.title} 
                              className="gallery-single-img"
                            />
                            <div className="gallery-thumb-label">
                              [ EXPAND SCREENSHOT 🔍 ]
                            </div>
                          </div>
                        ) : (
                          /* Default Visual placeholder if zero media */
                          <div className="modal-media-placeholder">
                            <span className="modal-placeholder-icon">🗃️</span>
                            <span className="modal-placeholder-label">HOLOGRAPHIC COMPONENT LOCALIZED</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Metadata Timelines */}
                  <div className="modal-meta-grid">
                    <div className="modal-meta-item">
                      <span className="modal-meta-label">COMMENCED</span>
                      <span className="modal-meta-value">{activeProject.started || "--"}</span>
                    </div>
                    <div className="modal-meta-item">
                      <span className="modal-meta-label">COMPLETED</span>
                      <span className="modal-meta-value">{activeProject.finished || "ACTIVE"}</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Holographic Details & Telemetry */}
                <div className="modal-right-col">
                  <div>
                    <h3 className="modal-project-title">
                      {activeProject.title}
                    </h3>
                    <span className="modal-project-category">
                      CATEGORY // {activeProject.category.toUpperCase()}
                    </span>

                    {/* Quick Tech Summary Panel */}
                    <div className="modal-desc-panel">
                      <span className="modal-desc-label">
                        SYSTEM DESCRIPTION
                      </span>
                      <p className="modal-desc-text">
                        {activeProject.description}
                      </p>
                    </div>

                    {/* High-Tech Details Panel */}
                    <div className="modal-details-stack">
                      <div>
                        <h4 className="modal-section-heading">
                          DEVELOPMENT DETAILS &amp; CHALLENGES
                        </h4>
                        <p className="modal-section-text">
                          {activeProject.details}
                        </p>
                      </div>

                      <div>
                        <h4 className="modal-section-heading modal-section-heading--emerald">
                          CORE RETROSPECTIVE TAKEAWAYS
                        </h4>
                        <p className="modal-section-text modal-section-text--secondary">
                          {activeProject.takeaways}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    {activeProject.technologies && activeProject.technologies.length > 0 && (
                      <div className="modal-tech-row">
                        <span className="modal-tech-label">
                          TECHNOLOGICAL STACK UTILIZED:
                        </span>
                        <div className="modal-tech-chips">
                          {activeProject.technologies.map((tech, idx) => (
                            <span key={idx} className="modal-tech-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Operational Action Buttons */}
                    <div className="modal-actions-row">
                      {/* Non-download direct links (GitHub, YouTube) */}
                      {otherLinks.map((link, idx) => (
                        <a 
                          key={idx}
                          href={link.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hud-btn modal-link-btn modal-link-btn--cyan"
                        >
                          {link.type === 'youtube' ? '🎬 ' : '📂 '}
                          {link.description.toUpperCase()}
                        </a>
                      ))}

                      {/* Download link handling */}
                      {downloadLinks.length === 1 && (
                        <a 
                          href={downloadLinks[0].src}
                          download
                          className="hud-btn modal-link-btn modal-link-btn--green"
                        >
                          📥 {downloadLinks[0].description.toUpperCase()}
                        </a>
                      )}

                      {downloadLinks.length > 1 && (
                        <div className="modal-download-wrapper">
                          <button
                            onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                            className="hud-btn modal-link-btn modal-link-btn--green"
                          >
                            📥 DOWNLOAD CONCEPT DECK {downloadDropdownOpen ? '▲' : '▼'}
                          </button>
                          
                          {downloadDropdownOpen && (
                            <div className="modal-download-dropdown">
                              {downloadLinks.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.src}
                                  download
                                  onClick={() => setDownloadDropdownOpen(false)}
                                  className="modal-download-item dropdown-item-hover"
                                  style={{ borderBottom: idx < downloadLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                                >
                                  📄 {link.description}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {(!activeProject.links || activeProject.links.length === 0) && (
                        <span className="modal-no-links">
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



      {/* IMMERSIVE HOLOGRAPHIC LIGHTBOX DECK */}
      {lightboxIndex !== null && lightboxImages.length > 0 && (
        <div 
          className="lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Controls HUD */}
          <div className="lightbox-hud">
            <span className="lightbox-label">
              // UPLINK_SCREEN_VIEW: IMAGE {lightboxIndex + 1} / {lightboxImages.length}
            </span>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="hud-btn lightbox-close-btn"
            >
              [ ✕ CLOSE SCREEN ]
            </button>
          </div>

          {/* Lightbox Stage (Image & Slide Arrows) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="lightbox-stage"
          >
            {/* Left Slide Arrow */}
            {lightboxImages.length > 1 && (
              <button
                onClick={() => setLightboxIndex(prev => (prev === 0 ? lightboxImages.length - 1 : prev - 1))}
                className="lightbox-arrow-btn lightbox-arrow-left"
              >
                ◀
              </button>
            )}

            {/* Central Expanded Image Box */}
            <div className="lightbox-image-box">
              <img 
                src={lightboxImages[lightboxIndex]} 
                alt={`${activeProject.title} expanded view`} 
                className="lightbox-image"
              />
            </div>

            {/* Right Slide Arrow */}
            {lightboxImages.length > 1 && (
              <button
                onClick={() => setLightboxIndex(prev => (prev === lightboxImages.length - 1 ? 0 : prev + 1))}
                className="lightbox-arrow-btn lightbox-arrow-right"
              >
                ▶
              </button>
            )}
          </div>

          {/* Floating Slide Index Indicator */}
          {lightboxImages.length > 1 && (
            <div className="lightbox-dots">
              {lightboxImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(idx);
                  }}
                  className={`lightbox-dot ${lightboxIndex === idx ? 'lightbox-dot--active' : ''}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
