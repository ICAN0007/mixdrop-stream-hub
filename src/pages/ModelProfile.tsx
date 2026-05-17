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
import { ArrowLeft, Play, Eye, Heart, Check, Share2, Star, Sparkles, Film } from "lucide-react";
import PixelAtmosphere from "@/components/PixelAtmosphere";

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
    <div className="min-h-screen relative bg-[#050505]">
      {/* Ambient atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <PixelAtmosphere density={55} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(220,50,60,0.12),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(255,200,120,0.07),transparent_55%)]" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-white/5 px-6 py-4 grid grid-cols-3 items-center backdrop-blur-md bg-black/30">
          <div />
          <div className="text-center">
            <Link to="/" className="text-2xl font-black tracking-tight">
              <span className="text-primary">Exclusive</span>
              <span className="text-white">Clips4</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center justify-end gap-6 text-sm font-medium text-white/60">
            <Link to="/" className="hover:text-primary transition-colors tracking-wide">HOME</Link>
            <Link to="/models" className="text-primary tracking-wide">MODELS</Link>
          </nav>
        </header>

      {/* Hero — cinematic banner */}
      <section className="relative">
        <div className="relative h-[480px] sm:h-[620px] w-full overflow-hidden">
          <img
            src={profile.hero}
            alt={modelName}
            className="h-full w-full object-cover scale-105 animate-[fade-in_1.2s_ease-out]"
          />
          {/* Cinematic vignette + gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")" }} />
          {/* Giant ghost name */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 sm:bottom-8 flex justify-center overflow-hidden">
            <span
              className="text-[18vw] sm:text-[14vw] font-black tracking-[0.05em] uppercase leading-none text-white/[0.05] whitespace-nowrap select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {modelName}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-40 sm:-mt-48 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 shrink-0 overflow-hidden rounded-2xl border-4 border-background shadow-2xl shadow-black/60 bg-card">
              <img src={profile.image} alt={modelName} className="h-full w-full object-cover" />
              <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-primary/95 text-primary-foreground text-[10px] font-bold px-2 py-0.5 backdrop-blur-sm shadow-lg shadow-primary/40">
                <Sparkles className="h-3 w-3" /> VERIFIED
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-4 pb-2">
              <div className="space-y-1.5">
                <p className="text-[11px] uppercase tracking-[0.4em] text-primary font-bold">Featured Model</p>
                <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-none">{modelName}</h1>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-0.5 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Premium creator</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full bg-secondary/80 border border-border px-3 py-1.5">
                  <Film className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">
                    {modelVideos.length} video{modelVideos.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary/80 border border-border px-3 py-1.5">
                  <Eye className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">2.4M views</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary/80 border border-border px-3 py-1.5">
                  <Heart className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">189K fans</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setFollowing((v) => !v)}
                  className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 ${
                    following
                      ? "bg-secondary text-foreground border border-primary/40"
                      : "bg-primary text-primary-foreground shadow-lg shadow-primary/40"
                  }`}
                >
                  {following ? <><Check className="h-4 w-4" /> Following</> : <><Heart className="h-4 w-4" /> Subscribe</>}
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: modelName, url: window.location.href }).catch(() => {});
                    } else {
                      navigator.clipboard?.writeText(window.location.href);
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wide bg-secondary text-foreground border border-border hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
                <Link
                  to="/models"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-1"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> All models
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border" />
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
