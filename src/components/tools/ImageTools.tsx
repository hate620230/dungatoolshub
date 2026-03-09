import { useState, useRef, useCallback } from "react";

const useImageUpload = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const img = new window.Image();
    img.onload = () => setImage(img);
    img.src = URL.createObjectURL(file);
  };

  return { image, fileName, handleUpload };
};

const downloadCanvas = (canvas: HTMLCanvasElement, name: string) => {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = name;
  a.click();
};

export const ImageResizer = () => {
  const { image, fileName, handleUpload } = useImageUpload();
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resize = () => {
    if (!image || !canvasRef.current) return;
    const w = Number(width) || image.width;
    const h = Number(height) || image.height;
    const canvas = canvasRef.current;
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")?.drawImage(image, 0, 0, w, h);
  };

  const handleWidthChange = (v: string) => {
    setWidth(v);
    if (keepRatio && image && v) setHeight(String(Math.round(image.height * (Number(v) / image.width))));
  };
  const handleHeightChange = (v: string) => {
    setHeight(v);
    if (keepRatio && image && v) setWidth(String(Math.round(image.width * (Number(v) / image.height))));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 block text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground" />
      {image && (
        <>
          <p className="mb-3 text-sm text-muted-foreground">Original: {image.width} × {image.height}</p>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <input type="number" value={width} onChange={(e) => handleWidthChange(e.target.value)} placeholder="Width" className="w-24 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
            <span className="text-muted-foreground">×</span>
            <input type="number" value={height} onChange={(e) => handleHeightChange(e.target.value)} placeholder="Height" className="w-24 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} className="accent-primary" />Keep ratio
            </label>
            <button onClick={resize} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">Resize</button>
          </div>
          <canvas ref={canvasRef} className="max-w-full rounded-lg border border-border" />
          <button onClick={() => canvasRef.current && downloadCanvas(canvasRef.current, `resized-${fileName}`)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">⬇️ Download</button>
        </>
      )}
    </div>
  );
};

export const ImageCompressor = () => {
  const { image, fileName, handleUpload } = useImageUpload();
  const [quality, setQuality] = useState(70);
  const [resultUrl, setResultUrl] = useState("");
  const [sizes, setSizes] = useState({ orig: 0, compressed: 0 });

  const compress = () => {
    if (!image) return;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d")?.drawImage(image, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setResultUrl(URL.createObjectURL(blob));
        setSizes({ orig: image.src.length, compressed: blob.size });
      },
      "image/jpeg",
      quality / 100
    );
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 block text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground" />
      {image && (
        <>
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm text-foreground">Quality: {quality}%</label>
            <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="flex-1 accent-primary" />
            <button onClick={compress} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">Compress</button>
          </div>
          {resultUrl && (
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Compressed size: {(sizes.compressed / 1024).toFixed(1)} KB</p>
              <img src={resultUrl} alt="Compressed" className="max-w-full rounded-lg border border-border" />
              <a href={resultUrl} download={`compressed-${fileName}`} className="mt-2 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">⬇️ Download</a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const ImageRotator = () => {
  const { image, fileName, handleUpload } = useImageUpload();
  const [angle, setAngle] = useState(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rotate = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rad = (angle * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
    canvas.width = image.width * cos + image.height * sin;
    canvas.height = image.width * sin + image.height * cos;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 block text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground" />
      {image && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {[90, 180, 270].map((a) => (
              <button key={a} onClick={() => { setAngle(a); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${angle === a ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{a}°</button>
            ))}
            <input type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-20 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none" placeholder="Custom" />
            <button onClick={rotate} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">Rotate</button>
          </div>
          <canvas ref={canvasRef} className="max-w-full rounded-lg border border-border" />
          <button onClick={() => canvasRef.current && downloadCanvas(canvasRef.current, `rotated-${fileName}`)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">⬇️ Download</button>
        </>
      )}
    </div>
  );
};

export const ImageFlipper = () => {
  const { image, fileName, handleUpload } = useImageUpload();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const flip = (dir: "h" | "v") => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d")!;
    if (dir === "h") { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    else { ctx.translate(0, canvas.height); ctx.scale(1, -1); }
    ctx.drawImage(image, 0, 0);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 block text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground" />
      {image && (
        <>
          <div className="mb-4 flex gap-3">
            <button onClick={() => flip("h")} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">↔ Flip Horizontal</button>
            <button onClick={() => flip("v")} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">↕ Flip Vertical</button>
          </div>
          <canvas ref={canvasRef} className="max-w-full rounded-lg border border-border" />
          <button onClick={() => canvasRef.current && downloadCanvas(canvasRef.current, `flipped-${fileName}`)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">⬇️ Download</button>
        </>
      )}
    </div>
  );
};

export const ImageToBase64 = () => {
  const [result, setResult] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setResult(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 block text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground" />
      {result && (
        <div>
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 font-mono text-xs text-foreground min-h-[150px] resize-y" readOnly value={result} />
          <button onClick={() => navigator.clipboard.writeText(result)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">📋 Copy Base64</button>
        </div>
      )}
    </div>
  );
};

export const ImageColorPicker = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [color, setColor] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImgSrc(URL.createObjectURL(file));
  };

  const handleImgLoad = () => {
    if (!imgRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;
    canvas.getContext("2d")?.drawImage(imgRef.current, 0, 0);
  };

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const pixel = canvasRef.current.getContext("2d")?.getImageData(x, y, 1, 1).data;
    if (pixel) {
      const hex = "#" + [pixel[0], pixel[1], pixel[2]].map((v) => v.toString(16).padStart(2, "0")).join("");
      setColor(hex);
    }
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} className="mb-4 block text-sm text-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground" />
      {imgSrc && (
        <>
          <img ref={imgRef} src={imgSrc} onLoad={handleImgLoad} className="hidden" alt="" />
          <p className="mb-2 text-sm text-muted-foreground">Click on the image to pick a color</p>
          <canvas ref={canvasRef} onClick={handleClick} className="max-w-full cursor-crosshair rounded-lg border border-border" />
          {color && (
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg border border-border" style={{ backgroundColor: color }} />
              <span className="font-mono font-bold text-foreground">{color.toUpperCase()}</span>
              <button onClick={() => navigator.clipboard.writeText(color)} className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">📋 Copy</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
