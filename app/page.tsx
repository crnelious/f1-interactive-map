'use client';

import { useMemo, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  type MapContainerProps
} from "react-leaflet";

// Each track has the plain-English data we want to show in the sidebar and on the map.
type Track = {
  id: string;
  title: string;
  location: string;
  description: string;
  coords: [number, number];
  accentColor: string;
};

// My favourite circuits list, copied from your notes.
const tracks: Track[] = [
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
      'Known as "The Temple of Speed", the fastest track on the calendar and host of the Italian Grand Prix.',
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
      'A mix of long straights and tight chicanes on Île Notre-Dame, home of the "Wall of Champions".',
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

// The vertical toolbar on the outside edge of the sidebar.
const toolActions = [
  { label: "Dashboard", icon: "🏁" },
  { label: "Layers", icon: "🗺️" },
  { label: "Notes", icon: "📝" },
  { label: "Add", icon: "+" }
];

// Map defaults keep things zoomed out enough to see every pin at once.
const defaultCenter: [number, number] = [25, 15];
const defaultZoom = 2;

// Leaflet markers use HTML, so we can build a pill that matches the sidebar colour.
const createMarkerIcon = (displayLabel: string, color: string) =>
  L.divIcon({
    html: `<span style="
        display:flex;
        align-items:center;
        justify-content:center;
        width:2.5rem;
        height:2.5rem;
        border-radius:0.8rem;
        background:${color};
        color:#0f172a;
        font-weight:700;
        font-size:0.9rem;
        box-shadow:0 10px 25px rgba(15,23,42,0.25);
        border:2px solid rgba(255,255,255,0.9);
      ">${displayLabel}</span>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

// Utility component to animate the map when a track is selected.
function FlyTo({
  coords,
  zoom
}: {
  coords: [number, number] | null;
  zoom: number;
}) {
  const map = useMap();

  if (coords) {
    map.flyTo(coords, zoom, {
      duration: 1.25,
      easeLinearity: 0.25
    });
  }

  return null;
}

export default function Page() {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  // Build one icon per track so markers stay consistent.
  const markerIcons = useMemo(
    () =>
      tracks.map((track, index) =>
        createMarkerIcon(`#${index + 1}`, track.accentColor)
      ),
    []
  );

  const selectedTrack = activeTrackId
    ? tracks.find((track) => track.id === activeTrackId) ?? null
    : null;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-200 text-slate-900">
      {/* Leaflet map sits at the very back, stretched across the whole viewport. */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          minZoom={2}
          maxZoom={8}
          className="h-full w-full"
          scrollWheelZoom={false}
          worldCopyJump
        >
          {/* Fly to the selected track when activeTrackId changes */}
          <FlyTo coords={selectedTrack?.coords ?? null} zoom={5} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {tracks.map((track, index) => (
            <Marker
              key={track.id}
              position={track.coords}
              icon={markerIcons[index]}
              eventHandlers={{
                click: () => setActiveTrackId(track.id)
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    #{index + 1} Favourite
                  </p>
                  <h2 className="text-base font-semibold text-slate-900">
                    {track.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">
                    {track.location}
                  </p>
                  <p className="text-sm leading-snug text-slate-600">
                    {track.description}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Floating sidebar positioned on top of the map. */}
      <aside className="pointer-events-auto absolute left-3 top-6 bottom-6 z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-slate-50/95 shadow-[0_35px_110px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:left-6 sm:top-8 sm:bottom-8 lg:left-10 lg:top-10 lg:bottom-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/95 to-slate-100/90" />
        <div className="pointer-events-none absolute inset-y-6 right-3 w-1 -z-10 rounded-lg bg-slate-200/80 shadow-[inset_0_0_4px_rgba(148,163,184,0.28)]" />

        {/* Floating tool buttons hugging the sidebar edge. */}
        <div className="absolute -left-14 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3 text-slate-500 shadow-[0_20px_45px_rgba(15,23,42,0.18)] sm:flex lg:-left-16 lg:gap-4">
          {toolActions.map((tool) => (
            <button
              key={tool.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
              type="button"
              aria-label={tool.label}
            >
              <span className="text-lg">{tool.icon}</span>
            </button>
          ))}
        </div>

        <div className="relative flex h-full flex-col">
          {/* Sidebar header with a simple badge and title. */}
          <div className="flex items-center gap-3 px-8 pt-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-base font-bold uppercase tracking-widest text-white">
              F1
            </span>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Top Circuits
              </p>
              <p className="text-lg font-semibold text-slate-900">
                Favourite Tracks
              </p>
            </div>
          </div>

          {/* Search bar is optional polish – it reinforces the layout and can be wired up later. */}
          <div className="px-8 pt-6">
            <label
              htmlFor="search"
              className="flex items-center gap-3 rounded-2xl border border-slate-200/60 bg-slate-100 px-4 py-3 text-sm text-slate-500 shadow-inner shadow-white/40"
            >
              <svg
                className="h-4 w-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M15.5 15.5L20 20"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
                <circle
                  cx={11}
                  cy={11}
                  r={6}
                  stroke="currentColor"
                  strokeWidth={1.6}
                />
              </svg>
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search favourite circuits"
                className="flex-1 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
              />
            </label>
          </div>

          {/* Scrollable list of every circuit with an interactive focus button. */}
          <div className="flex-1 overflow-y-auto px-8 pb-10 pt-6">
            <section className="space-y-5">
              <header className="space-y-1">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Top Formula 1 Circuits
                </h1>
                <p className="text-sm text-slate-500">
                  A personal top list of tracks I love watching, each one ready
                  to explore on the map.
                </p>
              </header>

              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTrackId(track.id)}
                    className="group flex w-full gap-4 rounded-xl border border-slate-200/70 bg-slate-100/60 p-4 text-left shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
                  >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-base font-semibold text-white">
                      #{index + 1}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-base font-semibold text-slate-900">
                        {track.title}
                      </h2>
                      <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
                        {track.location}
                      </p>
                      <p className="text-sm leading-snug text-slate-600">
                        {track.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </main>
  );
}
