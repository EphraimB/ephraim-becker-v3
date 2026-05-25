'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PROJECTS = [
  {
    id: 1,
    category: "Web Development",
    title: "Habit-Based Budgeting Application",
    description: "A web application where users can input financial habits and generate future transactions for any date range based on those recurring habits.",
    technologies: ["ExpressJS", "Postgres", "NextJS", "Node.js"],
    details: "I developed this budgeting application to solve my own need for projecting long-term bank balances. I faced complex logic hurdles matching varying cron-like intervals (weekly, bi-weekly, semi-monthly) to future dates, and experimented with multiple database indexing schemas in PostgreSQL for highly efficient date-range queries.",
    takeaways: "Deepened my understanding of PostgreSQL transaction boundaries, date arithmetic logic, and why modern React state propagation is crucial for heavy visual calendars.",
    started: "2023-02-20",
    finished: "2024-12-24",
    status: "Finished",
    image: "/projects/budgeting-screenshot.png",
    links: [
      { src: "https://github.com/EphraimB/budgeting", description: "GitHub Repository", type: "github" }
    ]
  },
  {
    id: 2,
    category: "3D Modeling & VFX",
    title: "Quantum Transporter Beaming Video",
    description: "A transport beaming visual effect modeled and rendered inside Blender, recreating an iconic sci-fi transition using green screen chroma keying.",
    technologies: ["Blender", "Green Screen Chroma", "VFX Composite Rendering"],
    details: "This was my very first successful 3D model! It took an entire month of meticulous work to model the transporter table, hand-wrap realistic metal and warning stripe textures, and map realistic light nodes. I filmed myself in front of a green screen in my bedroom and composited my silhouette into the transport chamber to create a beam transition from home to my therapy office.",
    takeaways: "Mastered UV unwrapping, mesh modeling, keyframe lighting changes, and video node compositing within Blender.",
    started: "2016-10-26",
    finished: "2016-11-26",
    status: "Finished",
    image: "/projects/beaming-video-screenshot.png",
    video: "https://www.youtube.com/embed/6ktNUS7dt0M",
    links: [
      { src: "https://www.youtube.com/watch?v=6ktNUS7dt0M", description: "Watch on YouTube", type: "youtube" }
    ]
  },
  {
    id: 3,
    category: "3D Modeling",
    title: "Blob Man Rigged Walking Cycle",
    description: "A complete character asset and animated 'blob man' with customized armature rigging and realistic walk-cycle keyframes in Blender.",
    technologies: ["Blender", "Armature Rigging", "Keyframe Animation"],
    details: "This project was a deep dive into character rigging. I followed advanced armature hierarchies and weight painting tutorials, troubleshooting multiple trial-and-error meshes where the joints deformed unnaturally, eventually creating a flawless, clean walking cycle.",
    takeaways: "Gained structural expertise in rigging bones, weight-painting constraints, and procedural movement loops.",
    started: null,
    finished: "2024-04-08",
    status: "Finished",
    image: "/projects/blob-man-video-screenshot.png",
    video: "https://www.youtube.com/embed/G8un8IlF7_c",
    links: [
      { src: "https://www.youtube.com/watch?v=G8un8IlF7_c", description: "Watch on YouTube", type: "youtube" }
    ]
  },
  {
    id: 4,
    category: "Calculator Applications",
    title: "Harry Potter Wizarding Currency Converter",
    description: "A wizarding coin converter (Galleons, Sickles, Knuts to USD) compiled for TI-84 Plus graphing calculators, featuring custom UI menus.",
    technologies: ["TI Basic", "TI-84 Graphing Kernel", "Low-Level GUI Coding"],
    details: "I coded this converter during my High School years directly on my TI-84 Plus graphing calculator. Rather than keeping a simple list of prompts, I spent months designing a fully custom, paginated menu system (v7.3) that renders customized text screens, validating currency boundaries and supporting precise mathematical conversion factors.",
    takeaways: "Learned the constraints of low-memory execution environments and how to implement clean UI layouts using low-level graphical display tokens.",
    started: null,
    finished: "2014-09-01",
    status: "Finished",
    images: ["/projects/wizardc7-screenshot.gif", "/projects/wizardc7-color-screenshot.gif"],
    links: [
      { src: "https://github.com/EphraimB", description: "Request Program File", type: "download" }
    ]
  },
  {
    id: 5,
    category: "VR Development",
    title: "Beautiful Mind Watch Interface",
    description: "A virtual reality spatial learning application featuring an interactive smartwatch navigation and scene teleportation mechanic.",
    technologies: ["Unity", "C#", "Oculus VR SDK", "Spatial UI"],
    details: "Collaborating on this immersive VR experience, I designed and coded a custom, wrist-worn smartwatch that acts as a portal. Recruiter/User testing revealed that users struggled to read the fine-detailed watch menu in VR space. I resolved this spatial issue by expanding the watch interface face on hover, bringing the graphics closer to the camera viewport.",
    takeaways: "Designed a creative, spatial smartwatch teleportation portal—completely an original design choice solving VR accessibility.",
    started: null,
    finished: "2023-01-01",
    status: "Finished",
    image: "/projects/beautiful-mind-vr-app.png",
    links: []
  },
  {
    id: 6,
    category: "Web Development",
    title: "PHP & MySQL Mega Portal",
    description: "My early personal portfolio featuring a diary, life milestone timeline, dynamic SVG navigation wheel, and currency calculators.",
    technologies: ["PHP", "HTML", "CSS", "MySQL", "JavaScript", "GoDaddy Web Host"],
    details: "This was my very first major web portal. I designed a customized relational MySQL database to feed diary entries dynamically, configured custom server cron-jobs to back up user records, and managed full FTP deployment on GoDaddy web servers.",
    takeaways: "Learned massive lessons in relational database normalization, server management, basic SQL query injection prevention, and backend routing concepts.",
    started: "2021-07-31",
    finished: "2023-01-03",
    status: "Finished",
    image: "/projects/mega-website-homepage.png",
    links: [
      { src: "https://github.com/EphraimB/ephraim-becker", description: "GitHub Repository", type: "github" }
    ]
  },
  {
    id: 7,
    category: "Hardware Integration",
    title: "High-Performance Workstation Assembly",
    description: "Assembled and optimized a custom desktop computer tailored for heavy 3D rendering workloads and intense graphics operations.",
    technologies: ["64GB RAM", "Nvidia RTX 2080 Ti", "Samsung 2TB NVMe", "Intel Core i9"],
    details: "I specified, purchased, and built this entire PC rig to handle my Blender 3D rendering projects. During initial boots, the system failed POST. I troubleshot the physical hardware systematically, tracing power rails from the PSU to identify a single loose pins connector on the ATX motherboard line.",
    takeaways: "Gained solid diagnostic insights into system bus architectures, thermal dissipation factors, and physical hardware assembly.",
    started: "2019-07-16",
    finished: "2019-07-19",
    status: "Finished",
    images: ["/projects/custom-computer.jpg", "/projects/custom-computer-monitors.jpg"],
    links: []
  }
];

