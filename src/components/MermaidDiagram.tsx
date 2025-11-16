import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with custom theme
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#9C83FF",
    primaryTextColor: "#fff",
    primaryBorderColor: "#9C83FF",
    lineColor: "#FF9051",
    secondaryColor: "#FF9051",
    tertiaryColor: "#1e293b",
    background: "#0f172a",
    mainBkg: "#1e293b",
    secondBkg: "#334155",
    tertiaryBkg: "#475569",
  },
  flowchart: {
    curve: "basis",
    padding: 20,
  },
});

export function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart) return;

      try {
        // Generate a unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg } = await mermaid.render(id, chart.trim());
        setSvg(svg);
        setError("");
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
        setSvg("");
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div
        className={`text-red-500 text-sm p-4 border border-red-500/20 rounded ${className}`}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className={`mermaid-container overflow-x-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
