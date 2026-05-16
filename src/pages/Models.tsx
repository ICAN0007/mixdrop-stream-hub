import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { videos, modelCodes, getModelProfile, slugifyModel, getVideoModels } from "@/lib/videos";
import { Search, User } from "lucide-react";

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return modelCodes;
    const q = searchQuery.toLowerCase();
    return modelCodes.filter((m) => m.toLowerCase().includes(q));
  }, [searchQuery]);

  const modelVideoCount = useMemo(() => {
    const counts: Record<string, number> = {};
    videos.forEach((v) => {
      getVideoModels(v).forEach((m) => {
        counts[m] = (counts[m] || 0) + 1;
      });
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-4 grid grid-cols-3 items-center">
        <div />
        <div className="text-center">
          <Link to="/" className="text-2xl font-black tracking-tight">
            <span className="text-primary">Exclusive</span>
            <span className="text-foreground">Clips4</span>
          </Link>
          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">
            Premium Fashion • Lifestyle • Glamour Videos
          </p>
        </div>
        <nav className="hidden md:flex items-center justify-end gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors tracking-wide">HOME</Link>
          <Link to="/models" className="text-primary tracking-wide">MODELS</Link>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black text-foreground flex items-center gap-3 tracking-tight">
              <User className="h-7 w-7 text-primary" />
              All Models
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {modelCodes.length} models • Click a card to view profile
            </p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models..."
              className="w-full rounded-xl bg-secondary border border-border pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredModels.map((model) => {
            const profile = getModelProfile(model);
            const count = modelVideoCount[model] || 0;
            return (
              <Link
                key={model}
                to={`/models/${slugifyModel(model)}`}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/40 hover:border-primary/60 hover:shadow-primary/20 transition-all duration-500"
              >
                <div className="aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={profile.image}
                    alt={model}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 space-y-1">
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">
                    {model}
                  </h3>
                  {count > 0 && (
                    <p className="text-xs text-white/70 font-medium">
                      {count} video{count !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-border px-6 py-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 ExclusiveClips4</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Models;
