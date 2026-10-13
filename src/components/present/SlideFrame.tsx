import type { ReactNode } from 'react';
import { chapterOf, pageOf, TOTAL_PAGES, type SlideId } from './outline';

interface SlideFrameProps {
  id: SlideId;
  children: ReactNode;
}

// Content slide: margins, then a folio line with chapter and page number.
export function SlideFrame({ id, children }: SlideFrameProps) {
  const chapter = chapterOf(id);
  return (
    <div className="flex h-full flex-col bg-ground px-[120px] pb-[56px] pt-[96px] text-ink">
      <div className="min-h-0 flex-1">{children}</div>
      <div className="mt-10 flex items-baseline justify-between border-t border-rule pt-5 text-[22px] tabular-nums text-muted">
        <span>{chapter ? `${chapter.numeral} · ${chapter.title}` : 'Panthaweekan Somngam'}</span>
        <span>
          p. {pageOf(id)} / {TOTAL_PAGES}
        </span>
      </div>
    </div>
  );
}
