export type BlogSection = { heading: string; paragraphs: string[]; list?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // category slug
  tags: string[];
  author: string; // author slug
  date: string; // ISO
  readingMinutes: number;
  featured?: boolean;
  market: "usa" | "india" | "global";
  intent: "informational" | "commercial" | "local";
  relatedBooks: string[]; // book slugs
  sections: BlogSection[];
};

export type BlogCategory = { slug: string; name: string; description: string };
export type BlogAuthor = { slug: string; name: string; role: string; bio: string };

export const blogCategories: BlogCategory[] = [
  { slug: "mindset", name: "Mindset & Purpose", description: "Clarity, motivation and the identity shifts behind lasting change." },
  { slug: "money", name: "Money & Online Income", description: "Practical digital-income ideas for readers in the USA and India." },
  { slug: "relationships", name: "Relationships", description: "Healing after breakups, stronger marriages and emotional needs." },
  { slug: "parenting", name: "Parenting", description: "Calm discipline and emotionally intelligent parenting." },
  { slug: "health", name: "Health & Habits", description: "Energy, fat loss and habits that survive real life." },
  { slug: "guides", name: "Buying Guides", description: "How to choose, read and get value from ebooks." },
];

export const blogAuthors: BlogAuthor[] = [
  {
    slug: "fga-editorial",
    name: "Future Grow Academy Editorial Team",
    role: "Authors & editors",
    bio: "The team behind Future Grow Academy's 15 self-growth ebooks. Based in Gurgaon, India and read in more than 40 countries, we write short, structured programmes people actually finish.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-find-your-purpose-in-30-days",
    title: "How to Find Your Purpose in 30 Days (A Realistic Plan)",
    excerpt:
      "Purpose is not a lightning strike. It is the result of a few honest questions asked consistently. Here is the 30-day structure we use in our most-read ebook.",
    category: "mindset",
    tags: ["purpose", "goal setting", "motivation"],
    author: "fga-editorial",
    date: "2026-08-04",
    readingMinutes: 7,
    featured: true,
    market: "global",
    intent: "informational",
    relatedBooks: ["find-your-purpose-in-30-days", "your-why-changes-everything"],
    sections: [
      {
        heading: "Why most people never find their purpose",
        paragraphs: [
          "Most advice about purpose asks you to imagine an ideal life and work backwards. That sounds inspiring and almost never works, because the ideal life is invented from other people's highlight reels. Purpose is discovered by noticing, not by imagining.",
          "In our reader surveys across the USA and India the same pattern shows up: people who feel stuck are usually busy, capable and exhausted. They do not lack talent. They lack a filter that tells them which of their ten priorities actually matters.",
        ],
      },
      {
        heading: "Week 1 — Collect evidence",
        paragraphs: [
          "Spend the first seven days as a researcher of your own life. Each evening write down one moment that energised you and one that drained you. Do not analyse yet; just collect. By day seven you will have fourteen data points that are far more honest than any personality quiz.",
        ],
        list: [
          "Energy log: one high, one low, every evening",
          "Note who you were with and what you were doing",
          "Write it by hand or in a single note on your phone",
        ],
      },
      {
        heading: "Week 2 — Find the pattern",
        paragraphs: [
          "Read your fourteen entries in one sitting. Circle repeated verbs — teaching, fixing, organising, calming, building. Those verbs are the raw material of your purpose. Most people find two or three that appear again and again.",
          "Now write one sentence: \"I feel most alive when I ___ for ___.\" Keep it plain. \"I feel most alive when I explain hard things simply for people who feel behind\" is a stronger purpose statement than anything with the word 'empower' in it.",
        ],
      },
      {
        heading: "Week 3 — Test it in the real world",
        paragraphs: [
          "A purpose statement is a hypothesis. Test it with three small experiments in week three: a conversation, a favour, a tiny project. If the energy is real you will notice it within an hour of starting. If it is not, adjust the sentence and try again — this is a feature, not a failure.",
        ],
      },
      {
        heading: "Week 4 — Align your goals",
        paragraphs: [
          "In the final week, look at your current goals and ask one question of each: does this move me toward my sentence or away from it? Drop or shrink the ones that pull away. Add one weekly action that serves the sentence directly.",
          "This is the exact structure of Find Your Purpose in 30 Days, with daily prompts and reflection pages for every step. If you prefer to go deeper on the 'why' behind motivation first, start with Your WHY Changes Everything.",
        ],
      },
    ],
  },
  {
    slug: "make-money-online-with-ai-beginners-usa-india",
    title: "How to Make Money Online With AI in 2026: A Beginner's Roadmap for the USA and India",
    excerpt:
      "AI tools have made it possible to launch a real online income stream from a laptop in Austin or Ahmedabad. Here is what actually works for beginners — and what to skip.",
    category: "money",
    tags: ["ai income", "side hustle", "passive income", "freelancing"],
    author: "fga-editorial",
    date: "2026-07-21",
    readingMinutes: 9,
    featured: true,
    market: "global",
    intent: "commercial",
    relatedBooks: ["passive-profits-with-ai", "30-days-to-digital-wealth"],
    sections: [
      {
        heading: "The honest starting point",
        paragraphs: [
          "AI will not pay you for pressing a button. What it does is collapse the time it takes to produce something useful — a newsletter, a product listing, a lesson, a template. The income still comes from a person who needs that thing. Start with the need, then use AI to serve it faster.",
          "For readers in the USA the fastest path is usually service-based: writing, research, design assets or admin work for small businesses. In India the same services sell to global clients at rates that are excellent in rupees, and domestic demand for AI-assisted content is growing every quarter.",
        ],
      },
      {
        heading: "Three beginner-friendly models",
        paragraphs: ["Pick one model for your first 30 days. Switching every week is the most common reason people quit."],
        list: [
          "AI-assisted services: offer one narrow deliverable (e.g. product descriptions for Shopify stores) and use AI to draft, you to edit.",
          "Digital products: templates, prompt packs, mini-guides — build once, sell on Gumroad, Etsy or your own store.",
          "Content and affiliate: a niche newsletter or YouTube channel where AI speeds up research and scripting.",
        ],
      },
      {
        heading: "Pricing for two markets",
        paragraphs: [
          "US clients expect to pay $50–$150 for a small AI-assisted deliverable; Indian freelancers can win that work by being reliable and fast, not cheap. If you sell to Indian small businesses, package monthly retainers in rupees instead of one-off gigs — predictability matters more than headline price.",
        ],
      },
      {
        heading: "Your first 30 days",
        paragraphs: [
          "Days 1–7: choose a model and a niche, set up one profile or one landing page. Days 8–21: send ten offers a day or publish daily. Days 22–30: review what got replies, double down, raise prices by 20%.",
          "Passive Profits with AI walks through each model with tool lists and templates; 30 Days to Digital Wealth is the day-by-day companion if you want a checklist rather than a manual.",
        ],
      },
    ],
  },
  {
    slug: "how-to-stop-yelling-at-your-kids",
    title: "How to Stop Yelling at Your Kids Without Losing Authority",
    excerpt:
      "Yelling is a stress response, not a parenting strategy. These five tools calm the moment, keep boundaries firm and rebuild the relationship — tonight.",
    category: "parenting",
    tags: ["calm parenting", "positive discipline", "toddlers", "teens"],
    author: "fga-editorial",
    date: "2026-06-30",
    readingMinutes: 6,
    market: "global",
    intent: "informational",
    relatedBooks: ["parenting-without-yelling", "emotionally-intelligent-parenting-for-todays-children"],
    sections: [
      {
        heading: "Why we yell (and why guilt does not help)",
        paragraphs: [
          "Parents yell when their own capacity is gone — after work, before dinner, during the third request to put on shoes. Guilt afterwards feels like accountability but it drains the very energy you need to respond differently next time. The goal is a system, not more willpower.",
        ],
      },
      {
        heading: "Tool 1 — The 90-second reset",
        paragraphs: [
          "The chemical surge of anger peaks and passes in roughly ninety seconds if you do not feed it. Step back, exhale longer than you inhale, and say out loud: \"I'm going to take a moment.\" Children learn regulation by watching it, not by being told about it.",
        ],
      },
      {
        heading: "Tool 2 — Lower your voice, lower your body",
        paragraphs: [
          "Get to eye level and speak more quietly than feels natural. Volume escalates volume; a low voice at close range carries more authority than a shout from across the room.",
        ],
      },
      {
        heading: "Tool 3 — One instruction, one wait",
        paragraphs: [
          "Give one clear instruction, then wait a full five seconds in silence before repeating it. Most yelling starts on the fourth repetition delivered two seconds apart. A single, calm, well-timed instruction lands far better.",
        ],
      },
      {
        heading: "Tools 4 and 5 — Predictable consequences and repair",
        paragraphs: [
          "Consequences should be boring, immediate and known in advance. And when you do lose it — you will — repair quickly: \"I shouted. That wasn't fair to you. I'm working on it.\" Repair is what protects the relationship.",
          "Parenting Without Yelling covers all five tools with age-specific scripts; Emotionally Intelligent Parenting goes deeper on building your child's own regulation skills.",
        ],
      },
    ],
  },
  {
    slug: "how-to-detach-from-your-ex",
    title: "How to Detach From Your Ex in 21 Days: A Step-by-Step Recovery Plan",
    excerpt:
      "Detachment is a skill, not a personality trait. This three-week structure helps you stop checking, stop replaying and start rebuilding — without pretending you are fine.",
    category: "relationships",
    tags: ["breakup", "self love", "healing", "no contact"],
    author: "fga-editorial",
    date: "2026-06-12",
    readingMinutes: 8,
    market: "global",
    intent: "informational",
    relatedBooks: ["detach-from-your-ex-in-21-days", "30-day-self-love-healing-challenge-after-breakup"],
    sections: [
      {
        heading: "Week 1 — Cut the supply",
        paragraphs: [
          "Every glance at their profile is a small dose that resets the withdrawal clock. Week one is about removing access: mute or block, archive the photos, move their number out of favourites. This is not petty. It is the minimum condition for healing.",
        ],
        list: ["Mute or block on every platform", "Archive photos to a folder you cannot see daily", "Tell one friend your plan and ask them to check in"],
      },
      {
        heading: "Week 2 — Interrupt the replay",
        paragraphs: [
          "The mind replays the relationship to solve a problem that no longer exists. When a loop starts, name it (\"replaying\"), then do a two-minute physical task — dishes, a walk, stretching. You are teaching your nervous system that the loop has no reward.",
        ],
      },
      {
        heading: "Week 3 — Rebuild identity",
        paragraphs: [
          "Grief shrinks your world to one person. Week three widens it again: reconnect with one old friend, restart one hobby you dropped, plan one thing to look forward to. Small, real, scheduled.",
          "Detach From Your Ex in 21 Days gives you a page for each day; the 30-Day Self-Love Healing Challenge is the natural next step once the acute phase has passed.",
        ],
      },
    ],
  },
  {
    slug: "20-minute-workouts-busy-professionals",
    title: "20-Minute Workouts for Busy Professionals: Get Lean Without the Gym",
    excerpt:
      "You do not need an hour, a gym or perfect motivation. You need twenty focused minutes, four times a week, and a plan that survives Mondays.",
    category: "health",
    tags: ["fat loss", "home workout", "habits", "energy"],
    author: "fga-editorial",
    date: "2026-05-27",
    readingMinutes: 6,
    market: "usa",
    intent: "commercial",
    relatedBooks: ["20-minutes-to-lean", "build-unbreakable-habits-in-21-days"],
    sections: [
      {
        heading: "Why 20 minutes beats 60",
        paragraphs: [
          "The best workout is the one you repeat. Twenty minutes fits before a Zoom call in Chicago or after the school run in Pune, which is exactly why it works. Intensity and consistency do the job that duration was supposed to do.",
        ],
      },
      {
        heading: "The structure",
        paragraphs: ["Three blocks, no equipment, a timer on your phone."],
        list: [
          "4 minutes: mobility and warm-up",
          "12 minutes: three circuits of squat, push, hinge, pull, carry",
          "4 minutes: walk or breathe to bring your heart rate down",
        ],
      },
      {
        heading: "Making it stick",
        paragraphs: [
          "Anchor the workout to an existing habit (after coffee, before the shower) and lay out your clothes the night before. Track sessions, not weight, for the first month — the scale lies weekly; the calendar does not.",
          "20 Minutes to Lean includes four weeks of exact sessions and a simple eating framework; Build Unbreakable Habits in 21 Days is the companion if consistency is your real problem.",
        ],
      },
    ],
  },
  {
    slug: "best-self-help-ebooks-india-2026",
    title: "Best Self-Help eBooks in India (2026): Affordable, Practical and Instant",
    excerpt:
      "Skip the ₹800 paperbacks and the six-week delivery. These are the most-read self-growth ebooks among Indian readers this year — each under ₹250 and downloadable in seconds.",
    category: "guides",
    tags: ["india", "buying guide", "ebooks", "upi"],
    author: "fga-editorial",
    date: "2026-05-10",
    readingMinutes: 7,
    market: "india",
    intent: "commercial",
    relatedBooks: ["your-why-changes-everything", "30-days-to-digital-wealth", "the-30-day-marriage-fix"],
    sections: [
      {
        heading: "What Indian readers are actually looking for",
        paragraphs: [
          "Across our orders from Delhi, Mumbai, Bangalore, Hyderabad and Pune, three needs dominate: clarity about career direction, a second income that does not require quitting a job, and calmer family relationships. The best ebooks answer one of those three directly in under 100 pages.",
        ],
      },
      {
        heading: "Our most-read titles in India",
        paragraphs: ["Ranked by downloads from Indian readers over the last six months."],
        list: [
          "Your WHY Changes Everything — clarity and motivation for students and professionals",
          "30 Days to Digital Wealth — a day-by-day online income plan",
          "The 30-Day Marriage Fix — practical repair for busy couples",
          "Parenting Without Yelling — calm discipline for modern Indian families",
          "Build Unbreakable Habits in 21 Days — discipline that survives exams and deadlines",
        ],
      },
      {
        heading: "How to buy and read",
        paragraphs: [
          "Every title is $2.97 (about ₹250). Pay with UPI, card or net banking, then download the PDF to your phone immediately — no app, no subscription, no courier. Your library is also saved to your account so you can re-download any time.",
        ],
      },
    ],
  },
  {
    slug: "rewire-your-brain-in-7-days-negative-thinking",
    title: "How to Rewire Negative Thinking in 7 Days",
    excerpt:
      "Negative thought loops are habits, and habits can be replaced. A one-week protocol built on small, repeatable practices — no journal marathons required.",
    category: "mindset",
    tags: ["mindset", "anxiety", "habits", "self talk"],
    author: "fga-editorial",
    date: "2026-04-22",
    readingMinutes: 5,
    market: "global",
    intent: "informational",
    relatedBooks: ["rewire-in-a-week", "transform-your-life-in-60-days"],
    sections: [
      {
        heading: "Day 1–2: Catch the thought",
        paragraphs: [
          "You cannot change a thought you have not noticed. For two days, keep a tally of one recurring negative thought — just a tick mark each time it appears. Most people are shocked by the count, and that awareness alone weakens the loop.",
        ],
      },
      {
        heading: "Day 3–5: Replace, don't fight",
        paragraphs: [
          "Arguing with a thought strengthens it. Instead, prepare one neutral replacement in advance — \"I'm learning this\" instead of \"I'm bad at this\" — and say it every time the tally would have gone up. Neutral beats positive; the brain rejects statements it does not believe.",
        ],
      },
      {
        heading: "Day 6–7: Change the input",
        paragraphs: [
          "Audit what feeds the loop: a group chat, a news app, a comparison account. Remove one input for the weekend and notice the difference. Rewire in a Week turns this into a full seven-day programme with morning and evening practices.",
        ],
      },
    ],
  },
  {
    slug: "ebooks-vs-paperbacks-which-is-better-for-self-growth",
    title: "eBooks vs Paperbacks for Self-Growth: Which Actually Gets Read?",
    excerpt:
      "Paperbacks look good on a shelf. eBooks get opened on the train. A practical comparison for readers who want results, not decoration.",
    category: "guides",
    tags: ["ebooks", "reading habits", "buying guide"],
    author: "fga-editorial",
    date: "2026-04-03",
    readingMinutes: 5,
    market: "usa",
    intent: "commercial",
    relatedBooks: ["build-unbreakable-habits-in-21-days", "your-why-changes-everything"],
    sections: [
      {
        heading: "Completion beats collection",
        paragraphs: [
          "The average self-help paperback is finished by fewer than one in five buyers. Short, structured ebooks on a phone are finished far more often for one reason: they are always with you. A chapter waiting in your pocket gets read; a chapter waiting on your nightstand gets postponed.",
        ],
      },
      {
        heading: "Cost and speed",
        paragraphs: [
          "A US paperback runs $16–$25 plus shipping and a few days' wait. A Future Grow Academy ebook is $2.97, delivered in under a minute, and readable on every device you own. For readers in India the difference is even larger, with no import delays.",
        ],
      },
      {
        heading: "When paper still wins",
        paragraphs: [
          "Reference books you annotate heavily and bedtime reading away from screens are still better on paper. For programmes you need to act on daily — habits, purpose, money plans — digital wins on every practical measure.",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);
export const categoryBySlug = (slug: string) => blogCategories.find((c) => c.slug === slug);
export const authorBySlug = (slug: string) => blogAuthors.find((a) => a.slug === slug);
export const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort();
export const tagSlug = (tag: string) => tag.toLowerCase().replace(/\s+/g, "-");
export const postsByTag = (slug: string) => blogPosts.filter((p) => p.tags.some((t) => tagSlug(t) === slug));
export const sortedPosts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
export const relatedPosts = (post: BlogPost, n = 3) =>
  sortedPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
