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
  Search, Monitor, Play, Clock, Heart, MessageSquare, Bookmark,
} from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [activeTab, setActiveTab] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    const q = searchQuery.toLowerCase();
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.categories.some((c) => c.toLowerCase().includes(q)) ||
        v.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

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
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/10">
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
              <h2 className="text-xl font-bold text-foreground leading-snug">
                {activeVideo.title}
              </h2>

              {activeVideo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeVideo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Bookmark className="h-4 w-4" /> Watch Later
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <MessageSquare className="h-4 w-4" /> Add Comment
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 text-xs transition-all duration-300 ${
                    liked ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Heart className={`h-4 w-4 transition-all ${liked ? "fill-primary" : ""}`} />
                  Like
                </button>
                <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDuration(activeVideo.duration)}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Discover the pinnacle of elegance and sophistication. This curated collection showcases
                timeless fashion, breathtaking travel destinations, and the art of luxury living.
                Experience beauty redefined through a lens of class and refinement.
              </p>
            </div>
          </div>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
                  Premium Collection
                </h3>
                <p className="text-xs text-muted-foreground">
                  {videos.length} videos ready to watch
                </p>
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
                    }}
                    className={`group rounded-xl border bg-card p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${
                      isActive ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="relative overflow-hidden rounded-lg border border-border bg-secondary">
                      <div className="aspect-video">
                        <img
                          src={getVideoThumbnailUrl(video.thumb)}
                          alt={`${video.title} thumbnail`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
                      <div className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] text-foreground backdrop-blur-sm">
                        {video.id}
                      </div>
                      <div className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground backdrop-blur-sm">
                        {formatDuration(video.duration)}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-5 w-5 fill-current" />
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <h4 className="text-sm font-semibold leading-snug text-foreground">
                        {video.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{video.model}</p>
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
                className={`h-8 w-8 rounded flex items-center justify-center font-medium transition-all ${
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
              className={`h-8 w-8 rounded flex items-center justify-center font-medium transition-all ${
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
        <aside className="w-full lg:w-72 shrink-0 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground mb-4 uppercase">
              Categories
            </h3>
            <ul className="space-y-1.5">
              {filteredCategories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1 group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground group-hover:text-foreground">{cat.count}</span>
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Models */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-foreground mb-4 uppercase">
              Foreign → Models
            </h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {filteredModels.map((model, i) => (
                <a
                  key={model}
                  href="#"
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 group ${
                    i !== filteredModels.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[9px] font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    {model.split(" ").map(w => w[0]).join("")}
                  </span>
                  <span className="truncate">{model}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground/50 group-hover:text-primary/60">→</span>
                </a>
              ))}
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
