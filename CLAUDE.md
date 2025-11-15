# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Panthaweekan Somngam, a Full-Stack Developer. The site is built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. It features a modern, component-based architecture with client-side routing and is hosted on GitHub Pages with automated CI/CD deployment.

The portfolio showcases professional experience, projects, and provides both an interactive landing page and a printable resume page.

## Architecture & Structure

### Project Structure
```
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx         # Hero section with typing animation
│   │   ├── About.tsx        # About section
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── Experience.tsx   # Work experience timeline
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Resume.tsx       # Resume/CV page component
│   │   └── ui/              # Reusable UI components (shadcn/ui pattern)
│   │       ├── button.tsx   # Button component with variants
│   │       └── card.tsx     # Card component
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper)
│   ├── styles/
│   │   └── resume.css       # Resume-specific styles
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles & CSS variables
│   └── vite-env.d.ts        # Vite type definitions
├── public/
│   ├── imgs/                # Static images
│   └── .nojekyll            # GitHub Pages config
├── index.html               # HTML entry point
├── resume.html              # Legacy resume HTML (possibly deprecated)
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript config for Node
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS with Tailwind plugin
└── .github/workflows/
    └── deploy.yml           # GitHub Actions deployment
```

### Core Technologies

**Frontend Stack**:
- **React 19.2.0**: Latest React with modern hooks and concurrent features
- **TypeScript 5.9**: Strict type checking enabled
- **React Router DOM 7.9**: Client-side routing
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Vite 7.2**: Fast build tool with HMR

**UI Libraries**:
- **Radix UI**: Unstyled, accessible component primitives (@radix-ui/react-slot)
- **Lucide React**: Icon library (Github, Linkedin, Mail, FileText, etc.)
- **class-variance-authority**: Type-safe component variants
- **clsx & tailwind-merge**: Conditional className utilities

### Application Architecture

**Routing Structure** (src/App.tsx):
- `/` - Main portfolio page (PortfolioPage component)
- `/resume` - Resume/CV page (Resume component)
- Base path: `/Portfolio/` (configured for GitHub Pages)

**PortfolioPage Layout**:
```tsx
<Navbar />      // Sticky navigation
<Hero />        // Hero section with typing effect
<About />       // About me section
<Projects />    // Project showcase
<Experience />  // Work experience
<Contact />     // Contact form
<Footer />      // Footer
```

**Component Patterns**:
- Functional components with TypeScript
- React hooks (useState, useEffect) for state management
- Component composition for reusability
- Props interfaces for type safety
- Variant-based component styling (CVA pattern)

### Build System (Vite)

**Key Configuration** (vite.config.ts):
- React plugin: `@vitejs/plugin-react`
- Base path: `/Portfolio/` for GitHub Pages
- Path aliases: `@/` maps to `./src/`
- Output directory: `dist`
- Assets directory: `assets`

**TypeScript Configuration**:
- Target: ES2020
- JSX: react-jsx (automatic runtime)
- Strict mode enabled
- Module resolution: bundler
- Path aliases configured: `@/*` → `./src/*`
- Unused locals/parameters checking enabled

## Development

### Commands
```bash
# Install dependencies
npm install

# Start development server (with HMR)
npm run dev
# Opens at http://localhost:5173/Portfolio/

# Build for production
npm run build
# Outputs to /dist directory with TypeScript compilation

# Preview production build locally
npm run preview
```

### Development Workflow
1. Run `npm run dev` for local development with hot module replacement
2. Edit TypeScript/TSX files in `src/` - changes appear instantly
3. TypeScript will provide compile-time type checking
4. Build with `npm run build` (includes TypeScript compilation)
5. Deployment is automated via GitHub Actions on push to main

### Adding New Features

**To create a new component**:
1. Create a new `.tsx` file in `src/components/` (e.g., `NewFeature.tsx`)
2. Define the component with TypeScript:
   ```tsx
   export function NewFeature() {
     return <div>Content</div>;
   }
   ```
3. Import and use in `App.tsx` or other components
4. Use path aliases: `import { NewFeature } from '@/components/NewFeature'`

