import { Wrench } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Dunga Tools
          </span>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="#" className="transition-colors hover:text-foreground">Tools</a>
          <a href="#" className="transition-colors hover:text-foreground">About</a>
          <a href="#" className="transition-colors hover:text-foreground">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
