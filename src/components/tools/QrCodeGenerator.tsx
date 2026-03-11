import { useState, useRef } from "react";
import QRCode from "qrcode";

const QrCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    if (!text || !canvasRef.current) return;
    await QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: { dark: fgColor, light: bgColor },
    });
    setGenerated(true);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div>
      <textarea
        className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-y"
        placeholder="Enter text or URL to generate QR code..."
        value={text}
        onChange={(e) => { setText(e.target.value); setGenerated(false); }}
      />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Size</label>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20">
            {[128, 256, 512, 1024].map((s) => <option key={s} value={s}>{s}×{s}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Foreground</label>
          <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="h-9 w-12 cursor-pointer rounded border-0" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Background</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-9 w-12 cursor-pointer rounded border-0" />
        </div>
        <button onClick={generate} className="self-end rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Generate QR
        </button>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <canvas ref={canvasRef} className={`rounded-lg border border-border ${generated ? "" : "hidden"}`} />
        {generated && (
          <button onClick={download} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
            ⬇️ Download PNG
          </button>
        )}
      </div>
    </div>
  );
};

export default QrCodeGenerator;