**To add a new route**:
1. Create the page component in `src/components/`
2. Add the route in `src/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```

**To create a reusable UI component**:
1. Add to `src/components/ui/` following the shadcn/ui pattern
2. Use CVA for variants: `const variants = cva("base-classes", { variants: {...} })`
3. Export typed props interface
4. Use `cn()` helper from `@/lib/utils` for className merging

## Styling Approach

### CSS Architecture

**Global Styles** (src/index.css):
- Tailwind directives: `@tailwind base/components/utilities`
- CSS custom properties (CSS variables) for theming
- Color system using HSL format with `hsl(var(--color-name))`
- Separate light and dark mode variable definitions

**Color System**:
- **Primary**: `hsl(262 80% 75%)` - Purple (#9C83FF equivalent)
- **Secondary**: `hsl(20 100% 65%)` - Orange (#FF9051 equivalent)
- All colors defined as CSS variables in `:root` and `.dark`
- Semantic color tokens: background, foreground, muted, accent, destructive, etc.

**Dark Mode**:
- Implemented via `class` strategy (`.dark` class on root element)
- CSS variables switch values based on `.dark` class
- Tailwind's `dark:` prefix for conditional styles

**Responsive Breakpoints**:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Custom Properties**:
- `--radius`: 0.5rem (border radius)
- All semantic color tokens (background, foreground, primary, etc.)

### Component Styling

**Utility-First Approach**:
- Tailwind utility classes in JSX className props
- Responsive utilities: `md:text-4xl`, `sm:flex-row`
- State variants: `hover:bg-primary/90`, `focus-visible:ring-2`
- Dark mode: `dark:bg-gray-900`, `dark:text-white`

**Component Variants** (CVA Pattern):
```tsx
const buttonVariants = cva("base classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { default: "...", lg: "..." }
  }
})
```

**Conditional Classes**:
```tsx
import { cn } from '@/lib/utils';
className={cn("base-class", condition && "conditional-class")}
```

## Component Architecture

### Core Components

**Hero Component** (src/components/Hero.tsx):
- Typing animation using React hooks (useState, useEffect)
- Cycles through roles: "Full-Stack Developer", "Go Developer", "Software Engineer"
- Typing speed: 150ms (typing), 75ms (deleting)
- Pause duration: 1500ms between cycles
- Smooth scroll to contact section
- Social links: GitHub, LinkedIn, Email
- CTA buttons: "Get In Touch", "View Resume", "GitHub"

**Navbar Component**:
- Sticky navigation with smooth scrolling
- Mobile-responsive design
- Link to resume page via React Router

**Resume Component**:
- Dedicated route at `/resume`
- Print-optimized layout
- Professional CV formatting

**Contact Component**:
- Form submission (likely Formspree or similar)
- Email integration

### UI Component Library (shadcn/ui pattern)

**Button Component** (src/components/ui/button.tsx):
- Built with Radix UI Slot primitive
- CVA variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- TypeScript props extending HTMLButtonElement
- `asChild` prop for polymorphic rendering
- forwardRef for ref forwarding

**Card Component** (src/components/ui/card.tsx):
- Likely follows similar pattern with variants

**Design Principles**:
- Unstyled primitives from Radix UI
- Tailwind for styling
- Type-safe variants with CVA
- Composable and accessible
- Ref forwarding for complex use cases

### State Management

**Local State**:
- `useState` for component-level state
- `useEffect` for side effects and timers
- No global state management (Redux, Zustand, etc.) currently

**Routing State**:
- React Router DOM manages navigation state
- BrowserRouter with basename `/Portfolio`

## TypeScript Conventions

### Type Safety
- Strict mode enabled
- Explicit return types recommended for functions
- Props interfaces for all components
- Utility types: `React.ButtonHTMLAttributes`, `VariantProps`, etc.

### Path Aliases
```typescript
import { Component } from '@/components/Component';
import { cn } from '@/lib/utils';
```

### Common Patterns
```tsx
// Component with typed props
interface ComponentProps {
  title: string;
  optional?: boolean;
}

export function Component({ title, optional }: ComponentProps) {
  return <div>{title}</div>;
}

// forwardRef with types
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("base", className)} {...props} />;
  }
);
Component.displayName = "Component";
```

## Animation & Effects

### Built-in Animations

**Tailwind Animations**:
- `animate-pulse`: Blinking cursor effect
- `animate-in`: Entrance animations
- `fade-in`, `slide-in-from-bottom-4`: Custom entrance effects
- `duration-1000`, `delay-200`: Timing utilities

**Custom Keyframes** (tailwind.config.js):
- `accordion-down`: Height expansion animation
- `accordion-up`: Height collapse animation

**Interactive Effects**:
- Hover states: `hover:bg-primary/90`, `hover:text-primary`
- Focus states: `focus-visible:ring-2`
- Transition colors: `transition-colors`
- Gradient backgrounds: `bg-gradient-to-r`, `bg-clip-text`

### React Animations

**Typing Effect**:
- Custom hook pattern with useState + useEffect
- setTimeout for typing intervals
- State management for text, isDeleting, loopNum, speed

**Smooth Scrolling**:
```tsx
element.scrollIntoView({ behavior: 'smooth' });
```

## Git Workflow

**Branch Strategy**:
- Main branch: `main`
- Feature branches: `claude/*` prefix for AI-assisted development

**Commit Message Style**:
- Conventional commits format
- Prefixes: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- Example: `feat: Integrate resume.html into React implementation with routing`

**Recent Migration**:
- Project migrated from vanilla JavaScript to React + TypeScript
- Legacy HTML files (resume.html) may still exist
- Component-based architecture now in place

## Deployment

### GitHub Pages Deployment (Automated)

**Workflow** (.github/workflows/deploy.yml):
1. **Trigger**: Push to `main` branch
2. **Build Job**:
   - Checkout code
   - Setup Node.js 20
   - Install dependencies with `npm ci`
   - Build with `npm run build` (production mode)
   - Verify build output (dist folder structure)
   - Upload artifact for deployment
3. **Deploy Job**:
   - Deploy to GitHub Pages
   - URL: https://panthaweekan.github.io/Portfolio/

**Configuration**:
- Base path: `/Portfolio/` in vite.config.ts and BrowserRouter
- Output: `dist` directory
- `.nojekyll` file in public (prevents Jekyll processing)
- Node version: 20
- Cache strategy: npm cache

**Important Notes**:
- TypeScript compilation happens during build
- Vite optimizes and bundles React code
- Assets are hashed for cache busting
- Images from `public/imgs/` are copied to `dist/imgs/`

### Manual Deployment
```bash
npm run build
# Verify dist/ folder contents
# Push to main branch to trigger automated deployment
```

## Key Implementation Details

### Performance Optimizations
- Vite's fast HMR for instant development feedback
- React 19's automatic batching and concurrent features
- Code splitting via dynamic imports (if implemented)
- Tailwind CSS purging (only used classes in production)
- Asset optimization and hashing via Vite
- TypeScript compilation in production mode only

### SEO & Meta Tags
The site includes comprehensive meta tags in index.html:
- Author, description, keywords meta tags
- Open Graph tags for Facebook sharing
- Twitter Card meta tags
- Proper title tag
- Favicon (bolt.svg)

### Browser Compatibility
- Target: ES2020
- Modern browsers with ES6+ support
- CSS custom properties required
- No legacy browser polyfills

### Accessibility
- Semantic HTML structure
- Keyboard navigation (built-in with Radix UI)
- Focus management with focus-visible
- ARIA attributes from Radix UI primitives
- Color contrast via design system
- **Improvement areas**: Add skip links, ARIA labels, alt text verification

## Common Development Tasks

### Adding a New Section to Portfolio
1. Create component in `src/components/NewSection.tsx`
2. Import in `App.tsx`
3. Add to PortfolioPage component JSX
4. Style with Tailwind utilities
5. Test responsiveness at different breakpoints

### Modifying Colors
1. Edit CSS variables in `src/index.css`
2. Update `:root` for light mode
3. Update `.dark` for dark mode
4. Use HSL format: `hsl(hue saturation% lightness%)`
5. Reference via `bg-primary`, `text-foreground`, etc.

### Adding Icons
1. Import from lucide-react: `import { IconName } from 'lucide-react'`
2. Use as component: `<IconName className="h-6 w-6" />`
3. Available icons: GitHub, Linkedin, Mail, FileText, and 1000+ more

### Working with Forms
- Contact form likely uses Formspree or similar service
- Check Contact.tsx for implementation details
- Form submissions are handled externally (no backend)

## Common Issues & Solutions

### TypeScript Errors
- **Issue**: Type errors during development
- **Solution**: Check tsconfig.json settings, ensure proper prop typing
- Run `npm run build` to see all type errors

### Routing Issues
- **Issue**: Routes not working on GitHub Pages
- **Solution**: Ensure basename="/Portfolio" in BrowserRouter matches base in vite.config.ts
- Use React Router's Link/NavLink, not `<a>` tags for internal navigation

### Styling Not Applying
- **Issue**: Tailwind classes not working
- **Solution**: Check that class names are correct, verify tailwind.config.js content paths
- Ensure `index.css` is imported in `main.tsx`

### Build Failures
- **Issue**: Build fails with TypeScript errors
- **Solution**: Fix type errors shown in terminal
- Check for unused imports (strict mode enabled)

### Images Not Loading
- **Issue**: Images 404 in production
- **Solution**: Place images in `public/imgs/`
- Reference as `/imgs/filename.ext` (Vite handles public folder automatically)
- Verify images are copied to `dist/imgs/` after build

### Dark Mode Not Working
- **Issue**: Dark mode colors not switching
- **Solution**: Check that `.dark` class is toggled on `<html>` element
- Verify CSS variables are defined in both `:root` and `.dark`

## Future Enhancement Areas

### Recommended Improvements
- **Testing**: Add Vitest for unit tests, React Testing Library for component tests
- **Performance**: Implement lazy loading for routes and heavy components
  ```tsx
  const Resume = lazy(() => import('./components/Resume'));
  ```
- **Animations**: Add Framer Motion for advanced animations
- **Forms**: Integrate React Hook Form for better form handling
- **State Management**: Consider Zustand or Context API if state grows complex
- **Analytics**: Add Google Analytics or Plausible for visitor tracking
- **Accessibility**: Audit with axe DevTools, add skip links, improve ARIA labels
- **PWA**: Add service worker for offline functionality
- **Error Boundaries**: Implement error boundaries for graceful error handling
- **Loading States**: Add skeleton loaders and suspense boundaries
- **Code Quality**: Add ESLint, Prettier, Husky pre-commit hooks
- **Documentation**: Add JSDoc comments to complex functions
- **Bundle Analysis**: Use `vite-bundle-visualizer` to optimize bundle size

### Potential Features
- Blog section with MDX support
- Project filtering and search
- Dark mode toggle UI control
- i18n for multiple languages
- Admin panel for content management
- Animation preferences (respect prefers-reduced-motion)

## Development Best Practices

### When Writing Components
1. Use TypeScript for all new components
2. Define props interfaces explicitly
3. Use functional components with hooks
4. Keep components focused and single-purpose
5. Extract reusable logic into custom hooks
6. Use semantic HTML elements
7. Add displayName to forwardRef components

### When Styling
1. Use Tailwind utilities first
2. Create CSS variables for repeated values
3. Use `cn()` helper for conditional classes
4. Follow mobile-first responsive design
5. Test in both light and dark modes
6. Maintain consistent spacing scale

### When Adding Dependencies
1. Check bundle size impact
2. Prefer smaller, focused libraries
3. Ensure TypeScript support
4. Check for accessibility features
5. Verify license compatibility

### Code Organization
- Components in `src/components/`
- Utilities in `src/lib/`
- Styles in `src/styles/` or co-located
- Types in same file or `src/types/`
- Constants in `src/constants/` or component files

## Resources & References

**Documentation**:
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)

**Component Libraries**:
- [Radix UI](https://www.radix-ui.com/primitives)
- [shadcn/ui](https://ui.shadcn.com/) (pattern reference)
- [Lucide Icons](https://lucide.dev/icons/)

**Tools**:
- [class-variance-authority](https://cva.style/docs)
- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
