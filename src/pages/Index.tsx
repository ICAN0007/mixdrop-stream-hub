import { useState } from "react";
import { videos, categories, modelCodes, filters, formatDuration } from "@/lib/videos";
import {
  Search, Monitor, Play, Clock, Heart, MessageSquare, Bookmark,
  ChevronLeft, ChevronRight
} from "lucide-react";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [activeTab, setActiveTab] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [liked, setLiked] = useState(false);

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
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/50">
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https:${activeVideo.src}`}
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

          {/* Video Grid */}
          <section className="mt-10">
            <h3 className="mb-5 text-lg font-bold text-foreground">More Videos</h3>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="group rounded-lg overflow-hidden border border-border bg-card hover:border-primary/40 transition-all duration-300 cursor-pointer hover-scale"
                >
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted group-hover:brightness-110 transition-all duration-300">
                      <Play className="h-8 w-8 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-foreground line-clamp-2">
                      Premium Collection #{i + 1}
                    </p>
                    <p className="mt-1 text-[10px] text-muted-foreground">10:00</p>
                  </div>
                </div>
              ))}
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
              {categories.map((cat) => (
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
            <div className="space-y-2">
              {modelCodes.map((row, ri) => (
                <div key={ri} className="flex flex-wrap gap-1.5">
                  {row.map((code, ci) => (
                    <a
                      key={`${ri}-${ci}`}
                      href="#"
                      className="px-2 py-1 text-[10px] font-semibold rounded bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      {code}
                    </a>
                  ))}
                </div>
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
