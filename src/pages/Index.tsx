import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ToolSearch from "@/components/ToolSearch";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import { toolCategories } from "@/data/tools";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return toolCategories;

    const q = searchQuery.toLowerCase();
    return toolCategories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ToolSearch onSearch={setSearchQuery} />
      <div className="container mx-auto px-4">
        {filteredCategories.length === 0 && (
          <p className="py-16 text-center text-lg text-muted-foreground">
            No tools found for "<span className="font-semibold text-foreground">{searchQuery}</span>"
          </p>
        )}
        {filteredCategories.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <CategorySection
              icon={cat.icon}
              label={cat.label}
              emoji={cat.emoji}
              color={cat.color}
              tools={cat.tools}
              toolCount={cat.tools.length}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
