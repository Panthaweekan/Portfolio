import type { ReactNode } from 'react';
import { chapterOf, pageOf, totalOf, type SlideId } from './outline';

interface SlideFrameProps {
  id: SlideId;
  /** Muted 22px line above the folio rule, e.g. "Built with …". */
  caption?: string;
  children: ReactNode;
}

// Content slide: margins, an optional caption, then a folio line with chapter and page number.
export function SlideFrame({ id, caption, children }: SlideFrameProps) {
  const chapter = chapterOf(id);
  return (
    <div className="flex h-full flex-col bg-ground px-[120px] pb-[56px] pt-[96px] text-ink">
      <div className="min-h-0 flex-1">{children}</div>
      {caption && <p className="mt-8 text-[22px] text-muted">{caption}</p>}
      <div className="mt-10 flex items-baseline justify-between border-t border-rule pt-5 text-[22px] tabular-nums text-muted">
        <span>{chapter ? `${chapter.numeral} · ${chapter.title}` : 'Panthaweekan Somngam'}</span>
        <span>
          p. {pageOf(id)} / {totalOf(id)}
        </span>
      </div>
    </div>
  );
}
