import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { videos, modelCodes, getModelProfile, slugifyModel, getVideoModels } from "@/lib/videos";
import { Search, User } from "lucide-react";
import PixelAtmosphere from "@/components/PixelAtmosphere";

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
    <div className="min-h-screen relative bg-[#050505]">
      {/* Atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <PixelAtmosphere density={70} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,50,60,0.10),transparent_60%),radial-gradient(circle_at_80%_60%,rgba(255,200,120,0.06),transparent_55%)]" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-white/5 px-6 py-4 grid grid-cols-3 items-center backdrop-blur-md bg-black/30">
          <div />
          <div className="text-center">
            <Link to="/" className="text-2xl font-black tracking-tight">
              <span className="text-primary">Exclusive</span>
              <span className="text-white">Clips4</span>
            </Link>
            <p className="text-[10px] text-white/40 tracking-[0.35em] uppercase mt-0.5">
              Premium • Fashion • Cinematic
            </p>
          </div>
          <nav className="hidden md:flex items-center justify-end gap-6 text-sm font-medium text-white/60">
            <Link to="/" className="hover:text-primary transition-colors tracking-wide">HOME</Link>
            <Link to="/models" className="text-primary tracking-wide">MODELS</Link>
          </nav>
        </header>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-12">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2">Performer Gallery</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white flex items-center gap-3 tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                <User className="h-7 w-7 text-primary" />
                All Models
              </h2>
              <p className="text-sm text-white/50 mt-2 tracking-wide">
                {modelCodes.length} exclusive performers • Cinematic editorial showcase
              </p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models..."
                className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-md transition-all"
              />
            </div>
          </div>

          {/* Premium portrait grid: 6 cols desktop, 3 tablet, 2 mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {filteredModels.map((model, idx) => {
              const profile = getModelProfile(model);
              const count = modelVideoCount[model] || 0;
              return (
                <Link
                  key={model}
                  to={`/models/${slugifyModel(model)}`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className="group relative block overflow-hidden rounded-lg bg-[#0a0a0a] shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(220,50,60,0.25)] transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                >
                  {/* Poster */}
                  <div className="relative aspect-[9/16] overflow-hidden bg-black">
                    <img
                      src={profile.card}
                      alt={model}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    {/* Dark gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    {/* Glow border */}
                    <div className="pointer-events-none absolute inset-0 rounded-lg ring-0 group-hover:ring-1 group-hover:ring-primary/40 transition-all duration-500" />
                    {/* Video count chip */}
                    {count > 0 && (
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[10px] font-bold text-white/90 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {count} VIDEO{count !== 1 ? "S" : ""}
                      </div>
                    )}
                  </div>
                  {/* Bottom name bar */}
                  <div className="h-[54px] flex items-center px-3.5 bg-black border-t border-white/5">
                    <h3
                      className="text-[17px] font-medium text-white tracking-wide truncate group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif", letterSpacing: "0.02em" }}
                    >
                      {model}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <footer className="border-t border-white/5 px-6 py-6 mt-8 backdrop-blur-md bg-black/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <span>© 2026 ExclusiveClips4</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Models;
