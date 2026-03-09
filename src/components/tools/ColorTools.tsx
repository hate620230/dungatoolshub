import { useState } from "react";

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
};
const rgbToHex = (r: number, g: number, b: number) => "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");

export const ColorPicker = () => {
  const [color, setColor] = useState("#f97316");
  const rgb = hexToRgb(color);
  return (
    <div>
      <div className="flex items-center gap-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-16 w-16 cursor-pointer rounded-lg border-0" />
        <div>
          <div className="font-mono text-lg font-bold text-foreground">{color.toUpperCase()}</div>
          {rgb && <div className="text-sm text-muted-foreground">RGB({rgb.r}, {rgb.g}, {rgb.b})</div>}
        </div>
      </div>
      <div className="mt-4 h-24 rounded-lg" style={{ backgroundColor: color }} />
      <div className="mt-3 flex gap-2">
        <button onClick={() => navigator.clipboard.writeText(color)} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">Copy HEX</button>
        {rgb && <button onClick={() => navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="rounded-lg bg-secondary px-4 py-2 text-sm text-secondary-foreground">Copy RGB</button>}
      </div>
    </div>
  );
};

export const HexToRgb = () => {
  const [hex, setHex] = useState("");
  const rgb = hex ? hexToRgb(hex.startsWith("#") ? hex : "#" + hex) : null;
  return (
    <div>
      <div className="flex items-center gap-3">
        <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#f97316" className="w-40 rounded-lg border border-input bg-background px-4 py-2 font-mono text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        {rgb && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg border border-border" style={{ backgroundColor: hex.startsWith("#") ? hex : "#" + hex }} />
            <span className="font-mono font-bold text-primary">RGB({rgb.r}, {rgb.g}, {rgb.b})</span>
            <button onClick={() => navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋</button>
          </div>
        )}
      </div>
    </div>
  );
};

export const RgbToHex = () => {
  const [r, setR] = useState("");
  const [g, setG] = useState("");
  const [b, setB] = useState("");
  const hex = r && g && b ? rgbToHex(Number(r), Number(g), Number(b)) : null;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input type="number" value={r} onChange={(e) => setR(e.target.value)} placeholder="R" min={0} max={255} className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        <input type="number" value={g} onChange={(e) => setG(e.target.value)} placeholder="G" min={0} max={255} className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="B" min={0} max={255} className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        {hex && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg border border-border" style={{ backgroundColor: hex }} />
            <span className="font-mono font-bold text-primary">{hex.toUpperCase()}</span>
            <button onClick={() => navigator.clipboard.writeText(hex)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋</button>
          </div>
        )}
      </div>
    </div>
  );
};
