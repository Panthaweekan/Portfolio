import { Link } from 'react-router-dom';
import { Download, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { personalInfo } from '@/data/portfolio-data';

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

const SECTIONS = [
  { href: '#systems', label: 'Systems' },
  { href: '#record', label: 'Record' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

const linkClass = 'text-sm text-muted hover:text-ink hover:underline';

// Build in-page links from the current document: under <base href="/Portfolio/">
// a bare "#id" resolves to /Portfolio/#id and reloads from /Portfolio or ?query URLs.
const here = () => `${window.location.pathname}${window.location.search}`;

interface MastheadProps {
  page: 'home' | 'resume';
}

export function Masthead({ page }: MastheadProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-ground">
      <div className="mx-auto flex h-14 max-w-[80rem] items-center gap-6 px-6 md:px-10">
        <Link to="/" className="font-semibold tracking-tight">
          {personalInfo.shortName}
        </Link>

        {page === 'home' && (
          <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
            {SECTIONS.map((s) => (
              <a key={s.href} href={`${here()}${s.href}`} className={linkClass}>
                {s.label}
              </a>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-4">
          {page === 'home' && (
            <details className="relative md:hidden">
              <summary className={`${linkClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>Menu</summary>
              <nav
                aria-label="Sections"
                className="absolute right-0 mt-3 flex w-44 flex-col gap-3 border border-rule bg-ground p-4"
                onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}
              >
                {SECTIONS.map((s) => (
                  <a key={s.href} href={`${here()}${s.href}`} className={linkClass}>
                    {s.label}
                  </a>
                ))}
                <Link to="/present" className={linkClass}>
                  Presentation
                </Link>
              </nav>
            </details>
          )}

          {page === 'resume' && (
            <Link to="/" className={linkClass}>
              Portfolio
            </Link>
          )}

          <Link to="/present" className={`${linkClass} hidden md:inline`}>
            Presentation
          </Link>

          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid h-9 w-9 place-items-center text-muted hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={CV_URL}
            download="Panthaweekan_Somngam_CV.pdf"
            aria-label="Download CV (PDF)"
            className="inline-flex h-9 items-center gap-2 bg-ink px-3 text-sm font-semibold text-ground hover:opacity-90 sm:px-4"
          >
            <Download className="h-4 w-4" aria-hidden />
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">Download CV</span>
          </a>
        </div>
      </div>
    </header>
  );
}
