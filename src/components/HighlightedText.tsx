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
  if (!trimmed) {
    return <span className={className}>{text}</span>;
  }

  const regex = new RegExp(`(${escapeRegex(trimmed)})`, "gi");
  const parts = text.split(regex);
  const lowerHighlight = trimmed.toLowerCase();

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
