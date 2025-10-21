export type Track = {
  id: string;
  title: string;
  location: string;
  description: string;
  image: string;
  coords: [number, number];
  accentColor: string;
};

export const tracks: Track[] = [
  {
    id: "monaco",
    title: "Circuit de Monaco",
    location: "Monte Carlo, Monaco",
    description:
      "The legendary street circuit winding through the harbour, packed with tight corners and glamour.",
    image:
      "https://images.unsplash.com/photo-1512070679279-8988d32161be?auto=format&fit=crop&w=600&q=80",
    coords: [43.7347, 7.4206],
    accentColor: "#ef4444"
  },
  {
    id: "silverstone",
    title: "Silverstone Circuit",
    location: "Silverstone, United Kingdom",
    description:
      "The birthplace of Formula 1 and the long-time home of the British Grand Prix.",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80",
    coords: [52.0733, -1.014],
    accentColor: "#60a5fa"
  },
  {
    id: "monza",
    title: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    description:
      "Known as \"The Temple of Speed\", the fastest track on the calendar and host of the Italian Grand Prix.",
    image:
      "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=600&q=80",
    coords: [45.6156, 9.2811],
    accentColor: "#34d399"
  },
  {
    id: "suzuka",
    title: "Suzuka International Racing Course",
    location: "Suzuka, Japan",
    description:
      "The only figure-eight circuit in F1, famous for the Esses and the 130R corner.",
    image:
      "https://images.unsplash.com/photo-1471900141707-1a7cd4fad140?auto=format&fit=crop&w=600&q=80",
    coords: [34.8431, 136.541],
    accentColor: "#fbbf24"
  },
  {
    id: "montreal",
    title: "Circuit Gilles-Villeneuve",
    location: "Montréal, Canada",
    description:
      "A mix of long straights and tight chicanes on Île Notre-Dame, home of the \"Wall of Champions\".",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    coords: [45.5014, -73.5229],
    accentColor: "#a855f7"
  },
  {
    id: "cota",
    title: "Circuit of the Americas",
    location: "Austin, United States",
    description:
      "A modern US track with huge elevation changes and a steep climb into turn one.",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80",
    coords: [30.1328, -97.6411],
    accentColor: "#f97316"
  },
  {
    id: "red-bull-ring",
    title: "Red Bull Ring",
    location: "Spielberg, Austria",
    description:
      "Fast straights, sharp inclines, and alpine backdrops in the Styrian hills.",
    image:
      "https://images.unsplash.com/photo-1521491452857-290a5b08bfc9?auto=format&fit=crop&w=600&q=80",
    coords: [47.2196, 14.7646],
    accentColor: "#38bdf8"
  },
  {
    id: "zandvoort",
    title: "Circuit Zandvoort",
    location: "Zandvoort, Netherlands",
    description:
      "Recently reintroduced with steep banking and seaside winds near Amsterdam.",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=600&q=80",
    coords: [52.388, 4.5409],
    accentColor: "#f472b6"
  },
  {
    id: "bahrain",
    title: "Bahrain International Circuit",
    location: "Sakhir, Bahrain",
    description:
      "A desert venue under floodlights that regularly opens the season with dramatic racing.",
    image:
      "https://images.unsplash.com/photo-1542367592-e1896219bf07?auto=format&fit=crop&w=600&q=80",
    coords: [26.0325, 50.5106],
    accentColor: "#14b8a6"
  },
  {
    id: "singapore",
    title: "Marina Bay Street Circuit",
    location: "Singapore",
    description:
      "The first ever night race, carving through downtown Singapore with dozens of corners.",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=600&q=80",
    coords: [1.2914, 103.8644],
    accentColor: "#e879f9"
  },
  {
    id: "las-vegas",
    title: "Las Vegas Street Circuit",
    location: "Las Vegas, United States",
    description:
      "A neon-soaked sprint down the Strip featuring long straights and late-night racing.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    coords: [36.1206, -115.1746],
    accentColor: "#fb7185"
  },
  {
    id: "qatar",
    title: "Losail International Circuit",
    location: "Lusail, Qatar",
    description:
      "A smooth, sweeping layout in the Middle East that shines under the lights.",
    image:
      "https://images.unsplash.com/photo-1602080754536-7b1d0c981232?auto=format&fit=crop&w=600&q=80",
    coords: [25.4889, 51.4542],
    accentColor: "#facc15"
  }
];
