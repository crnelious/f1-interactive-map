// Wrap everything in an IIFE so our variables stay private and don't clutter the global scope.
(function () {
  // Our list of favorite circuits; each object powers the sidebar card and the map marker.
  const tracks = [
    {
      id: "monaco",
      title: "Circuit de Monaco",
      location: "Monte Carlo, Monaco",
      description:
        "The legendary street circuit winding through the harbour, packed with tight corners and glamour.",
      image: "./assets/tracks/Monte_Carlo_Formula_1_track_map.png",
      imageAlt: "Track layout of Circuit de Monaco",
      coords: [43.7347, 7.4206]
    },
    {
      id: "silverstone",
      title: "Silverstone Circuit",
      location: "Silverstone, United Kingdom",
      description:
        "The birthplace of Formula 1 and the long-time home of the British Grand Prix.",
      image: "./assets/tracks/Silverstone_Circuit_2020.png",
      imageAlt: "Track layout of Silverstone Circuit",
      coords: [52.0733, -1.014]
    },
    {
      id: "monza",
      title: "Autodromo Nazionale Monza",
      location: "Monza, Italy",
      description:
        'Known as "The Temple of Speed", the fastest track on the calendar and host of the Italian Grand Prix.',
      image: "./assets/tracks/Monza-Circuit.png",
      imageAlt: "Track layout of Autodromo Nazionale Monza",
      coords: [45.6156, 9.2811]
    },
    {
      id: "suzuka",
      title: "Suzuka International Racing Course",
      location: "Suzuka, Japan",
      description:
        "The only figure-eight circuit in F1, famous for the Esses and the 130R corner.",
      image: "./assets/tracks/suzuka.png",
      imageAlt: "Track layout of Suzuka International Racing Course",
      coords: [34.8431, 136.541]
    },
    {
      id: "montreal",
      title: "Circuit Gilles-Villeneuve",
      location: "Montréal, Canada",
      description:
        'A mix of long straights and tight chicanes on Île Notre-Dame, home of the "Wall of Champions".',
      image: "./assets/tracks/Gilles-Villeneuve-circuit-2018.jpg",
      imageAlt: "Track layout of Circuit Gilles-Villeneuve",
      coords: [45.5014, -73.5229]
    },
    {
      id: "cota",
      title: "Circuit of the Americas",
      location: "Austin, United States",
      description:
        "A modern US track with huge elevation changes and a steep climb into turn one.",
      image: "./assets/tracks/Austin_circuit.png",
      imageAlt: "Track layout of Circuit of the Americas",
      coords: [30.1328, -97.6411]
    },
    {
      id: "red-bull-ring",
      title: "Red Bull Ring",
      location: "Spielberg, Austria",
      description:
        "Fast straights, sharp inclines, and alpine backdrops in the Styrian hills.",
      image: "./assets/tracks/Austria_Circuit.avif",
      imageAlt: "Track layout of Red Bull Ring",
      coords: [47.2196, 14.7646]
    },
    {
      id: "zandvoort",
      title: "Circuit Zandvoort",
      location: "Zandvoort, Netherlands",
      description:
        "Recently reintroduced with steep banking and seaside winds near Amsterdam.",
      image: "./assets/tracks/Zandvoort_Circuit.png",
      imageAlt: "Track layout of Circuit Zandvoort",
      coords: [52.388, 4.5409]
    },
    {
      id: "bahrain",
      title: "Bahrain International Circuit",
      location: "Sakhir, Bahrain",
      description:
        "A desert venue under floodlights that regularly opens the season with dramatic racing.",
      image: "./assets/tracks/Bahrain_International_Circuit--Grand_Prix_Layout.png",
      imageAlt: "Track layout of Bahrain International Circuit",
      coords: [26.0325, 50.5106]
    },
    {
      id: "singapore",
      title: "Marina Bay Street Circuit",
      location: "Singapore",
      description:
        "The first ever night race, carving through downtown Singapore with dozens of corners.",
      image: "./assets/tracks/Singapore_Circuit.avif",
      imageAlt: "Track layout of Marina Bay Street Circuit",
      coords: [1.2914, 103.8644]
    },
    {
      id: "las-vegas",
      title: "Las Vegas Street Circuit",
      location: "Las Vegas, United States",
      description:
        "A neon-soaked sprint down the Strip featuring long straights and late-night racing.",
      image: "./assets/tracks/2023_Las_Vegas_street_circuit.svg",
      imageAlt: "Track layout of the Las Vegas Street Circuit",
      coords: [36.1206, -115.1746]
    },
    {
      id: "qatar",
      title: "Losail International Circuit",
      location: "Lusail, Qatar",
      description:
        "A smooth, sweeping layout in the Middle East that shines under the lights.",
      image: "./assets/tracks/Lusail_International_Circuit_2023.png",
      imageAlt: "Track layout of Lusail International Circuit",
      coords: [25.4889, 51.4542]
    }
  ];

  // Starter settings for the map so it shows a world view before anything is selected.
  const DEFAULT_CENTER = [25, 15];
  const DEFAULT_ZOOM = 2;
  const FLY_TO_ZOOM = 14;

  // Path to the dedicated checkered flag icon used for map markers.
  const MARKER_FLAG_SRC = "./assets/icons/noun-checkered-flag-38704.svg";
  const DEFAULT_FLAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 44"><path fill="#15213b" d="M9 6a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H20l-4 4v-4h-5a2 2 0 0 1-2-2z"/><path fill="#fff" d="M11 8h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zM11 12h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zM11 16h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zM11 20h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4zm4 0h4v4h-4z"/></svg>`;
  const DEFAULT_FLAG_DATA_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    DEFAULT_FLAG_SVG
  )}`;

  function getFlagIconSource() {
    return MARKER_FLAG_SRC || DEFAULT_FLAG_DATA_URL;
  }

  // Leaflet loads from a CDN; if it fails we bail out gracefully.
  if (typeof L === "undefined") {
    console.error("Leaflet failed to load.");
    return;
  }

  // Grab the key pieces of the page that this script needs to work with.
  const mapElement = document.getElementById("map");
  const loadingElement = document.getElementById("map-loading");
  const listElement = document.getElementById("track-list");

  // If the HTML is missing the map or list containers, let the developer know and stop.
  if (!mapElement || !listElement) {
    console.error("Map container or track list element is missing.");
    return;
  }

  // Build the Leaflet map with some gentle limits so it behaves nicely.
  const map = L.map(mapElement, {
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    minZoom: 2,
    maxZoom: 19,
    worldCopyJump: true,
    scrollWheelZoom: false
  });

  // Once the map tiles are ready, hide the loading message and fix any sizing hiccups.
  map.whenReady(() => {
    loadingElement?.classList.add("is-hidden");
    map.invalidateSize();
  });

  // Pull in the OpenStreetMap background tiles that give our map its look.
  const tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  );

  // Attach the tiles to the map so they actually appear on screen.
  tileLayer.addTo(map);

  // Tile layers can finish loading at different times, so we hide the spinner again here.
  tileLayer.on("load", () => {
    loadingElement?.classList.add("is-hidden");
  });

  // Custom marker that uses the dedicated checkered flag artwork.
  function createMarkerIcon() {
    return L.divIcon({
      html: `
        <img class="marker-icon__image" src="${getFlagIconSource()}" alt="" aria-hidden="true" />
      `,
      className: "marker-icon marker-icon--flag",
      iconSize: [44, 44],
      iconAnchor: [22, 40],
      popupAnchor: [0, -36]
    });
  }

  // Keep track of every Leaflet marker so we can open and close popups later.
  const markers = new Map();
  // Store whichever track the user last clicked so we can highlight it.
  let activeTrackId = tracks[0]?.id ?? null;

  // Build the sidebar list from scratch, one button per track.
  function renderTrackList() {
    // Clear any existing cards before we rebuild the list.
    listElement.innerHTML = "";

    tracks.forEach((track, index) => {
      // Create a button element so the entry is both clickable and keyboard friendly.
      const card = document.createElement("button");
      card.type = "button";
      card.className = "track-card";
      card.setAttribute("role", "listitem");
      card.dataset.trackId = track.id;

      if (track.id === activeTrackId) {
        card.classList.add("active");
      }

      const mediaMarkup = track.image
        ? `<img class="track-card__image" src="${track.image}" alt="${
            track.imageAlt ?? `${track.title} circuit aerial view`
          }" loading="lazy" />`
        : `<div class="track-card__image track-card__image--placeholder" aria-hidden="true"></div>`;

      card.innerHTML = `
        <div class="track-card__media">
          ${mediaMarkup}
          <span class="track-card__badge">#${index + 1}</span>
        </div>
        <div class="track-card__body">
          <h2 class="track-card__title">${track.title}</h2>
          <p class="track-card__meta">${track.location.toUpperCase()}</p>
          <p class="track-card__description">${track.description}</p>
        </div>
      `;

      // Clicking a card should jump the map to the matching track.
      card.addEventListener("click", () => {
        setActiveTrack(track.id, { fly: true, source: "list" });
      });

      // Drop the finished card into the document.
      listElement.appendChild(card);
    });
  }

  // Leaflet expects DOM nodes for popup content, so we generate one here.
  function createPopupContent(track, index) {
    const container = document.createElement("div");
    container.className = "popup";
    const imageMarkup = track.image
      ? `<img class="popup__image" src="${track.image}" alt="${
          track.imageAlt ?? `${track.title} circuit aerial view`
        }" loading="lazy" />`
      : `<div class="popup__placeholder" aria-hidden="true"></div>`;

    container.innerHTML = `
      <div class="popup__media">${imageMarkup}</div>
      <p class="popup__eyebrow">#${index + 1} Favorite</p>
      <h2 class="popup__title">${track.title}</h2>
      <p class="popup__meta">${track.location}</p>
      <p class="popup__description">${track.description}</p>
    `;
    return container;
  }

  // Place a marker for every track and wire up the click behaviour.
  function addMarkers() {
    tracks.forEach((track, index) => {
      // Create a Leaflet marker at the track's latitude and longitude.
      const marker = L.marker(track.coords, {
        icon: createMarkerIcon()
      });

      marker.addTo(map);
      marker.bindPopup(createPopupContent(track, index));

      // Keep the list and map in sync when someone clicks a marker.
      marker.on("click", () => {
        setActiveTrack(track.id, { fly: true, source: "marker" });
      });

      // Remember the marker so we can reference it later.
      markers.set(track.id, marker);
    });
  }

  // Update the list so only the current track appears highlighted.
  function highlightActiveCard() {
    const cards = listElement.querySelectorAll(".track-card");
    cards.forEach((card) => {
      card.classList.toggle("active", card.dataset.trackId === activeTrackId);
    });
  }

  // Central helper that keeps the map, markers, and list pointing at the same track.
  function setActiveTrack(nextId, options = {}) {
    if (!nextId) return;

    // Remember what was active so we can decide whether to animate.
    const previousId = activeTrackId;
    activeTrackId = nextId;
    highlightActiveCard();

    // Find the full track data for the new selection.
    const track = tracks.find((item) => item.id === activeTrackId);
    if (!track) return;

    if (options.fly && activeTrackId !== previousId) {
      // Smoothly zoom toward the track so it feels like we flew across the map.
      map.flyTo(track.coords, FLY_TO_ZOOM, {
        duration: 1.25,
        easeLinearity: 0.25
      });
    }

    // If we already have a marker stored for this track, make sure its popup matches the UI.
    const marker = markers.get(activeTrackId);
    if (marker) {
      if (options.source === "list" || options.source === "marker") {
        marker.openPopup();
      }
    }
  }

  // Kick off the page by creating the list and the map markers.
  renderTrackList();
  addMarkers();
  highlightActiveCard();

  // If we already picked a starting track, sync everything without flying the map.
  if (activeTrackId) {
    setActiveTrack(activeTrackId, { fly: false });
  }

  // When the window resizes, ask Leaflet to recalc the map layout so tiles don't glitch.
  window.addEventListener("resize", () => {
    // Wait a frame so the browser can finish layout adjustments first.
    window.requestAnimationFrame(() => {
      map.invalidateSize();
    });
  });
})();
