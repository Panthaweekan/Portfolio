import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with custom theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#9C83FF',
    primaryTextColor: '#fff',
    primaryBorderColor: '#9C83FF',
    lineColor: '#FF9051',
    secondaryColor: '#FF9051',
    tertiaryColor: '#1e293b',
    background: '#0f172a',
    mainBkg: '#1e293b',
    secondBkg: '#334155',
    tertiaryBkg: '#475569',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
  },
});

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.innerHTML = chart;
      mermaid.run({
        nodes: [elementRef.current],
      });
    }
  }, [chart]);

  return (
    <div
      ref={elementRef}
      id={idRef.current}
      className={`mermaid overflow-x-auto ${className}`}
    />
  );
}
