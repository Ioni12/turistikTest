/* Edit this file to change the map.
   UNITS: polygons of [lon,lat] (approximate borders, NOT official). Scroll order = array order (north to south).
   INFO: flash-card text per unit id.  PLACES: pins; their unit is found automatically from coordinates.
   Only the Theth/Valbona tours are real; the rest are placeholders. */
/* CUTOUTS: transparent PNGs of landmarks (a clean cut-out is enough; the white sticker outline is added in code).
   - Map: each county has one monument that stands on its tile -> {CUTOUT_BASE}/{unit id}.png   (UNITS[].monument has its name + lon/lat)
   - Background collage: the focused county's main monument plus one cut-out per highlight card in INFO ->
     {CUTOUT_BASE}/{unit id}/{card title as a slug}.png   e.g. public/albania/cutouts/shkoder/rozafa-castle.png
   Swiping to a card brings its cut-out to the front. Missing files show a placeholder tower with the name.
   INTRO_IDS: counties whose main monument appears in the intro/outro collage. */
export const CUTOUT_BASE = "/albania/cutouts";
export const INTRO_IDS = ["shkoder", "berat", "tirane", "gjirokaster", "vlore"];

export const UNITS = [
  {
    id: "shkoder",
    monument: { name: "Rozafa Castle", lon: 19.4935, lat: 42.0546 },
    name: "Shkodër",
    main: "Shkodër",
    color: "#FFFFFF",
    tone: "#7FA6B8",
    poly: [
      [19.346, 41.902],
      [19.862, 41.991],
      [19.761, 42.627],
      [19.7, 42.68],
      [19.45, 42.58],
      [19.35, 42.45],
      [19.3, 42.3],
      [19.4, 42.18],
      [19.3, 42.0],
    ],
  },
  {
    id: "kukes",
    monument: { name: "Valbona peaks", lon: 19.9, lat: 42.48 },
    name: "Kukës",
    main: "Kukës",
    color: "#F3EEE4",
    tone: "#8FB39A",
    poly: [
      [19.862, 41.991],
      [20.115, 41.886],
      [20.431, 41.938],
      [20.42, 42.07],
      [20.35, 42.25],
      [20.05, 42.5],
      [19.85, 42.55],
      [19.761, 42.627],
    ],
  },
  {
    id: "lezhe",
    monument: { name: "Skanderbeg Memorial", lon: 19.6435, lat: 41.7837 },
    name: "Lezhë",
    main: "Lezhë",
    color: "#FFFFFF",
    tone: "#C9B27E",
    poly: [
      [19.761, 41.472],
      [19.949, 41.508],
      [20.115, 41.886],
      [19.862, 41.991],
      [19.346, 41.902],
      [19.37, 41.85],
      [19.45, 41.65],
      [19.495, 41.559],
    ],
  },
  {
    id: "diber",
    monument: { name: "Mount Korab", lon: 20.55, lat: 41.79 },
    name: "Dibër",
    main: "Peshkopi",
    color: "#EEE7DA",
    tone: "#A89B86",
    poly: [
      [20.115, 41.886],
      [19.949, 41.508],
      [20.217, 41.278],
      [20.564, 41.242],
      [20.55, 41.3],
      [20.55, 41.45],
      [20.45, 41.7],
      [20.431, 41.938],
    ],
  },
  {
    id: "durres",
    monument: { name: "Roman Amphitheatre", lon: 19.4457, lat: 41.3115 },
    name: "Durrës",
    main: "Durrës",
    color: "#F8F4EC",
    tone: "#7DB4C4",
    poly: [
      [19.563, 41.077],
      [19.761, 41.472],
      [19.495, 41.559],
      [19.55, 41.45],
      [19.45, 41.32],
      [19.4, 41.15],
      [19.4, 41.069],
    ],
  },
  {
    id: "tirane",
    monument: { name: "Tirana Clock Tower", lon: 19.8187, lat: 41.3275 },
    name: "Tiranë",
    main: "Tirana",
    color: "#FFFFFF",
    tone: "#D79C7A",
    poly: [
      [19.835, 40.974],
      [20.217, 41.278],
      [19.949, 41.508],
      [19.761, 41.472],
      [19.563, 41.077],
    ],
  },
  {
    id: "elbasan",
    monument: { name: "Elbasan Castle", lon: 20.0822, lat: 41.1125 },
    name: "Elbasan",
    main: "Elbasan",
    color: "#F1EBDF",
    tone: "#B7A57F",
    poly: [
      [20.217, 41.278],
      [19.835, 40.974],
      [19.876, 40.898],
      [20.368, 40.738],
      [20.624, 41.005],
      [20.564, 41.242],
    ],
  },
  {
    id: "fier",
    monument: { name: "Apollonia", lon: 19.4747, lat: 40.7186 },
    name: "Fier",
    main: "Fier",
    color: "#FAF6EE",
    tone: "#9DBA84",
    poly: [
      [19.638, 40.491],
      [19.876, 40.898],
      [19.835, 40.974],
      [19.563, 41.077],
      [19.4, 41.069],
      [19.4, 40.95],
      [19.45, 40.65],
      [19.49, 40.47],
      [19.468, 40.451],
    ],
  },
  {
    id: "berat",
    monument: { name: "Berat Castle", lon: 19.9503, lat: 40.7058 },
    name: "Berat",
    main: "Berat",
    color: "#EFE8DB",
    tone: "#C98F6E",
    poly: [
      [20.1, 40.374],
      [20.393, 40.523],
      [20.368, 40.738],
      [19.876, 40.898],
      [19.638, 40.491],
    ],
  },
  {
    id: "korce",
    monument: { name: "Resurrection Cathedral", lon: 20.7808, lat: 40.6186 },
    name: "Korçë",
    main: "Korçë",
    color: "#FFFFFF",
    tone: "#8FA9C7",
    poly: [
      [20.368, 40.738],
      [20.393, 40.523],
      [20.822, 40.351],
      [20.85, 40.4],
      [20.97, 40.62],
      [21.05, 40.85],
      [20.75, 41.02],
      [20.65, 40.9],
      [20.624, 41.005],
    ],
  },
  {
    id: "vlore",
    monument: { name: "Butrint", lon: 20.0214, lat: 39.7461 },
    name: "Vlorë",
    main: "Vlorë",
    color: "#F5F0E6",
    tone: "#5FB0C0",
    poly: [
      [20.1, 40.374],
      [19.638, 40.491],
      [19.468, 40.451],
      [19.35, 40.35],
      [19.55, 40.2],
      [19.74, 40.1],
      [19.99, 39.87],
      [20.0, 39.75],
      [20.1, 39.683],
    ],
  },
  {
    id: "gjirokaster",
    monument: { name: "Gjirokastër Castle", lon: 20.1393, lat: 40.0758 },
    name: "Gjirokastër",
    main: "Gjirokastër",
    color: "#EDE6D8",
    tone: "#B89A7A",
    poly: [
      [20.393, 40.523],
      [20.1, 40.374],
      [20.1, 39.683],
      [20.15, 39.65],
      [20.35, 39.8],
      [20.65, 40.05],
      [20.822, 40.351],
    ],
  },
];

