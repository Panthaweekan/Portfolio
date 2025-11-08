# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Panthaweekan Somngam, a Full-Stack Developer. The site is built with Vite, using modular JavaScript/CSS and Tailwind CSS for styling. It's hosted on GitHub Pages with automated CI/CD deployment and serves as both a professional portfolio and resume showcase.

## Architecture & Structure

### Project Structure
```
├── src/
│   ├── js/              # Modular JavaScript files
│   │   ├── main.js      # Entry point for index.html
│   │   ├── resume.js    # Entry point for resume.html
│   │   ├── typing.js    # Typing animation
│   │   ├── theme.js     # Dark/light mode toggle
│   │   ├── background.js # Interactive background & particles
│   │   ├── parallax.js  # Parallax scroll effects
│   │   ├── navbar.js    # Sticky navbar functionality
│   │   └── smoothScroll.js # Smooth anchor scrolling
│   └── css/
│       ├── main.css     # Tailwind + custom styles for index
│       └── resume.css   # Resume-specific styles
├── public/
│   └── imgs/           # Static images
├── index.html          # Main landing page
├── resume.html         # Printable CV page
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS with Tailwind plugin
└── .github/workflows/deploy.yml  # GitHub Actions deployment
```

### Core Pages
- **index.html**: Main landing page featuring interactive background, animated hero section, sticky navigation, and sections for About, Projects, Experience, and Contact
- **resume.html**: Printable CV/resume page optimized for PDF export with professional styling and print-friendly layout

### Build System (Vite)

**Key Configuration**:
- Multi-page application setup in `vite.config.js` with separate entry points for index.html and resume.html
- Base path set to `/github.io/` for GitHub Pages deployment
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Module-based JavaScript imports with tree-shaking and code-splitting

**Interactive Background System**: The landing page features a sophisticated multi-layer background system:
- Fixed gradient overlay (z-index: -8)
- Interactive radial gradient that follows mouse movement (z-index: -10)
- Floating particles with randomized positions and animations (z-index: -5)
- Parallax layers that move at different speeds on scroll (data-speed attributes)
- Section-specific background particles created dynamically via JavaScript

**Sticky Navigation**: Navbar appears when scrolling past the hero section with:
- Smooth slide-down animation using transform classes
- Mobile-responsive hamburger menu
- Auto-close on link click for mobile
- Smooth scroll behavior for anchor links

### Visual Effects & Animations

**Custom Animations**:
- `float`: 6-second infinite animation for hero elements with translate and rotate transforms
- `blink`: Cursor blinking effect for typing animation
- `scrollIndicator`: Animated scroll hint at bottom of hero section
- `gradientBorder`: Animated gradient border on CTA buttons (background-position animation)

**Typing Effect**: JavaScript-powered typing animation cycling through "Fullstack Developer", "Go Developer", "Software Engineer"

**Parallax Scrolling**: Uses `data-speed` attributes on `.parallax-layer` elements to create depth effect

**Theme Toggle**: Dark/light mode with localStorage persistence, toggling the `dark` class on `<html>`

## Development

### Commands
```bash
# Install dependencies
npm install

# Start development server (with HMR)
npm run dev
# Opens at http://localhost:5173/github.io/

# Build for production
npm run build
# Outputs to /dist directory

# Preview production build locally
npm run preview
```

### Development Workflow
1. Run `npm run dev` for local development with hot module replacement
2. Edit files in `src/` directory - changes appear instantly
3. Build with `npm run build` before deploying
4. Deployment is automated via GitHub Actions on push to main

