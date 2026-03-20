import { videos, formatDuration } from "@/lib/videos";
import { Play, Clock, Calendar } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight text-primary">
          MyStream
        </h1>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Player */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl shadow-black/30">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={`https:${activeVideo.src}`}
              className="absolute inset-0 h-full w-full"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
              referrerPolicy="no-referrer"
              scrolling="no"
              frameBorder="0"
            />
          </div>

          {/* Video Info */}
          <div className="p-5">
            <h2 className="text-lg font-semibold leading-snug text-foreground">
              {activeVideo.title}
            </h2>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {formatDuration(activeVideo.duration)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(activeVideo.addedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Video List */}
        {videos.length > 1 && (
          <section className="mt-10">
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              More Videos
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVideo(v)}
                  className={`group overflow-hidden rounded-lg border text-left transition-shadow hover:shadow-lg ${
                    v.id === activeVideo.id
                      ? "border-primary/50 bg-secondary"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="relative aspect-video bg-muted">
                    {v.thumb ? (
                      <img src={v.thumb} alt={v.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground opacity-40" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium leading-snug text-foreground line-clamp-2">
                      {v.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDuration(v.duration)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
