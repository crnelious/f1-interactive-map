(function () {
  const tracks = [
    {
      id: "monaco",
      title: "Circuit de Monaco",
      location: "Monte Carlo, Monaco",
      description:
        "The legendary street circuit winding through the harbour, packed with tight corners and glamour.",
      image: null,
      coords: [43.7347, 7.4206]
    },
    {
      id: "silverstone",
      title: "Silverstone Circuit",
      location: "Silverstone, United Kingdom",
      description:
        "The birthplace of Formula 1 and the long-time home of the British Grand Prix.",
      image: null,
      coords: [52.0733, -1.014]
    },
    {
      id: "monza",
      title: "Autodromo Nazionale Monza",
      location: "Monza, Italy",
      description:
        'Known as "The Temple of Speed", the fastest track on the calendar and host of the Italian Grand Prix.',
      image: null,
      coords: [45.6156, 9.2811]
    },
    {
      id: "suzuka",
      title: "Suzuka International Racing Course",
      location: "Suzuka, Japan",
      description:
        "The only figure-eight circuit in F1, famous for the Esses and the 130R corner.",
      image: null,
      coords: [34.8431, 136.541]
    },
    {
      id: "montreal",
      title: "Circuit Gilles-Villeneuve",
      location: "Montréal, Canada",
      description:
        'A mix of long straights and tight chicanes on Île Notre-Dame, home of the "Wall of Champions".',
      image: null,
      coords: [45.5014, -73.5229]
    },
    {
      id: "cota",
      title: "Circuit of the Americas",
      location: "Austin, United States",
      description:
        "A modern US track with huge elevation changes and a steep climb into turn one.",
      image: null,
      coords: [30.1328, -97.6411]
    },
    {
      id: "red-bull-ring",
      title: "Red Bull Ring",
      location: "Spielberg, Austria",
      description:
        "Fast straights, sharp inclines, and alpine backdrops in the Styrian hills.",
      image: null,
      coords: [47.2196, 14.7646]
    },
    {
      id: "zandvoort",
      title: "Circuit Zandvoort",
      location: "Zandvoort, Netherlands",
      description:
        "Recently reintroduced with steep banking and seaside winds near Amsterdam.",
      image: null,
      coords: [52.388, 4.5409]
    },
    {
      id: "bahrain",
      title: "Bahrain International Circuit",
      location: "Sakhir, Bahrain",
      description:
        "A desert venue under floodlights that regularly opens the season with dramatic racing.",
      image: null,
      coords: [26.0325, 50.5106]
    },
    {
      id: "singapore",
      title: "Marina Bay Street Circuit",
      location: "Singapore",
      description:
        "The first ever night race, carving through downtown Singapore with dozens of corners.",
      image: null,
      coords: [1.2914, 103.8644]
    },
    {
      id: "las-vegas",
      title: "Las Vegas Street Circuit",
      location: "Las Vegas, United States",
      description:
        "A neon-soaked sprint down the Strip featuring long straights and late-night racing.",
      image: null,
      coords: [36.1206, -115.1746]
    },
    {
      id: "qatar",
      title: "Losail International Circuit",
      location: "Lusail, Qatar",
      description:
        "A smooth, sweeping layout in the Middle East that shines under the lights.",
      image: null,
      coords: [25.4889, 51.4542]
    }
  ];

  const DEFAULT_CENTER = [25, 15];
  const DEFAULT_ZOOM = 2;
  const FLY_TO_ZOOM = 14;

  if (typeof L === "undefined") {
    console.error("Leaflet failed to load.");
    return;
  }

  const mapElement = document.getElementById("map");
  const loadingElement = document.getElementById("map-loading");
  const listElement = document.getElementById("track-list");

  if (!mapElement || !listElement) {
    console.error("Map container or track list element is missing.");
    return;
  }

  const map = L.map(mapElement, {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    minZoom: 2,
    maxZoom: 19,
    worldCopyJump: true,
    scrollWheelZoom: false
  });

  map.whenReady(() => {
    loadingElement?.classList.add("is-hidden");
    map.invalidateSize();
  });

  const tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  );

  tileLayer.addTo(map);

  tileLayer.on("load", () => {
    loadingElement?.classList.add("is-hidden");
  });

  function createMarkerIcon(label) {
    return L.divIcon({
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
        ">${label}</span>`,
      className: "marker-icon",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20]
    });
  }

  const markers = new Map();
  let activeTrackId = tracks[0]?.id ?? null;

  function renderTrackList() {
    listElement.innerHTML = "";

    tracks.forEach((track, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "track-card";
      card.setAttribute("role", "listitem");
      card.dataset.trackId = track.id;

      if (track.id === activeTrackId) {
        card.classList.add("active");
      }

      card.innerHTML = `
        <span class="track-card__badge">#${index + 1}</span>
        <span>
          <h2 class="track-card__title">${track.title}</h2>
          <p class="track-card__meta">${track.location.toUpperCase()}</p>
          <p class="track-card__description">${track.description}</p>
        </span>
      `;

      card.addEventListener("click", () => {
        setActiveTrack(track.id, { fly: true, source: "list" });
      });

      listElement.appendChild(card);
    });
  }

  function createPopupContent(track, index) {
    const container = document.createElement("div");
    container.className = "popup";
    container.innerHTML = `
      <div class="popup__placeholder" aria-hidden="true"></div>
      <p class="popup__eyebrow">#${index + 1} Favourite</p>
      <h2 class="popup__title">${track.title}</h2>
      <p class="popup__meta">${track.location}</p>
      <p class="popup__description">${track.description}</p>
    `;
    return container;
  }

  function addMarkers() {
    tracks.forEach((track, index) => {
      const marker = L.marker(track.coords, {
        icon: createMarkerIcon(`#${index + 1}`)
      });

      marker.addTo(map);
      marker.bindPopup(createPopupContent(track, index));

      marker.on("click", () => {
        setActiveTrack(track.id, { fly: true, source: "marker" });
      });

      markers.set(track.id, marker);
    });
  }

  function highlightActiveCard() {
    const cards = listElement.querySelectorAll(".track-card");
    cards.forEach((card) => {
      card.classList.toggle("active", card.dataset.trackId === activeTrackId);
    });
  }

  function setActiveTrack(nextId, options = {}) {
    if (!nextId) return;

    const previousId = activeTrackId;
    activeTrackId = nextId;
    highlightActiveCard();

    const track = tracks.find((item) => item.id === activeTrackId);
    if (!track) return;

    if (options.fly && activeTrackId !== previousId) {
      map.flyTo(track.coords, FLY_TO_ZOOM, {
        duration: 1.25,
        easeLinearity: 0.25
      });
    }

    const marker = markers.get(activeTrackId);
    if (marker) {
      if (options.source === "list" || options.source === "marker") {
        marker.openPopup();
      }
    }
  }

  renderTrackList();
  addMarkers();
  highlightActiveCard();

  if (activeTrackId) {
    setActiveTrack(activeTrackId, { fly: false });
  }

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(() => {
      map.invalidateSize();
    });
  });
})();
