import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { DECKS, type DeckId } from './outline';

const TALKS: { deck: DeckId; title: string; audience: string; detail: string }[] = [
  { deck: 'recruiter', title: 'About me', audience: 'For recruiter rounds', detail: 'about 10 minutes' },
  { deck: 'technical', title: 'Technical deep dive', audience: 'For technical rounds', detail: 'FinOps, API gateway, earlier systems' },
];

// /present: pick a talk. Links shared before the split (/present?slide=N) meant the technical deck.
export default function DeckChooser() {
  const { theme, toggle } = useTheme();
  const slide = new URLSearchParams(useLocation().search).get('slide');
  if (slide) return <Navigate to={`/present/technical?slide=${encodeURIComponent(slide)}`} replace />;

  return (
    <div className="min-h-screen bg-ground text-ink">
      <header className="flex h-12 items-center justify-between border-b border-rule px-4 lg:px-6">
        <Link to="/" className="flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span>Portfolio</span>
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="grid h-9 w-9 place-items-center text-muted hover:text-ink"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>
      <main className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 md:py-16">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Two talks</h1>
        <ul className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
          {TALKS.map((t) => (
            <li key={t.deck}>
              <Link to={`/present/${t.deck}`} className="group block border-t border-ink pt-6">
                <h2 className="text-2xl font-semibold tracking-tight">{t.title}</h2>
                <p className="mt-2 tabular-nums text-muted">
                  {t.audience} · {DECKS[t.deck].length} slides · {t.detail}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:underline">
                  Open the talk
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
