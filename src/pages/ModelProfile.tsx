import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  videos,
  getModelProfile,
  unslugifyModel,
  videoHasModel,
  formatDuration,
  getVideoThumbnailUrl,
} from "@/lib/videos";
import { ArrowLeft, Play, Eye, Heart, Check } from "lucide-react";

const ModelProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const modelName = slug ? unslugifyModel(slug) : null;
  const [following, setFollowing] = useState(false);

  const profile = useMemo(
    () => (modelName ? getModelProfile(modelName) : null),
    [modelName]
  );

  const modelVideos = useMemo(
    () => (modelName ? videos.filter((v) => videoHasModel(v, modelName)) : []),
    [modelName]
  );

  // Deterministic pseudo view count per video
  const viewsFor = (id: string) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    const n = 50_000 + (h % 4_500_000);
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return `${n}`;
  };

  if (!modelName || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-lg text-muted-foreground">Model not found.</p>
        <Link to="/models" className="text-primary hover:underline text-sm">← Back to all models</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-4 grid grid-cols-3 items-center">
        <div />
        <div className="text-center">
          <Link to="/" className="text-2xl font-black tracking-tight">
            <span className="text-primary">Exclusive</span>
            <span className="text-foreground">Clips4</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center justify-end gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors tracking-wide">HOME</Link>
          <Link to="/models" className="text-primary tracking-wide">MODELS</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden">
          <img
            src={profile.image}
            alt={modelName}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-40 sm:-mt-48 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="h-44 w-44 sm:h-52 sm:w-52 shrink-0 overflow-hidden rounded-2xl border-4 border-background shadow-2xl shadow-black/60 bg-card">
              <img src={profile.image} alt={modelName} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 space-y-3 pb-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Featured Model</p>
                <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">{modelName}</h1>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                {profile.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setFollowing((v) => !v)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 ${
                    following
                      ? "bg-secondary text-foreground border border-primary/40"
                      : "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  }`}
                >
                  {following ? <><Check className="h-4 w-4" /> Following</> : <><Heart className="h-4 w-4" /> Subscribe</>}
                </button>
                <Link
                  to="/models"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> All models
                </Link>
                <span className="text-xs text-muted-foreground">
                  {modelVideos.length} video{modelVideos.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-foreground mb-5 tracking-wide uppercase flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-primary" />
          Videos
        </h2>
        {modelVideos.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            No videos available for {modelName} yet.
          </p>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {modelVideos.map((video) => (
              <Link
                key={video.id}
                to={`/?video=${video.id}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-secondary">
                  <div className="aspect-video">
                    <img
                      src={getVideoThumbnailUrl(video.thumb)}
                      alt={video.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                    {formatDuration(video.duration)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl shadow-primary/50">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1.5">
                  <h4 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {viewsFor(video.id)} views
                    </span>
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

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

export default ModelProfile;
