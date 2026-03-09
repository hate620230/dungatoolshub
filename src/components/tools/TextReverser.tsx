import { useState } from "react";

const TextReverser = () => {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"chars" | "words" | "lines">("chars");

  const getReversed = () => {
    if (!text) return "";
    switch (mode) {
      case "chars": return text.split("").reverse().join("");
      case "words": return text.split(/\s+/).reverse().join(" ");
      case "lines": return text.split("\n").reverse().join("\n");
    }
  };

  const reversed = getReversed();

  return (
    <div>
      <textarea
        className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-y"
        placeholder="Enter text to reverse..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-3 flex gap-2">
        {(["chars", "words", "lines"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            Reverse {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      {reversed && (
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Result:</label>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm text-foreground break-all">{reversed}</div>
          <button onClick={() => navigator.clipboard.writeText(reversed)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">📋 Copy</button>
        </div>
      )}
    </div>
  );
};

export default TextReverser;
