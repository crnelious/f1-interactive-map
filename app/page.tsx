'use client';

import { useState } from "react";
import dynamic from "next/dynamic";
import { tracks } from "../lib/tracks";

const toolActions = [
  { label: "Dashboard", icon: "🏁" },
  { label: "Layers", icon: "🗺️" },
  { label: "Notes", icon: "📝" },
  { label: "Add", icon: "+" }
];

const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm text-slate-500">
      Loading map…
    </div>
  )
});

export default function Page() {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(
    tracks[0]?.id ?? null
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-200 text-slate-900">
      <div className="absolute inset-0 z-0">
        <LeafletMap
          tracks={tracks}
          activeTrackId={activeTrackId}
          onMarkerSelect={setActiveTrackId}
        />
      </div>

      <aside className="pointer-events-auto absolute left-3 top-6 bottom-6 z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-[1.5rem] border border-white/60 bg-slate-50/95 shadow-[0_35px_110px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:left-6 sm:top-8 sm:bottom-8 lg:left-10 lg:top-10 lg:bottom-10">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white via-white/95 to-slate-100/90" />
        <div className="pointer-events-none absolute inset-y-6 right-3 w-1 -z-10 rounded-lg bg-slate-200/80 shadow-[inset_0_0_4px_rgba(148,163,184,0.28)]" />

        <div className="absolute -left-14 top-1/2 z-10 hidden np-translate-y-1/2 flex-col items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3 text-slate-500 shadow-[0_20px_45px_rgba(15,23,42,0.18)] sm:flex lg:-left-16 lg:gap-4">
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
                disabled
              />
            </label>
          </div>

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
                {tracks.map((track, index) => {
                  const isActive = activeTrackId === track.id;

                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setActiveTrackId(track.id)}
                      className={`group flex w-full gap-4 rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
                        isActive
                          ? "border-slate-400 bg-white shadow-lg"
                          : "border-slate-200/70 bg-slate-100/60 shadow-slate-900/5"
                      }`}
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
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </main>
  );
}
