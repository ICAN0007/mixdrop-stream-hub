export interface Video {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  src: string;
  thumb: string;
  duration: string;
  addedAt: string;
  model: string;
}

export const videos: Video[] = [
  {
    id: "V1",
    title: "F  me Until You Fill Me",
    categories: ["Fashion"],
    tags: ["#Fashion", "#Luxury", "#Travel"],
    src: "//mixdrop.top/e/ow98dk1gskvpgl",
    thumb: "https://files.catbox.moe/b0w6vy.jpg",
    duration: "600",
    addedAt: "2026-03-20T20:05:00Z",
    model: "Emiri Momota"
  },
  {
    id: "V2",
    title: "Sx Sells Eliza Ibarra & Mick Blue",
    categories: ["Fashion"],
    tags: ["#Fashion", "#Glamour", "#Premium"],
    src: "//mixdrop.top/e/4dmqowvzfq3j9x4",
    thumb: "https://files.catbox.moe/nrkbjz.webp",
    duration: "1920",
    addedAt: "2026-04-08T10:00:00Z",
    model: "Eliza Ibarra"
  },
  {
    id: "V3",
    title: "Jia Episode 1",
    categories: ["Lifestyle"],
    tags: ["#Lifestyle", "#Luxury", "#Trending"],
    src: "//mixdrop.top/e/l7qmv4rnsq1gr96",
    thumb: "https://files.catbox.moe/udf9lf.webp",
    duration: "600",
    addedAt: "2026-04-08T10:30:00Z",
    model: "Jia Lissa"
  },
  {
    id: "V4",
    title: "The Most Beautiful Red Head You Have Ever Seen",
    categories: ["Glamour"],
    tags: ["#Glamour", "#Style", "#Fashion"],
    src: "//mixdrop.top/e/gjkwm8ndfw4jmk8",
    thumb: "https://files.catbox.moe/9pgr5p.webp",
    duration: "600",
    addedAt: "2026-04-08T11:00:00Z",
    model: "Jia Lissa"
  }
];

export const categories = [
  { count: 1814, name: "Urban Chic" },
  { count: 832, name: "Wanderlust Wear" },
  { count: 117, name: "Eastern Glow" },
  { count: 1398, name: "Starlight Glam" },
  { count: 2173, name: "Timeless Silhouettes" },
  { count: 477, name: "Statement Style" },
  { count: 406, name: "Midnight Luxe" },
  { count: 172, name: "Campus Couture" },
  { count: 387, name: "Kinship Fashion" },
  { count: 490, name: "Squad Vibes" },
  { count: 436, name: "Effortless Chic" },
  { count: 165, name: "Glow Routines" },
  { count: 1252, name: "Couture Classics" },
  { count: 700, name: "Viral Trends" },
  { count: 554, name: "Opulent Looks" },
  { count: 75, name: "Fiesta Flair" },
  { count: 821, name: "Bonded Style" },
  { count: 262, name: "Family Glow" },
  { count: 1028, name: "Runway Icons" },
  { count: 430, name: "Pure Elegance" },
  { count: 733, name: "Modern Muse" },
  { count: 1283, name: "Signature Look" },
  { count: 644, name: "Gen Z Glam" },
  { count: 1700, name: "Crew Chic" },
  { count: 2411, name: "Fresh Wave" },
  { count: 624, name: "Radiant Aura" },
];

export const models = [
  "Adria Rae",
  "Aria Lee",
  "Chanel Camryn",
  "Coco Lovelock",
  "Eliza Ibarra",
  "Emiri Momota",
  "Gianna Dior",
  "Jia Lissa",
  "Katie Kush",
  "Kylie Rocket",
  "Lilly Bell",
  "Megan Murkovski",
  "Rae Lil Black",
  "Rissa May",
  "Scarlit Scandal",
  "Violet Gems",
  "Agatha Vega",
  "Azul Hermosa",
  "Cherie DeVille",
  "Codi Vore",
  "Elsa Jean",
  "Eva Elfie",
  "Hailey Rose",
  "Julia James",
  "Kendra Spade",
  "Lana Rhoades",
  "Liz Jordan",
  "Melanie Marie",
  "Rikako Katayama",
  "Ryan Reid",
  "Sonya Blaze",
  "Violet Myers",
  "Angel Gostosa",
  "Bailey Base",
  "Chloe Surreal",
  "Demi Hawks",
  "Emily Willis",
  "Eve Sweet",
  "Hazel Moore",
  "Katana Kombat",
  "Kimmy",
  "Lexi Lore",
  "Lulu Chu",
  "Molly Little",
  "Riley Reid",
  "Scarlett Alexis",
  "Vanna Bardot",
  "Xxlayna Marie"
];

export const modelCodes = [
  ["AR", "AH", "CD", "CV", "EJ", "EE", "HR", "JJ", "KS", "LR", "LJ", "MM", "RK", "RR", "VB", "XL"],
  ["AV", "BB", "CS", "DH", "EW", "ES", "HM", "KK", "KM", "LL", "LC", "ML", "RR", "SA", "VG"],
  ["AL", "CC", "CL", "EI", "EM", "GD", "JL", "KK", "KR", "LB", "MM", "RL", "RM", "SB", "VM"],
];

export const filters = ["All", "Indian", "Foreign", "Trending", "Premium", "4K", "New", "Popular", "Models"];

export function formatDuration(seconds: string): string {
  const s = parseInt(seconds, 10);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, "0")}`;
}