### Styling Approach
- Tailwind CSS v4 with custom configuration in `tailwind.config.js`
- Custom colors: primary (#9C83FF), secondary (#FF9051)
- Custom animations defined in `src/css/main.css` using @layer utilities
- Dark mode implemented via `dark:` prefixes with `class` strategy
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- All Tailwind styles are purged/optimized during build

### JavaScript Architecture
**Modular ES6+ structure**:
- **main.js**: Entry point that imports all modules and initializes features
- **typing.js**: Typing animation with state management (count, index, isDeleting)
- **theme.js**: Dark/light mode toggle with localStorage persistence
- **background.js**: Mouse-tracking interactive background, floating particles (20), section backgrounds (3 per section)
- **parallax.js**: Parallax scroll effect calculations using data-speed attributes
- **navbar.js**: Sticky navbar show/hide logic and mobile menu toggle
- **smoothScroll.js**: Smooth anchor link scrolling

Each module exports functions that are called from main.js on DOMContentLoaded or window.load events.

## Design System

### Color Palette
- **Primary**: #9C83FF (purple) - main brand color
- **Secondary**: #FF9051 (orange) - accent color
- **Light Mode**: bg-white (#FFFFFF), text-black
- **Dark Mode**: bg-gray-900 (#111827), text-white
- **Neutral**: gray-100, gray-200, gray-300, gray-700, gray-800

### Typography
- **Font**: IBM Plex Sans (Google Fonts)
- **Weights**: 100-700 (all weights loaded)
- **Hero Title**: text-4xl md:text-6xl lg:text-7xl, font-black
- **Hero Subtitle**: sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl, font-semibold
- **Section Headers**: text-3xl font-bold

### Layout Principles
- Container-based layout with `container mx-auto px-4`
- Full-height hero section with `min-h-screen flex items-center justify-center`
- Section spacing: `py-20` for main sections
- Z-index layering: background (-10 to -5), navbar (50), theme toggle (50)

## Contact Form

The contact form uses **Formspree** (action: `https://formspree.io/f/xwplygnl`) to handle form submissions without backend code.

## Git Workflow

Based on recent commits:
- Main branch: `main`
- Commit message style: Conventional commits format (`feat:`, `fix:`, `refactor:`, `debugged:`)
- Recent focus: Interactive backgrounds, parallax effects, layout improvements, and sticky navbar

## Deployment

### Automated GitHub Pages Deployment

The site uses GitHub Actions for CI/CD with the following workflow:

1. **Trigger**: Push to `main` branch
2. **Build**: GitHub Actions runs `npm ci && npm run build`
3. **Deploy**: Built files from `/dist` directory are deployed to GitHub Pages
4. **URL**: Site is available at the repository's GitHub Pages URL

**Configuration Files**:
- `.github/workflows/deploy.yml`: GitHub Actions workflow
- `vite.config.js`: Base path set to `/github.io/` for proper asset loading

### Manual Deployment
If needed, you can manually build and deploy:
```bash
npm run build
# Then commit and push the /dist directory or use gh-pages
```

## Key Implementation Notes

**Performance Optimizations**:
- Tailwind CSS is purged and optimized during Vite build (only used classes included)
- JavaScript modules are code-split and tree-shaken automatically
- All images in `/public/imgs/` directory are copied to dist with proper paths
- External dependencies: Google Fonts (preconnected), Animate.css CDN
- Particle system creates 20 DOM elements + 3 per section (created dynamically)
- Vite's build produces minified, optimized assets with content hashing

**Browser Compatibility**:
- Uses modern CSS (backdrop-filter, will-change)
- JavaScript uses ES6+ syntax (arrow functions, template literals)
- localStorage for theme persistence

**Accessibility**:
- Semantic HTML5 elements (header, nav, section, footer)
- ARIA considerations minimal (could be improved)
- Skip links not implemented
- Color contrast should be verified for WCAG compliance

## Important Notes for Development

### Adding New Features

**To add a new JavaScript feature**:
1. Create a new module in `src/js/` (e.g., `newFeature.js`)
2. Export your functions from the module
3. Import and call from `src/js/main.js`
4. Test in dev mode with `npm run dev`

**To modify styles**:
- For main page: Edit `src/css/main.css`
- For resume: Edit `src/css/resume.css`
- Tailwind utilities work directly in HTML class attributes
- Custom animations should be added to `@layer utilities` in CSS files

**To add a new page**:
1. Create the HTML file in root (e.g., `new-page.html`)
2. Add it to `vite.config.js` rollupOptions.input
3. Create a new entry JS file if needed (e.g., `src/js/new-page.js`)

### Common Issues

**Build fails with Tailwind errors**: Ensure `@tailwindcss/postcss` is installed and referenced correctly in `postcss.config.js` (not just `tailwindcss`)

**Images not loading**: Images must be in `/public/imgs/` directory and referenced as `./public/imgs/filename.ext`

**Styles not applying**: Make sure CSS is imported in the appropriate JS entry point (`main.js` or `resume.js`)

## Future Enhancement Areas

Potential improvements:
- Implement proper accessibility features (ARIA labels, skip links, focus management)
- Add loading states for contact form
- Consider lazy loading for images and sections (IntersectionObserver)
- Add meta tags for better SEO (Open Graph, Twitter Cards)
- Implement analytics tracking
- Add animation performance optimizations (reduce motion for users with preferences)
- Consider adding TypeScript for type safety
- Add unit tests for JavaScript modules
