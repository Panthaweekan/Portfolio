import type { ArchLayer } from '@/data/portfolio-data';

interface LayerFigureProps {
  number: number;
  title: string;
  layers: ArchLayer[];
}

// A system's architecture as a report figure: one row per layer, top to bottom
// in the direction data flows.
export function LayerFigure({ number, title, layers }: LayerFigureProps) {
  return (
    <figure className="mt-8">
      <figcaption className="mb-3 text-sm text-muted">
        <span className="font-semibold tabular-nums text-ink">Figure {number}</span> · {title}: architecture
      </figcaption>
      <ol className="border-t border-ink">
        {layers.map((layer) => (
          <li key={layer.name} className="grid grid-cols-12 gap-x-6 border-b border-rule py-3">
            <span className="col-span-12 text-sm text-muted sm:col-span-4">{layer.name}</span>
            <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-1 sm:col-span-8">
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
