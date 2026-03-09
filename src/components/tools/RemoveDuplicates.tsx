import { useState } from "react";

const RemoveDuplicates = () => {
  const [text, setText] = useState("");

  const result = text ? [...new Set(text.split("\n"))].join("\n") : "";
  const origLines = text ? text.split("\n").length : 0;
  const newLines = result ? result.split("\n").length : 0;
  const removed = origLines - newLines;

  return (
    <div>
      <textarea
        className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-y"
        placeholder="Paste lines of text (one per line)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span>Original: {origLines} lines</span>
            <span>Unique: {newLines} lines</span>
            <span className="font-semibold text-primary">Removed: {removed} duplicates</span>
          </div>
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 text-foreground min-h-[150px] resize-y" readOnly value={result} />
          <button onClick={() => navigator.clipboard.writeText(result)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">📋 Copy Result</button>
        </div>
      )}
    </div>
  );
};

export default RemoveDuplicates;
