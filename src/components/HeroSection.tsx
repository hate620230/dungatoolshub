import { Wrench } from "lucide-react";
import { toolCategories } from "@/data/tools";

const HeroSection = () => {
  const totalTools = toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-heading text-sm font-semibold text-primary">
          <Wrench className="h-4 w-4" />
          {totalTools}+ Free Online Tools
        </div>
        <h1 className="mb-4 font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          Dunga <span className="text-primary">Tools</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Your all-in-one toolkit — PDF, Image, AI, Video, Audio, Calculator & SEO tools. Fast, free, and built for productivity.
        </p>

        {/* Category quick nav */}
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {toolCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <cat.icon className="h-4 w-4" style={{ color: cat.color }} />
              {cat.label}
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {cat.tools.length}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
