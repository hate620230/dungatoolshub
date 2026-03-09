import { useState } from "react";

const WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

const genSentence = () => {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
};

const genParagraph = () => {
  const sentences = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: sentences }, genSentence).join(" ");
};

const LoremIpsum = () => {
  const [count, setCount] = useState(3);
  const [result, setResult] = useState("");

  const generate = () => setResult(Array.from({ length: count }, genParagraph).join("\n\n"));

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-medium text-foreground">Paragraphs:</label>
        <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Generate</button>
      </div>
      {result && (
        <div>
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 text-foreground min-h-[200px] resize-y" readOnly value={result} />
          <button onClick={() => navigator.clipboard.writeText(result)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">📋 Copy</button>
        </div>
      )}
    </div>
  );
};

export default LoremIpsum;
