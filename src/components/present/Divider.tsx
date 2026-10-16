import { chapterOf, pageOf, totalOf, type SlideId } from './outline';

interface DividerProps {
  id: SlideId;
  subtitle: string;
  dates: string;
}

// Chapter opener: the ultramarine field fills the whole slide.
export function Divider({ id, subtitle, dates }: DividerProps) {
  const chapter = chapterOf(id);
  return (
    <div className="on-field flex h-full flex-col justify-between bg-field px-[120px] pb-[56px] pt-[96px] text-on-field">
      <span className="text-[220px] font-semibold leading-none tabular-nums">{chapter?.numeral}</span>
      <div>
        <h2 className="text-[112px] font-semibold leading-[1.02] tracking-tight">{chapter?.title}</h2>
        <p className="mt-6 max-w-[28ch] text-balance text-[44px] leading-snug">{subtitle}</p>
      </div>
      <div className="flex items-baseline justify-between border-t border-on-field-muted pt-5 text-[22px] tabular-nums text-on-field-muted">
        <span>{dates}</span>
        <span>
          p. {pageOf(id)} / {totalOf(id)}
        </span>
      </div>
    </div>
  );
}
