# 🪐 Mars Habitat OS — Architecture Rules

## 🎯 Core Principle
This project is a **spatial operating system simulation of a Mars habitat**, not a traditional website.

Each page represents a physical room inside a Mars base. The system must feel immersive, consistent, and modular.

---

## 🧱 Folder Structure Rules (STRICT)

The following structure is mandatory and must not be changed:

- `/pages` → All room HTML pages (one per habitat room)
- `/assets/images/backgrounds` → AI-generated Mars room environments only
- `/assets/images/ui` → UI textures, overlays, visual effects
- `/assets/images/icons` → System icons
- `/assets/sketches` → Raw hand-drawn sketches (never used in production UI)
- `/assets/ai-prompts` → Prompt library for generating assets
- `/components` → Reusable UI modules only
- `/scripts` → All JavaScript logic and system behavior
- `/styles` → All CSS (layout, UI, effects separated by file)
- `/data` → JSON-based system state and navigation structure
- `/research` → Non-production research notes and references
- `/docs` → System documentation only

---

## 🚫 Forbidden Actions

- Do NOT create new top-level folders
- Do NOT mix UI logic into scripts and styles arbitrarily
- Do NOT place assets outside `/assets`
- Do NOT treat this like a React/Next.js project
- Do NOT generate backend/server architecture unless explicitly requested
- Do NOT move sketches into production folders

---

## 🧠 Design Philosophy

- The system is a **spatial UI (like a game world)**
- Each room is an immersive environment with a full-screen background
- UI is layered on top of environments, never embedded into them
- Navigation is spatial (habitat map), not traditional website routing

---

## 🪐 Room System Rules

Each room must include:
- One full-screen background image (Mars habitat environment)
- One primary function (e.g. oxygen control, communication logs)
- UI overlay panels (minimal, structured, readable)

---

## 🗺 Navigation System

- Primary navigation is a **habitat map system**
- Secondary navigation may include sidebar or quick-switch UI
- Movement between rooms should feel spatial, not like page reloads

---

## ⚙️ Implementation Philosophy

- Vanilla HTML, CSS, and JavaScript preferred for v1
- Keep systems modular and replaceable
- Optimize for visual immersion and clarity over complexity