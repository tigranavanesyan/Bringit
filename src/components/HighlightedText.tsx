import { useMemo } from "react";

interface HighlightedTextProps {
  text: string;
  highlight: string;
  className?: string;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightedText({ text, highlight, className }: HighlightedTextProps) {
  const trimmed = highlight.trim();
  const { parts, lowerHighlight } = useMemo(() => {
    if (!trimmed) {
      return { parts: [text], lowerHighlight: "" };
    }
    const regex = new RegExp(`(${escapeRegex(trimmed)})`, "gi");
    return { parts: text.split(regex), lowerHighlight: trimmed.toLowerCase() };
  }, [text, trimmed]);

  if (!trimmed) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === lowerHighlight ? (
          <mark
            key={i}
            className="bg-(--color-primary/20) text-(--color-primary) rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
