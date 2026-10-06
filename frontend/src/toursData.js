/* Master list of tours, used by the tours list, collection pages and county pages.
   Titles, days, prices, ratings and slugs come from the live site. TO CONFIRM: every `level` except the Grand Mosaic's,
   every `kinds` / `who` / `counties` list (my guesses), and availability (the homepage says the Grand Mosaic is Sold Out).
   `counties` are county ids from albaniaData.js; they decide which county pages list the tour. */
const S = 'https://vlunzjvalrwlcazcaefl.supabase.co/storage/v1/render/image/public/';

export const ALL_TOURS = [
  { slug: 'theth-alpine-adventure', image: S + 'tour-media/tours/4e3c43c6-bc81-4012-b677-2d6dcfac34ea/4175e3f3-abd3-4b36-b437-e5e3487ba801.jpg?width=768&quality=78', title: 'Theth and Blue Eye', sub: '2-day Alps escape', days: 2, price: 128, level: 'Moderate', kinds: ['hiking', 'adventure'], who: ['couple', 'friends'], counties: ['shkoder'], availability: 'available', rating: 5.0, reviews: 1 },
  { slug: 'theth-valbona-hiking-adventure', image: S + 'tour-media/tours/30d562ce-38eb-464f-b6d2-dc183f0544f9/21f61b58-2022-403a-b6fa-b3b662f891a0.webp?width=768&quality=78', title: 'Theth to Valbona Hiking Adventure', sub: '3-day Alps crossing', days: 3, price: 250, level: 'Moderate', kinds: ['hiking', 'adventure'], who: ['couple', 'friends'], counties: ['shkoder', 'kukes'], availability: 'available', rating: 5.0, reviews: 1 },
  { slug: 'essential-albania-express-5-day-tour', image: 'https://wonderalbania.com/images/tours/berat.webp', title: 'Essential Albania Express', sub: 'UNESCO towns and Riviera', days: 5, price: 790, level: 'Easy', kinds: ['cultural', 'beach'], who: ['family', 'couple', 'friends'], counties: ['tirane', 'berat', 'vlore'], availability: 'available', rating: 5.0, reviews: 3 },
  { slug: 'albania-signature-journey-8-days', image: S + 'tour-media/tours/a11a2432-5a53-429a-82e3-f05c40e2d91a/22910db9-98ac-4dcd-8317-510a371f011c.webp?width=768&quality=78', title: 'Albania Signature Journey', sub: 'Mountains to Mediterranean', days: 8, price: 1090, level: 'Moderate', kinds: ['cultural', 'hiking', 'beach'], who: ['couple', 'friends'], counties: ['shkoder', 'tirane', 'berat', 'vlore'], availability: 'available', rating: null, reviews: 0 },
  { slug: 'albania-grand-mosaic-10-day-tour', image: S + 'tour-media/tours/faa0dc48-b482-46d4-a16a-b19156252d18/72ccdcb6-1748-43ae-be6a-1ef85a0c16c4.jpg?width=768&quality=78', title: 'Albania Grand Mosaic', sub: 'Alps, heritage and Riviera', days: 10, price: 1390, level: 'Moderate', kinds: ['cultural', 'hiking', 'beach'], who: ['family', 'couple', 'friends'], counties: ['durres', 'shkoder', 'tirane', 'fier', 'berat', 'gjirokaster', 'vlore'], availability: 'sold-out', rating: null, reviews: 0 },
  { slug: 'albania-slow-travel-journey', image: S + 'site-media/library/2026/a9bc420e-78bb-41e9-b6dd-0f024b6f5d7f.jpg?width=768&quality=78', title: 'Albania Slow Travel Journey', sub: 'Cultural and coastal adventure', days: 12, price: 1515, level: 'Moderate', kinds: ['cultural', 'beach'], who: ['family', 'couple', 'friends'], counties: ['berat', 'vlore', 'gjirokaster'], availability: 'available', rating: 4.5, reviews: 2 },
];

// /collection/<slug> pages. Slugs match the live site. The intro lines are suggestions.
export const COLLECTION_PAGES = {
  'couples-holidays': { title: 'Couples Holidays', color: '#F0B58F', intro: 'Romantic escapes for two: candle-lit old towns, quiet viewpoints and unhurried days.', match: (t) => t.who.includes('couple') },
  'family-holiday': { title: 'Family Holidays', color: '#F2D58A', intro: 'Easy adventures for all ages, with a pace that keeps everyone happy.', match: (t) => t.who.includes('family') },
  'summer-holidays': { title: 'Summer Holidays', color: '#8CC5D8', intro: 'Sun, sea and the Ionian coast, with culture on the way.', match: (t) => t.kinds.includes('beach') },
  'hiking-tours': { title: 'Hiking Tours', color: '#9CCB7A', intro: 'Alps trails, mountain villages and guided crossings.', match: (t) => t.kinds.includes('hiking') },
  moderate: { title: 'Moderate-level trips', color: '#BBDF86', intro: 'An active pace balanced with breaks, with ordinary preparation recommended.', match: (t) => t.level === 'Moderate' },
};
