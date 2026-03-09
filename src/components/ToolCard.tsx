import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const ToolCard = ({ icon: Icon, title, description, color }: ToolCardProps) => {
  return (
    <div className="group cursor-pointer rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
      style={{ "--shadow-card-hover": "0 12px 32px -8px hsl(24 95% 53% / 0.2)" } as React.CSSProperties}
    >
      <div
        className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default ToolCard;
