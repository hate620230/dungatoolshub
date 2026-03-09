import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getToolBySlug } from "@/data/tools";
import { toolComponents } from "@/components/tools";

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : null;
  const ToolComponent = slug ? toolComponents[slug] : null;

  if (!tool || !ToolComponent) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">Tool Not Found</h1>
            <Link to="/" className="text-primary hover:underline">← Back to all tools</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to all tools
          </Link>
          <div className="mb-8">
            <span className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-primary-foreground" style={{ backgroundColor: tool.categoryColor }}>
              {tool.categoryLabel}
            </span>
            <h1 className="mb-2 font-heading text-3xl font-bold text-foreground md:text-4xl">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <ToolComponent />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolPage;