/* INFO: card content per unit id. tag + best appear on the overview card; cards = [title, text] pairs, one swipeable card each (add as many as you like).
   A tours card is added automatically from PLACES. */
export const INFO = {
  shkoder: {
    tag: "Lake, castle and the gateway to the Albanian Alps.",
    best: "Hikers · culture lovers",
    cards: [
      [
        "Rozafa Castle",
        "A hilltop fortress above the Buna and Drin rivers, with views over Lake Shkodër.",
      ],
      [
        "Theth and the Blue Eye",
        "A stone-tower village in an alpine valley, with a vivid blue natural pool nearby.",
      ],
      [
        "Alps trekking",
        "Start of classic routes across the Albanian Alps, including the Theth to Valbona crossing.",
      ],
    ],
  },
  kukes: {
    tag: "Wild north-east: deep valleys and big water.",
    best: "Hikers · slow travellers",
    cards: [
      [
        "Valbona Valley",
        "A long green valley beneath limestone peaks, with guesthouses and day hikes.",
      ],
      [
        "Lake Fierza",
        "A large reservoir on the Drin, part of a scenic ferry route through the mountains.",
      ],
      [
        "Village stays",
        "Small family guesthouses where meals use local ingredients.",
      ],
    ],
  },
  lezhe: {
    tag: "Skanderbeg country with long Adriatic beaches.",
    best: "Families · history fans",
    cards: [
      [
        "Skanderbeg memorial",
        "Lezhë is where Albania's national hero is commemorated and buried.",
      ],
      [
        "Shëngjin and Velipoja",
        "Sandy Adriatic beaches, popular with local families in summer.",
      ],
      [
        "Kune-Vain lagoon",
        "Protected wetlands that are good for birdwatching.",
      ],
    ],
  },
  diber: {
    tag: "Home of Mount Korab, Albania's highest peak.",
    best: "Adventurers · nature lovers",
    cards: [
      [
        "Mount Korab",
        "Albania's highest peak, on the border with North Macedonia, reached on multi-day hikes.",
      ],
      [
        "Lura National Park",
        "Glacial lakes and pine forest high in the mountains.",
      ],
      ["Peshkopi thermal baths", "Sulphur hot springs near the county town."],
    ],
  },
  durres: {
    tag: "Ancient port city on the Adriatic coast.",
    best: "Families · beach days",
    cards: [
      [
        "Roman amphitheatre",
        "One of the largest in the Balkans, right inside the city.",
      ],
      [
        "City beachfront",
        "A long Adriatic promenade with cafés and sandy stretches.",
      ],
      ["Easy from Tirana", "A short drive from the capital and the airport."],
    ],
  },
  tirane: {
    tag: "The lively capital and most people's first stop.",
    best: "City breaks · food lovers",
    cards: [
      [
        "Skanderbeg Square",
        "The central plaza, surrounded by museums and the old mosque.",
      ],
      [
        "Blloku",
        "A once-closed neighbourhood, now full of cafés and nightlife.",
      ],
      [
        "Dajti Ekspres",
        "A cable car up Mount Dajti for city views and easy walks.",
      ],
      ["Bunk'Art", "Cold War bunkers turned into museums."],
    ],
  },
  elbasan: {
    tag: "Central Albania: old walls and a green national park.",
    best: "Road trippers · hikers",
    cards: [
      [
        "Old town and castle",
        "Remains of Roman and Ottoman fortifications in the town centre.",
      ],
      [
        "Shebenik-Jabllanicë",
        "A national park of forests and lakes, with rare wildlife.",
      ],
      [
        "On the way to Ohrid",
        "A natural stop on the road between Tirana and Lake Ohrid.",
      ],
    ],
  },
  fier: {
    tag: "Ruins, monasteries and a pelican lagoon.",
    best: "Culture · birdwatching",
    cards: [
      [
        "Apollonia",
        "An ancient city with a small museum and a monastery on site.",
      ],
      [
        "Divjakë-Karavasta",
        "A lagoon national park known for Dalmatian pelicans.",
      ],
      [
        "Ardenica Monastery",
        "A hilltop Orthodox monastery overlooking the coastal plain.",
      ],
    ],
  },
  berat: {
    tag: "The city of a thousand windows.",
    best: "Couples · culture lovers",
    cards: [
      [
        "UNESCO old town",
        "Ottoman houses stacked up the hillside above the river.",
      ],
      ["Berat Castle", "A citadel where people still live inside the walls."],
      ["Osum Canyons", "Rafting or walking in a limestone canyon nearby."],
    ],
  },
  korce: {
    tag: "Lakes, bazaars and a cooler highland feel.",
    best: "Couples · slow travellers",
    cards: [
      [
        "Lake Ohrid",
        "Shared with North Macedonia, with Pogradec as the Albanian lakeside town.",
      ],
      [
        "Korçë bazaar",
        "Restored old market streets with cafés and craft shops.",
      ],
      ["Voskopojë", "A highland village known for its historic churches."],
    ],
  },
  vlore: {
    tag: "The Ionian Riviera: coves, castles and ruins.",
    best: "Summer · couples · families",
    cards: [
      [
        "Riviera beaches",
        "Himara, Dhërmi and hidden coves along the Ionian coast.",
      ],
      ["Butrint", "A UNESCO archaeological site near Saranda and Ksamil."],
      ["Blue Eye spring", "A deep natural spring inland from Sarandë."],
    ],
  },
  gjirokaster: {
    tag: "The stone city and the wild south-east.",
    best: "Culture · rafting · hiking",
    cards: [
      [
        "The stone city",
        "A UNESCO old town of steep Ottoman-era stone houses.",
      ],
      [
        "Gjirokastër castle",
        "A fortress with a museum and views over the valley.",
      ],
      ["Benja springs", "Thermal pools beside a stone bridge near Përmet."],
    ],
  },
};
export const PLACES = [
  {
    n: "Theth",
    lon: 19.77,
    lat: 42.4,
    tours: [
      ["Theth and Blue Eye – 2 days", "€128"],
      ["Theth to Valbona Hiking – 3 days", "€250"],
    ],
  },
  {
    n: "Valbona",
    lon: 19.9,
    lat: 42.48,
    tours: [["Theth to Valbona Hiking – 3 days", "€250"]],
  },
  { n: "Tirana", lon: 19.82, lat: 41.33, tours: [] },
  {
    n: "Berat",
    lon: 19.95,
    lat: 40.7,
    tours: [["Slow Travel Journey – 12 days", "€1,515"]],
  },
  { n: "Gjirokastër", lon: 20.14, lat: 40.08, tours: [] },
  { n: "Himara", lon: 19.74, lat: 40.1, tours: [] },
  {
    n: "Saranda",
    lon: 20.0,
    lat: 39.87,
    tours: [["Grand Mosaic – 10 days (sold out)", "€1,390"]],
  },
];
