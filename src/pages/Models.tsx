import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { videos, modelCodes, formatDuration, getVideoThumbnailUrl } from "@/lib/videos";
import { Search, Play, Clock, ArrowLeft, User, Film } from "lucide-react";

const Models = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return modelCodes;
    const q = searchQuery.toLowerCase();
    return modelCodes.filter((m) => m.toLowerCase().includes(q));
  }, [searchQuery]);

  const modelVideos = useMemo(() => {
    if (!selectedModel) return [];
    return videos.filter((v) => v.model === selectedModel);
  }, [selectedModel]);

  // Count videos per model
  const modelVideoCount = useMemo(() => {
    const counts: Record<string, number> = {};
    videos.forEach((v) => {
      counts[v.model] = (counts[v.model] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-black tracking-tight">
            <span className="text-primary">Exclusive</span>
            <span className="text-foreground">Clips4</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors tracking-wide">HOME</Link>
            <Link to="/models" className="text-primary tracking-wide">MODELS</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back + Title */}
        {selectedModel ? (
          <div className="mb-8">
            <button
              onClick={() => setSelectedModel(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all models
            </button>
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground text-xl font-bold">
                {selectedModel.split(" ").map((w) => w[0]).join("")}
              </span>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedModel}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {modelVideos.length} video{modelVideos.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              All Models
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {modelCodes.length} models • Click to view their videos
            </p>

            {/* Search */}
            <div className="relative mt-5 max-w-md">
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
        )}

        {/* Model Grid or Video Grid */}
        {selectedModel ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modelVideos.length > 0 ? (
              modelVideos.map((video) => (
                <Link
                  key={video.id}
                  to={`/?video=${video.id}`}
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="relative overflow-hidden bg-secondary">
                    <div className="aspect-video">
                      <img
                        src={getVideoThumbnailUrl(video.thumb)}
                        alt={video.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-2 right-2 rounded-md bg-background/90 px-2 py-0.5 text-[10px] font-bold text-foreground backdrop-blur-sm">
                      {formatDuration(video.duration)}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDuration(video.duration)}
                      <span className="text-muted-foreground/30">•</span>
                      {video.categories.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full bg-secondary font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <Film className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No videos available for {selectedModel} yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredModels.map((model) => {
              const count = modelVideoCount[model] || 0;
              return (
                <button
                  key={model}
                  onClick={() => {
                    setSelectedModel(model);
                    setSearchQuery("");
                  }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary text-lg font-bold border border-primary/20 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                    {model.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="text-center min-w-0 w-full">
                    <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {model}
                    </p>
                    {count > 0 && (
                      <p className="text-[10px] text-primary mt-0.5">{count} video{count !== 1 ? "s" : ""}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
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
