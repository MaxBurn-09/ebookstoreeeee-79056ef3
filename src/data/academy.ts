import { books, categories, type Book, type Category } from "@/data/catalog";
import authorPhoto1 from "@/assets/author-1.jpg";
import authorPhoto2 from "@/assets/author-2.jpg";
import authorPhoto3 from "@/assets/author-3.jpg";
import authorPhoto4 from "@/assets/author-4.jpg";

export type Author = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  focus: string[];
  photo?: string;
};

export type Review = {
  id: string;
  bookId: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  status: "published" | "pending";
};

export type Program = {
  slug: string;
  title: string;
  duration: string;
  format: string;
  category: string;
  summary: string;
  description: string;
  outcomes: string[];
  bookSlugs: string[];
  facultyId: string;
};

export const authors: Author[] = [
  {
    id: "a-ankit",
    slug: "ankit-sharma",
    name: "Dr. Ankit Sharma",
    role: "Founder · Mindset & Digital Wealth",
    location: "Gurgaon, India",
    photo: authorPhoto1,
    bio: "Dr. Ankit Sharma founded Future Grow Academy in 2021 to turn self-growth into something you can finish and apply. He writes the academy’s mindset, purpose and digital-income programmes — short, structured guides used by readers in the US, Europe, the Middle East and Asia.",
    focus: ["Mindset", "Purpose", "Digital income"],
  },
  {
    id: "a-priya",
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Faculty · Relationships",
    location: "London, UK",
    photo: authorPhoto2,
    bio: "Priya designs the academy’s relationship labs: 21- and 30-day programmes for couples who feel distant and for readers rebuilding after a breakup. Her work is practical — daily prompts, boundary scripts and repair conversations — not theory.",
    focus: ["Marriage", "Breakup recovery", "Emotional needs"],
  },
  {
    id: "a-meera",
    slug: "meera-kapoor",
    name: "Meera Kapoor",
    role: "Faculty · Parenting",
    location: "Singapore",
    photo: authorPhoto3,
    bio: "Meera leads the calm-parenting cohort. She translates emotional intelligence into household routines: fewer yelling cycles, clearer boundaries, and children who can name what they feel.",
    focus: ["Calm discipline", "Toddler years", "Emotional skills"],
  },
  {
    id: "a-rahul",
    slug: "rahul-desai",
    name: "Rahul Desai",
    role: "Faculty · Health & Energy",
    location: "New York, USA",
    photo: authorPhoto4,
    bio: "Rahul writes the academy’s short fitness protocols for people who do not have an hour in the gym. Twenty-minute sessions, metabolic basics and habits that survive a full work week.",
    focus: ["Fat loss", "Energy", "Daily training"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    bookId: "b1",
    name: "Daniel Morgan",
    location: "New York, USA",
    rating: 4.7,
    status: "published",
    quote:
      "I was skeptical at first, but the strategies inside are incredibly actionable. The writing style keeps you engaged while delivering real-life transformation techniques.",
  },
  {
    id: "r2",
    bookId: "b11",
    name: "Sophia Martinez",
    location: "Madrid, Spain",
    rating: 4.9,
    status: "published",
    quote:
      "Clear, powerful, and beautifully structured. Every chapter adds value. It feels like having a personal mentor guiding you step by step.",
  },
  {
    id: "r3",
    bookId: "b12",
    name: "Arjun Patel",
    location: "London, UK",
    rating: 4.6,
    status: "published",
    quote:
      "The insights are deep yet simple to apply. I loved how practical examples were included. It's one of the best investments I've made in self-growth.",
  },
  {
    id: "r4",
    bookId: "b14",
    name: "Emily Chen",
    location: "Singapore",
    rating: 4.8,
    status: "published",
    quote:
      "Every page delivers clarity and motivation. The habit-building techniques are realistic and easy to implement in daily life.",
  },
  {
    id: "r5",
    bookId: "b5",
    name: "Lucas Fernandes",
    location: "São Paulo, Brazil",
    rating: 4.7,
    status: "published",
    quote:
      "I noticed improvements in focus and confidence within weeks. The content feels premium and thoughtfully crafted.",
  },
  {
    id: "r6",
    bookId: "b9",
    name: "Hannah Müller",
    location: "Berlin, Germany",
    rating: 4.9,
    status: "published",
    quote:
      "These ebooks are practical, inspiring, and straight to the point. I've recommended them to friends and colleagues already.",
  },
  {
    id: "r7",
    bookId: "b6",
    name: "Mohammed Al Rashid",
    location: "Dubai, UAE",
    rating: 4.8,
    status: "published",
    quote:
      "The 30-day structure kept us accountable. We stopped circling the same argument and started naming the need underneath it.",
  },
  {
    id: "r8",
    bookId: "b2",
    name: "Grace Okonkwo",
    location: "Houston, USA",
    rating: 4.8,
    status: "published",
    quote:
      "I still raise my voice sometimes — but far less. The regulation tools actually work in a real kitchen with real kids.",
  },
];

export const programs: Program[] = [
  {
    slug: "mindset-reset",
    title: "Mindset Reset Intensive",
    duration: "7–21 days",
    format: "Self-paced ebooks + daily prompts",
    category: "Self-Care",
    facultyId: "a-ankit",
    summary: "Rewire limiting beliefs, lock in unbreakable habits, and reconnect with the WHY behind your goals.",
    description:
      "Built for professionals, students and founders who start strong and stall. You work through REWIRE IN A WEEK, Build Unbreakable Habits in 21 Days, and Your WHY Changes Everything — a sequenced path from mental reset to daily systems to purpose.",
    outcomes: [
      "Replace looping self-talk with a seven-day cognitive reset",
      "Install habits that survive busy weeks, not just Mondays",
      "Make decisions from a written personal mission",
    ],
    bookSlugs: ["rewire-in-a-week", "build-unbreakable-habits-in-21-days", "your-why-changes-everything"],
  },
  {
    slug: "relationship-repair-lab",
    title: "Relationship Repair Lab",
    duration: "21–30 days",
    format: "Couples or solo · daily exercises",
    category: "Relationship",
    facultyId: "a-priya",
    summary: "Name the invisible needs, run a 30-day marriage fix, or detach and heal after a breakup.",
    description:
      "Whether you are protecting a marriage or leaving one, this lab gives you a calendar — not vague advice. Pair Invisible Needs That Break Marriages with The 30-Day Marriage Fix, or take the breakup track: Detach From Your Ex in 21 Days plus the 30-Day Self-Love Challenge.",
    outcomes: [
      "Make unspoken needs visible without blame",
      "Rebuild daily connection or complete a clean emotional exit",
      "Restore self-respect with structured healing work",
    ],
    bookSlugs: [
      "invisible-needs-that-break-marriages",
      "the-30-day-marriage-fix",
      "detach-from-your-ex-in-21-days",
      "30-day-self-love-healing-challenge-after-breakup",
    ],
  },
  {
    slug: "digital-wealth-studio",
    title: "Digital Wealth Studio",
    duration: "30 days",
    format: "Laptop-first · action plan",
    category: "Money",
    facultyId: "a-ankit",
    summary: "A 30-day path to online income, then an AI layer so the systems keep earning when you log off.",
    description:
      "Skip guru funnels. 30 Days To Digital Wealth maps a realistic first offer, then Passive Profits with AI shows how to productise and automate without a developer on staff. Designed for working professionals in any timezone.",
    outcomes: [
      "Pick one income model that matches your skills",
      "Ship a simple digital offer in 30 days",
      "Use AI for drafts, delivery and distribution — not hype",
    ],
    bookSlugs: ["30-days-to-digital-wealth", "passive-profits-with-ai"],
  },
  {
    slug: "lean-body-protocol",
    title: "Lean Body Protocol",
    duration: "21 days",
    format: "20-minute sessions · no gym required",
    category: "Health",
    facultyId: "a-rahul",
    summary: "Short training, metabolic basics and a brown-fat activation plan for stubborn plateaus.",
    description:
      "For people who cannot live in the gym. 20 Minutes to Lean is the daily engine; the 21 Day Brown Fat Activation Blueprint supports metabolism when calorie-cutting has already failed.",
    outcomes: [
      "Train in a 20-minute window you will actually keep",
      "Work with metabolism instead of fighting it",
      "Track energy and measurements, not only the scale",
    ],
    bookSlugs: ["20-minutes-to-lean", "21-day-brown-fat-activation-blueprint"],
  },
  {
    slug: "calm-parenting-cohort",
    title: "Calm Parenting Cohort",
    duration: "Self-paced",
    format: "Two-guide cohort · household practice",
    category: "Parenting",
    facultyId: "a-meera",
    summary: "Stop the yell-guilt cycle and raise emotionally intelligent kids in the home you actually have.",
    description:
      "Parenting Without Yelling gives you regulation tools for the moment of conflict. Emotionally Intelligent Parenting for Today’s Children builds the longer skill: empathy, secure attachment and children who can talk about feelings without a power struggle.",
    outcomes: [
      "Respond to tantrums without matching the volume",
      "Set boundaries that do not rely on fear",
      "Model emotional skills you want your children to keep",
    ],
    bookSlugs: ["parenting-without-yelling", "emotionally-intelligent-parenting-for-todays-children"],
  },
  {
    slug: "life-direction-sprint",
    title: "Life Direction Sprint",
    duration: "30–60 days",
    format: "Purpose discovery + 60-day reset",
    category: "Self-Care",
    facultyId: "a-ankit",
    summary: "Find a working purpose in 30 days, then run a 60-day full-life reset across habits, health and focus.",
    description:
      "For readers who feel busy and unsatisfied. Find Your Purpose in 30 Days produces a written direction; Transform Your Life in 60 Days turns it into a scored daily plan.",
    outcomes: [
      "Leave with a one-page purpose and values map",
      "Run a 60-day plan you can measure",
      "Cut work that does not serve the direction you chose",
    ],
    bookSlugs: ["find-your-purpose-in-30-days", "transform-your-life-in-60-days"],
  },
];

export const seedBooks: Book[] = books;
export const seedCategories: Category[] = categories;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function authorForBook(book: Book, list: Author[] = authors) {
  const id = book.authorId ?? "a-ankit";
  return list.find((a) => a.id === id) ?? list[0];
}
