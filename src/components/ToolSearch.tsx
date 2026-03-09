import { useState } from "react";
import { Search } from "lucide-react";

interface ToolSearchProps {
  onSearch: (query: string) => void;
}

const ToolSearch = ({ onSearch }: ToolSearchProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search 460+ tools..."
            value={query}
            onChange={handleChange}
            className="w-full rounded-xl border border-border bg-card py-4 pl-12 pr-4 font-body text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default ToolSearch;
