import { useState } from "react";

const EncoderDecoder = ({ encode, decode, label }: { encode: (s: string) => string; decode: (s: string) => string; label: string }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => { setError(""); try { setOutput(encode(input)); } catch { setError("Encoding failed"); } };
  const handleDecode = () => { setError(""); try { setOutput(decode(input)); } catch { setError("Decoding failed — invalid input"); } };

  return (
    <div>
      <textarea className="w-full rounded-lg border border-input bg-background p-4 text-foreground outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-y"
        placeholder={`Enter text to ${label}...`} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="mt-3 flex gap-2">
        <button onClick={handleEncode} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Encode</button>
        <button onClick={handleDecode} className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">Decode</button>
      </div>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {output && (
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Result:</label>
          <textarea className="w-full rounded-lg border border-input bg-muted p-4 font-mono text-sm text-foreground min-h-[100px] resize-y" readOnly value={output} />
          <button onClick={() => navigator.clipboard.writeText(output)} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">📋 Copy</button>
        </div>
      )}
    </div>
  );
};

export const UrlEncoder = () => <EncoderDecoder encode={encodeURIComponent} decode={decodeURIComponent} label="URL encode/decode" />;
export const UrlDecoder = () => <EncoderDecoder encode={encodeURIComponent} decode={decodeURIComponent} label="URL encode/decode" />;
export const Base64Encoder = () => <EncoderDecoder encode={(s) => btoa(unescape(encodeURIComponent(s)))} decode={(s) => decodeURIComponent(escape(atob(s)))} label="Base64 encode/decode" />;
export const Base64Decoder = () => <EncoderDecoder encode={(s) => btoa(unescape(encodeURIComponent(s)))} decode={(s) => decodeURIComponent(escape(atob(s)))} label="Base64 encode/decode" />;

const he = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
const hd = (s: string) => s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'");

export const HtmlEncoder = () => <EncoderDecoder encode={he} decode={hd} label="HTML encode/decode" />;
export const HtmlDecoder = () => <EncoderDecoder encode={he} decode={hd} label="HTML encode/decode" />;
