import {
  FileText, Image, Calculator, Globe, Lock, Palette, FileJson,
  type LucideIcon,
} from "lucide-react";

export interface Tool {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export interface ToolCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  emoji: string;
  color: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "text",
    icon: FileText,
    label: "Text Tools",
    emoji: "📝",
    color: "hsl(24 95% 53%)",
    tools: [
      { id: 1, name: "Word Counter", description: "Count words, sentences & paragraphs", slug: "word-counter" },
      { id: 2, name: "Character Counter", description: "Count characters with/without spaces", slug: "character-counter" },
      { id: 3, name: "Case Converter", description: "Convert text to upper, lower, title case", slug: "case-converter" },
      { id: 4, name: "Text Reverser", description: "Reverse text or words", slug: "text-reverser" },
      { id: 5, name: "Remove Duplicates", description: "Remove duplicate lines from text", slug: "remove-duplicates" },
      { id: 6, name: "Lorem Ipsum Generator", description: "Generate placeholder text", slug: "lorem-ipsum" },
    ],
  },
  {
    id: "encoders",
    icon: Globe,
    label: "Encoder / Decoder Tools",
    emoji: "🔗",
    color: "hsl(220 70% 55%)",
    tools: [
      { id: 10, name: "URL Encoder", description: "Encode text for URLs", slug: "url-encoder" },
      { id: 11, name: "URL Decoder", description: "Decode URL-encoded text", slug: "url-decoder" },
      { id: 12, name: "Base64 Encoder", description: "Encode text to Base64", slug: "base64-encoder" },
      { id: 13, name: "Base64 Decoder", description: "Decode Base64 to text", slug: "base64-decoder" },
      { id: 14, name: "HTML Encoder", description: "Encode HTML special characters", slug: "html-encoder" },
      { id: 15, name: "HTML Decoder", description: "Decode HTML entities", slug: "html-decoder" },
    ],
  },
  {
    id: "calculators",
    icon: Calculator,
    label: "Calculators",
    emoji: "🧮",
    color: "hsl(150 60% 42%)",
    tools: [
      { id: 20, name: "Age Calculator", description: "Calculate your exact age", slug: "age-calculator" },
      { id: 21, name: "BMI Calculator", description: "Calculate Body Mass Index", slug: "bmi-calculator" },
      { id: 22, name: "Percentage Calculator", description: "Calculate percentages easily", slug: "percentage-calculator" },
      { id: 23, name: "Discount Calculator", description: "Calculate discount & final price", slug: "discount-calculator" },
      { id: 24, name: "Loan EMI Calculator", description: "Calculate monthly EMI", slug: "loan-calculator" },
      { id: 25, name: "GST Calculator", description: "Calculate GST amount", slug: "gst-calculator" },
    ],
  },
  {
    id: "security",
    icon: Lock,
    label: "Security Tools",
    emoji: "🔒",
    color: "hsl(340 75% 55%)",
    tools: [
      { id: 30, name: "Password Generator", description: "Generate strong random passwords", slug: "password-generator" },
      { id: 31, name: "MD5 Hash Generator", description: "Generate MD5 hash of text", slug: "md5-generator" },
      { id: 32, name: "SHA256 Hash Generator", description: "Generate SHA-256 hash", slug: "sha256-generator" },
    ],
  },
  {
    id: "color",
    icon: Palette,
    label: "Color Tools",
    emoji: "🎨",
    color: "hsl(45 90% 50%)",
    tools: [
      { id: 40, name: "Color Picker", description: "Pick and convert colors", slug: "color-picker" },
      { id: 41, name: "HEX to RGB", description: "Convert HEX to RGB color", slug: "hex-to-rgb" },
      { id: 42, name: "RGB to HEX", description: "Convert RGB to HEX color", slug: "rgb-to-hex" },
    ],
  },
  {
    id: "dev",
    icon: FileJson,
    label: "Developer Tools",
    emoji: "💻",
    color: "hsl(270 65% 55%)",
    tools: [
      { id: 50, name: "JSON Formatter", description: "Format & beautify JSON data", slug: "json-formatter" },
      { id: 51, name: "JSON Validator", description: "Validate JSON syntax", slug: "json-validator" },
      { id: 52, name: "CSS Minifier", description: "Minify CSS code", slug: "css-minifier" },
      { id: 53, name: "JS Minifier", description: "Minify JavaScript code", slug: "js-minifier" },
    ],
  },
  {
    id: "image",
    icon: Image,
    label: "Image Tools",
    emoji: "🖼",
    color: "hsl(200 80% 50%)",
    tools: [
      { id: 60, name: "Image Resizer", description: "Resize images in browser", slug: "image-resizer" },
      { id: 61, name: "Image Compressor", description: "Compress images client-side", slug: "image-compressor" },
      { id: 62, name: "Image Rotator", description: "Rotate images by any degree", slug: "image-rotator" },
      { id: 63, name: "Image Flipper", description: "Flip images horizontally/vertically", slug: "image-flipper" },
      { id: 64, name: "Image to Base64", description: "Convert image to Base64 string", slug: "image-to-base64" },
      { id: 65, name: "Image Color Picker", description: "Pick color from uploaded image", slug: "image-color-picker" },
      { id: 66, name: "QR Code Generator", description: "Generate QR codes from text or URLs", slug: "qr-code-generator" },
    ],
  },
];

// Flat map for route lookup
export const allTools = toolCategories.flatMap((cat) =>
  cat.tools.map((tool) => ({ ...tool, categoryId: cat.id, categoryLabel: cat.label, categoryColor: cat.color }))
);

export const getToolBySlug = (slug: string) => allTools.find((t) => t.slug === slug);
