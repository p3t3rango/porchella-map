import type { TimeSlot } from "@/lib/time";

// ─── Types ───────────────────────────────────────────────────────────

export type Band = {
  id: string;
  name: string;
  genre: string;
  description?: string;
  image?: string;
  social: {
    instagram?: string;
    facebook?: string;
    bandcamp?: string;
    website?: string;
    youtube?: string;
    linktree?: string;
  };
  music?: {
    type: "spotify" | "bandcamp" | "youtube";
    url: string; // link to artist/album page
    embedId?: string; // Spotify artist ID, Bandcamp album ID, or YouTube video ID
  };
  tip?: {
    venmo?: string;
    paypal?: string;
    note?: string;
  };
};

export type Venue = {
  id: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  street: string;
};

export type Performance = {
  bandId: string;
  venueId: string;
  timeSlot: TimeSlot;
};

export type AmenityType = "food-truck" | "porta-potty" | "merch" | "info" | "sponsor" | "trash";

export type Amenity = {
  id: string;
  type: AmenityType;
  coordinates: [number, number];
  label: string;
};

export type FoodTruck = {
  id: string;
  name: string;
  description?: string;
  website?: string;
};

export type StreetClosure = {
  id: string;
  street: string;
  type: "closed" | "thru-traffic" | "caution";
  description: string;
  startTime: string;
  endTime: string;
  coordinates: [number, number][];
};

// ─── Bands ───────────────────────────────────────────────────────────

