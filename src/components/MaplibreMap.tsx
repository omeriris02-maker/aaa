import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Place, Language, Tour } from "../types";
import { generate3100Mosques, getCategoryPlaceholder } from "../data";
import PlacePhoto from "./PlacePhoto";
import logoUrl from "../assets/logo.svg";
import { 
  Search, MapPin, Eye, Star, Compass, Navigation, 
  Heart, X, Info, Phone, Calendar, Globe, EyeOff
} from "lucide-react";

function createGeoJSONCircle(center: [number, number], radiusInKm: number, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0]
  };

  const km = radiusInKm;

  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]); // close the polygon

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [ret]
    },
    properties: {}
  } as any;
}

interface MaplibreMapProps {
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  language: Language;
  showAllMosques: boolean;
  setShowAllMosques: (val: boolean) => void;
  selectedTour: Tour | null;
  onClearTour?: () => void;
  isLight?: boolean;
}

export default function MaplibreMap({
  places,
  selectedPlace,
  onSelectPlace,
  language,
  showAllMosques,
  setShowAllMosques,
  selectedTour,
  onClearTour,
  isLight = false,
}: MaplibreMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const userLocationMarkerRef = useRef<maplibregl.Marker | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("SURROUNDINGS");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activePreviewPlace, setActivePreviewPlace] = useState<Place | null>(null);
  const [selectedMosque, setSelectedMosque] = useState<{ id: number; name: string; lat: number; lng: number } | null>(null);
  const [legendOpen, setLegendOpen] = useState(true);

  // Sync selectedPlace prop with activePreviewPlace state
  useEffect(() => {
    if (selectedPlace) {
      setActivePreviewPlace(selectedPlace);
      // If map is loaded, fly to coordinates
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [selectedPlace.koordinatlar.lng, selectedPlace.koordinatlar.lat],
          zoom: 15,
          essential: true,
          duration: 1500
        });
      }
    }
  }, [selectedPlace]);

  // Update map tiles dynamically when isLight changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const sourceId = "cartodb-positron";
    const tileType = isLight ? "light_all" : "dark_all";
    const newTiles = [
      `https://a.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`,
      `https://b.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`,
      `https://c.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`,
      `https://d.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`
    ];

    const source = map.getSource(sourceId) as any;
    if (source && typeof source.setTiles === "function") {
      source.setTiles(newTiles);
    }
  }, [isLight, mapLoaded]);

  // Handle Geolocation "Where am I?"
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      const toast = document.createElement("div");
      toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#A0423D] text-[#D4A574] border border-[#D4A574]/35 font-sans font-semibold text-xs px-5 py-3 rounded-full shadow-2xl z-[9999] transition-all transform animate-bounce";
      toast.innerText = language === "TR" 
        ? "Tarayıcınız konum özelliğini desteklemiyor." 
        : "Geolocation is not supported by your browser.";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const map = mapRef.current;
        if (!map) return;

        // Fly to location
        map.flyTo({
          center: [longitude, latitude],
          zoom: 15,
          essential: true
        });

        // Add or move user location marker
        if (userLocationMarkerRef.current) {
          userLocationMarkerRef.current.setLngLat([longitude, latitude]);
        } else {
          const el = document.createElement("div");
          el.className = "relative flex items-center justify-center w-8 h-8";
          el.innerHTML = `
            <div class="absolute w-6 h-6 bg-blue-500/30 rounded-full animate-ping"></div>
            <div class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-lg"></div>
          `;
          const marker = new maplibregl.Marker({ element: el })
            .setLngLat([longitude, latitude])
            .addTo(map);
          userLocationMarkerRef.current = marker;
        }
      },
      (error) => {
        console.error("Error getting location: ", error);
        const toast = document.createElement("div");
        toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#A0423D] text-[#D4A574] border border-[#D4A574]/35 font-sans font-semibold text-xs px-5 py-3 rounded-full shadow-2xl z-[9999] transition-all transform animate-bounce";
        toast.innerText = language === "TR" 
          ? "Konumunuz alınamadı. Lütfen tarayıcı izinlerini kontrol edin." 
          : "Could not retrieve location. Please check browser permissions.";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialLat = 37.869417;
    const initialLng = 32.495861;
    const initialZoom = 15;

    // Beautiful CartoDB style
    const tileType = isLight ? "light_all" : "dark_all";
    const styleObj: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        "cartodb-positron": {
          type: "raster",
          tiles: [
            `https://a.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`,
            `https://b.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`,
            `https://c.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`,
            `https://d.basemaps.cartocdn.com/${tileType}/{z}/{x}/{y}@2x.png`
          ],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
        }
      ,
        "mosques-data": {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        }
      },
      layers: [
        {
          id: "cartodb-positron-layer",
          type: "raster",
          source: "cartodb-positron",
          minzoom: 0,
          maxzoom: 20
        }
      ]
    };

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleObj,
      center: [initialLng, initialLat],
      zoom: initialZoom,
      attributionControl: false
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

    map.on("load", () => {
      setMapLoaded(true);
      mapRef.current = map;

      // Add circle source and layer for hotel surroundings (750m)
      map.addSource("hotel-circle-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [createGeoJSONCircle([32.495861, 37.869417], 0.75)]
        }
      });

      map.addLayer({
        id: "hotel-circle-layer",
        type: "fill",
        source: "hotel-circle-source",
        layout: {
          visibility: "none"
        },
        paint: {
          "fill-color": "#A0423D",
          "fill-opacity": 0.08,
          "fill-outline-color": "#A0423D"
        }
      });

      // Add major places labels source and symbol layer with dynamic zoom-level filtering
      map.addSource("major-places-labels", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      });

      map.addLayer({
        id: "major-places-labels-layer",
        type: "symbol",
        source: "major-places-labels",
        filter: [
          "any",
          [">=", ["zoom"], 15.0],
          ["all", [">=", ["zoom"], 13.5], [">=", ["get", "priority"], 2]],
          [">=", ["get", "priority"], 3]
        ],
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Open Sans Regular", "Arial HTML5 Regular"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10, 10,
            14, 11,
            16, 12.5,
            18, 14
          ],
          "text-offset": [0, 1.8],
          "text-anchor": "top",
          "text-max-width": 9,
          "text-allow-overlap": false,
          "text-ignore-placement": false
        },
        paint: {
          "text-color": "#A0423D",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 2.2,
          "text-halo-blur": 0.5
        }
      });
      
      // Setup the 3100+ mosques layers
      const mosquesGeoJSON = {
        type: "FeatureCollection",
        features: generate3100Mosques().map((m) => ({
          type: "Feature",
          id: m.id,
          properties: {
            id: m.id,
            name_tr: m.name_tr,
            name_en: m.name_en,
            lat: m.lat,
            lng: m.lng
          },
          geometry: {
            type: "Point",
            coordinates: [m.lng, m.lat]
          }
        }))
      };

      // Set source data
      const source = map.getSource("mosques-data") as maplibregl.GeoJSONSource;
      if (source && showAllMosques) {
        source.setData(mosquesGeoJSON as any);
      }

      // Add clustered circle layer for mosques
      map.addLayer({
        id: "mosque-clusters",
        type: "circle",
        source: "mosques-data",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "rgba(160, 66, 61, 0.75)", // Bordo color with transparency for cluster
            50,
            "rgba(160, 66, 61, 0.85)",
            150,
            "rgba(160, 66, 61, 0.95)"
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18,
            50,
            24,
            150,
            30
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#D4A574" // Gold border
        }
      });

      // Add count text layer for mosques clusters
      map.addLayer({
        id: "mosque-cluster-counts",
        type: "symbol",
        source: "mosques-data",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count}",
          "text-font": ["Arial Unicode MS Regular"],
          "text-size": 12
        },
        paint: {
          "text-color": "#FFFFFF"
        }
      });

      // Unclustered single mosque layer
      map.addLayer({
        id: "unclustered-mosques",
        type: "circle",
        source: "mosques-data",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#A0423D", // Bordo
          "circle-radius": 7,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#D4A574" // Gold
        }
      });

      // Map click actions for clusters vs points
      map.on("click", "mosque-clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["mosque-clusters"] });
        const clusterId = features[0].properties.cluster_id;
        const source = map.getSource("mosques-data") as maplibregl.GeoJSONSource;
        
        source.getClusterExpansionZoom(clusterId).then((zoom) => {
          const coords = (features[0].geometry as any).coordinates;
          map.easeTo({
            center: coords,
            zoom: zoom + 1
          });
        }).catch((err) => {
          console.error(err);
        });
      });

      map.on("click", "unclustered-mosques", (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["unclustered-mosques"] });
        if (!features.length) return;
        const props = features[0].properties;
        const coords = (features[0].geometry as any).coordinates;
        
        setSelectedMosque({
          id: props.id,
          name: language === "TR" ? props.name_tr : props.name_en,
          lat: coords[1],
          lng: coords[0]
        });

        // Trigger brief sheet preview for the historic neighborhood mosque
        const mockMosquePlace: Place = {
          id: props.id,
          isim_tr: props.name_tr,
          isim_en: props.name_en,
          isim_zh: props.name_en,
          isim_ar: props.name_en,
          kategori: "Cami",
          aciklama_kisa_tr: "Konya Belediyesi Açık Veri Portalı'nda kayıtlı, asırlık tarihi dokuya sahip mahalle camilerimizden biri.",
          aciklama_kisa_en: "One of our historic neighborhood mosques registered in the Konya Municipality Open Data Portal with an ancient spiritual heritage.",
          aciklama_kisa_zh: "科尼亚市政开放数据门户中注册的历史悠久的街区清真寺之一，具有古老的精神传统。",
          aciklama_kisa_ar: "أحد مساجد الأحياء التاريخية المسجلة في بوابة البيانات المفتوحة لبلدية قونية ذو تراث روحي عريق.",
          tarihce_tr: "Bu kutsal mabet, Konya'nın mahalle kültürünü ve asırlardır kesintisiz devam eden ibadet geleneğini yansıtan, kadim vakıf eserleri arasında yer alır.",
          tarihce_en: "This sacred sanctuary stands as part of Konya's neighborhood identity, carrying an unbroken tradition of worship and spiritual charity across centuries.",
          tarihce_zh: "这座神圣的圣所是科尼亚街区身份的一部分，承载着几个世纪以来不间断的崇拜和精神慈善传统。",
          tarihce_ar: "يقف هذا الصرح المقدس كجزء من هوية أحياء قونية، حاملاً تقاليد العبادة والخير الروحي دون انقطاع عبر القرون.",
          koordinatlar: { lat: coords[1], lng: coords[0] },
          adres: "Karatay / Meram / Selçuklu, Konya",
          telefon: "+90 332 351 1074",
          web: "https://www.konyaturizm.gov.tr",
          email: "info@konyaturizm.gov.tr",
          calisma_saatleri: { "Hergün": "İbadet saatleri" },
          giris_ucreti: { tr: "Ücretsiz", en: "Free Entrance", zh: "免费", ar: "مجاني" },
          ziyaret_suresi_dk: 20,
          fotograf_url: ["/logo.svg"],
          etiketler: ["Tarihi", "Cami", "Mahalle"],
          erisilebilirlik: { elevator: false, wheelchair: true, disabledToilet: false, guideService: false },
          puan: 4.6,
          yorum_sayisi: 45
        };
        setActivePreviewPlace(mockMosquePlace);
      });

      // Pointer change on hover
      map.on("mouseenter", "mosque-clusters", () => map.getCanvas().style.cursor = "pointer");
      map.on("mouseleave", "mosque-clusters", () => map.getCanvas().style.cursor = "");
      map.on("mouseenter", "unclustered-mosques", () => map.getCanvas().style.cursor = "pointer");
      map.on("mouseleave", "unclustered-mosques", () => map.getCanvas().style.cursor = "");
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync showAllMosques state with the Maplibre source
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource("mosques-data") as maplibregl.GeoJSONSource;
    if (!source) return;

    if (showAllMosques) {
      const mosquesGeoJSON = {
        type: "FeatureCollection",
        features: generate3100Mosques().map((m) => ({
          type: "Feature",
          id: m.id,
          properties: {
            id: m.id,
            name_tr: m.name_tr,
            name_en: m.name_en,
            lat: m.lat,
            lng: m.lng
          },
          geometry: {
            type: "Point",
            coordinates: [m.lng, m.lat]
          }
        }))
      };
      source.setData(mosquesGeoJSON as any);
      map.setLayoutProperty("mosque-clusters", "visibility", "visible");
      map.setLayoutProperty("mosque-cluster-counts", "visibility", "visible");
      map.setLayoutProperty("unclustered-mosques", "visibility", "visible");
    } else {
      source.setData({ type: "FeatureCollection", features: [] });
      map.setLayoutProperty("mosque-clusters", "visibility", "none");
      map.setLayoutProperty("mosque-cluster-counts", "visibility", "none");
      map.setLayoutProperty("unclustered-mosques", "visibility", "none");
    }
  }, [showAllMosques, mapLoaded]);

  // Dynamically control circle visibility and zoom/pan to hotel for SURROUNDINGS filter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (map.getLayer("hotel-circle-layer")) {
      const isSurroundings = filterCategory === "SURROUNDINGS";
      map.setLayoutProperty(
        "hotel-circle-layer",
        "visibility",
        isSurroundings ? "visible" : "none"
      );

      if (isSurroundings) {
        map.flyTo({
          center: [32.495861, 37.869417],
          zoom: 15.2,
          essential: true,
          duration: 1200
        });
      }
    }
  }, [filterCategory, mapLoaded]);

  // Draw tour route when selectedTour changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    // Clean up existing route layer and source if they exist
    if (map.getLayer("tour-route-layer")) {
      map.removeLayer("tour-route-layer");
    }
    if (map.getSource("tour-route-source")) {
      map.removeSource("tour-route-source");
    }

    if (!selectedTour) return;

    // Sırçalı Hotel is the starting point of our guided tours
    const hotelCoord: [number, number] = [32.495861, 37.869417];
    const routeCoords: [number, number][] = [hotelCoord];

    selectedTour.duraklar.forEach((stopId) => {
      const place = places.find((p) => p.id === stopId);
      if (place) {
        routeCoords.push([place.koordinatlar.lng, place.koordinatlar.lat]);
      }
    });

    if (routeCoords.length < 2) return;

    // Add source
    map.addSource("tour-route-source", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: routeCoords,
        },
      },
    });

    // Add layer
    map.addLayer({
      id: "tour-route-layer",
      type: "line",
      source: "tour-route-source",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#A0423D",
        "line-width": 5,
        "line-opacity": 0.85,
      },
    });

    // Fit bounds to show the entire route
    const bounds = new maplibregl.LngLatBounds();
    routeCoords.forEach((coord) => {
      bounds.extend(coord);
    });
    map.fitBounds(bounds, {
      padding: 80,
      maxZoom: 15,
      duration: 1500,
    });
  }, [selectedTour, mapLoaded, places]);

  // Update curated markers based on query / filter category
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    // Clear old HTML markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const HOTEL_LAT = 37.869417;
    const HOTEL_LNG = 32.495861;

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371e3; // metres
      const phi1 = lat1 * Math.PI/180;
      const phi2 = lat2 * Math.PI/180;
      const deltaPhi = (lat2-lat1) * Math.PI/180;
      const deltaLambda = (lon2-lon1) * Math.PI/180;

      const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c; // in metres
    };

    // Add permanent Sırçalı Hotel Marker
    const hotelEl = document.createElement("div");
    hotelEl.className = "group relative cursor-pointer flex flex-col items-center justify-center";
    hotelEl.innerHTML = `
      <div class="relative flex items-center justify-center">
        <!-- Brand burgundy circular badge with golden border, larger than standard markers -->
        <div class="w-12 h-12 rounded-full bg-[#A0423D] border-2 border-[#D4A574] flex items-center justify-center shadow-xl transform transition hover:scale-115 hover:shadow-2xl duration-300">
          <img src="${logoUrl}" class="w-7.5 h-7.5 object-contain" alt="Sırçalı Hotel Logo" />
        </div>
        <!-- Pulsating brand halo -->
        <div class="absolute -inset-1.5 rounded-full border-2 border-[#A0423D]/50 animate-ping pointer-events-none"></div>
      </div>
    `;

    const hotelPopup = new maplibregl.Popup({ offset: 25, closeButton: false })
      .setHTML(`
        <div class="font-sans p-2 text-center text-xs">
          <b class="text-[#A0423D] block text-sm">Sırçalı Hotel</b>
          <span class="text-gray-500 text-[10px] font-medium">${language === "TR" ? "Konaklama Merkeziniz" : "Your Accommodation"}</span>
        </div>
      `);

    const hotelMarker = new maplibregl.Marker({ element: hotelEl })
      .setLngLat([HOTEL_LNG, HOTEL_LAT])
      .setPopup(hotelPopup)
      .addTo(map);

    markersRef.current.push(hotelMarker);

    // Filter main places
    const filtered = places.filter((p) => {
      if (selectedTour) {
        return selectedTour.duraklar.includes(p.id);
      }
      
      const name = (language === "TR" ? p.isim_tr : language === "ZH" ? p.isim_zh : language === "AR" ? p.isim_ar : p.isim_en).toLowerCase();
      const matchSearch = name.includes(searchQuery.toLowerCase()) ||
        p.kategori.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchCat = false;
      if (filterCategory === "ALL") {
        matchCat = true;
      } else if (filterCategory === "SURROUNDINGS") {
        // Distance within 750m of Sırçalı Madrasa center
        const d = getDistance(p.koordinatlar.lat, p.koordinatlar.lng, HOTEL_LAT, HOTEL_LNG);
        matchCat = d <= 750;
      } else if (filterCategory === "UNESCO") {
        matchCat = p.kategori === "UNESCO" || p.etiketler?.includes("UNESCO");
      } else if (filterCategory === "NATURAL") {
        matchCat = p.kategori === "Park" || p.etiketler?.includes("Doğal") || p.etiketler?.includes("Recreation") || p.isim_en.includes("Garden") || p.isim_en.includes("Valley");
      } else if (filterCategory === "DISTANT") {
        const d = getDistance(p.koordinatlar.lat, p.koordinatlar.lng, HOTEL_LAT, HOTEL_LNG);
        matchCat = d > 5000;
      } else {
        matchCat = p.kategori === filterCategory;
      }

      return matchSearch && matchCat;
    });

    // Render HTML Markers
    filtered.forEach((place) => {
      const el = document.createElement("div");
      el.className = "group relative cursor-pointer flex flex-col items-center justify-center";
      
      // Select marker color & icon based on category
      let markerBg = "bg-[#A0423D]"; // Default Bordo
      let strokeColor = "border-[#D4A574]"; // Default Gold
      let svgIcon = "";

      if (place.kategori === "Cami") {
        markerBg = "bg-[#A0423D]"; // Bordo
        strokeColor = "border-[#D4A574]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#D4A574" stroke-width="2.5" class="w-3.5 h-3.5">
            <path d="M12 2C9 6 8 10 8 14h8c0-4-1-8-4-12z"></path>
            <path d="M6 14h12v6H6z"></path>
            <path d="M12 14v6"></path>
            <path d="M12 2v2"></path>
          </svg>
        `;
      } else if (place.kategori === "Müze") {
        markerBg = "bg-[#D4A574]"; // Altın
        strokeColor = "border-[#A0423D]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" class="w-3.5 h-3.5">
            <path d="M4 20h16M3 20v-2h18v2M4 18v-8h3v8M10 18v-8h3v8M16 18v-8h3v8M3 10l9-6 9 6Z"></path>
          </svg>
        `;
      } else if (place.kategori === "Medrese") {
        markerBg = "bg-[#B45309]"; // Kehribar/Bronz
        strokeColor = "border-[#D4A574]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" class="w-3.5 h-3.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        `;
      } else if (place.kategori === "UNESCO") {
        markerBg = "bg-[#312E81]"; // Lacivert
        strokeColor = "border-[#FFFFFF]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" class="w-3.5 h-3.5">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
        `;
      } else if (place.kategori === "Park") {
        markerBg = "bg-[#059669]"; // Zümrüt Yeşili
        strokeColor = "border-[#D4A574]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" class="w-3.5 h-3.5">
            <path d="M12 2L3 9h18v0z"></path>
            <path d="M12 6l-7 6h14z"></path>
            <path d="M12 10l-8 7h16z"></path>
            <path d="M12 17v5"></path>
          </svg>
        `;
      } else if (place.kategori === "Türbe") {
        markerBg = "bg-[#6B21A8]"; // Spiritual Mor
        strokeColor = "border-[#D4A574]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" class="w-3.5 h-3.5">
            <path d="M12 3a8 8 0 0 0-8 8v9h16v-9a8 8 0 0 0-8-8z"></path>
            <path d="M12 3v3 M9 20v-5h6v5"></path>
          </svg>
        `;
      } else {
        // Otel / general fallback
        markerBg = "bg-[#1E293B]";
        strokeColor = "border-[#D4A574]";
        svgIcon = `
          <svg viewBox="0 0 24 24" fill="none" stroke="#D4A574" stroke-width="2.5" class="w-3.5 h-3.5">
            <path d="M2 4v16M2 11h20M22 4v16M2 17h20"></path>
          </svg>
        `;
      }

      const name = language === "TR" ? place.isim_tr : language === "ZH" ? place.isim_zh : language === "AR" ? place.isim_ar : place.isim_en;

      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="w-9 h-9 rounded-full ${markerBg} border-2 ${strokeColor} flex items-center justify-center shadow-lg transform transition hover:scale-115 hover:shadow-xl duration-300">
            ${svgIcon}
          </div>
        </div>
      `;

      el.addEventListener("click", () => {
        setActivePreviewPlace(place);
        onSelectPlace(place);
        map.flyTo({
          center: [place.koordinatlar.lng, place.koordinatlar.lat],
          zoom: 15.5,
          essential: true
        });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([place.koordinatlar.lng, place.koordinatlar.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Update major places labels layer with dynamic coordinates and translations
    const labelSource = map.getSource("major-places-labels") as maplibregl.GeoJSONSource;
    if (labelSource) {
      const features = places
        .filter((p) => p.is_major)
        .map((p) => {
          const name = language === "TR" 
            ? p.isim_tr 
            : language === "ZH" 
            ? p.isim_zh 
            : language === "AR" 
            ? p.isim_ar 
            : p.isim_en;

          let priority = 1;
          if (p.id === 1 || p.id === 6 || p.id === 4) {
            priority = 3; // Mevlana, Sircali Medrese, Alaeddin
          } else if (p.id === 2 || p.id === 3 || p.id === 5) {
            priority = 2; // Ince Minareli, Karatay, Aziziye
          }

          return {
            type: "Feature",
            properties: {
              name,
              priority
            },
            geometry: {
              type: "Point",
              coordinates: [p.koordinatlar.lng, p.koordinatlar.lat]
            }
          };
        });

      labelSource.setData({
        type: "FeatureCollection",
        features: features as any
      });
    }

  }, [places, searchQuery, filterCategory, mapLoaded, language, selectedTour]);

  // Quick category tags configuration
  const CATEGORIES = [
    { key: "SURROUNDINGS", tr: "Otelin Çevresi (<750m)", en: "Hotel & Surroundings", zh: "酒店周边 (<750米)", ar: "محيط الفندق (<750م)" },
    { key: "ALL", tr: "Tüm Mekanlar", en: "All Places", zh: "所有景点", ar: "جميع المعالم" },
    { key: "UNESCO", tr: "UNESCO Eserleri", en: "UNESCO Sites", zh: "联合国教科文遗迹", ar: "آثار اليونسكو" },
    { key: "Cami", tr: "Tarihi Camiler", en: "Historic Mosques", zh: "历史清真寺", ar: "المساجد التاريخية" },
    { key: "Müze", tr: "Müzeler", en: "Museums", zh: "博物馆", ar: "المتاحف" },
    { key: "NATURAL", tr: "Doğal Alanlar", en: "Natural Areas", zh: "自然风景", ar: "المناطق الطبيعية" },
    { key: "DISTANT", tr: "Uzak Bölgeler", en: "Distant Areas", zh: "较远地区", ar: "المناطق البعيدة" }
  ];

  // Autocomplete search suggestions (real-time below search bar)
  const autocompleteResults = searchQuery.trim().length >= 2
    ? places.filter((p) => {
        const name = (language === "TR" ? p.isim_tr : language === "ZH" ? p.isim_zh : language === "AR" ? p.isim_ar : p.isim_en).toLowerCase();
        return name.includes(searchQuery.toLowerCase()) || p.kategori.toLowerCase().includes(searchQuery.toLowerCase());
      }).slice(0, 5)
    : [];

  return (
    <div id="maplibre-tab-container" className="relative w-full h-full flex flex-col min-h-[500px] md:h-full bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-sm">
      
      {/* Floating Interactive Controls bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-col gap-2.5 max-w-lg">
        {/* Search Input Bar with dropdown */}
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-md border border-[#D4A574]/40 rounded-xl px-3.5 py-2.5 shadow-xl flex items-center gap-2">
            <Search className="w-4 h-4 text-[#D4A574]" />
            <input
              id="map-search-bar"
              type="text"
              placeholder={language === "TR" ? "Tarihi mekan veya camii ara..." : language === "ZH" ? "搜索历史遗迹或清真寺..." : language === "AR" ? "ابحث عن معالم تاريخية أو مساجد..." : "Search historical sites or mosques..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAutocomplete(true);
              }}
              onFocus={() => setShowAutocomplete(true)}
              className="bg-transparent border-none outline-none text-xs text-[#333333] w-full placeholder-[#999999] font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => { 
                  setSearchQuery(""); 
                  setShowAutocomplete(false); 
                }} 
                className="text-[#999999] hover:text-[#333333]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown List */}
          {showAutocomplete && autocompleteResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8E8E8] rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto divide-y divide-[#E8E8E8]">
              {autocompleteResults.map((p) => {
                const name = language === "TR" ? p.isim_tr : language === "ZH" ? p.isim_zh : language === "AR" ? p.isim_ar : p.isim_en;
                return (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setActivePreviewPlace(p);
                      onSelectPlace(p);
                      setShowAutocomplete(false);
                      setSearchQuery("");
                      onClearTour?.();
                      if (mapRef.current) {
                        mapRef.current.flyTo({
                          center: [p.koordinatlar.lng, p.koordinatlar.lat],
                          zoom: 15.5,
                          essential: true
                        });
                      }
                    }}
                    className="px-4 py-2.5 hover:bg-rose-50/50 cursor-pointer flex items-center gap-3 transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-[#A0423D] shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#333333]">{name}</div>
                      <div className="text-[10px] text-[#999999] capitalize">{p.kategori}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Category horizontal list select tag buttons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const label = language === "TR" ? cat.tr : language === "ZH" ? cat.zh : language === "AR" ? cat.ar : cat.en;
            return (
              <button
                key={cat.key}
                id={`filter-tag-${cat.key}`}
                onClick={() => {
                  setFilterCategory(cat.key);
                  onClearTour?.();
                }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide shrink-0 transition-all shadow-sm border cursor-pointer ${
                  filterCategory === cat.key
                    ? "bg-[#A0423D] text-white border-[#A0423D]"
                    : "bg-white/90 text-[#333333] border-[#E8E8E8] hover:bg-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Geolocation and Mosque toggles floating widgets */}
      <div className="absolute left-4 top-[110px] z-10 flex flex-col gap-2">
        {/* Geolocation Button */}
        <button
          id="location-detect-btn"
          onClick={handleGetCurrentLocation}
          title={language === "TR" ? "Şu an neredeyim?" : "Where am I?"}
          className="w-10 h-10 rounded-xl bg-white/95 border border-[#E8E8E8] shadow-lg flex items-center justify-center text-[#A0423D] hover:bg-white transition-all cursor-pointer"
        >
          <Navigation className="w-4.5 h-4.5 fill-[#A0423D]/20 animate-pulse" />
        </button>

        {/* Toggle 3100+ mosques buttons */}
        <button
          id="toggle-mosques-layer-btn"
          onClick={() => setShowAllMosques(!showAllMosques)}
          title={language === "TR" ? "3100+ Camiyi Göster/Gizle" : "Show/Hide 3100+ Mosques"}
          className={`w-10 h-10 rounded-xl border shadow-lg flex items-center justify-center transition-all cursor-pointer ${
            showAllMosques 
              ? "bg-[#A0423D] border-[#A0423D] text-white" 
              : "bg-white/95 border-[#E8E8E8] text-[#999999] hover:bg-white"
          }`}
        >
          {showAllMosques ? <Eye className="w-4.5 h-4.5" /> : <EyeOff className="w-4.5 h-4.5" />}
        </button>
      </div>

      {/* Map Container Ref */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px] md:h-full flex-1 z-0" />

      {/* ELEGANT BOTTOM SHEET FOR SELECTED PLACE DETAILS */}
      {activePreviewPlace && (
        <div 
          id="map-bottom-sheet"
          className="absolute bottom-4 left-4 right-4 z-20 bg-white border border-[#E8E8E8] rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-4 animate-fade-in transition-all max-w-2xl mx-auto"
        >
          {/* Main Photo block */}
          {activePreviewPlace.fotograf_url && activePreviewPlace.fotograf_url.length > 0 && (
            <div className="relative w-full md:w-[140px] h-[100px] md:h-auto rounded-xl overflow-hidden shrink-0 bg-gray-100">
              <PlacePhoto
                place={activePreviewPlace}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-[#A0423D] text-white text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#D4A574]/20 uppercase tracking-widest">
                {activePreviewPlace.kategori}
              </span>
            </div>
          )}

          {/* Texts & Info body */}
          <div className="flex-1 flex flex-col justify-between text-left space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between items-start gap-1">
                <h4 className="font-serif font-bold text-sm text-[#A0423D] leading-tight">
                  {language === "TR" ? activePreviewPlace.isim_tr : language === "ZH" ? activePreviewPlace.isim_zh : language === "AR" ? activePreviewPlace.isim_ar : activePreviewPlace.isim_en}
                </h4>
                <button 
                  onClick={() => setActivePreviewPlace(null)} 
                  className="text-[#999999] hover:text-[#333333] p-1 rounded-full hover:bg-gray-100 shrink-0 transition-all"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Rating block */}
              <div className="flex items-center gap-1 text-xs text-[#D4A574]">
                <Star className="w-3.5 h-3.5 fill-[#D4A574] stroke-[#D4A574]" />
                <span className="font-bold">{activePreviewPlace.puan}</span>
                {activePreviewPlace.yorum_sayisi > 0 && (
                  <span className="text-[#999999] text-[10px]">({activePreviewPlace.yorum_sayisi} {language === "TR" ? "değerlendirme" : "reviews"})</span>
                )}
              </div>

              {/* Short explanation line */}
              <p className="text-[11px] text-[#333333] leading-relaxed line-clamp-2 font-medium">
                {language === "TR" ? activePreviewPlace.aciklama_kisa_tr : language === "ZH" ? activePreviewPlace.aciklama_kisa_zh : language === "AR" ? activePreviewPlace.aciklama_kisa_ar : activePreviewPlace.aciklama_kisa_en}
              </p>
            </div>

            {/* Quick action buttons row */}
            <div className="flex gap-2 pt-2 border-t border-[#E8E8E8]">
              <button
                onClick={() => onSelectPlace(activePreviewPlace)}
                className="flex-1 bg-[#A0423D] hover:bg-opacity-95 text-white font-bold text-[10px] uppercase tracking-wider py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{language === "TR" ? "Detayları Gör" : language === "ZH" ? "查看详情" : language === "AR" ? "عرض التفاصيل" : "View Details"}</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${activePreviewPlace.koordinatlar.lat},${activePreviewPlace.koordinatlar.lng}`, "_blank");
                }}
                className="bg-white hover:bg-gray-50 text-[#D4A574] border border-[#D4A574] font-bold text-[10px] uppercase tracking-wider px-3 py-2 rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 fill-[#D4A574]/10" />
                <span>{language === "TR" ? "Navigasyon" : language === "ZH" ? "导航" : language === "AR" ? "ملاحة" : "Navigate"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating 3100+ active mosque message if showAllMosques is true */}
      {showAllMosques && (
        <div className="absolute top-[200px] left-4 bg-white/90 backdrop-blur-sm border border-[#D4A574]/40 px-2.5 py-1.5 rounded-lg shadow-md text-[9px] font-bold text-[#A0423D] flex items-center gap-1 animate-pulse pointer-events-none">
          <MapPin className="w-3 h-3 fill-[#A0423D]" />
          <span>{language === "TR" ? "3100+ Camii Katmanı Aktif" : "3100+ Mosque Layer Active"}</span>
        </div>
      )}

      {/* MAP LEGEND / HARİTA GÖSTERGESİ */}
      <div 
        id="map-legend-box"
        className="absolute bottom-4 right-4 z-10 flex flex-col items-end"
      >
        {!legendOpen ? (
          <button
            onClick={() => setLegendOpen(true)}
            className="bg-white/95 backdrop-blur-md border border-[#D4A574]/40 px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5 text-[10px] font-bold text-[#A0423D] hover:bg-white transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-[#D4A574]" />
            <span>{language === "TR" ? "Harita Göstergesi" : language === "ZH" ? "地图图例" : language === "AR" ? "مفتاح الخريطة" : "Map Legend"}</span>
          </button>
        ) : (
          <div className="bg-white/95 backdrop-blur-md border border-[#D4A574]/40 p-3 rounded-xl shadow-2xl flex flex-col gap-2 w-48 text-left animate-fade-in">
            <div className="flex justify-between items-center pb-1.5 border-b border-[#E8E8E8]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A0423D]">
                {language === "TR" ? "Harita Göstergesi" : language === "ZH" ? "地图图例" : language === "AR" ? "مfتاح الخريطة" : "Map Legend"}
              </span>
              <button 
                onClick={() => setLegendOpen(false)}
                className="text-[#999999] hover:text-[#333333] p-0.5 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {/* Hotel */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#A0423D] border border-[#D4A574] flex items-center justify-center shrink-0 shadow-sm">
                  <img src={logoUrl} className="w-4.5 h-4.5 object-contain" alt="Sırçalı Hotel Logo" />
                </div>
                <span className="text-[10px] font-bold text-[#A0423D]">Sırçalı Hotel</span>
              </div>

              {/* Cami */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#A0423D] border border-[#D4A574] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth={2.5} className="w-3 h-3">
                    <path d="M12 2C9 6 8 10 8 14h8c0-4-1-8-4-12z M6 14h12v6H6z M12 14v6 M12 2v2"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#333333]">{language === "TR" ? "Cami / Mescit" : language === "ZH" ? "清真寺" : language === "AR" ? "مسجد" : "Mosque"}</span>
              </div>

              {/* Müze */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#D4A574] border border-[#A0423D] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} className="w-3 h-3">
                    <path d="M4 20h16M3 20v-2h18v2M4 18v-8h3v8M10 18v-8h3v8M16 18v-8h3v8M3 10l9-6 9 6Z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#333333]">{language === "TR" ? "Müze" : language === "ZH" ? "博物馆" : language === "AR" ? "متحف" : "Museum"}</span>
              </div>

              {/* Medrese */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#B45309] border border-[#D4A574] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} className="w-3 h-3">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#333333]">{language === "TR" ? "Medrese / Külliye" : language === "ZH" ? "伊斯兰学校" : language === "AR" ? "مدرسة تاريخية" : "Madrasa / Complex"}</span>
              </div>

              {/* UNESCO */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#312E81] border border-[#FFFFFF] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} className="w-3 h-3">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z M2 12h20"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#333333]">{language === "TR" ? "UNESCO Eseri" : language === "ZH" ? "世遗景点" : language === "AR" ? "موقع يونسكو" : "UNESCO Site"}</span>
              </div>

              {/* Park */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#059669] border border-[#D4A574] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} className="w-3 h-3">
                    <path d="M12 2L3 9h18v0z M12 6l-7 6h14z M12 10l-8 7h16z M12 17v5"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#333333]">{language === "TR" ? "Doğal Alan / Park" : language === "ZH" ? "公园/景区" : language === "AR" ? "حديقة / طبيعة" : "Park / Nature"}</span>
              </div>

              {/* Türbe */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#6B21A8] border border-[#D4A574] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} className="w-3 h-3">
                    <path d="M12 3a8 8 0 0 0-8 8v9h16v-9a8 8 0 0 0-8-8z M12 3v3 M9 20v-5h6v5"/>
                  </svg>
                </div>
                <span className="text-[10px] font-medium text-[#333333]">{language === "TR" ? "Türbe / Kabir" : language === "ZH" ? "陵墓" : language === "AR" ? "ضريح" : "Tomb / Shrine"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
