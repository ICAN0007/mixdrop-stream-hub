export interface Video {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  src: string;
  thumb: string;
  duration: string;
  addedAt: string;
}

export const videos: Video[] = [
  {
    id: "V64",
    title: "YOUR NEW MIXDROP VIDEO TITLE (edit this)",
    categories: [],
    tags: [],
    src: "//mixdrop.top/e/ow98dk1gskvpgl",
    thumb: "",
    duration: "600",
    addedAt: "2026-03-20T20:05:00Z",
  },
];

export function formatDuration(seconds: string): string {
  const s = parseInt(seconds, 10);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
}
