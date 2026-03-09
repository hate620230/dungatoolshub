import { useState } from "react";

const CharacterCounter = () => {
  const [text, setText] = useState("");

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const spaces = text.split(" ").length - 1;
  const lines = text.split("\n").length;

  return (
    <div>
      <textarea
        className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[200px] resize-y"
        placeholder="Type or paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Characters", value: chars },
          { label: "Without Spaces", value: charsNoSpace },
          { label: "Spaces", value: spaces },
          { label: "Lines", value: lines },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-muted p-3 text-center">
            <div className="font-heading text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterCounter;
