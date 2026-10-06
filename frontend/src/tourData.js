/* Tour page content. The first entry is copied from the live Grand Mosaic page (wonderalbania.com/tour/albania-grand-mosaic-10-day-tour).
   Add more tours by adding more entries keyed by slug: the page at /tour/<slug> renders from this data.
   TO CONFIRM: the "notIncluded" list (the live page only showed the included items and the flights note), and the photos
   (the live page uses one placeholder image for every day, so days have no photo here). */
const S = 'https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/object/public/tour-media/tours/faa0dc48-b482-46d4-a16a-b19156252d18/';

export const TOUR_PAGES = {
  'albania-grand-mosaic-10-day-tour': {
    slug: 'albania-grand-mosaic-10-day-tour',
    title: 'Albania Grand Mosaic: Alps, Heritage and Riviera',
    summary: 'A carefully paced ten-day arc from northern mountains and Komani water to UNESCO towns, the Vjosa valley and the Ionian coast, with breadth and without treating every day the same.',
    days: 10, price: 1390, level: 'Moderate', levelHref: '/trip-level/moderate', collectionHref: '/collection/moderate',
    images: [S + '72ccdcb6-1748-43ae-be6a-1ef85a0c16c4.jpg', S + 'a59d93b5-b8d5-4758-85bd-1290151084b7.webp'],
    facts: [
      ['All meals included', 'All meals included (unless custom-removed)'],
      ['Nine overnight nights', 'Properties confirmed before travel'],
      ['Private transport', 'Private air-conditioned road transport for the published itinerary'],
      ['Licensed tour leader', 'English- or French-speaking'],
    ],
    about: [
      'A broad ten-day Albania journey linking Alps and Komani, Tirana and Berat, Gjirokastra and the Vjosa, then Butrint and the Riviera.',
      'This original Wonder Albania itinerary is for travellers who want more geographic breadth than a short express tour, without turning the country into a blur. You begin among Kruja and Shkodra\u2019s layers of history, continue into Theth and the Komani boat landscape, then reset in Tirana before Berat\u2019s inhabited castle quarters.',
      'Southward, Apollonia and Gjirokastra lead toward Permet and the Vjosa corridor, then the Blue Eye, Saranda, Butrint and the Riviera before Llogara, Vlora and the return to Tirana. The pace mixes guided visits, scenic travel, free time and optional active moments when confirmed, so mountain, heritage and coast days feel distinct.',
      'Rated moderate: regular walking on stone streets and uneven paths; longer nature walks stay condition-dependent. Book private or join a shared departure when published. All meals are included. International flights are not included.',
    ],
    itinerary: [
      { day: 1, place: 'Shkodra', time: '08:30', visit: ['Kruja and Shkodra', '/destinations/shkoder'], text: 'Leave Tirana for Kruja\u2019s hilltop castle quarter and artisan bazaar, where national history sits beside a working craft street. Continue to Shkodra for Rozafa Castle, a lakeside pause and an evening walk through the pedestrian centre. The day introduces the north without rushing straight into the high mountains. Included meals keep logistics light. Overnight in Shkodra.' },
      { day: 2, place: 'Theth', time: '08:00', visit: ['Theth Valley', '/attractions/theth-national-park'], text: 'Cross the mountain pass into Theth, learn about the valley\u2019s history, and visit its church among traditional stone houses. Choose a guided nature walk suited to the group and current conditions rather than forcing a fixed long hike. Afternoon light in the valley is part of the point of sleeping here. Included dinner and overnight in Theth.' },
      { day: 3, place: 'Komani Lake', time: '07:30', visit: ['Komani Lake and the Drin landscape'], text: 'Travel through northern river valleys for a scheduled boat journey among Komani\u2019s steep slopes. When conditions permit, keep time for swimming or a quiet shoreline break rather than treating the ferry as only a transfer. The day is about water and rock walls after the alpine overnight. Continue toward your overnight base on the return corridor toward Tirana (exact overnight area confirmed before travel).' },
      { day: 4, place: 'Tirana', time: '09:00', visit: ['Tirana beyond the landmarks'], text: 'Return to the capital for a guided city story linking Skanderbeg Square, the New Bazaar, Blloku and contemporary neighbourhood life. Leave independent time after the structured walk so the capital is not only a logistics hub. Included meals and an easier urban day reset the group before the southbound heritage stretch. Overnight in Tirana.' },
      { day: 5, place: 'Berat', time: '08:30', visit: ['Berat and the Osum Valley'], text: 'Walk through Berat Castle and its inhabited quarter, look across the white Ottoman houses, and cross the old neighbourhoods on both sides of the Osum. Share a regional food experience rather than speeding past the viewpoint stops. Evening in town after day visitors leave. Overnight in Berat.' },
      { day: 6, place: 'Gjirokastra', time: '08:00', visit: ['Apollonia and Gjirokastra'], text: 'Trace Albania\u2019s ancient and Ottoman layers at Apollonia before reaching stone-built Gjirokastra. Explore the castle, bazaar lanes and evening atmosphere once the midday traffic thins. The overnight is meant to feel like a stay in the old town, not a quick checkpoint before the next transfer. Overnight in Gjirokastra.' },
      { day: 7, place: 'P\u00ebrmet', time: '08:30', visit: ['P\u00ebrmet and the Vjosa region'], text: 'Follow the Vjosa corridor to Permet for a nature-focused day, local flavours and time near the thermal landscape. A suitable river activity may be added when confirmed for your departure; if not, the day still centres on the valley and town rather than inventing a fixed adrenaline stop. Included meals and a quieter evening. Overnight in Permet.' },
      { day: 8, place: 'Blue Eye', time: '08:30', visit: ['Blue Eye and Saranda'], text: 'Travel south to the clear-water spring of the Blue Eye, walking the shaded approach before continuing to a panoramic viewpoint above Saranda. Free time on the waterfront lets the Ionian overnight breathe after inland days. Swim time depends on season and schedule. Overnight in Saranda.' },
      { day: 9, place: 'Butrint', time: '08:30', visit: ['Butrint and the Ionian bays'], text: 'Explore the archaeological landscape of Butrint, pause near the turquoise coast around Ksamil, and follow the Riviera north toward a relaxed evening in Himara. Keep ruins and swimming as companion pieces of the same coastal day, not two rushed half-stops. Overnight in Himara.' },
      { day: 10, place: 'Vlora', time: '08:30', visit: ['Himara, Llogara and Vlora'], text: 'Complete the journey along the coastal road, stopping at selected viewpoints and villages before crossing Llogara Pass, visiting Vlora\u2019s waterfront and returning to Tirana. Short photo and meal stops replace long hikes on this final transfer day. Arrival depends on traffic. The tour ends in Tirana.' },
    ],
    // route order for the map; entries with `day` are the numbered overnight/main stops
    route: [
      { name: 'Tirana', lon: 19.82, lat: 41.33, start: true },
      { name: 'Kruja', lon: 19.79, lat: 41.51 },
      { name: 'Shkodra', lon: 19.51, lat: 42.07, day: 1 },
      { name: 'Theth', lon: 19.77, lat: 42.40, day: 2 },
      { name: 'Komani Lake', lon: 19.82, lat: 42.10, day: 3 },
      { name: 'Tirana', lon: 19.82, lat: 41.33, day: 4 },
      { name: 'Berat', lon: 19.95, lat: 40.70, day: 5 },
      { name: 'Apollonia', lon: 19.47, lat: 40.72 },
      { name: 'Gjirokastra', lon: 20.14, lat: 40.08, day: 6 },
      { name: 'P\u00ebrmet', lon: 20.35, lat: 40.23, day: 7 },
      { name: 'Blue Eye', lon: 20.19, lat: 39.92 },
      { name: 'Saranda', lon: 20.0, lat: 39.87, day: 8 },
      { name: 'Butrint', lon: 20.02, lat: 39.75, day: 9, label: 'Butrint and Himara' },
      { name: 'Himara', lon: 19.74, lat: 40.10 },
      { name: 'Llogara Pass', lon: 19.58, lat: 40.20 },
      { name: 'Vlora', lon: 19.49, lat: 40.47, day: 10 },
      { name: 'Tirana', lon: 19.82, lat: 41.33, end: true },
    ],
    included: [
      'All meals (breakfast, lunch, dinner) unless customised before booking',
      'Nine nights in overnight areas along the route (properties confirmed before travel)',
      'Private air-conditioned road transport for the published itinerary',
      'Licensed English- or French-speaking tour leader',
      'Entrance fees and scheduled local experiences specifically listed in the confirmed programme',
      'Airport pickup and drop-off on scheduled arrival and departure days as published',
    ],
    notIncluded: ['International flights'],
    highlights: [
      ['Alps to Ionian Sea in one coherent arc', 'Theth and Komani early, then heritage towns and a Riviera finish.'],
      ['Living heritage beyond photo stops', 'Castles, Ottoman quarters, Apollonia and Butrint with guided context.'],
      ['Water landscapes in three moods', 'Komani boat stage, Vjosa valley time and Ionian coastal evenings.'],
      ['Breadth without identical daily rhythm', 'Mountain, city, river and coast days kept intentionally different.'],
      ['Private or shared departure', 'Same regional sequence whether you book privately or join a published group.'],
    ],
    practical: {
      bestTime: { text: 'Late April through June and September through October usually offer comfortable touring weather and fewer crowds. July and August are warmer and livelier on the coast. Mountain and boat stages remain weather-dependent and may be adjusted for safety.', chips: ['Apr\u2013Oct recommended window', '18\u201331\u00b0C typical daytime range', 'Alpine conditions can change quickly'] },
      food: { text: 'All meals on the itinerary are included (breakfast, lunch and dinner) unless you customise before booking. Share dietary needs early; options can be more limited in remote mountain areas.', chips: ['Vegetarian', 'Vegan', 'Halal', 'Gluten-free'] },
      bring: { text: 'A practical shortlist for the journey, with no unnecessary extras.', chips: ['Comfortable walking shoes with good grip', 'Light layers, rain and sun protection', 'Swimwear', 'Reusable water bottle'] },
    },
    levelText: 'An active pace balanced with breaks, with ordinary preparation recommended. Pace, terrain and daily duration are considered together.',
    faqs: [
      { q: 'How active is this journey?', a: 'Moderately active, with regular walking on stone streets and uneven paths. Longer nature walks and any river activity remain optional or condition-dependent when the confirmed itinerary allows.' },
      { q: 'Are the hotels guaranteed by name?', a: 'Overnight areas and accommodation standard are confirmed at booking. Named properties may be replaced by a comparable option when availability requires it.' },
      { q: 'Are meals and flights included?', a: 'All meals listed in the itinerary are included unless you customise before booking. International flights are not included.' },
      { q: 'Is this private or shared?', a: 'Both. Book a private departure for your dates, or join a shared group departure when published. Regional sequence and meals stay the same.' },
      { q: 'What if weather affects a mountain or boat stage?', a: 'The guide may reorder, shorten or replace an affected stage with the safest suitable alternative while protecting the overall Alps-to-coast character of the journey.' },
    ],
    related: [
      { slug: 'essential-albania-express-5-day-tour', image: 'https://wonderalbania.com/images/tours/berat.webp', title: 'Essential Albania Express', sub: 'UNESCO towns and Riviera', days: 5, price: 790, level: 'Easy', availability: 'available', rating: 5.0, reviews: 3 },
      { slug: 'albania-signature-journey-8-days', image: 'https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/render/image/public/tour-media/tours/a11a2432-5a53-429a-82e3-f05c40e2d91a/22910db9-98ac-4dcd-8317-510a371f011c.webp?width=768&quality=78', title: 'Albania Signature Journey', sub: 'Mountains to Mediterranean', days: 8, price: 1090, level: 'Moderate', availability: 'available', rating: null, reviews: 0 },
      { slug: 'theth-alpine-adventure', image: 'https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/render/image/public/tour-media/tours/4e3c43c6-bc81-4012-b677-2d6dcfac34ea/4175e3f3-abd3-4b36-b437-e5e3487ba801.jpg?width=768&quality=78', title: 'Theth and Blue Eye', sub: '2-day Alps escape', days: 2, price: 128, level: 'Moderate', availability: 'available', rating: 5.0, reviews: 1 },
    ],
  },
};
