export type Track = {
  id: string;
  title: string;
  location: string;
  description: string;
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
    coords: [43.7347, 7.4206],
    accentColor: "#ef4444"
  },
  {
    id: "silverstone",
    title: "Silverstone Circuit",
    location: "Silverstone, United Kingdom",
    description:
      "The birthplace of Formula 1 and the long-time home of the British Grand Prix.",
    coords: [52.0733, -1.014],
    accentColor: "#60a5fa"
  },
  {
    id: "monza",
    title: "Autodromo Nazionale Monza",
    location: "Monza, Italy",
    description:
      "Known as \"The Temple of Speed\", the fastest track on the calendar and host of the Italian Grand Prix.",
    coords: [45.6156, 9.2811],
    accentColor: "#34d399"
  },
  {
    id: "suzuka",
    title: "Suzuka International Racing Course",
    location: "Suzuka, Japan",
    description:
      "The only figure-eight circuit in F1, famous for the Esses and the 130R corner.",
    coords: [34.8431, 136.541],
    accentColor: "#fbbf24"
  },
  {
    id: "montreal",
    title: "Circuit Gilles-Villeneuve",
    location: "Montréal, Canada",
    description:
      "A mix of long straights and tight chicanes on Île Notre-Dame, home of the \"Wall of Champions\".",
    coords: [45.5014, -73.5229],
    accentColor: "#a855f7"
  },
  {
    id: "cota",
    title: "Circuit of the Americas",
    location: "Austin, United States",
    description:
      "A modern US track with huge elevation changes and a steep climb into turn one.",
    coords: [30.1328, -97.6411],
    accentColor: "#f97316"
  },
  {
    id: "red-bull-ring",
    title: "Red Bull Ring",
    location: "Spielberg, Austria",
    description:
      "Fast straights, sharp inclines, and alpine backdrops in the Styrian hills.",
    coords: [47.2196, 14.7646],
    accentColor: "#38bdf8"
  },
  {
    id: "zandvoort",
    title: "Circuit Zandvoort",
    location: "Zandvoort, Netherlands",
    description:
      "Recently reintroduced with steep banking and seaside winds near Amsterdam.",
    coords: [52.388, 4.5409],
    accentColor: "#f472b6"
  },
  {
    id: "bahrain",
    title: "Bahrain International Circuit",
    location: "Sakhir, Bahrain",
    description:
      "A desert venue under floodlights that regularly opens the season with dramatic racing.",
    coords: [26.0325, 50.5106],
    accentColor: "#14b8a6"
  },
  {
    id: "singapore",
    title: "Marina Bay Street Circuit",
    location: "Singapore",
    description:
      "The first ever night race, carving through downtown Singapore with dozens of corners.",
    coords: [1.2914, 103.8644],
    accentColor: "#e879f9"
  },
  {
    id: "las-vegas",
    title: "Las Vegas Street Circuit",
    location: "Las Vegas, United States",
    description:
      "A neon-soaked sprint down the Strip featuring long straights and late-night racing.",
    coords: [36.1206, -115.1746],
    accentColor: "#fb7185"
  },
  {
    id: "qatar",
    title: "Losail International Circuit",
    location: "Lusail, Qatar",
    description:
      "A smooth, sweeping layout in the Middle East that shines under the lights.",
    coords: [25.4889, 51.4542],
    accentColor: "#facc15"
  }
];
