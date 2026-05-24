'use client';

import { useState, useEffect } from 'react';
import CityGridMap from '../../components/CityGridMap';

const PROJECTS = [
  {
    id: 1,
    category: "Web development",
    title: "Budgeting app",
    description: "A web app where you can input all your habits and generate future transactions for any date range based on those habits.",
    technologies: ["ExpressJS", "Postgres", "NextJS"],
    details: "I decided to make a budgeting app so I can know how much money I would have at any date. I faced challenges experimenting with different ways to do the cron jobs but I learned a lot.",
    takeaways: "I learned a lot about which technologies would work best and had lessons learned about reverting if that technology doesn't work that well.",
    started: "2023-02-20",
    finished: "2024-12-24",
    status: "Finished",
    image: "/projects/budgeting-screenshot.png",
    links: [
      {
        src: "https://github.com/EphraimB/budgeting",
        description: "GitHub Repository",
        type: "github"
      }
    ]
  },
  {
    id: 2,
    category: "3D modeling",
    title: "Beaming video",
    description: "A transporter beaming video modeled and rendered in Blender, recreating an iconic sci-fi transition effect using green screen chroma keying.",
    technologies: ["Blender", "Green Screen", "VFX Rendering"],
    details: "It was a challenge making the table for the transporter and took a month to make it, but it was my first successful 3D model. I 3D modeled the table and mapped an image texture on top of it.",
    takeaways: "I was very happy about my success making a transporter table that looks very realistic and successfully recreating a Star Trek beam transition from my bedroom to my therapy office.",
    started: "2016-10-26",
    finished: "2016-11-26",
    status: "Finished",
    image: "/projects/beaming-video-screenshot.png",
    video: "https://www.youtube.com/embed/6ktNUS7dt0M",
    links: [
      {
        src: "https://www.youtube.com/watch?v=6ktNUS7dt0M",
        description: "Watch on YouTube",
        type: "youtube"
      }
    ]
  },
  {
    id: 3,
    category: "3D modeling",
    title: "Blob man video",
    description: "A character animation of an animated 'blob man' with walking animations built inside Blender.",
    technologies: ["Blender", "3D Modeling", "Character Animation"],
    details: "It took a lot of trial and error following Udemy rigging and walking-cycle tutorials perfectly, but the final animation result was highly satisfying.",
    takeaways: "Very pleased with the custom Blob man character rigging and keyframed walking cycles.",
    started: null,
    finished: "2024-04-08",
    status: "Finished",
    image: "/projects/blob-man-video-screenshot.png",
    video: "https://www.youtube.com/embed/G8un8IlF7_c",
    links: [
      {
        src: "https://www.youtube.com/watch?v=G8un8IlF7_c",
        description: "Watch on YouTube",
        type: "youtube"
      }
    ]
  },
  {
    id: 4,
    category: "Calculator apps",
    title: "Harry Potter currency converter",
    description: "A wizarding currency converter for TI-84 Plus calculators that converts between US Dollars and wizarding coins (Galleons, Sickles, Knuts).",
    technologies: ["TI Basic", "TI-84 Graphing Kernel"],
    details: "I made this cool Harry Potter app on my calculator in High School. I improved the user interface through different versions from a basic menu to a fully custom one (v7.3).",
    takeaways: "Incredibly rewarding to compile and code custom menu systems within low-level graphing calculator environments.",
    started: null,
    finished: "2014-09-01",
    status: "Finished",
    images: ["/projects/wizardc7-screenshot.gif", "/projects/wizardc7-color-screenshot.gif"],
    links: [
      {
        src: "/projects/downloads/wizardc.zip",
        description: "Download Version 7.3 Program",
        type: "download"
      }
    ]
  },
  {
    id: 5,
    category: "VR development",
    title: "Beautiful Mind app",
    description: "A virtual reality spatial learning application featuring an interactive teleportation watch navigation interface.",
    technologies: ["Unity", "C#", "Oculus VR SDK"],
    details: "Collaborated on the VR experience, contributing a custom smartwatch enabling users to teleport scenes. Solved user screen clarity by expanding the watch face UI on hover.",
    takeaways: "Designed a creative spatial smartwatch system acting as an immersive portal—completely an original design choice.",
    started: null,
    finished: "2023-01-01",
    status: "Finished",
    image: "/projects/beautiful-mind-vr-app.png",
    links: []
  },
  {
    id: 6,
    category: "Web development",
    title: "My mega website",
    description: "First complete personal portal which featured a diary, life timeline, a fancy dynamic navigation wheel, and an early budgeting calculator.",
    technologies: ["PHP", "HTML", "CSS", "MySQL", "JavaScript", "GoDaddy"],
    details: "I kept improving my mega website and even connected it to a MySQL database, configured custom server cron jobs, and deployed it on GoDaddy hosting.",
    takeaways: "Learned a massive amount about database schemas, backend routing, server administration, and why modern web frameworks are vital.",
    started: "2021-07-31",
    finished: "2023-01-03",
    status: "Finished",
    image: "/projects/mega-website-homepage.png",
    links: [
      {
        src: "https://github.com/EphraimB/ephraim-becker",
        description: "GitHub Repository",
        type: "github"
      }
    ]
  },
  {
    id: 7,
    category: "Computer building",
    title: "My custom built gaming PC",
    description: "Assembled a high-performance custom desktop computer with specifications built for heavy graphics workload and 3D Blender modeling.",
    technologies: ["64GB RAM", "Nvidia RTX 2080 Ti", "Samsung 2TB SSD", "Aorus Z370"],
    details: "First time building a desktop hardware configuration. Troubleshot initial boot failures by tracing power supply rails to identify a loose pin connection.",
    takeaways: "Taught me the complete architecture of hardware interactions, thermal dissipation, and matching bus speeds—like assembling high-tech lego blocks.",
    started: "2019-07-16",
    finished: "2019-07-19",
    status: "Finished",
    images: ["/projects/custom-computer.jpg", "/projects/custom-computer-monitors.jpg"],
    links: []
  }
];

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

  const filteredProjects = category === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === category);

  return (
    <div className="citizen-card-shell" style={{ flexDirection: 'column' }}>
      {/* Walking Transit Sweeper Overlays */}
      <div className="walking-motion-overlay" style={{ position: 'fixed' }}></div>

      {/* Floating navigation map bubble */}
      <div className="floating-nav-bubble">
        <CityGridMap />
      </div>

      {/* Bubbly floating content area */}
      <div className={`walking-content-container ${transitState}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        
        {/* Upper Information Panel */}
        <div className="bubbly-panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.85rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
            Holographic Project Archives
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Browse the engineering software systems, predictive engines, and physical configurations developed by Ephraim Becker. Select a category below and click a project card to project its holographic modal context!
          </p>
        </div>

        {/* Dynamic Category Filtering Controller */}
        <div className="bubbly-panel" style={{ padding: '16px 24px', marginBottom: '20px', background: 'rgba(6,9,20,0.8)' }}>
          <div className="net-form-group" style={{ maxWidth: '380px', margin: '0 auto' }}>
            <label className="net-label" style={{ textAlign: 'center', display: 'block', fontSize: '0.62rem', marginBottom: '8px', letterSpacing: '1.5px' }}>
              SECTOR CLASSIFICATION FILTER
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="net-input"
              style={{ 
                width: '100%', 
                background: '#04060c', 
                border: '1.5px solid var(--color-accent)', 
                color: 'var(--text-primary)', 
                textAlign: 'center', 
                fontWeight: 700, 
                fontFamily: 'var(--font-tech)', 
                fontSize: '0.72rem',
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '10px 14px',
                outline: 'none',
                boxShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.15)'
              }}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} style={{ background: '#080b13', color: '#fff', fontSize: '0.75rem' }}>
                  [ {cat.toUpperCase()} ]
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          
          <div className="portfolio-grid-deck" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', paddingBottom: '10px' }}>
            {filteredProjects.map((project) => (
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
                    <span style={{ fontSize: '0.55rem', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)' }}>
                      {project.status.toUpperCase()}
                    </span>
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
            ))}
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
            zIndex: 1000,
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
                <span style={{ fontSize: '0.62rem', border: '1px solid var(--neon-emerald)', color: 'var(--neon-emerald)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'var(--font-tech)', fontWeight: 700 }}>
                  {activeProject.status.toUpperCase()}
                </span>
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
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-tech)' }}>{activeProject.started || "ANCIENT MY"}</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'left' }}>
                      <span style={{ display: 'block', fontSize: '0.52rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)' }}>COMPLETED</span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-tech)' }}>{activeProject.finished || "ACTIVE"}</span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Holographic Details & Telemetry */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '0.5px' }}>
                      {activeProject.title}
                    </h3>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontFamily: 'var(--font-tech)', fontWeight: 700, display: 'block', marginBottom: '14px' }}>
                      CATEGORY // {activeProject.category.toUpperCase()}
                    </span>

                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: 'var(--color-accent)', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                      SYSTEM SUMMARY
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                      {activeProject.description}
                    </p>

                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: 'var(--color-accent)', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                      DEVELOPMENT DETAILS
                    </h4>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-primary)', lineHeight: '1.45', marginBottom: '14px' }}>
                      {activeProject.details}
                    </p>

                    <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.72rem', color: 'var(--neon-emerald)', marginBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
                      CORE TAKEAWAYS
                    </h4>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '16px' }}>
                      {activeProject.takeaways}
                    </p>
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

        /* Responsive Modal Rules */
        @media (max-width: 800px) {
          .modal-columns-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          .portfolio-modal-content {
            max-height: 95vh !important;
          }
        }
      `}</style>
    </div>
  );
}
