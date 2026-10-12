import { useEffect, useState } from 'react';
import type { Project } from '@/data/portfolio-data';
import { LayerFigure } from './LayerFigure';

interface ChapterProps {
  project: Project;
  /** Figure number for this chapter's architecture, or null when it has none. */
  figureNumber: number | null;
}

export function Chapter({ project, figureNumber }: ChapterProps) {
  const anchor = `#${project.id}`;
  const [open, setOpen] = useState(() => window.location.hash === anchor);

  // A link to this chapter opens it, on first load and on later hash changes.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === anchor) setOpen(true);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [anchor]);

  const titleId = `${project.id}-title`;
  const bodyId = `${project.id}-full`;

  return (
    <section
      id={project.id}
      aria-labelledby={titleId}
      className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-rule py-12"
    >
      <header className="col-span-12 md:col-span-4">
        <h3 id={titleId} className="text-2xl font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm tabular-nums text-muted">
          {[project.subtitle, project.dateRange, project.status].filter(Boolean).join(' · ')}
        </p>
        <p className="mt-4 text-sm text-muted">{project.technologies.join(', ')}</p>
      </header>

      <div className="col-span-12 md:col-span-8">
        <p className="max-w-measure text-lg leading-relaxed">{project.description}</p>

        {project.visualArch && figureNumber !== null && (
          <LayerFigure number={figureNumber} title={project.title} layers={project.visualArch} />
        )}

        {project.highlights && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={bodyId}
              onClick={() => setOpen((o) => !o)}
              className="mt-6 text-sm font-semibold underline hover:text-field"
            >
              {open ? 'Close the chapter' : 'Read the full chapter'}
            </button>
            <div id={bodyId} hidden={!open} className="mt-4">
              <ul className="max-w-measure list-disc space-y-2 pl-5">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              {project.github && (
                <p className="mt-4 text-sm">
                  <a href={project.github} className="underline">
                    Source on GitHub
                  </a>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
