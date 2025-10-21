'use client';

import { useEffect, useMemo } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";

import type { Track } from "../lib/tracks";

const defaultCenter: [number, number] = [25, 15];
const defaultZoom = 2;

const createMarkerIcon = (displayLabel: string) =>
  L.divIcon({
    html: `<span style="
        display:flex;
        align-items:center;
        justify-content:center;
        width:2.5rem;
        height:2.5rem;
        border-radius:0.8rem;
        background:#0f172a;
        color:#ffffff;
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

type FlyToProps = {
  coords: [number, number] | null;
  zoom: number;
};

function FlyTo({ coords, zoom }: FlyToProps) {
  const map = useMap();

  useEffect(() => {
    if (!coords) return;

    map.flyTo(coords, zoom, {
      duration: 1.25,
      easeLinearity: 0.25
    });
  }, [coords, zoom, map]);

  return null;
}

type LeafletMapProps = {
  tracks: Track[];
  activeTrackId: string | null;
  onMarkerSelect: (trackId: string) => void;
};

export default function LeafletMap({
  tracks,
  activeTrackId,
  onMarkerSelect
}: LeafletMapProps) {
  const markerIcons = useMemo(
    () =>
      tracks.map((track, index) =>
        createMarkerIcon(`#${index + 1}`)
      ),
    [tracks]
  );

  const selectedTrack = activeTrackId
    ? tracks.find((track) => track.id === activeTrackId) ?? null
    : null;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      minZoom={2}
      maxZoom={8}
      className="h-full w-full"
      scrollWheelZoom={false}
      worldCopyJump
    >
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
            click: () => onMarkerSelect(track.id)
          }}
        >
          <Popup>
            <div className="w-56 space-y-2">
              <div className="h-28 w-full overflow-hidden rounded-lg">
                <img
                  src={track.image}
                  alt={`${track.title} overview`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                  #{index + 1} Favourite
                </p>
                <h2 className="text-sm font-semibold text-slate-900">
                  {track.title}
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  {track.location}
                </p>
                <p className="text-xs leading-snug text-slate-600">
                  {track.description}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
