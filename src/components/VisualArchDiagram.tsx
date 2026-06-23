import type { ArchLayer } from '@/data/portfolio-data';

// ── CDN helpers ───────────────────────────────────────────────────────────────
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons';
export const di = (name: string, variant = 'original') =>
  `${DI}/${name}/${name}-${variant}.svg`;

// ── Node tile ─────────────────────────────────────────────────────────────────

function NodeTile({ node }: { node: ArchLayer['nodes'][0] }) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 rounded-xl p-2 border min-w-[68px] max-w-[88px] transition-colors"
      style={{
        borderColor: `${node.color}45`,
        backgroundColor: `${node.color}10`,
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${node.color}22` }}
      >
        {node.iconUrl ? (
          <img
            src={node.iconUrl}
            alt={node.label}
            className="w-5 h-5 object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-base leading-none select-none">{node.iconEmoji}</span>
        )}
      </div>
      <span className="text-[9px] sm:text-[10px] font-mono font-medium text-center text-foreground/80 leading-tight px-0.5">
        {node.label}
      </span>
      {node.sublabel && (
        <span className="text-[8px] font-mono text-center text-muted-foreground leading-tight">
          {node.sublabel}
        </span>
      )}
    </div>
  );
}

// ── Connector arrow ───────────────────────────────────────────────────────────

function Arrow() {
  return (
    <div className="flex flex-col items-center my-1.5 select-none">
      <div className="w-px h-3 bg-border/60" />
      <svg width="10" height="5" viewBox="0 0 10 5" className="text-border/60" fill="currentColor">
        <path d="M0 0 L5 5 L10 0Z" />
      </svg>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function VisualArchDiagram({ layers }: { layers: ArchLayer[] }) {
  return (
    <div className="flex flex-col items-center w-full py-1">
      {layers.map((layer, i) => (
        <div key={layer.name} className="flex flex-col items-center w-full">
          <div className="w-full mb-2">
            <p className="text-[9px] font-mono text-muted-foreground/70 mb-1.5 text-center uppercase tracking-widest">
              {layer.name}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {layer.nodes.map(node => (
                <NodeTile key={node.label} node={node} />
              ))}
            </div>
          </div>
          {i < layers.length - 1 && <Arrow />}
        </div>
      ))}
    </div>
  );
}
