import { useState } from "react";

const CaseConverter = () => {
  const [text, setText] = useState("");

  const convert = (type: string) => {
    switch (type) {
      case "upper": setText(text.toUpperCase()); break;
      case "lower": setText(text.toLowerCase()); break;
      case "title": setText(text.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())); break;
      case "sentence": setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())); break;
      case "toggle": setText(text.split("").map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("")); break;
    }
  };

  const copy = () => navigator.clipboard.writeText(text);

  return (
    <div>
      <textarea
        className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[200px] resize-y"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: "UPPERCASE", type: "upper" },
          { label: "lowercase", type: "lower" },
          { label: "Title Case", type: "title" },
          { label: "Sentence case", type: "sentence" },
          { label: "tOGGLE cASE", type: "toggle" },
        ].map((b) => (
          <button key={b.type} onClick={() => convert(b.type)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            {b.label}
          </button>
        ))}
        <button onClick={copy} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
          📋 Copy
        </button>
        <button onClick={() => setText("")} className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
          🗑 Clear
        </button>
      </div>
    </div>
  );
};

export default CaseConverter;
