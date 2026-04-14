import { useState, useMemo } from "react";
import {
  videos,
  categories,
  modelCodes,
  filters,
  formatDuration,
  getVideoEmbedUrl,
  getVideoThumbnailUrl,
} from "@/lib/videos";
import {
  Search, Monitor, Play, Clock, Heart, MessageSquare, Bookmark, Star, Eye, ChevronRight,
} from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [activeTab, setActiveTab] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const filteredVideos = useMemo(() => {
    let result = videos;
    if (selectedModel) {
      result = result.filter((v) => v.model === selectedModel);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.categories.some((c) => c.toLowerCase().includes(q)) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [searchQuery, selectedModel]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return modelCodes;
    const q = searchQuery.toLowerCase();
    return modelCodes.filter((m) => m.toLowerCase().includes(q));
  }, [searchQuery]);

  // Recommended videos: same model or same category, excluding current
  const recommendedVideos = useMemo(() => {
    return videos.filter(
      (v) =>
        v.id !== activeVideo.id &&
        (v.model === activeVideo.model ||
          v.categories.some((c) => activeVideo.categories.includes(c)))
    );
  }, [activeVideo]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-primary">Exclusive</span>
            <span className="text-foreground">Clips4</span>
          </h1>
          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-0.5">
            Premium Fashion • Lifestyle • Glamour Videos
          </p>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {["VIDEOS", "BEST OF", "COMMUNITY"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-primary transition-colors duration-200 tracking-wide"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos, models, categories..."
            className="w-full rounded-full bg-secondary border border-border pl-12 pr-12 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Monitor className="absolute right-4 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
        {/* Left: Featured + Grid */}
        <div className="flex-1 min-w-0">
          {/* Featured Video */}
          <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="relative aspect-video bg-secondary">
              <iframe
                key={activeVideo.id}
                title={activeVideo.title}
                src={getVideoEmbedUrl(activeVideo.src)}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                referrerPolicy="no-referrer"
                scrolling="no"
                frameBorder="0"
              />
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-foreground leading-snug">
                    {activeVideo.title}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary">{activeVideo.model}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDuration(activeVideo.duration)}
                    </span>
                  </div>
                </div>
              </div>

              {activeVideo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeVideo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-[10px] text-primary font-semibold tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <Bookmark className="h-3.5 w-3.5" /> Save
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <MessageSquare className="h-3.5 w-3.5" /> Comment
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                    liked
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 transition-all ${liked ? "fill-primary" : ""}`} />
                  {liked ? "Liked" : "Like"}
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Videos */}
          {recommendedVideos.length > 0 && (
            <section className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
                  More from {activeVideo.model}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendedVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      setLiked(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex gap-3 rounded-xl border border-border bg-card p-2.5 text-left hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="relative w-36 shrink-0 overflow-hidden rounded-lg">
                      <div className="aspect-video">
                        <img
                          src={getVideoThumbnailUrl(video.thumb)}
                          alt={video.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-3.5 w-3.5 fill-current" />
                        </span>
                      </div>
                      <div className="absolute bottom-1.5 right-1.5 rounded bg-background/80 px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground backdrop-blur-sm">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <h4 className="text-xs font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-1">{video.model}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {video.categories.map((c) => (
                          <span key={c} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Premium Collection */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
                    Premium Collection
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    {filteredVideos.length} videos ready to watch
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredVideos.map((video) => {
                const isActive = activeVideo.id === video.id;

                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      setActiveVideo(video);
                      setLiked(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`group rounded-2xl border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 overflow-hidden ${
                      isActive
                        ? "border-primary shadow-lg shadow-primary/20 ring-1 ring-primary/30"
                        : "border-border hover:border-primary/40"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="relative overflow-hidden bg-secondary">
                      <div className="aspect-video">
                        <img
                          src={getVideoThumbnailUrl(video.thumb)}
                          alt={`${video.title} thumbnail`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                      {/* Duration badge */}
                      <div className="absolute bottom-2.5 right-2.5 rounded-md bg-background/90 px-2 py-0.5 text-[10px] font-bold text-foreground backdrop-blur-sm">
                        {formatDuration(video.duration)}
                      </div>

                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl shadow-primary/40 transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-6 w-6 fill-current ml-0.5" />
                        </span>
                      </div>

                      {/* NOW PLAYING indicator */}
                      {isActive && (
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold text-primary-foreground tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
                          NOW PLAYING
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 space-y-2">
                      <h4 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary/80">{video.model}</span>
                        <div className="flex items-center gap-1">
                          {video.categories.slice(0, 1).map((c) => (
                            <span key={c} className="text-[9px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Bottom Tabs */}
          <section className="mt-10">
            <div className="flex gap-6 border-b border-border pb-2">
              {[
                { key: "recent", label: "RECENT POSTS" },
                { key: "searches", label: "RECENT SEARCHES" },
                { key: "popular", label: "POPULAR SEARCHES" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-xs font-semibold tracking-wider pb-2 transition-all border-b-2 ${
                    activeTab === tab.key
                      ? "text-primary border-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="py-4 text-sm text-muted-foreground">
              No {activeTab === "recent" ? "posts" : "searches"} yet.
            </div>
          </section>

          {/* Load More */}
          <div className="flex justify-center py-8">
            <button className="px-8 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
              LOAD MORE
            </button>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pb-8 text-xs">
            <span className="text-muted-foreground mr-2 font-semibold">PAGES</span>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`h-8 w-8 rounded-lg flex items-center justify-center font-medium transition-all ${
                  currentPage === p
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="text-muted-foreground mx-1">…</span>
            <button
              onClick={() => setCurrentPage(50)}
              className={`h-8 w-8 rounded-lg flex items-center justify-center font-medium transition-all ${
                currentPage === 50
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              50
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-8">
          {/* Categories */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold tracking-wider text-foreground mb-4 uppercase flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-primary" />
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredCategories.map((cat) => (
                <a
                  key={cat.name}
                  href="#"
                  className="group relative rounded-xl border border-border/50 bg-secondary/50 px-3 py-3 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 overflow-hidden"
                >
                  <span className="block text-[11px] font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                  <span className="block text-[10px] text-muted-foreground mt-0.5">
                    {cat.count.toLocaleString()} videos
                  </span>
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Models */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-bold tracking-wider text-foreground mb-4 uppercase flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-primary" />
              Models
            </h3>
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {selectedModel && (
                <button
                  onClick={() => setSelectedModel(null)}
                  className="mb-2 w-full text-[10px] font-semibold text-primary hover:text-primary/80 transition-colors text-left px-3"
                >
                  ✕ Clear filter: {selectedModel}
                </button>
              )}
              {filteredModels.map((model) => {
                const isSelected = selectedModel === model;
                return (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(isSelected ? null : model)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium w-full transition-all duration-200 group ${
                      isSelected
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold shrink-0 border transition-all duration-300 ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-gradient-to-br from-primary/20 to-primary/5 text-primary border-primary/20 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:border-primary"
                    }`}>
                      {model.split(" ").map(w => w[0]).join("")}
                    </span>
                    <span className="truncate transition-colors">{model}</span>
                    <ChevronRight className="h-3 w-3 ml-auto shrink-0 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
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

export default Index;
