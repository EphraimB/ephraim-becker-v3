# 🪐 Ares City OS — Architecture Rules

## 🎯 Core Principle
This project is an immersive **spatial operating system simulation of a futuristic Mars city (Ares City)**, not a traditional website. 

Each page represents a physical, highly advanced sector of a Martian dome city. The system must feel pristine, utopian, and modular.

---

## 🧱 Folder Structure Rules (STRICT)

The following top-level directory structure is mandatory and must be strictly adhered to:

- `/pages` ➔ Sector HTML pages (one per city sector, e.g., `metropolis-core.html`, `citizen-suite.html`)
- `/assets/images/backgrounds` ➔ AI-generated high-fidelity Mars sector environments (no legacy room plates)
- `/assets/images/ui` ➔ Glassmorphic UI textures, glows, background grids, overlays
- `/assets/images/icons` ➔ Sleek futuristic HUD icons
- `/assets/sketches` ➔ Raw hand-drawn sketches (kept separate from production assets)
- `/assets/ai-prompts` ➔ Unified prompt library for generating Ares City assets
- `/components` ➔ Reusable, modular UI components (e.g., custom terminal overlays)
- `/scripts` ➔ Modular JavaScript logic and OS state behavior
- `/styles` ➔ CSS sheets separated by purpose (e.g., `layout.css`, `glassmorphism.css`, `hud-effects.css`)
- `/data` ➔ JSON files containing city grid matrix layout and navigation nodes
- `/research` ➔ Design notes, color palettes, and technical research references
- `/docs` ➔ Core system documentation only

---

## 🚫 Forbidden Actions

- **Do NOT create new top-level folders** (stick strictly to the structure above).
- **Do NOT inject dirty or grungy visual assets**. Ares City is clean, optimistic, and utopian.
- **Do NOT mix presentation styles** arbitrarily—always use CSS variables defined in a global design token sheet.
- **Do NOT overcomplicate early development** with heavy JS frameworks (Vite/Next.js/React) unless explicitly requested. Keep the vanilla HTML/CSS/JS architecture lightning-fast.
- **Do NOT place assets outside the `/assets` directory**.

---

## 🧠 Design Philosophy

- **Spatial UI Canvas**: The application behaves like an interactive game dashboard or a tactical command HUD.
- **Atmospheric Depth**: Beautiful, high-resolution full-screen background cityscapes (e.g., glass biosphere domes, floating cyber-botanical sectors) sit behind a sharp floating UI layer.
- **Holographic Glassmorphism**: Use translucent glass effects, fine cyan/amber neon borders, clean shadows, and soft ambient glow backdrops. 
- **User-Centric Hub**: The **Citizen Suite** acts as a personalized terminal for showcasing your professional bio, skills, and portfolio projects.

---

## 🏙 Sector System Rules

Each sector page must adhere to these rules:
- **Prism Background**: A single high-definition, full-screen background image portraying the clean utopian sector.
- **Distinct System Role**: A clear operational interface (e.g., transit control, atmosphere metrics, quantum comms, or portfolio cards).
- **Translucent HUD Panels**: Floating data windows that never crowd or dominate the scenic background environment.

---

## 🗺 Navigation Grid

- **Primary Navigation**: A sleek, node-based **City Grid Matrix** overlay mimicking a transportation/networking diagram of Ares City.
- **Spatial Transitions**: Navigating between sectors must trigger slick, high-speed networking transition animations rather than sudden jarring page reloads.

---

## ⚙️ Coding Guidelines

- Use vanilla HTML, CSS variables, and modern ES6 JavaScript.
- Maintain documentation integrity: do not strip comments or architectural descriptions.
- Optimize and compress background images to ensure smooth rendering and rapid loading.
