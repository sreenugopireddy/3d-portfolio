# Sreenivasa Reddy Gopireddy — 3D Portfolio

An interactive developer portfolio built with Next.js 16, featuring a custom Three.js 3D skill keyboard, GSAP scroll animations, and a space-themed aesthetic — built to showcase data analytics and AI engineering work.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sreenugopireddy/3d-portfolio)

**Live →** [sreenivasredy.vercel.app](https://sreenivasredy.vercel.app)

---

## ✨ Features

- **Custom 3D Keyboard** — Built with Three.js. Each keycap shows a real data/AI skill icon with hover lift, glow, press animation, and click sound
- **Smooth Scroll Animations** — GSAP + Lenis powered scroll transitions with section-aware keyboard rotation
- **Interactive Skills Section** — Categorized skill cards with brand-color hover-up animation per skill pill
- **Certifications Section** — 8 verified credentials with Google Drive links
- **Projects Showcase** — 6 real projects with detailed breakdowns and live/GitHub links
- **Space Theme** — Floating particles on a deep dark canvas
- **Light & Dark Mode** — Full theme support with disclaimer toasts
- **Contact Form** — Email delivery via Resend
- **Publications Page** — Research on ReadyTensor
- **Fully Responsive** — Works across all screen sizes

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI |
| **3D** | Three.js (custom keyboard — no Spline dependency) |
| **Animation** | GSAP, Framer Motion, Lenis |
| **Email** | Resend |
| **Misc** | Zod, next-themes, react-icons |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# 1. Clone
git clone https://github.com/sreenugopireddy/3d-portfolio.git
cd 3d-portfolio

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env.local
# Add your RESEND_API_KEY to .env.local

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | From [resend.com](https://resend.com) — powers the contact form |

---

## 📁 Project Structure

```
3d-portfolio/
├── public/
│   └── assets/
│       ├── projects-screenshots/   # One landing.png per project folder
│       └── nav-link-previews/      # Nav hover images
├── src/
│   ├── app/
│   │   └── publications/           # Publications page
│   ├── components/
│   │   ├── three-keyboard.tsx      # Custom Three.js 3D keyboard + MockApplication
│   │   ├── animated-background.tsx # Keyboard controller + GSAP scroll wiring
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── skills.tsx          # Categorized skill cards with hover animation
│   │   │   ├── experience.tsx
│   │   │   ├── certifications.tsx  # 8 certifications with Drive links
│   │   │   ├── projects.tsx
│   │   │   └── contact.tsx
│   │   └── header/
│   └── data/
│       ├── config.ts               # Name, email, socials, SEO, site URL
│       ├── constants.ts            # Skills (25 keycaps) + experience timeline
│       └── projects.tsx            # All 6 projects with full content
```

---

## ✏️ Customization

Everything personal lives in `src/data/`:

**`config.ts`** — name, email, site URL, social links, SEO keywords

```ts
const config = {
  title: "Sreenivasa Reddy | Data Analyst & AI Engineer",
  author: "Sreenivasa Reddy Gopireddy",
  email: "sreenugopireddy24@gmail.com",
  site: "https://sreenivasredy.vercel.app",
  githubUsername: "sreenugopireddy",
  social: {
    linkedin: "https://www.linkedin.com/in/sreenu-gopireddy/",
    github:   "https://github.com/sreenugopireddy",
  },
};
```

| File | What to update |
|---|---|
| `src/data/config.ts` | Name, email, site URL, social links, SEO |
| `src/data/constants.ts` | Skills (keyboard keycaps) + work experience |
| `src/data/projects.tsx` | Projects, screenshots, descriptions, tech stacks |
| `src/components/sections/certifications.tsx` | Certifications + Drive links |
| `public/assets/projects-screenshots/` | `landing.png` per project subfolder |

---

## 📄 Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, resume link, GitHub + LinkedIn buttons |
| **Skills** | 5-category skill cards — Data & Analytics, ML & AI, Cloud & MLOps, Tools |
| **Experience** | Microsoft Elevate (Power BI Intern) · Edunet Foundation (AI & Data Intern) |
| **Certifications** | AWS · Oracle Cloud AI · RAG Expert · SQL · Power BI · Zscaler · Tata · UC Davis |
| **Projects** | Pneumonia CNN · Healthcare RAG · Anomaly Detection · Smart Grid · AI Analyst · Power BI |
| **Contact** | Contact form via Resend |
| **Publications** | Healthcare Document RAG Assistant — ReadyTensor |

---

## 🌐 Deployment

Deployed on **Vercel** — zero config.

```bash
# Push to GitHub → connect repo in vercel.com → add env var → done
RESEND_API_KEY=your_key
```

Every push to `main` auto-deploys.

---

## 🏗 Architecture Note — Custom 3D Keyboard

The portfolio uses a **fully custom Three.js keyboard** (`src/components/three-keyboard.tsx`) instead of a Spline `.spline` file. It exposes a `MockApplication` class with the same API as Spline's `Application` object:

```ts
app.findObjectByName("keyboard")   // returns a GSAP-animatable proxy object
app.getAllObjects()                 // returns all 25 keycap proxies
app.setVariable("heading", label)  // updates skill overlay text
app.addEventListener("keyDown", cb) // fires on keycap click
```

This means the original GSAP scroll animations, section transitions, keycap bounce reveals, and sound effects all work identically — just powered by Three.js instead of a binary Spline file. The keyboard is lighter, faster to load, and fully customizable in code.

---

## 🙏 Credits

Built on top of the open source [3D Portfolio](https://github.com/Naresh-Khatri/3d-portfolio) template by [Naresh Khatri](https://github.com/Naresh-Khatri). Heavily customized for data analytics and AI engineering — new 3D keyboard engine, skills section, certifications section, all new projects and content.

---

## 👤 Author

**Sreenivasa Reddy Gopireddy** — Data Analyst & AI Engineer

[sreenugopireddy24@gmail.com](mailto:sreenugopireddy24@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sreenu-gopireddy/) · [GitHub](https://github.com/sreenugopireddy) · [Live Portfolio](https://sreenivasredy.vercel.app)
