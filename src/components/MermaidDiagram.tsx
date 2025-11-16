import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart) {
        setIsLoading(false);
        return;
      }

      try {
        // Lazy load mermaid only when needed
        const mermaid = (await import("mermaid")).default;

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

        // Generate a unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg } = await mermaid.render(id, chart.trim());
        setSvg(svg);
        setError("");
        setIsLoading(false);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
        setSvg("");
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center p-8 ${className}`}
      >
        <div className="animate-pulse text-muted-foreground text-sm">
          Loading diagram...
        </div>
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
