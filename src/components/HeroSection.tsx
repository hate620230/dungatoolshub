import { Wrench } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-heading text-sm font-semibold text-primary">
          <Wrench className="h-4 w-4" />
          Free Online Tools
        </div>
        <h1 className="mb-6 font-heading text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          Dunga <span className="text-primary">Tools</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
          Your all-in-one toolkit for everyday tasks. Fast, free, and built for productivity.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
