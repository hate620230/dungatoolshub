import {
  FileText, Image, Calculator, Lock, QrCode, Palette,
  Type, FileJson, Clock, Hash,
} from "lucide-react";
import ToolCard from "./ToolCard";

const tools = [
  { icon: FileText, title: "Text Tools", description: "Word counter, case converter, text formatter & more.", color: "hsl(24 95% 53%)" },
  { icon: Image, title: "Image Tools", description: "Resize, compress, and convert images instantly.", color: "hsl(200 80% 50%)" },
  { icon: Calculator, title: "Calculators", description: "Math, percentage, BMI, and unit calculators.", color: "hsl(150 60% 42%)" },
  { icon: Lock, title: "Security Tools", description: "Password generator, hash tools & encryption.", color: "hsl(340 75% 55%)" },
  { icon: QrCode, title: "QR Code Generator", description: "Create QR codes for URLs, text, and contacts.", color: "hsl(270 65% 55%)" },
  { icon: Palette, title: "Color Tools", description: "Color picker, palette generator & converter.", color: "hsl(45 90% 50%)" },
  { icon: Type, title: "Font Tools", description: "Font pairing, preview, and web font tools.", color: "hsl(180 55% 45%)" },
  { icon: FileJson, title: "JSON Tools", description: "Format, validate, and convert JSON data.", color: "hsl(100 55% 45%)" },
  { icon: Clock, title: "Time Tools", description: "Timezone converter, countdown & stopwatch.", color: "hsl(220 70% 55%)" },
  { icon: Hash, title: "Number Tools", description: "Base converter, random number & Roman numerals.", color: "hsl(10 70% 55%)" },
];

const ToolsGrid = () => {
  return (
    <section className="container mx-auto px-4 pb-24">
      <h2 className="mb-10 text-center font-heading text-3xl font-bold text-foreground">
        Explore Our <span className="text-primary">Tools</span>
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
};

export default ToolsGrid;
