import { ArrowRight, type LucideIcon } from "lucide-react";

interface ToolListItemProps {
  name: string;
  description: string;
  slug: string;
}

const ToolListItem = ({ name, description }: ToolListItemProps) => (
  <div className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
    <div className="flex-1 min-w-0">
      <h4 className="font-heading text-sm font-semibold text-foreground truncate">{name}</h4>
      <p className="text-xs text-muted-foreground truncate">{description}</p>
    </div>
    <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
  </div>
);

interface CategorySectionProps {
  icon: LucideIcon;
  label: string;
  emoji: string;
  color: string;
  tools: ToolListItemProps[];
  toolCount: number;
}

const CategorySection = ({ icon: Icon, label, emoji, color, tools, toolCount }: CategorySectionProps) => (
  <section className="mb-16">
    <div className="mb-6 flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {emoji} {label}
        </h2>
        <p className="text-sm text-muted-foreground">{toolCount} tools available</p>
      </div>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolListItem key={tool.slug} {...tool} />
      ))}
    </div>
  </section>
);

export default CategorySection;
