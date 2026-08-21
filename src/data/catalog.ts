import coverSaltSky from "@/assets/cover-salt-sky.jpg";
import coverQuietMomentum from "@/assets/cover-quiet-momentum.jpg";
import coverLanternKeeper from "@/assets/cover-lantern-keeper.jpg";
import coverEverySmallHour from "@/assets/cover-every-small-hour.jpg";
import coverWaysOfAttention from "@/assets/cover-ways-of-attention.jpg";
import coverCartographer from "@/assets/cover-cartographers-daughter.jpg";
import coverLastQuietRoom from "@/assets/cover-last-quiet-room.jpg";
import coverLongWayHome from "@/assets/cover-long-way-home.jpg";
import catFiction from "@/assets/cat-fiction.jpg";
import catNonfiction from "@/assets/cat-nonfiction.jpg";
import catSelfhelp from "@/assets/cat-selfhelp.jpg";
import catRomance from "@/assets/cat-romance.jpg";
import catChildren from "@/assets/cat-children.jpg";
import catClassics from "@/assets/cat-classics.jpg";
import author1 from "@/assets/author-1.jpg";
import author2 from "@/assets/author-2.jpg";
import author3 from "@/assets/author-3.jpg";
import author4 from "@/assets/author-4.jpg";

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Bestseller" | "New" | "Sale" | "Limited";
  blurb: string;
};

export const books: Book[] = [
  {
    id: "b1",
    slug: "salt-and-sky",
    title: "Salt & Sky",
    author: "Imogen Hale",
    cover: coverSaltSky,
    category: "Fiction",
    price: 549,
    oldPrice: 699,
    rating: 4.6,
    reviews: 24675,
    badge: "Bestseller",
    blurb: "A coastal saga about the tides that pull families apart and back together.",
  },
  {
    id: "b2",
    slug: "quiet-momentum",
    title: "Quiet Momentum",
    author: "Daniel Rook",
    cover: coverQuietMomentum,
    category: "Self-Help",
    price: 499,
    rating: 4.7,
    reviews: 30214,
    badge: "Bestseller",
    blurb: "Small habits, lasting change — a calm guide to building a life you like living.",
  },
  {
    id: "b3",
    slug: "the-lantern-keeper",
    title: "The Lantern Keeper",
    author: "Marisol Vane",
    cover: coverLanternKeeper,
    category: "Fiction",
    price: 629,
    oldPrice: 799,
    rating: 4.8,
    reviews: 18560,
    badge: "Sale",
    blurb: "Some lights are meant to be kept. A luminous story of memory and mercy.",
  },
  {
    id: "b4",
    slug: "every-small-hour",
    title: "Every Small Hour",
    author: "Nadia Cross",
    cover: coverEverySmallHour,
    category: "Romance",
    price: 449,
    rating: 4.5,
    reviews: 22115,
    badge: "New",
    blurb: "A slow-burn romance told across the quietest hours of a single year.",
  },
  {
    id: "b5",
    slug: "ways-of-attention",
    title: "Ways of Attention",
    author: "Priya Menon",
    cover: coverWaysOfAttention,
    category: "Non-Fiction",
    price: 599,
    rating: 4.4,
    reviews: 16487,
    blurb: "Essays on focus, noticing, and the craft of paying attention on purpose.",
  },
  {
    id: "b6",
    slug: "the-cartographers-daughter",
    title: "The Cartographer's Daughter",
    author: "Elena Whitfield",
    cover: coverCartographer,
    category: "Classics",
    price: 699,
    oldPrice: 849,
    rating: 4.7,
    reviews: 27995,
    badge: "Limited",
    blurb: "Where maps end, her journey begins — a sweeping historical voyage.",
  },
  {
    id: "b7",
    slug: "the-last-quiet-room",
    title: "The Last Quiet Room",
    author: "Owen Marsh",
    cover: coverLastQuietRoom,
    category: "Mystery",
    price: 529,
    rating: 4.3,
    reviews: 9840,
    badge: "New",
    blurb: "A locked-house mystery where every silence hides a confession.",
  },
  {
    id: "b8",
    slug: "the-long-way-home",
    title: "The Long Way Home",
    author: "Aarav Sinha",
    cover: coverLongWayHome,
    category: "Non-Fiction",
    price: 479,
    oldPrice: 599,
    rating: 4.6,
    reviews: 12030,
    badge: "New",
    blurb: "A travel memoir about walking away, and the road that leads back.",
  },
];

export const bestsellers = books.filter((b) => ["b1", "b2", "b3", "b4", "b5", "b6"].includes(b.id));
export const newArrivals = [books[3], books[6], books[7], books[2], books[4], books[0]] as Book[];
export const featuredBook = books[2] as Book;
export const bookOfTheMonth = books[5] as Book;

export const newArrivalFilters = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Self-Help",
  "Romance",
  "Mystery",
] as const;

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export const categories: Category[] = [
  { slug: "fiction", name: "Fiction", tagline: "Explore stories", image: catFiction },
  { slug: "non-fiction", name: "Non-Fiction", tagline: "Expand knowledge", image: catNonfiction },
  { slug: "self-help", name: "Self-Help", tagline: "Better yourself", image: catSelfhelp },
  { slug: "romance", name: "Romance", tagline: "Feel the love", image: catRomance },
  { slug: "children", name: "Children", tagline: "Young minds", image: catChildren },
  { slug: "classics", name: "Classics", tagline: "Timeless reads", image: catClassics },
];

export type Author = {
  slug: string;
  name: string;
  portrait: string;
  books: number;
  note: string;
};

export const authors: Author[] = [
  {
    slug: "imogen-hale",
    name: "Imogen Hale",
    portrait: author1,
    books: 12,
    note: "Coastal literary fiction with a fierce, tender heart.",
  },
  {
    slug: "daniel-rook",
    name: "Daniel Rook",
    portrait: author2,
    books: 7,
    note: "Behavioural science made warm, practical and human.",
  },
  {
    slug: "priya-menon",
    name: "Priya Menon",
    portrait: author3,
    books: 5,
    note: "Essays on focus, culture and the examined life.",
  },
  {
    slug: "aarav-sinha",
    name: "Aarav Sinha",
    portrait: author4,
    books: 9,
    note: "Travel memoirs from the long roads of the subcontinent.",
  },
];

export const storeConfig = {
  name: "Page & Pine",
  tagline: "Bookshop",
  announcement: "Free shipping on orders over ₹999",
  announcementSecondary: "Easy returns • Secure payments • Exclusive offers",
  nav: [
    { label: "Home", to: "/" },
    { label: "Books", to: "/books" },
    { label: "Categories", to: "/categories" },
    { label: "Bestsellers", to: "/bestsellers" },
    { label: "New Arrivals", to: "/new-arrivals" },
    { label: "Authors", to: "/authors" },
    { label: "About Us", to: "/about" },
  ] as const,
};

export const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;