const CATEGORIES = [
  "All",
  "Web Development",
  "3D Modeling",
  "Calculator Apps",
  "VR Development",
  "Hardware Integration"
];

export default function PortfolioArchives() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Year boundaries filters
  const [minYear, setMinYear] = useState(2014);
  const [maxYear, setMaxYear] = useState(2026);

  const getProjectYear = (project) => {
    if (!project.finished) return 2026;
    const year = parseInt(project.finished.substring(0, 4));
    return isNaN(year) ? 2026 : year;
  };

  // Safe category filter checker (handles fuzzy text matches like 3D Modeling/3D modeling & VFX)
  const isMatchingCategory = (projectCat, targetCat) => {
    if (targetCat === 'All') return true;
    return projectCat.toLowerCase().includes(targetCat.toLowerCase().split(' ')[0]);
  };

  const filteredProjects = PROJECTS.filter(project => {
    // 1. Category Tag Check
    if (!isMatchingCategory(project.category, selectedCategory)) {
      return false;
    }

    // 2. Completed Year Sliders Check
    const projectYear = getProjectYear(project);
    if (projectYear < minYear || projectYear > maxYear) {
      return false;
    }

    // 3. Search Query Text Check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTech = project.technologies.some(tech => tech.toLowerCase().includes(q));
      const matchCat = project.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTech && !matchCat) {
        return false;
      }
    }

    return true;
  });

  // Seamless transition back to Citizen Suite
  const navigateToSuite = () => {
    const workspace = document.querySelector('.os-workspace');
    if (workspace) workspace.classList.add('walking-transit-active');
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div 
      className="citizen-card-shell spatial-portfolio-grid"
      style={{
        pointerEvents: 'auto'
      }}
    >
      {/* ==========================================================
         1. LEFT SIDEBAR: Recruiter Dossier & Core Credentials
         ========================================================== */}
      <div 
        className="spatial-glass-panel"
        style={{
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Recruiter Title and Avatar */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <img 
              src="/assets/images/profile.png" 
              alt="Ephraim Becker" 
              style={{ width: '64px', height: '64px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', objectFit: 'cover' }}
            />
            <div>
              <span className="window-telemetry-text" style={{ color: 'var(--color-accent)' }}>ARCHIVE PROFILE</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, marginTop: '2px' }}>Ephraim Becker</h3>
            </div>
          </div>

          {/* Core Biography Readout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
            <p style={{ margin: 0 }}>
              <strong>Education:</strong> Adelphi University Computer Science Student. Remote cadet linked from Cedarhurst, NY.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Logic Sharpener:</strong> College-level Calculus equations, derivatives, and integral matrices.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Coordination:</strong> Flag football huddle planning, route execution; choir singing and classical pipe organ mechanics.
            </p>
          </div>
          
          {/* Recruiter Links Box */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a 
              href="https://github.com/EphraimB" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port"
              style={{ padding: '8px 14px', fontSize: '0.65rem', display: 'flex', justifyContent: 'center' }}
            >
              📂 GITHUB REPOSITORIES
            </a>
            <a 
              href="https://www.youtube.com/@ephraimbecker544" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link-port"
              style={{ padding: '8px 14px', fontSize: '0.65rem', display: 'flex', justifyContent: 'center', borderColor: 'var(--neon-amber)', background: 'rgba(255,179,0,0.05)' }}
            >
              🎬 YOUTUBE DEMO VIDEOS
            </a>
          </div>

          {/* Technical Capabilities Stack */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
            <span className="window-telemetry-text" style={{ fontSize: '0.52rem', display: 'block', marginBottom: '8px' }}>CORE TECHNICAL SKILLS</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {["NextJS", "React", "Postgres", "Node.js", "ExpressJS", "Blender 3D", "C# / Unity", "TI Basic", "PHP & MySQL"].map(skill => (
                <span 
                  key={skill} 
                  style={{
                    fontSize: '0.58rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.8)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontFamily: 'monospace'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
        </div>

        {/* Egress Gate Link */}
        <button
          onClick={navigateToSuite}
          className="hud-btn"
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.72rem',
            letterSpacing: '1px',
            fontWeight: 600,
            marginTop: '20px'
          }}
        >
          🏨 Return to Suite
        </button>
      </div>

      {/* ==========================================================
         2. RIGHT MAIN CONTENT: Archive Database Filter Grid
         ========================================================== */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0
        }}
      >
        {/* Upper Search and Sliders filter deck panel */}
        <div 
          className="spatial-glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '20px',
            background: 'rgba(6, 8, 14, 0.4)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '20px', marginBottom: '16px', alignItems: 'end' }}>
            
            {/* Search Input Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              <span className="window-telemetry-text" style={{ fontSize: '0.52rem' }}>ARCHIVE INDEX KEYWORD SEARCH</span>
              <input 
                type="text"
                placeholder="🔍 Search titles, tools, parameters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="net-input"
                style={{
                  background: 'rgba(4, 6, 12, 0.5)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '0.78rem',
                  width: '100%'
                }}
              />
            </div>

            {/* Sliders completed years */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', fontFamily: 'var(--font-tech)', color: 'rgba(255,255,255,0.45)' }}>
                  <span>MIN COMPLETED</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{minYear}</span>
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
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', fontFamily: 'var(--font-tech)', color: 'rgba(255,255,255,0.45)' }}>
                  <span>MAX COMPLETED</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{maxYear}</span>
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
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                />
              </div>

            </div>

          </div>

          {/* Category Tag Pills */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="window-telemetry-text" style={{ fontSize: '0.52rem', display: 'block' }}>FILTER BY CLASSIFICATION TAG</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? 'rgba(var(--color-accent-rgb), 0.12)' : 'rgba(255,255,255,0.01)',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? 'var(--color-accent)' : 'rgba(255,255,255,0.06)',
                    borderRadius: '20px',
                    padding: '4px 14px',
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-tech)',
                    color: selectedCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Project Cards Grid */}
        <div className="custom-scroll" style={{ flex: 1, minHeight: 0 }}>
          {filteredProjects.length === 0 ? (
            <div style={{ padding: '60px 20px', background: 'rgba(6,8,14,0.3)', border: '1.5px dashed rgba(255,255,255,0.05)', borderRadius: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🛰️</span>
              <span className="window-telemetry-text" style={{ color: 'var(--neon-amber)' }}>NO BLUEPRINTS MATCHED MATRIX QUERY</span>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', maxWidth: '420px', margin: '0 auto', marginTop: '6px', lineHeight: 1.45 }}>
                Try broadening your keyword search parameters or adjusting the completed year range sliders.
              </p>
            </div>
          ) : (
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', 
                gap: '20px', 
                paddingBottom: '20px' 
              }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="spatial-glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    height: '240px',
                    textAlign: 'left',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.55rem', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                        {project.category}
                      </span>
                      <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-tech)', color: 'rgba(255,255,255,0.3)' }}>
                        {project.finished ? project.finished.substring(0, 4) : '2026'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', margin: '0 0 8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                      {project.title}
                    </h4>
                    
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Skills tags list in card */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', marginTop: '10px' }}>
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} style={{ fontSize: '0.55rem', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.45)', padding: '1px 5px', borderRadius: '3px' }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span style={{ fontSize: '0.55rem', color: 'var(--color-accent)' }}>+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ==========================================================
         3. SPATIAL PROJECT DRAWER / OVERLAY PANEL
         ========================================================== */}
      <div className={`spatial-drawer ${selectedProject ? 'open' : ''}`}>
        {selectedProject && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, textAlign: 'left' }}>
            
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px', marginBottom: '20px' }}>
              <div>
                <span className="window-telemetry-text" style={{ color: 'var(--color-accent)' }}>ENGINEERING ARCHIVE DETIALS</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0, marginTop: '2px' }}>{selectedProject.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.88rem'
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '6px' }}>
              
              {/* Main Media Player / Video Embed or Image */}
              {selectedProject.video ? (
                <div style={{ width: '100%', position: 'relative', background: '#000', borderRadius: '14px', overflow: 'hidden', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={selectedProject.video} 
                    title={selectedProject.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
              ) : selectedProject.image ? (
                <div style={{ width: '100%', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                  {/* Since local mock files might not render in demo environment, fallback to structured visual blocks with metadata */}
                  <div style={{ padding: '30px 20px', background: 'radial-gradient(circle at center, rgba(var(--color-accent-rgb), 0.15) 0%, rgba(6, 8, 14, 0.8) 100%)', textAlign: 'center', minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>📂</span>
                    <span className="window-telemetry-text" style={{ fontSize: '0.62rem', color: '#fff' }}>SYSTEM BLUEPRINT DATASET</span>
                    <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px', fontFamily: 'monospace' }}>SEC_CODE // {selectedProject.title.toUpperCase().replace(/\s+/g, '_')}</span>
                  </div>
                </div>
              ) : null}

              {/* Blueprint description */}
              <div>
                <span className="window-telemetry-text" style={{ fontSize: '0.52rem', color: 'var(--color-accent)' }}>ENGINEERING BLUEPRINT OVERVIEW</span>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0, marginTop: '4px' }}>
                  {selectedProject.details}
                </p>
              </div>

              {/* Takeaways list */}
              <div>
                <span className="window-telemetry-text" style={{ fontSize: '0.52rem', color: 'var(--neon-emerald)' }}>KEY TAKEAWAYS & CAPABILITIES ACQUIRED</span>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0, marginTop: '4px' }}>
                  {selectedProject.takeaways}
                </p>
              </div>

              {/* Technologies Badges */}
              <div>
                <span className="window-telemetry-text" style={{ fontSize: '0.52rem', display: 'block', marginBottom: '6px' }}>COMPILED TECHNOLOGIES</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedProject.technologies.map(tech => (
                    <span 
                      key={tech} 
                      style={{
                        fontSize: '0.6rem',
                        background: 'rgba(var(--color-accent-rgb), 0.08)',
                        border: '1.5px solid rgba(var(--color-accent-rgb), 0.2)',
                        color: 'rgba(255,255,255,0.9)',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontFamily: 'monospace'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Structured Metadata Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', fontSize: '0.72rem' }}>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontSize: '0.55rem', letterSpacing: '0.5px' }}>SOL PROJECT BOUNDARIES</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedProject.started ? `${selectedProject.started} - ${selectedProject.finished}` : `Completed ${selectedProject.finished}`}</span>
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', display: 'block', fontSize: '0.55rem', letterSpacing: '0.5px' }}>REGISTRY CLASSIFICATION</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{selectedProject.category}</span>
                </div>
              </div>

              {/* Drawer Links */}
              {selectedProject.links && selectedProject.links.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  {selectedProject.links.map(link => (
                    <a
                      key={link.src}
                      href={link.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hud-btn"
                      style={{ flex: 1, padding: '12px', borderRadius: '10px', fontSize: '0.72rem', background: 'rgba(var(--color-accent-rgb), 0.1)', borderColor: 'var(--color-accent)' }}
                    >
                      {link.type === 'github' ? '📂 View Code Repository' : '🎬 Watch Demo Reel'}
                    </a>
                  ))}
                </div>
              )}

            </div>

          </div>
        )}
      </div>

      <style jsx global>{`
        .spatial-glass-panel {
          transition: all 0.3s ease;
        }
        @media (max-width: 950px) {
          .citizen-card-shell {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
