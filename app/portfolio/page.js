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
    links: [
      {
        src: "https://github.com/EphraimB/budgeting",
        description: "GitHub Prototype"
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
    links: [
      {
        src: "https://www.youtube.com/watch?v=6ktNUS7dt0M",
        description: "Watch on YouTube"
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
    links: [
      {
        src: "https://www.youtube.com/watch?v=G8un8IlF7_c",
        description: "Watch on YouTube"
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
    links: []
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
    links: [
      {
        src: "https://github.com/EphraimB/ephraim-becker",
        description: "GitHub Repository"
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
  const [flippedCards, setFlippedCards] = useState({});

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

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
            Browse the engineering software systems, predictive engines, and physical configurations developed by Ephraim Becker. Select a sector classification below to filter the database.
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
              onChange={(e) => {
                setCategory(e.target.value);
                setFlippedCards({}); // Reset card flips on category change
              }}
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

        {/* Scrollable 3D Flipping Project Cards Grid */}
        <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          
          <div className="portfolio-grid-deck" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', paddingBottom: '10px' }}>
            {filteredProjects.map((project) => {
              const isFlipped = !!flippedCards[project.id];
              return (
                <div 
                  key={project.id}
                  onClick={() => toggleFlip(project.id)}
                  className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                  style={{ height: '300px' }}
                >
                  <div className="flip-card-inner">
                    
                    {/* CARD FRONT PANEL */}
                    <div className="flip-card-front" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '18px', borderRadius: '14px', background: 'rgba(6, 9, 20, 0.72)', border: '1.5px solid rgba(255,255,255,0.06)', boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}>
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
                            [ FLIP FOR DETAILS 🔄 ]
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CARD BACK PANEL */}
                    <div className="flip-card-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '18px', borderRadius: '14px', background: 'rgba(12, 16, 32, 0.95)', border: '1.5px solid var(--color-accent)', boxShadow: '0 0 20px rgba(var(--color-accent-rgb), 0.25)', transform: 'rotateY(180deg)' }}>
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem', color: 'var(--color-accent)', textAlign: 'left', marginBottom: '6px', borderBottom: '1px solid rgba(var(--color-accent-rgb), 0.2)', paddingBottom: '4px' }}>
                          IMPLEMENTATION DETAILS
                        </h5>
                        <p style={{ fontSize: '0.74rem', color: 'var(--text-primary)', lineHeight: '1.4', textAlign: 'left', marginBottom: '10px' }}>
                          {project.details}
                        </p>
                        <h5 style={{ fontFamily: 'var(--font-tech)', fontSize: '0.75rem', color: 'var(--neon-emerald)', textAlign: 'left', marginBottom: '4px' }}>
                          KEY TAKEAWAYS
                        </h5>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4', textAlign: 'left' }}>
                          {project.takeaways}
                        </p>
                      </div>

                      <div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} style={{ fontSize: '0.52rem', background: 'rgba(var(--color-accent-rgb), 0.08)', padding: '1px 4px', borderRadius: '3px', border: '1px solid rgba(var(--color-accent-rgb), 0.2)', color: 'var(--text-primary)' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(var(--color-accent-rgb), 0.2)', paddingTop: '6px' }}>
                          {project.links && project.links.length > 0 ? (
                            <a 
                              href={project.links[0].src} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              onClick={(e) => e.stopPropagation()} // Prevent card flip on link click
                              style={{ 
                                fontSize: '0.6rem', 
                                color: 'var(--neon-cyan)', 
                                fontFamily: 'var(--font-tech)', 
                                textDecoration: 'none', 
                                borderBottom: '1px dashed var(--neon-cyan)',
                                fontWeight: 700
                              }}
                            >
                              {project.links[0].description.toUpperCase()} ↗
                            </a>
                          ) : (
                            <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-tech)' }}>
                              OFFLINE ARCHIVE
                            </span>
                          )}
                          <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-tech)' }}>
                            [ RETURN 🔄 ]
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style jsx global>{`
        /* 3D Flip Card Component Styles */
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
        }

        /* Hover slide details card effect */
        .flip-card-front:hover {
          border-color: rgba(var(--color-accent-rgb), 0.25) !important;
          box-shadow: 0 15px 35px rgba(0,0,0,0.45) !important;
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
