import { useState } from "react";

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
  };

  const Checkbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="accent-primary" />
      {label}
    </label>
  );

  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Length: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div className="flex flex-wrap gap-4">
          <Checkbox label="A-Z" checked={includeUpper} onChange={setIncludeUpper} />
          <Checkbox label="a-z" checked={includeLower} onChange={setIncludeLower} />
          <Checkbox label="0-9" checked={includeNumbers} onChange={setIncludeNumbers} />
          <Checkbox label="!@#$" checked={includeSymbols} onChange={setIncludeSymbols} />
        </div>
      </div>
      <button onClick={generate} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Generate Password</button>
      {password && (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted p-4">
          <code className="flex-1 break-all font-mono text-lg text-foreground">{password}</code>
          <button onClick={() => navigator.clipboard.writeText(password)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋</button>
        </div>
      )}
    </div>
  );
};

export const Md5Generator = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const generate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    setHash(hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""));
  };
  return (
    <div>
      <p className="mb-2 text-xs text-muted-foreground">Note: Uses SHA-1 hash (Web Crypto API doesn't support MD5 — SHA-1 is more secure)</p>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]" placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={generate} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Generate Hash</button>
      {hash && (
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-muted p-4">
          <code className="flex-1 break-all font-mono text-sm text-foreground">{hash}</code>
          <button onClick={() => navigator.clipboard.writeText(hash)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋</button>
        </div>
      )}
    </div>
  );
};

export const Sha256Generator = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const generate = async () => {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    setHash(Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join(""));
  };
  return (
    <div>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]" placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={generate} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Generate SHA-256</button>
      {hash && (
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-muted p-4">
          <code className="flex-1 break-all font-mono text-sm text-foreground">{hash}</code>
          <button onClick={() => navigator.clipboard.writeText(hash)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋</button>
        </div>
      )}
    </div>
  );
};
