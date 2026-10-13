import type { ArchLayer } from '@/data/portfolio-data';

interface LayerFigureProps {
  number: number;
  title: string;
  layers: ArchLayer[];
  /** `slide` sets the deck's type scale (22px captions, 28px nodes) and fixed
   *  columns: the deck canvas is 1920px wide whatever the viewport. */
  size?: 'page' | 'slide';
}

const TYPE = {
  page: { caption: 'text-sm', node: '', row: '', name: 'col-span-12 sm:col-span-4', nodes: 'col-span-12 sm:col-span-8' },
  slide: { caption: 'text-[22px]', node: 'text-[28px]', row: 'items-baseline', name: 'col-span-4', nodes: 'col-span-8' },
};

// A system's architecture as a report figure: one row per layer, top to bottom
// in the direction data flows.
export function LayerFigure({ number, title, layers, size = 'page' }: LayerFigureProps) {
  const type = TYPE[size];
  return (
    <figure className="mt-8">
      <figcaption className={`mb-3 text-muted ${type.caption}`}>
        <span className="font-semibold tabular-nums text-ink">Figure {number}</span> · {title}: architecture
      </figcaption>
      <ol className="border-t border-ink">
        {layers.map((layer) => (
          <li key={layer.name} className={`grid grid-cols-12 gap-x-6 border-b border-rule py-3 ${type.row}`}>
            <span className={`text-muted ${type.name} ${type.caption}`}>{layer.name}</span>
            <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${type.nodes} ${type.node}`}>
              {layer.nodes.map((node) => (
                <li key={node.label}>
                  <span className="font-medium">{node.label}</span>
                  {node.sublabel && <span className="text-muted"> · {node.sublabel}</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
