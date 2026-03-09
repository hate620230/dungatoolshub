import { useState } from "react";

export const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    setError("");
    try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); } catch { setError("Invalid JSON"); }
  };
  const minify = () => {
    setError("");
    try { setOutput(JSON.stringify(JSON.parse(input))); } catch { setError("Invalid JSON"); }
  };

  return (
    <div>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-y" placeholder='{"key": "value"}' value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="mt-3 flex gap-2">
        <button onClick={format} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Format</button>
        <button onClick={minify} className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">Minify</button>
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {output && (
        <div className="mt-4">
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 font-mono text-sm text-foreground min-h-[150px] resize-y" readOnly value={output} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">📋 Copy</button>
        </div>
      )}
    </div>
  );
};

export const JsonValidator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);

  const validate = () => {
    try { JSON.parse(input); setResult({ valid: true, message: "✅ Valid JSON" }); } catch (e) { setResult({ valid: false, message: `❌ Invalid JSON: ${(e as Error).message}` }); }
  };

  return (
    <div>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-y" placeholder='{"key": "value"}' value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={validate} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Validate</button>
      {result && <div className={`mt-3 rounded-lg p-3 text-sm font-medium ${result.valid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{result.message}</div>}
    </div>
  );
};

export const CssMinifier = () => {
  const [input, setInput] = useState("");
  const minify = () => input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
  const [output, setOutput] = useState("");
  const handleMinify = () => setOutput(minify());
  return (
    <div>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-y" placeholder="Paste CSS here..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleMinify} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Minify CSS</button>
      {output && (
        <div className="mt-4">
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 font-mono text-sm text-foreground min-h-[100px] resize-y" readOnly value={output} />
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Saved {((1 - output.length / input.length) * 100).toFixed(0)}%</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋 Copy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const JsMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const minify = () => {
    const result = input.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
    setOutput(result);
  };
  return (
    <div>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] resize-y" placeholder="Paste JavaScript here..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={minify} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Minify JS</button>
      {output && (
        <div className="mt-4">
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 font-mono text-sm text-foreground min-h-[100px] resize-y" readOnly value={output} />
          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Saved {((1 - output.length / input.length) * 100).toFixed(0)}%</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋 Copy</button>
          </div>
        </div>
      )}
    </div>
  );
};