export const bands: Band[] = [
  {
    id: "river-city-taiko",
    name: "River City Taiko",
    genre: "Japanese Drumming",
    description: "A community ensemble based in Richmond, VA, that plays traditional Japanese drums.",
    image: "/images/river-city-taiko.png",
    social: {
      website: "http://www.rivercitytaiko.com/home.html",
      facebook: "https://www.facebook.com/105360589634285",
    },
    tip: {},
  },
  {
    id: "tiny-lights",
    name: "Tiny Lights",
    genre: "Indie/Alternative",
    description: "An Indie/Alternative rock trio specializing in compact songs with harmonized vocals.",
    image: "/images/tiny-lights.jpeg",
    social: {
      bandcamp: "https://tinylightsrva.bandcamp.com/releases",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/6HvgZ9EgcwU2vDzstetoGu", embedId: "6HvgZ9EgcwU2vDzstetoGu" },
    tip: {},
  },
  {
    id: "4la7la",
    name: "4la7la",
    genre: "Indie/Alt-Pop",
    description: "Creates emotionally immersive soundscapes rooted in vulnerability, transformation and cinematic intimacy.",
    image: "/images/4la7la.png",
    social: {
      instagram: "https://www.instagram.com/4la7la/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/0uyMAQURKmSQXrHynnDZZC", embedId: "0uyMAQURKmSQXrHynnDZZC" },
    tip: { venmo: "fourla7la" },
  },
  {
    id: "cary-street-ramblers",
    name: "Cary Street Ramblers",
    genre: "Traditional String Band",
    description: "Bring an engaging and authentic experience to acoustic music enthusiasts.",
    image: "/images/cary-street-ramblers.png",
    social: {},
    music: { type: "bandcamp", url: "https://carystreetramblers.bandcamp.com" },
    tip: {},
  },
  {
    id: "burns-burly-west",
    name: "Burns Burly West",
    genre: "Alternative/Indie",
    description: "Old friends come together to realize the dream of playing power pop 90s impaired alternative/indie rock.",
    image: "/images/burns-burly-west.png",
    social: {
      instagram: "https://www.instagram.com/burnsburlywest/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/3RAYYGyN1Wm76lNwxlQO5n", embedId: "3RAYYGyN1Wm76lNwxlQO5n" },
    tip: {},
  },
  {
    id: "sad-biscuit-jones",
    name: "Sad Biscuit Jones",
    genre: "Garage Rock",
    description: "A bit of folk, a dash of punk, a dollop of rock, and a pinch of country with roots rock covers.",
    image: "/images/sad-biscuit-jones.jpeg",
    social: {
      facebook: "https://www.facebook.com/SadBiscuitJones/",
    },
    tip: {},
  },
  {
    id: "sister-planet",
    name: "Sister Planet",
    genre: "Psych/Rock/Pop",
    description: "Trio from Richmond, VA, formed in winter of 2023.",
    image: "/images/sister-planet.jpg",
    social: {
      instagram: "https://www.instagram.com/sisterplanetband/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/3J1MRq1rEP9dEIAcFG7hQM", embedId: "3J1MRq1rEP9dEIAcFG7hQM" },
    tip: { venmo: "Charles-Clark-18" },
  },
  {
    id: "brookhouse",
    name: "Brookhouse",
    genre: "Latin-Flavored Jazzy Rock",
    description: "A celebration of the American melting pot \u2014 bilingual jazzy rock music infused with Latin Americana.",
    image: "/images/brookhouse.jpg",
    social: {
      website: "http://www.brookhousemusic.com",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/3Q3bvJH208sRHWL8THw9Ys", embedId: "3Q3bvJH208sRHWL8THw9Ys" },
    tip: { venmo: "brookhouse-music", paypal: "https://www.paypal.com/ncp/payment/MDLA9QW26GKJL" },
  },
  {
    id: "lagoon-musique",
    name: "Lagoon Musique",
    genre: "Tahitian Kaina Music",
    description: "Honors traditional and contemporary folk and ukulele music from central Polynesia.",
    image: "/images/lagoon-musique.png",
    social: {
      instagram: "https://www.instagram.com/lagoon__musique/",
    },
    tip: { note: "100% of proceeds are donated to the Tetiaroa Foundation" },
  },
  {
    id: "tarrant",
    name: "Tarrant",
    genre: "Rock/Americana",
    description: "Original music, rock, Americana.",
    image: "/images/tarrant.png",
    social: {
      facebook: "https://www.facebook.com/tarrantmusic/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/1ak4w6EgeMtCMjPmKsE9H0", embedId: "1ak4w6EgeMtCMjPmKsE9H0" },
    tip: { venmo: "zachary-hudgins" },
  },
  {
    id: "the-high-frequencies",
    name: "The High Frequencies",
    genre: "Power Pop",
    description: "High energy band with the energy of 60s bands like The Who and The Kinks.",
    image: "/images/the-high-frequencies.jpeg",
    social: {
      facebook: "https://www.facebook.com/TheHighFrequenciesMusic",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/4MdvuHqB7XJ5JytsFzdEJV", embedId: "4MdvuHqB7XJ5JytsFzdEJV" },
    tip: {},
  },
  {
    id: "hard-pill-to-swallow",
    name: "Hard Pill to Swallow",
    genre: "Rock",
    description: "Makes music for people \u2014 not playlists. Free from genre constraints.",
    image: "/images/hard-pill-to-swallow.png",
    social: {
      website: "http://hardpilltoswallow.band",
    },
    tip: { venmo: "JC-WILLIAMS-0" },
  },
  {
    id: "the-approach",
    name: "The Approach",
    genre: "Rock/Blues/Jam/Folk",
    description: "Crunchy cacophony of rock & roll, building a wall of sound.",
    image: "/images/the-approach.png",
    social: {
      youtube: "https://www.youtube.com/@seancastleberrymusic7769",
    },
    music: { type: "youtube", url: "https://www.youtube.com/@seancastleberrymusic7769" },
    tip: { venmo: "sean-castleberry" },
  },
  {
    id: "the-rhythmasters",
    name: "The Rhythmasters",
    genre: "Jazz",
    description: "Rotating singers front this Jazz group from Richmond, VA since 2007.",
    image: "/images/the-rhythmasters.png",
    social: {
      instagram: "https://www.instagram.com/therhythmastersrva/",
    },
    tip: {},
  },
  {
    id: "ultrasuede",
    name: "Ultrasuede",
    genre: "Alt/Indie/Punk",
    description: "Covers of songs from Devo to REM \u2014 fun and energetic Alt rock/Punk.",
    image: "/images/ultrasuede.png",
    social: {
      instagram: "https://www.instagram.com/ultrasuederox",
    },
    tip: { venmo: "Adolfo-Bacigalupo" },
  },
  {
    id: "the-lonely-teardrops",
    name: "The Lonely Teardrops",
    genre: "Mod Garage",
    description: "Mod garage Rock n Roll band with a lot of soul, a dash of surf.",
    image: "/images/the-lonely-teardrops.jpg",
    social: {
      instagram: "https://www.instagram.com/thelonelyteardrops/",
    },
    music: { type: "bandcamp", url: "https://thelonelyteardrops.bandcamp.com" },
    tip: {},
  },
  {
    id: "kozy-cats",
    name: "Kozy Cats",
    genre: "Classic R&B and Pop",
    description: "Fun times for the young at heart.",
    image: "/images/kozy-cats.jpg",
    social: {
      facebook: "https://www.facebook.com/SoulAndClassicPop",
    },
    tip: {},
  },
  {
    id: "the-blue-guitar",
    name: "The Blue Guitar",
    genre: "Rock/R&B/Jazz",
    description: "Guitar-centric trio that plays unique, instrumental versions.",
    image: "/images/the-blue-guitar.jpeg",
    social: {
      facebook: "https://www.facebook.com/TheBlueGuitarRVA",
    },
    tip: { venmo: "David-Schieferstein-1" },
  },
  {
    id: "floodwall",
    name: "Floodwall",
    genre: "Alt-Rock",
    description: "Grungey gazey alt-rock fourpiece with big feelings.",
    image: "/images/floodwall.png",
    social: {
      instagram: "https://www.instagram.com/floodwall_",
    },
    music: { type: "bandcamp", url: "https://floodwall.bandcamp.com" },
    tip: { venmo: "foodzn" },
  },
  {
    id: "bellevue-bon-temps",
    name: "Bellevue Bon Temps",
    genre: "Cajun",
    description: "Traditional Cajun music from French-speaking Southwest Louisiana \u2014 spirited 2-steps and lovely waltzes. Bruce Stoneman plays fiddle and Cajun accordion, Larry Wiley plays fiddle, Kat Stoneman plays guitar and vocals, and Sandy Kralian plays vocals and fiddle.",
    image: "/images/bellevue-bon-temps.jpeg",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=100064084150225",
    },
    tip: { note: "In lieu of tips please help us support the Red Cross!" },
  },
  {
    id: "crack-fox",
    name: "Crack Fox",
    genre: "Blues Punk",
    description: "Avant trash can music with an 80s punk underground aesthetic.",
    image: "/images/crack-fox.jpg",
    social: {
      bandcamp: "https://crackfoxrva.bandcamp.com/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/6thEbLiYB1L7b97rEOH2Rk", embedId: "6thEbLiYB1L7b97rEOH2Rk" },
    tip: { venmo: "Philmento" },
  },
  {
    id: "sleepy-joes-distortion-unit",
    name: "Sleepy Joe's Distortion Unit",
    genre: "Rock",
    description: "The ear-piercingly loud two-piece noise band based out of Richmond, VA. Composed of guitarist and vocalist Aidan Heine and drummer Stephan Rivas.",
    image: "/images/sleepy-joes-distortion-unit.jpeg",
    social: {
      instagram: "https://www.instagram.com/distortionunit804/",
    },
    tip: { venmo: "AidanHeine" },
  },
  {
    id: "night-idea",
    name: "Night Idea",
    genre: "Indie Rock/Psychedelic/Progressive",
    description: "An RVA staple for over a decade \u2014 complex, genre-bending sound blending elements of jazz, prog, shoegaze, and experimental music.",
    image: "/images/night-idea.png",
    social: {
      instagram: "https://www.instagram.com/night_idea",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/1vTS752TnggovIaSUrMEpo", embedId: "1vTS752TnggovIaSUrMEpo" },
    tip: {},
  },
  {
    id: "half-lit",
    name: "Half Lit",
    genre: "Bluegrass",
    description: "East West Virginia Blue Grass with traditional and original material with strong vocals and harmonies.",
    image: "/images/half-lit.png",
    social: {},
    tip: {},
  },
  {
    id: "cheap-comfort",
    name: "Cheap Comfort",
    genre: "Eclectic Folk Rock",
    description: "Hit-home originals filled with a rootsy edge and 3-part harmonies, as well as an eclectic mix of laid-back covers. Rene Carillo, John Dacey, Amy Henderson, and Chris Markunas bring you roots rock that feels about as familiar as your favorite, worn-in hoodie.",
    image: "/images/cheap-comfort.jpg",
    social: {
      instagram: "https://www.instagram.com/cheapcomfortband/",
      facebook: "https://www.facebook.com/CheapComfort/",
    },
    tip: { venmo: "Amy-Henderson-music" },
  },
  {
    id: "quasimojo",
    name: "QuasiMojo",
    genre: "Rock Plus",
    description: "Five piece band \u2014 2 guitars, Bass, Keyboards, Drums and 4 singers with harmonies. They play mash ups of rock, soul and americana and originals.",
    image: "/images/quasimojo.jpg",
    social: {},
    tip: {},
  },
  {
    id: "wrong-worshippers",
    name: "Wrong Worshippers",
    genre: "Dirty Rock/Pop Punk",
    description: "Bellevue's own bass and drums duo brings intense layers of sound and a power-packed show. Their second full album Get Skooled is on the shortlist for the 2026 Newlin Music Prize.",
    image: "/images/wrong-worshippers.png",
    social: {
      instagram: "https://www.instagram.com/wrongworshippers/",
      linktree: "https://linktr.ee/wrongworshippers",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/0lKNgrtWtCrbVUghOHShpu", embedId: "0lKNgrtWtCrbVUghOHShpu" },
    tip: { venmo: "nick-g-walker", paypal: "https://paypal.me/wrongworshippers" },
  },
  {
    id: "leslie-and-the-dots",
    name: "Leslie and the Dots",
    genre: "Psychedelic Funk Rock",
    description: "Songs of joy, beauty, and heartbreak that would make a fine addition to any Quentin Tarantino film.",
    image: "/images/leslie-and-the-dots.png",
    social: {
      instagram: "https://www.instagram.com/leslieandthedots/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/4rPdoiEhBFAbrOqKjX42V6", embedId: "4rPdoiEhBFAbrOqKjX42V6" },
    tip: {},
  },
  {
    id: "rosies-irish-session",
    name: "Rosie's Irish Session",
    genre: "Irish Traditional",
    description: "Irish Traditional music by the group that plays at Rosie Connolly's Pub in Shockoe Bottom. Jigs and reels to keep you hopping!",
    image: "/images/rosies-irish-session.jpg",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=100057122965158",
    },
    tip: { paypal: "https://PayPal.me/irishsession17" },
  },
  {
    id: "deporch-mode",
    name: "Deporch Mode",
    genre: "Alternative/New Wave",
    description: "Three veteran RVA Musicians and a guy that owns the porch playing new wave and alternative rock hits from 70s, 80s, 90s and today!",
    image: "/images/deporch-mode.png",
    social: {},
    tip: {},
  },
  {
    id: "horsehead",
    name: "Horsehead",
    genre: "Americana/Rock",
    description: "Released their original debut album Record Of The Year back in 2006 and still standing seventeen years later. Featuring Jon Brown, Kevin Wade Inge, Steve Chiles, and Ricky Tubb. Celebrating the release of Sundogs Dancing In The Early Morning Light.",
    image: "/images/horsehead.png",
    social: {},
    music: { type: "spotify", url: "https://open.spotify.com/artist/2waRRGuMSuBJY26sNnHFF9", embedId: "2waRRGuMSuBJY26sNnHFF9" },
    tip: {},
  },
  {
    id: "the-atkinsons",
    name: "The Atkinsons",
    genre: "Roots Rock",
    description: "First set foot on Richmond stages in 2003. Melds roots, country, and rock into their own style of rambling swing rock & roll with heartfelt story-telling complemented with three-part harmonies over mandolin, fiddle, drums, bass and electric guitars.",
    image: "/images/the-atkinsons.jpg",
    social: {
      facebook: "http://www.facebook.com/theatkinsons",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/4zliIO092NXXBFhu3OTwQS", embedId: "4zliIO092NXXBFhu3OTwQS" },
    tip: { venmo: "Jamiekwood" },
  },
  {
    id: "river-city-band",
    name: "River City Band",
    genre: "Bluegrass",
    description: "Four piece bluegrass band. Playing together for 12 years.",
    image: "/images/river-city-band.jpg",
    social: {},
    music: { type: "spotify", url: "https://open.spotify.com/artist/2oGugUVVbpr7jIz9Ua9TvX", embedId: "2oGugUVVbpr7jIz9Ua9TvX" },
    tip: {},
  },
  {
    id: "prabir-trio",
    name: "Prabir Trio",
    genre: "India-Inspired Rock",
    description: "Bridges the worlds of classical Indian with rock/folk music. Blending the two worlds has led to an upbeat introspective look at the world around us.",
    image: "/images/prabir-trio.png",
    social: {
      website: "https://www.hiprabir.com",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/4a5B5sBWnS8W7AvJheQgne", embedId: "4a5B5sBWnS8W7AvJheQgne" },
    tip: { venmo: "PrabirRVA" },
  },
  {
    id: "the-jangling-reinharts",
    name: "The Jangling Reinharts",
    genre: "Jangle Pop/Americana",
    description: "Award-winning harmony-driven Richmond band blending rock, Americana, bluegrass and acoustic swagger into a live show you can't help but get caught up in.",
    image: "/images/the-jangling-reinharts.png",
    social: {
      website: "http://www.jangling.net/",
    },
    music: { type: "spotify", url: "https://open.spotify.com/artist/4wch3YzfFEfrzaT7pAXEFa", embedId: "4wch3YzfFEfrzaT7pAXEFa" },
    tip: {},
  },
  {
    id: "lazlo",
    name: "Lazlo",
    genre: "Dad/Pyroclastic Flow Rock",
    description: "4 northside creatures who came out of the 90's to commit random acts of rocking throughout Richmond's northside.",
    image: "/images/lazlo.jpeg",
    social: {
      facebook: "https://www.facebook.com/LazloRVA",
      instagram: "https://www.instagram.com/lazlorva/",
    },
    tip: {},
  },
];

// ─── Genre Categories (for filtering) ───────────────────────────────

export const GENRE_CATEGORIES = [
  "Rock",
  "Indie/Alternative",
  "Punk/Garage",
  "Dad Alt/Rock",
  "Americana/Roots",
  "Bluegrass/Folk",
  "Jazz/Soul",
  "Psych/Funk/Prog",
  "Shoegaze",
  "World/Traditional",
] as const;

export type GenreCategory = (typeof GENRE_CATEGORIES)[number];

const BAND_CATEGORY: Record<string, GenreCategory> = {
  "river-city-taiko": "World/Traditional",
  "tiny-lights": "Indie/Alternative",
  "4la7la": "Indie/Alternative",
  "cary-street-ramblers": "Bluegrass/Folk",
  "burns-burly-west": "Indie/Alternative",
  "sad-biscuit-jones": "Dad Alt/Rock",
  "sister-planet": "Psych/Funk/Prog",
  "brookhouse": "Jazz/Soul",
  "lagoon-musique": "World/Traditional",
  "tarrant": "Americana/Roots",
  "the-high-frequencies": "Rock",
  "hard-pill-to-swallow": "Rock",
  "the-approach": "Rock",
  "the-rhythmasters": "Jazz/Soul",
  "ultrasuede": "Punk/Garage",
  "the-lonely-teardrops": "Punk/Garage",
  "kozy-cats": "Jazz/Soul",
  "the-blue-guitar": "Jazz/Soul",
  "floodwall": "Shoegaze",
  "bellevue-bon-temps": "World/Traditional",
  "crack-fox": "Punk/Garage",
  "sleepy-joes-distortion-unit": "Punk/Garage",
  "night-idea": "Shoegaze",
  "half-lit": "Bluegrass/Folk",
  "cheap-comfort": "Americana/Roots",
  "quasimojo": "Rock",
  "wrong-worshippers": "Punk/Garage",
  "leslie-and-the-dots": "Psych/Funk/Prog",
  "rosies-irish-session": "World/Traditional",
  "deporch-mode": "Dad Alt/Rock",
  "horsehead": "Americana/Roots",
  "the-atkinsons": "Americana/Roots",
  "river-city-band": "Bluegrass/Folk",
  "prabir-trio": "Psych/Funk/Prog",
  "the-jangling-reinharts": "Americana/Roots",
  "lazlo": "Dad Alt/Rock",
};

export function getBandCategory(bandId: string): GenreCategory {
  return BAND_CATEGORY[bandId] ?? "Rock";
}

// ─── Venues ──────────────────────────────────────────────────────────

export const venues: Venue[] = [
  // Fauquier Ave venues (runs roughly NE-SW)
  {
    id: "3815-fauquier",
    address: "3815 Fauquier Ave",
    coordinates: [-77.45196, 37.58519],
    street: "Fauquier Ave",
  },
  {
    id: "3861-fauquier",
    address: "3861 Fauquier Ave",
    coordinates: [-77.45340, 37.58631],
    street: "Fauquier Ave",
  },
  {
    id: "3867-fauquier",
    address: "3867 Fauquier Ave",
    coordinates: [-77.45350, 37.58638],
    street: "Fauquier Ave",
  },
  {
    id: "3900-fauquier",
    address: "3900 Fauquier Ave",
    coordinates: [-77.45434, 37.58670],
    street: "Fauquier Ave",
  },
  {
    id: "3955-fauquier",
    address: "3955 Fauquier Ave",
    coordinates: [-77.45538, 37.58784],
    street: "Fauquier Ave",
  },
  {
    id: "4003-fauquier",
    address: "4003 Fauquier Ave",
    coordinates: [-77.45656, 37.58862],
    street: "Fauquier Ave",
  },
  {
    id: "4014-fauquier",
    address: "4014 Fauquier Ave",
    coordinates: [-77.45683, 37.58884],
    street: "Fauquier Ave",
  },
  {
    id: "4000-fauquier",
    address: "4000 Fauquier Ave",
    coordinates: [-77.45666, 37.58852],
    street: "Fauquier Ave",
  },
  {
    id: "4019-fauquier",
    address: "4019 Fauquier Ave",
    coordinates: [-77.45674, 37.58897],
    street: "Fauquier Ave",
  },
  // Claremont Ave venues
  {
    id: "1306-claremont",
    address: "1306 Claremont Ave",
    coordinates: [-77.45386, 37.58820],
    street: "Claremont Ave",
  },
  {
    id: "1312-claremont",
    address: "1312 Claremont Ave",
    coordinates: [-77.45396, 37.58820],
    street: "Claremont Ave",
  },
  {
    id: "1413-claremont",
    address: "1413 Claremont Ave",
    coordinates: [-77.45620, 37.58715],
    street: "Claremont Ave",
  },
  {
    id: "1414-claremont",
    address: "1414 Claremont Ave",
    coordinates: [-77.45625, 37.58726],
    street: "Claremont Ave",
  },
  // Westminster Ave venues
  {
    id: "1238-westminster",
    address: "1238 Westminster Ave",
    coordinates: [-77.45455, 37.59395],
    street: "Westminster Ave",
  },
  {
    id: "1221-westminster",
    address: "1221 Westminster Ave",
    coordinates: [-77.45386, 37.59388],
    street: "Westminster Ave",
  },
  // Nottoway Ave venues
  {
    id: "1226-nottoway",
    address: "1226 Nottoway Ave",
    coordinates: [-77.45259, 37.58917],
    street: "Nottoway Ave",
  },
  {
    id: "1305-nottoway",
    address: "1305 Nottoway Ave",
    coordinates: [-77.45388, 37.58902],
    street: "Nottoway Ave",
  },
  {
    id: "1420-nottoway",
    address: "1420 Nottoway Ave",
    coordinates: [-77.45689, 37.58830],
    street: "Nottoway Ave",
  },
  // Greycourt Ave venues
  {
    id: "1220-greycourt",
    address: "1220 Greycourt Ave",
    coordinates: [-77.45219, 37.58732],
    street: "Greycourt Ave",
  },
  {
    id: "1218-greycourt",
    address: "1218 Greycourt Ave",
    coordinates: [-77.45215, 37.58733],
    street: "Greycourt Ave",
  },
  {
    id: "1416-greycourt",
    address: "1416 Greycourt Ave",
    coordinates: [-77.45626, 37.58628],
    street: "Greycourt Ave",
  },
  {
    id: "1402-greycourt",
    address: "1402 Greycourt Ave",
    coordinates: [-77.45596, 37.58629],
    street: "Greycourt Ave",
  },
  // Mount Vernon venues
  {
    id: "4029-mt-vernon",
    address: "4029 Mount Vernon Ave",
    coordinates: [-77.46139, 37.58886],
    street: "Mount Vernon",
  },
  {
    id: "4027-mt-vernon",
    address: "4027 Mount Vernon Ave",
    coordinates: [-77.46139, 37.58881],
    street: "Mount Vernon",
  },
  {
    id: "4017-mt-vernon",
    address: "4017 Mount Vernon Ave",
    coordinates: [-77.46137, 37.58856],
    street: "Mount Vernon",
  },
  // Stanhope Ave venues
  {
    id: "1400-stanhope",
    address: "1400 Stanhope Ave",
    coordinates: [-77.45712, 37.59189],
    street: "Stanhope Ave",
  },
  {
    id: "1202-stanhope",
    address: "1202 Stanhope Ave",
    coordinates: [-77.45280, 37.59208],
    street: "Stanhope Ave",
  },
  // Clinton Ave venues
  {
    id: "4008-clinton",
    address: "4008 Clinton Ave",
    coordinates: [-77.45954, 37.58891],
    street: "Clinton Ave",
  },
  // Crestwood venues
  {
    id: "4117-crestwood",
    address: "4117 Crestwood Rd",
    coordinates: [-77.45998, 37.59313],
    street: "Crestwood Rd",
  },
];

// ─── Performances ────────────────────────────────────────────────────

export const performances: Performance[] = [
  // 12:00 PM
  { bandId: "river-city-taiko", venueId: "3867-fauquier", timeSlot: "12:00" },

  // 12:30 PM
  { bandId: "tiny-lights", venueId: "1306-claremont", timeSlot: "12:30" },
  { bandId: "4la7la", venueId: "1238-westminster", timeSlot: "12:30" },
  { bandId: "cary-street-ramblers", venueId: "4008-clinton", timeSlot: "12:30" },
  { bandId: "burns-burly-west", venueId: "4003-fauquier", timeSlot: "12:30" },

  // 1:15 PM
  { bandId: "sad-biscuit-jones", venueId: "3861-fauquier", timeSlot: "1:15" },
  { bandId: "sister-planet", venueId: "1226-nottoway", timeSlot: "1:15" },
  { bandId: "brookhouse", venueId: "1220-greycourt", timeSlot: "1:15" },
  { bandId: "lagoon-musique", venueId: "1312-claremont", timeSlot: "1:15" },
  { bandId: "tarrant", venueId: "4019-fauquier", timeSlot: "1:15" },
  { bandId: "the-high-frequencies", venueId: "4029-mt-vernon", timeSlot: "1:15" },

  // 2:00 PM
  { bandId: "hard-pill-to-swallow", venueId: "1305-nottoway", timeSlot: "2:00" },
  { bandId: "the-approach", venueId: "1218-greycourt", timeSlot: "2:00" },
  { bandId: "the-rhythmasters", venueId: "4117-crestwood", timeSlot: "2:00" },
  { bandId: "ultrasuede", venueId: "1413-claremont", timeSlot: "2:00" },
  { bandId: "the-lonely-teardrops", venueId: "4027-mt-vernon", timeSlot: "2:00" },
  { bandId: "kozy-cats", venueId: "3815-fauquier", timeSlot: "2:00" },

  // 2:45 PM
  { bandId: "the-blue-guitar", venueId: "4117-crestwood", timeSlot: "2:45" },
  { bandId: "floodwall", venueId: "4017-mt-vernon", timeSlot: "2:45" },
  { bandId: "bellevue-bon-temps", venueId: "1414-claremont", timeSlot: "2:45" },
  { bandId: "crack-fox", venueId: "1420-nottoway", timeSlot: "2:45" },
  {
    bandId: "sleepy-joes-distortion-unit",
    venueId: "3815-fauquier",
    timeSlot: "2:45",
  },

  // 3:30 PM
  { bandId: "night-idea", venueId: "3955-fauquier", timeSlot: "3:30" },
  { bandId: "half-lit", venueId: "4014-fauquier", timeSlot: "3:30" },
  { bandId: "cheap-comfort", venueId: "1238-westminster", timeSlot: "3:30" },
  { bandId: "quasimojo", venueId: "1416-greycourt", timeSlot: "3:30" },
  { bandId: "wrong-worshippers", venueId: "3815-fauquier", timeSlot: "3:30" },

  // 4:15 PM
  { bandId: "leslie-and-the-dots", venueId: "4000-fauquier", timeSlot: "4:15" },
  { bandId: "rosies-irish-session", venueId: "1221-westminster", timeSlot: "4:15" },
  { bandId: "deporch-mode", venueId: "1414-claremont", timeSlot: "4:15" },
  { bandId: "horsehead", venueId: "3900-fauquier", timeSlot: "4:15" },
  { bandId: "the-atkinsons", venueId: "1400-stanhope", timeSlot: "4:15" },

  // 5:10 PM
  { bandId: "river-city-band", venueId: "1402-greycourt", timeSlot: "5:10" },
  { bandId: "prabir-trio", venueId: "4003-fauquier", timeSlot: "5:10" },
  {
    bandId: "the-jangling-reinharts",
    venueId: "3867-fauquier",
    timeSlot: "5:10",
  },
  { bandId: "lazlo", venueId: "1202-stanhope", timeSlot: "5:10" },
];

// ─── Amenities ───────────────────────────────────────────────────────

export const amenities: Amenity[] = [
  // Food trucks — positions placed via the in-app drag editor (?edit=1).
  {
    id: "food-1",
    type: "food-truck",
    coordinates: [-77.45600, 37.58824],
    label: "Food Truck — Fauquier Ave",
  },
  {
    id: "food-2",
    type: "food-truck",
    coordinates: [-77.45589, 37.58815],
    label: "Food Truck — Fauquier Ave",
  },
  {
    id: "food-3",
    type: "food-truck",
    coordinates: [-77.45578, 37.58807],
    label: "Food Truck — Fauquier Ave",
  },
  {
    id: "food-4",
    type: "food-truck",
    coordinates: [-77.45524, 37.58764],
    label: "Food Truck — Fauquier Ave",
  },
  {
    id: "food-5",
    type: "food-truck",
    coordinates: [-77.45510, 37.58754],
    label: "Food Truck — Fauquier Ave",
  },
  {
    id: "food-6",
    type: "food-truck",
    coordinates: [-77.45497, 37.58744],
    label: "Food Truck — Fauquier Ave",
  },
  // Porta-potties — positions from official PDF flyer map
  {
    id: "potty-1",
    type: "porta-potty",
    coordinates: [-77.45634, 37.58842],
    label: "Restroom — Fauquier/Nottoway",
  },
  {
    id: "potty-2",
    type: "porta-potty",
    coordinates: [-77.45300, 37.59203],
    label: "Restroom — Stanhope near Brook Rd",
  },
  {
    id: "potty-3",
    type: "porta-potty",
    coordinates: [-77.45700, 37.58625],
    label: "Restroom — Greycourt Ave",
  },
  {
    id: "potty-4",
    type: "porta-potty",
    coordinates: [-77.46155, 37.58930],
    label: "Restroom — Mount Vernon",
  },
  {
    id: "potty-5",
    type: "porta-potty",
    coordinates: [-77.45630, 37.59370],
    label: "Restroom — Westminster Ave",
  },
  {
    id: "potty-6",
    type: "porta-potty",
    coordinates: [-77.45426, 37.58681],
    label: "Restroom — near River City Taiko",
  },
  // BCA Merch & Sponsor tents — placed via ?edit=1 drag editor.
  {
    id: "merch-1",
    type: "merch",
    coordinates: [-77.45546, 37.58774],
    label: "BCA Merch",
  },
  {
    id: "sponsor-1",
    type: "sponsor",
    coordinates: [-77.45560, 37.58784],
    label: "Sponsor Tent",
  },
  // Trash & recycling — at the NW and SE ends of the Fauquier event zone.
  {
    id: "trash-1",
    type: "trash",
    coordinates: [-77.45644, 37.58850],
    label: "Trash & Recycling — Fauquier/Nottoway",
  },
  {
    id: "trash-2",
    type: "trash",
    coordinates: [-77.45444, 37.58693],
    label: "Trash & Recycling — Fauquier (east end)",
  },
];

// ─── Food Trucks ─────────────────────────────────────────────────────

export const foodTrucks: FoodTruck[] = [
  {
    id: "1115-mobile-kitchen",
    name: "1115 Mobile Kitchen",
    website: "https://www.1115foodtruck.com/menu",
  },
  {
    id: "bikini-panini",
    name: "Bikini Panini",
    website: "https://www.bikinipanini.com/",
  },
  {
    id: "boka-taco",
    name: "Boka Taco",
    website: "https://static1.squarespace.com/static/599231fdc534a52a6efbcbad/t/63c84a872569f825a772c86e/1674070664200/2023+AYCE+TAKOS.pdf",
  },
  {
    id: "goatacado",
    name: "Goatacado",
    website: "https://www.goatocado.com/menu",
  },
  {
    id: "moniques-crepes",
    name: "Monique's Crepes",
    website: "https://moniquescrepes.com/menu-items/",
  },
  {
    id: "westrays-finest",
    name: "Westray's Finest",
    website: "https://www.bestfoodtrucks.com/truck/westray-s-finest-ice-cream/menu",
  },
];

// ─── Street Closures ─────────────────────────────────────────────────

export const streetClosures: StreetClosure[] = [
  // ─── RC (Road Closed) ─────────────────────────────────
  {
    id: "fauquier-main",
    street: "Fauquier Ave",
    type: "closed",
    description: "Fauquier Ave (Laburnum to Bellevue)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45750, 37.59081],
      [-77.45709, 37.58986],
      [-77.45691, 37.58943],
      [-77.45655, 37.58871],
      [-77.45641, 37.58855],
      [-77.45539, 37.58769],
      [-77.45418, 37.58683],
      [-77.45413, 37.58679],
      [-77.45307, 37.58597],
      [-77.45293, 37.58586],
      [-77.45184, 37.58501],
      [-77.45111, 37.58451],
    ],
  },
  {
    id: "westminster-rc",
    street: "Westminster Ave",
    type: "closed",
    description: "Westminster Ave (Newport Dr to Brook Rd)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45692, 37.59375], // Newport & Westminster
      [-77.45630, 37.59379],
      [-77.45363, 37.59396],
      [-77.45302, 37.59400], // Brook & Westminster
    ],
  },
  {
    id: "stanhope-east-rc",
    street: "Stanhope Ave",
    type: "closed",
    description: "Stanhope Ave (Newport Dr to Brook Rd)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45632, 37.59187], // Newport & Stanhope
      [-77.45328, 37.59200],
      [-77.45253, 37.59203], // Brook & Stanhope
    ],
  },
  {
    id: "nottoway-west-rc",
    street: "Nottoway Ave",
    type: "closed",
    description: "Nottoway Ave (Fauquier Ave to MacArthur Ave)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      // OSM Way 6040387 — diagonal section from Fauquier junction west
      [-77.45640, 37.58862],
      [-77.45697, 37.58816],
      [-77.45719, 37.58806],
      [-77.45810, 37.58803],
      [-77.45818, 37.58819], // MacArthur area
    ],
  },
  {
    id: "claremont-west-rc",
    street: "Claremont Ave",
    type: "closed",
    description: "Claremont Ave (MacArthur to Newport Dr)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45813, 37.58710], // MacArthur area
      [-77.45600, 37.58716],
      [-77.45591, 37.58717], // Newport & Claremont
    ],
  },
  {
    id: "claremont-east-rc",
    street: "Claremont Ave",
    type: "closed",
    description: "Claremont Ave (Lamont St to Fauquier Ave)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45368, 37.58815], // Lamont & Claremont
      [-77.45466, 37.58812],
      [-77.45472, 37.58812],
      [-77.45476, 37.58810],
      [-77.45481, 37.58808],
      [-77.45487, 37.58802],
      [-77.45523, 37.58774], // Fauquier & Claremont
    ],
  },
  {
    id: "greycourt-west-rc",
    street: "Greycourt Ave",
    type: "closed",
    description: "Greycourt Ave (Newport Dr to MacArthur Ave)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45584, 37.58624], // Newport & Greycourt
      [-77.45808, 37.58618], // MacArthur area
    ],
  },
  {
    id: "mt-vernon-rc",
    street: "Mount Vernon St",
    type: "closed",
    description: "Mount Vernon St (Bellevue to Nottoway)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.46140, 37.59050],
      [-77.46140, 37.58886],
      [-77.46142, 37.58811],
    ],
  },

  // ─── TTT (Restricted To Thru Traffic) ──────────────────
  {
    id: "stanhope-west-ttt",
    street: "Stanhope Ave",
    type: "thru-traffic",
    description: "Stanhope Ave (west section — thru traffic restricted)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45757, 37.59182],
      [-77.45632, 37.59187], // Newport & Stanhope
    ],
  },
  {
    id: "nottoway-east-ttt",
    street: "Nottoway Ave",
    type: "thru-traffic",
    description: "Nottoway Ave (Newport Dr to Lamont St — thru traffic restricted)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45594, 37.58902], // Newport & Nottoway
      [-77.45372, 37.58908], // Lamont & Nottoway
    ],
  },

  // ─── Caution ───────────────────────────────────────────
  {
    id: "stanhope-west-rc",
    street: "Stanhope Ave",
    type: "closed",
    description: "Stanhope Ave (MacArthur to Fauquier Ave)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      // OSM Way 6040502 — western curve toward Fauquier
      [-77.45757, 37.59182],
      [-77.45772, 37.59179],
      [-77.45789, 37.59173],
      [-77.45838, 37.59142],
    ],
  },
  {
    id: "greycourt-east-rc",
    street: "Greycourt Ave",
    type: "closed",
    description: "Greycourt Ave (Brook Rd to Fauquier Ave)",
    startTime: "11:30 AM",
    endTime: "6:30 PM",
    coordinates: [
      [-77.45175, 37.58728], // Brook & Greycourt
      [-77.45238, 37.58726],
      [-77.45353, 37.58723],
      [-77.45365, 37.58719],
      [-77.45408, 37.58683],
      [-77.45413, 37.58679], // Fauquier & Greycourt
    ],
  },
];

// ─── Sponsors ────────────────────────────────────────────────────────

export const sponsors = [
  {
    name: "Ruckart Real Estate",
    role: "Headline Sponsor",
    website: "https://ruckartre.com",
  },
  {
    name: "W.C. Richmond",
    role: "Opener Sponsor",
    website: "https://wcrichmond.org",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────

const bandMap = new Map(bands.map((b) => [b.id, b]));
const venueMap = new Map(venues.map((v) => [v.id, v]));

export function getBand(id: string): Band | undefined {
  return bandMap.get(id);
}

export function getVenue(id: string): Venue | undefined {
  return venueMap.get(id);
}

export function getPerformancesForSlot(timeSlot: TimeSlot): Performance[] {
  return performances.filter((p) => p.timeSlot === timeSlot);
}

export function getPerformanceWithDetails(perf: Performance) {
  return {
    ...perf,
    band: bandMap.get(perf.bandId)!,
    venue: venueMap.get(perf.venueId)!,
  };
}

export function getAllGenres(): string[] {
  return [...GENRE_CATEGORIES];
}

export function searchBands(query: string): Band[] {
  const q = query.toLowerCase();
  return bands.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q) ||
      getBandCategory(b.id).toLowerCase().includes(q)
  );
}
