import cover1 from "@/assets/covers/Your-WHY-Changes-Everything.jpg";
import cover2 from "@/assets/covers/Parenting-Without-Yelling.jpg";
import cover3 from "@/assets/covers/Invisible-Needs-That-Break-Marriages.jpg";
import cover4 from "@/assets/covers/Emotionally-Intelligent-Parenting-for-Todays-Children.jpg";
import cover5 from "@/assets/covers/20-Minutes-to-Lean.jpg";
import cover6 from "@/assets/covers/The-30-Day-Marriage-Fix.jpg";
import cover7 from "@/assets/covers/Transform-Your-Life-in-60-Days.jpg";
import cover8 from "@/assets/covers/Find-Your-Purpose-in-30-Days.jpg";
import cover9 from "@/assets/covers/Detach-From-Your-Ex-in-21-Days.jpg";
import cover10 from "@/assets/covers/21-Day-Brown-Fat-Activation-Blueprint.jpg";
import cover11 from "@/assets/covers/REWIRE-IN-A-WEEK.jpg";
import cover12 from "@/assets/covers/30-Days-To-Digital-Wealth.jpg";
import cover13 from "@/assets/covers/Passive-Profits-with-AI.jpg";
import cover14 from "@/assets/covers/Build-Unbreakable-Habits-in-21-days.jpg";
import cover15 from "@/assets/covers/30-Day-Self-Love-Healing-Challenge-After-Breakup.jpg";

export type Book = {
  id: string;
  slug: string;
  title: string;
  cover: string;
  category: string;
  authorId?: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  bought: number;
  blurb: string;
  description: string[];
  bullets: string[];
  badge?: string;
};

export const books: Book[] = [
  {
    id: "b1",
    slug: "your-why-changes-everything",
    title: "Your WHY Changes Everything",
    cover: cover1,
    category: "Self-Care",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.9,
    reviews: 1181,
    bought: 435,
    blurb: "What if the reason you feel stuck is not lack of talent, but lack of clarity about your WHY?",
    description: [
      "If you are a professional, entrepreneur, student, or ambitious individual who feels unmotivated, distracted, or unsure about your direction, Your WHY Changes Everything is written for you. You may set goals, start strong, and then lose momentum because the deeper purpose behind your actions is unclear.",
      "Most goal setting advice focuses on productivity hacks and external success. But without a strong personal purpose, discipline fades and burnout increases. Motivation cannot survive without meaning.",
      "This book provides a clear and structured roadmap to discovering your purpose and aligning it with your goals. It is a premium, colorful, engaging ebook experience filled with guided reflection exercises, clarity frameworks, and practical action steps.",
      "Inside you will learn how to:",
      "This is not about chasing success. It is about building a life anchored in meaning and direction.",
      "If you are ready to replace confusion with clarity and hesitation with confidence, start your journey with Your WHY Changes Everything today."
],
    bullets: [
      "Identify your core purpose and personal mission",
      "Strengthen motivation through meaningful goal alignment",
      "Make confident decisions with clarity",
      "Eliminate distractions that do not support your vision",
      "Build consistent habits driven by purpose",
      "Develop the identity of a focused and intentional achiever"
],
  },
  {
    id: "b2",
    slug: "parenting-without-yelling",
    title: "Parenting Without Yelling",
    cover: cover2,
    category: "Parenting",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.8,
    reviews: 819,
    bought: 612,
    blurb: "Are you tired of raising your voice and then feeling guilty moments later?",
    description: [
      "If you are a parent who loves your child deeply but feels overwhelmed by tantrums, defiance, sibling fights, or daily stress, Parenting Without Yelling is written for you. You want calm discipline and respectful communication, yet frustration builds and yelling becomes a habit you never intended to create.",
      "Traditional parenting advice often focuses on control and punishment. It ignores emotional regulation and stress management for parents. Without practical tools, pressure rises and reactions become louder.",
      "This book provides a clear and structured approach to calm parenting and positive discipline. It is a premium, colorful, engaging ebook experience filled with realistic scenarios, guided strategies, and step by step tools you can apply immediately.",
      "Inside you will learn how to:",
      "This is not about becoming a perfect parent. It is about becoming a calm and emotionally aware leader in your home.",
      "If you are ready to replace shouting with connection and guilt with confidence, start your journey with Parenting Without Yelling today."
],
    bullets: [
      "Reduce yelling through proven emotional regulation techniques",
      "Respond calmly during tantrums and power struggles",
      "Strengthen parent child communication with respect",
      "Set clear boundaries without fear or anger",
      "Build cooperation instead of resistance",
      "Develop patience and confidence as a parent"
],
  },
  {
    id: "b3",
    slug: "invisible-needs-that-break-marriages",
    title: "Invisible Needs That Break Marriages",
    cover: cover3,
    category: "Relationship",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.9,
    reviews: 436,
    bought: 274,
    blurb: "What if your marriage is not failing because of big fights, but because of silent unmet needs?",
    description: [
      "If you are a married couple, newlywed, or long term partner feeling emotional distance, constant misunderstandings, or growing resentment, Invisible Needs That Break Marriages is written for you. On the surface, everything may look normal. Yet connection feels weaker. Conversations feel tense. Appreciation feels missing.",
      "Most relationship advice focuses on communication tips or date nights. While helpful, these solutions often miss the deeper emotional needs that silently erode trust and intimacy. When needs go unspoken and unmet, disconnection grows quietly.",
      "This book offers a clear and practical roadmap to understanding the hidden emotional patterns that damage relationships. It is a premium, colorful, engaging ebook experience designed with structured insights, guided reflections, and actionable steps for real marital growth.",
      "Inside you will learn how to:",
      "This is not about blame. It is about awareness and responsibility. When invisible needs become visible, connection becomes possible again.",
      "If you are ready to protect your marriage and rebuild deeper intimacy, start your journey with Invisible Needs That Break Marriages today."
],
    bullets: [
      "Identify unmet emotional needs in marriage",
      "Improve healthy communication in relationships",
      "Rebuild trust and emotional intimacy",
      "Reduce recurring conflict and resentment",
      "Strengthen appreciation and mutual respect",
      "Create a secure emotional foundation for long term partnership"
],
  },
  {
    id: "b4",
    slug: "emotionally-intelligent-parenting-for-todays-children",
    title: "Emotionally Intelligent Parenting for Today\u2019s Children",
    cover: cover4,
    category: "Parenting",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.7,
    reviews: 1357,
    bought: 619,
    blurb: "What if the key to raising confident and resilient children is not control, but emotional intelligence?",
    description: [
      "If you are a parent who feels overwhelmed by tantrums, screen addiction, emotional outbursts, or communication gaps, Emotionally Intelligent Parenting for Today\u2019s Children is designed for you. You want to raise strong, secure, and emotionally aware children, but modern parenting feels more complex than ever.",
      "Traditional parenting advice often focuses only on discipline and rules. It overlooks emotional development, empathy, and connection. As a result, power struggles increase and children shut down instead of opening up.",
      "This book provides a clear and practical roadmap to emotionally intelligent parenting using structured strategies that work in real life. It is a premium, colorful, engaging ebook experience filled with relatable examples, guided exercises, and step by step tools.",
      "Inside you will learn how to:",
      "This is not about being a perfect parent. It is about becoming a conscious and emotionally aware leader in your child\u2019s life.",
      "If you are ready to build deeper connection and raise emotionally strong children, start your journey with Emotionally Intelligent Parenting for Today\u2019s Children today."
],
    bullets: [
      "Strengthen parent child communication with empathy and clarity",
      "Teach emotional regulation and resilience skills",
      "Reduce tantrums and conflict through calm responses",
      "Build trust and secure attachment",
      "Develop your own emotional intelligence as a parent",
      "Raise confident children with strong self awareness"
],
  },
  {
    id: "b5",
    slug: "20-minutes-to-lean",
    title: "20 Minutes to Lean",
    cover: cover5,
    category: "Health",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.8,
    reviews: 857,
    bought: 644,
    blurb: "You do not need more time. You need a focused system that works in real life.",
    description: [
      "If you are a busy professional, entrepreneur, parent, or student struggling with stubborn fat, low energy, and inconsistent workouts, 20 Minutes to Lean is built for you. You want visible weight loss and a lean body, but long gym sessions and strict diet plans feel impossible to sustain.",
      "Most fitness advice fails because it demands extreme routines and perfect discipline. When work pressure increases and schedules get tight, motivation drops and progress stops. The issue is not effort. It is lack of structure.",
      "20 Minutes to Lean provides a simple, practical roadmap built around a powerful 20 minute workout routine and a realistic healthy eating plan for weight loss. This premium, colorful, engaging ebook experience guides you step by step so you know exactly what to do each day without confusion.",
      "Inside you will learn how to:",
      "This is not just information. It is a structured path to becoming someone who shows up daily and gets results.",
      "If you are ready to stop restarting and start progressing, begin your transformation with 20 Minutes to Lean today."
],
    bullets: [
      "Follow a clear fat loss plan that fits your schedule",
      "Improve metabolism and boost daily energy",
      "Build consistency without burnout",
      "Track measurable progress with confidence",
      "Develop a disciplined identity that supports long term fitness",
      "Create sustainable habits that support body transformation"
],
  },
  {
    id: "b6",
    slug: "the-30-day-marriage-fix",
    title: "The 30-Day Marriage Fix",
    cover: cover6,
    category: "Relationship",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.9,
    reviews: 289,
    bought: 224,
    blurb: "What if your marriage could begin to improve in the next 30 days, not someday, but now?",
    description: [
      "If you are a married couple feeling emotional distance, constant arguments, lack of intimacy, or silent resentment, The 30 Day Marriage Fix is written for you. You may still care deeply for each other, yet communication feels strained and connection feels weaker than before.",
      "Most marriage advice offers generic tips like better communication or more date nights. While helpful, they often fail because they lack structure and daily accountability. Without a clear plan, couples fall back into the same unhealthy patterns.",
      "This book provides a simple, structured 30 day action plan focused on rebuilding trust, emotional intimacy, and healthy communication. It is a premium, colorful, engaging ebook experience filled with guided exercises, daily prompts, and practical relationship tools.",
      "Inside you will learn how to:",
      "This is not about fixing your spouse. It is about strengthening the relationship through intentional action.",
      "If you are ready to restore connection and protect your marriage, start your journey with The 30 Day Marriage Fix today."
],
    bullets: [
      "Improve marriage communication skills with clarity and empathy",
      "Rebuild trust after conflict or emotional distance",
      "Reduce recurring arguments and resentment",
      "Strengthen emotional and physical intimacy",
      "Create daily connection habits that last",
      "Develop a partnership mindset instead of a blame mindset"
],
  },
  {
    id: "b7",
    slug: "transform-your-life-in-60-days",
    title: "Transform Your Life in 60 Days",
    cover: cover7,
    category: "Self-Care",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.7,
    reviews: 418,
    bought: 115,
    blurb: "What if the next 60 days could completely reset your direction, habits, and results?",
    description: [
      "If you are a professional, entrepreneur, student, or ambitious individual who feels stuck, inconsistent, or overwhelmed, Transform Your Life in 60 Days is created for you. You have goals, but distractions, self doubt, and lack of structure keep slowing your progress.",
      "Most self improvement advice is motivational but vague. It talks about big dreams without providing a daily system. Without clarity and accountability, excitement fades and old habits return.",
      "This book delivers a clear and structured 60 day life transformation plan focused on mindset, productivity, health, and personal growth. It is a premium, colorful, engaging ebook experience designed with practical exercises and measurable action steps.",
      "Inside you will learn how to:",
      "This is not about overnight success. It is about structured daily action that creates visible change in your mindset and results.",
      "If you are ready to stop drifting and start building a focused, disciplined, and confident version of yourself, begin your journey with Transform Your Life in 60 Days today."
],
    bullets: [
      "Build powerful daily habits for success",
      "Improve focus and eliminate procrastination",
      "Strengthen mental clarity and emotional control",
      "Set clear goals and track real progress",
      "Upgrade health, energy, and discipline",
      "Develop the identity of a consistent high performer"
],
  },
  {
    id: "b8",
    slug: "find-your-purpose-in-30-days",
    title: "Find Your Purpose in 30 Days",
    cover: cover8,
    category: "Self-Care",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.7,
    reviews: 381,
    bought: 210,
    blurb: "Do you wake up feeling busy but not fulfilled, successful but not satisfied?",
    description: [
      "If you are a professional, student, entrepreneur, or creator who feels lost, directionless, or unsure about your next step, Find Your Purpose in 30 Days is written for you. You may have achievements on paper, yet still feel disconnected from meaning and clarity.",
      "Most purpose advice is vague and inspirational. It tells you to follow your passion or wait for clarity to appear. But purpose is not found through waiting. It is built through structured reflection and intentional action.",
      "This book provides a clear, step by step 30 day roadmap for purpose discovery and personal clarity. It is a premium, colorful, engaging ebook experience filled with guided exercises, self reflection prompts, and practical frameworks designed for real life.",
      "Inside you will learn how to:",
      "This is not about chasing a dramatic life change. It is about becoming someone who makes clear, aligned decisions with confidence.",
      "If you are ready to stop drifting and start living with intention, begin your journey with Find Your Purpose in 30 Days today."
],
    bullets: [
      "Identify your core values and natural strengths",
      "Gain clarity on long term vision and life direction",
      "Eliminate confusion and decision fatigue",
      "Align career and personal goals with meaning",
      "Build daily habits that support purposeful living",
      "Develop confidence in your unique path"
],
  },
  {
    id: "b9",
    slug: "detach-from-your-ex-in-21-days",
    title: "Detach From Your Ex in 21 Days",
    cover: cover9,
    category: "Relationship",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.9,
    reviews: 2130,
    bought: 765,
    blurb: "Still thinking about your ex every single day and wishing you could finally feel free?",
    description: [
      "If you are struggling with heartbreak, emotional attachment, constant overthinking, or the urge to check their social media, Detach From Your Ex in 21 Days is written for you. You want emotional peace. You want to move on. But your mind keeps replaying memories and conversations.",
      "Most breakup advice tells you to stay busy, block them, or wait for time to heal everything. But time alone does not create emotional detachment. Without structure, you stay stuck in hope, regret, or self doubt.",
      "This book offers a clear and practical 21 day plan designed to help you build emotional independence and regain self respect. It is a premium, colorful, engaging ebook experience filled with guided exercises, mindset shifts, and daily actions that support real healing.",
      "Inside you will learn how to:",
      "This is not about suppressing emotions. It is about transforming pain into personal power.",
      "If you are ready to stop looking back and start choosing yourself, begin your 21 day journey to emotional freedom today."
],
    bullets: [
      "Break emotional attachment in a healthy and structured way",
      "Stop overthinking and regain mental clarity",
      "Rebuild self confidence after breakup",
      "Set strong boundaries and protect your peace",
      "Replace obsession with purposeful self growth",
      "Develop an identity rooted in strength and self worth"
],
  },
  {
    id: "b10",
    slug: "21-day-brown-fat-activation-blueprint",
    title: "21 Day Brown Fat Activation Blueprint",
    cover: cover10,
    category: "Health",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.6,
    reviews: 410,
    bought: 349,
    blurb: "What if your body already has a natural fat burning system waiting to be activated?",
    description: [
      "If you are a busy professional, entrepreneur, or health conscious adult struggling with stubborn belly fat, slow metabolism, and frustrating weight loss plateaus, 21 Day Brown Fat Activation Blueprint is designed for you. You may have tried calorie restriction, intense workouts, or trendy diet plans. The results were slow, exhausting, or impossible to maintain.",
      "Traditional weight loss advice focuses only on eating less and moving more. It ignores the role of brown fat activation and metabolic optimization. Without supporting your metabolism correctly, fat burning slows and progress stalls.",
      "This book offers a simple, practical, and structured 21 day plan to support natural thermogenesis and sustainable fat loss. It is a premium, colorful, engaging ebook experience that guides you step by step with clarity and science based strategies.",
      "Inside you will learn how to:",
      "This is not a quick fix. It is a measurable system designed to help you become someone who understands and supports their metabolism.",
      "If you are ready to stop fighting your body and start working with it, begin your transformation with 21 Day Brown Fat Activation Blueprint today."
],
    bullets: [
      "Stimulate brown fat activation safely and effectively",
      "Improve metabolic flexibility for consistent fat burning",
      "Break through stubborn weight loss plateaus",
      "Increase daily energy without extreme workouts",
      "Support hormonal balance through structured habits",
      "Build a sustainable fat loss routine you can maintain"
],
  },
  {
    id: "b11",
    slug: "rewire-in-a-week",
    title: "REWIRE IN A WEEK",
    cover: cover11,
    category: "Self-Care",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.7,
    reviews: 830,
    bought: 572,
    blurb: "What if you could reset your mindset and break negative patterns in just seven days?",
    description: [
      "If you are a professional, student, entrepreneur, or high achiever struggling with overthinking, self doubt, procrastination, or limiting beliefs, REWIRE IN A WEEK is created for you. You know you are capable of more, yet your thoughts keep pulling you back into the same habits and emotional cycles.",
      "Most personal development advice focuses on motivation and long term theory. It tells you to think positive and wait for change. But without a structured mental reset process, old neural patterns remain strong.",
      "This book delivers a clear and practical seven day action plan rooted in mindset shift, behavior change, and mental conditioning. It is a premium, colorful, engaging ebook experience designed with step by step exercises that help you create measurable internal change.",
      "Inside you will learn how to:",
      "This is not about temporary inspiration. It is about becoming someone who thinks clearly, acts intentionally, and controls their internal narrative.",
      "If you are ready to upgrade your mindset and take control of your mental programming, start your transformation with REWIRE IN A WEEK today."
],
    bullets: [
      "Identify and replace limiting beliefs",
      "Break negative thought patterns with practical tools",
      "Improve focus and emotional control",
      "Build confidence through daily cognitive rewiring exercises",
      "Strengthen discipline and decision making clarity",
      "Create sustainable habits that support personal growth"
],
  },
  {
    id: "b12",
    slug: "30-days-to-digital-wealth",
    title: "30 Days To Digital Wealth",
    cover: cover12,
    category: "Money",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.7,
    reviews: 2415,
    bought: 348,
    blurb: "What if the next 30 days could completely change your financial direction?",
    description: [
      "If you are a working professional, aspiring entrepreneur, student, or content creator who feels stuck in a fixed income cycle, 30 Days To Digital Wealth is written for you. You want to earn online, build digital income, and create financial freedom, but you feel overwhelmed by too much information and too many so called gurus.",
      "Traditional advice often fails because it is vague, technical, or unrealistic. It talks about overnight success, complex funnels, and massive investments. Most people end up confused, distracted, and stuck without clear action steps.",
      "30 Days To Digital Wealth provides a simple, structured roadmap to building online income streams with clarity and focus. This is a premium, colorful, engaging ebook experience that walks you step by step through practical digital business foundations, content monetization strategies, and smart online income systems.",
      "Inside you will learn how to:",
      "This is not about chasing trends. It is about becoming someone who thinks digitally, acts strategically, and builds sustainable wealth online.",
      "If you are ready to stop consuming information and start creating income, begin your journey with 30 Days To Digital Wealth today."
],
    bullets: [
      "Identify profitable digital income opportunities aligned with your skills",
      "Build simple systems for online business growth",
      "Create and monetize digital products with clarity",
      "Use content and platforms strategically for visibility",
      "Develop consistent action habits that build momentum",
      "Track measurable progress toward financial independence"
],
  },
  {
    id: "b13",
    slug: "passive-profits-with-ai",
    title: "Passive Profits with AI",
    cover: cover13,
    category: "Money",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.9,
    reviews: 716,
    bought: 364,
    blurb: "What if artificial intelligence could help you earn even when you are offline?",
    description: [
      "If you are a working professional, entrepreneur, freelancer, or content creator looking to build online income without adding more hours to your day, Passive Profits with AI is designed for you. You want financial growth and digital freedom, but you feel overwhelmed by complex tools, technical jargon, and unrealistic promises.",
      "Traditional online business advice often requires heavy upfront investment, advanced coding skills, or constant content production. Most people start excited and end confused.",
      "This book offers a clear, structured path to building passive income with artificial intelligence using practical and accessible strategies. It is a premium, colorful, engaging ebook experience that walks you step by step through real world AI business models and smart automation systems.",
      "Inside you will learn how to:",
      "This is not about chasing hype. It is about understanding how to use AI strategically to create sustainable digital income.",
      "If you are ready to move from consumer to creator and build smart online revenue streams, start your journey with Passive Profits with AI today."
],
    bullets: [
      "Identify profitable AI powered income opportunities",
      "Create digital products using artificial intelligence tools",
      "Automate content creation and online workflows",
      "Build scalable online business systems",
      "Use AI for marketing and audience growth",
      "Track measurable results and optimize for long term profit"
],
  },
  {
    id: "b14",
    slug: "build-unbreakable-habits-in-21-days",
    title: "Build Unbreakable Habits in 21 Days",
    cover: cover14,
    category: "Self-Care",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.6,
    reviews: 473,
    bought: 118,
    blurb: "What if discipline was not about willpower, but about having the right system?",
    description: [
      "If you are a professional, student, entrepreneur, or creator who struggles with inconsistency, procrastination, or starting strong and quitting early, Build Unbreakable Habits in 21 Days is designed for you. You know what you should do. The problem is doing it consistently.",
      "Most habit advice focuses on motivation and intensity. It tells you to wake up earlier, push harder, and stay inspired. But motivation fades. When life gets busy, old patterns return and progress disappears.",
      "This book provides a clear, structured 21 day action plan for real habit formation and lasting behavior change. It is a premium, colorful, engaging ebook experience that guides you step by step through practical routines, mindset shifts, and simple daily systems.",
      "Inside you will learn how to:",
      "This is not about forcing yourself to change. It is about becoming the kind of person who naturally takes consistent action.",
      "If you are ready to stop relying on motivation and start building real discipline, begin your transformation with Build Unbreakable Habits in 21 Days today."
],
    bullets: [
      "Build unbreakable daily habits with clarity and structure",
      "Eliminate procrastination using proven habit building strategies",
      "Design routines that support productivity and focus",
      "Strengthen self discipline without burnout",
      "Track measurable progress and stay accountable",
      "Shift your identity into someone who follows through"
],
  },
  {
    id: "b15",
    slug: "30-day-self-love-healing-challenge-after-breakup",
    title: "30-Day Self-Love & Healing Challenge After Breakup",
    cover: cover15,
    category: "Relationship",
    price: 2.97,
    oldPrice: 7.5,
    rating: 4.8,
    reviews: 772,
    bought: 361,
    blurb: "What if the next 30 days could help you heal, rebuild your confidence, and finally feel like yourself again?",
    description: [
      "If you are navigating heartbreak, emotional pain, or the confusion that follows a breakup, 30 Day Self Love and Healing Challenge After Breakup is created for you. You may feel rejected, stuck in overthinking, or struggling with self doubt. Some days feel heavy. Some nights feel endless.",
      "Most breakup advice tells you to stay busy, block your ex, or simply move on. But emotional healing does not happen through distraction alone. Without structure, the pain lingers and confidence remains low.",
      "This book offers a clear, step by step 30 day healing journey designed to support emotional recovery, self worth, and personal growth. It is a premium, colorful, engaging ebook experience filled with guided reflections, practical exercises, and daily self love practices.",
      "Inside you will learn how to:",
      "This is not about pretending you are fine. It is about becoming stronger, calmer, and more secure within yourself.",
      "If you are ready to stop replaying the past and start rebuilding your future, begin your 30 day healing journey today and choose yourself again."
],
    bullets: [
      "Process emotions in a healthy and structured way",
      "Rebuild self confidence after breakup",
      "Break patterns of overthinking and emotional attachment",
      "Strengthen boundaries and self respect",
      "Create daily habits that support mental clarity",
      "Shift from heartbreak to personal empowerment"
],
  },
];

const authorByCategory: Record<string, string> = {
  "Self-Care": "a-ankit",
  Parenting: "a-meera",
  Relationship: "a-priya",
  Health: "a-rahul",
  Money: "a-ankit",
};

for (const book of books) {
  book.authorId = authorByCategory[book.category] ?? "a-ankit";
}

export const bySlug = (slug: string) => books.find((b) => b.slug === slug);

export const pickBestsellers = (list: Book[], n = 6) =>
  [...list].sort((a, b) => b.bought - a.bought).slice(0, n);
export const pickNewArrivals = (list: Book[], n = 6) => [...list].slice(-n).reverse();
export const pickPopular = (list: Book[], n = 6) =>
  [...list].sort((a, b) => b.reviews - a.reviews).slice(0, n);

export const bestsellers = pickBestsellers(books);
export const newArrivals = pickNewArrivals(books);
export const mostPopular = pickPopular(books);
export const featuredBook = books[0] as Book;
export const bookOfTheMonth = books[0] as Book;
for (const b of pickBestsellers(books, 3)) b.badge = "Bestseller";
for (const b of books.slice(-3)) if (!b.badge) b.badge = "New";

export const newArrivalFilters = ["All", "Self-Care", "Relationship", "Money", "Health", "Parenting"] as const;

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  cover: string;
};

export const categories: Category[] = [
  { slug: "relationship", name: "Relationship", tagline: "Heal and reconnect", cover: cover6 },
  { slug: "money", name: "Money", tagline: "Build digital income", cover: cover12 },
  { slug: "self-care", name: "Self-Care", tagline: "Rebuild your mindset", cover: cover1 },
  { slug: "health", name: "Health", tagline: "Energy and fat loss", cover: cover5 },
  { slug: "parenting", name: "Parenting", tagline: "Calmer, kinder homes", cover: cover2 },
];

export const categoryFilters = ["All", ...categories.map((c) => c.name)] as const;

export const benefits = [
  { emoji: "\uD83D\uDCB8", title: "No shipping charges", note: "100% digital product delivery" },
  { emoji: "\u26A1", title: "Instant download", note: "Access your ebook immediately" },
  { emoji: "\uD83C\uDFC6", title: "Premium quality", note: "Expert-written & colorful layout" },
  { emoji: "\uD83D\uDCF1", title: "Mobile friendly", note: "Readable on all devices" },
];

export const whyUs = [
  {
    emoji: "\uD83D\uDCD8",
    title: "Practical Learning",
    note: "Actionable lessons, real-life examples, and easy-to-follow guidance that you can implement immediately.",
  },
  {
    emoji: "\u26A1",
    title: "Instant Access",
    note: "Download your eBooks instantly after purchase and start learning on any device, anytime.",
  },
  {
    emoji: "\uD83D\uDC8E",
    title: "Premium Quality",
    note: "Professionally curated content designed to deliver maximum value without unnecessary complexity.",
  },
  {
    emoji: "\uD83D\uDE80",
    title: "Continuous Growth",
    note: "Build stronger habits, better thinking, greater confidence, and lasting personal and professional success.",
  },
];

export type Testimonial = { name: string; location: string; rating: number; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Daniel Morgan",
    location: "New York, USA",
    rating: 4.7,
    quote:
      "I was skeptical at first, but the strategies inside are incredibly actionable. The writing style keeps you engaged while delivering real-life transformation techniques.",
  },
  {
    name: "Sophia Martinez",
    location: "Madrid, Spain",
    rating: 4.9,
    quote:
      "Clear, powerful, and beautifully structured. Every chapter adds value. It feels like having a personal mentor guiding you step by step.",
  },
  {
    name: "Arjun Patel",
    location: "London, UK",
    rating: 4.6,
    quote:
      "The insights are deep yet simple to apply. I loved how practical examples were included. It's one of the best investments I've made in self-growth.",
  },
  {
    name: "Emily Chen",
    location: "Singapore",
    rating: 4.8,
    quote:
      "Every page delivers clarity and motivation. The habit-building techniques are realistic and easy to implement in daily life.",
  },
  {
    name: "Lucas Fernandes",
    location: "S\u00E3o Paulo, Brazil",
    rating: 4.7,
    quote:
      "I noticed improvements in focus and confidence within weeks. The content feels premium and thoughtfully crafted.",
  },
  {
    name: "Hannah M\u00FCller",
    location: "Berlin, Germany",
    rating: 4.9,
    quote:
      "These ebooks are practical, inspiring, and straight to the point. I've recommended them to friends and colleagues already.",
  },
];

export const storeConfig = {
  name: "Future Grow Academy",
  tagline: "Clarity-driven growth for real life, real change, and lasting confidence.",
  heroTitle: "Transform Your Future with Powerful eBooks.",
  heroSubtitle:
    "Discover powerful ebooks on personal growth, mindset, finance, relationships and success. Read anytime on your phone, tablet or laptop and start building a better future today.",
  announcement: "80% OFF everything — instant PDF download",
  announcementSecondary: "Digital delivery worldwide · No shipping charges",
  offer: { label: "Limited time offer", headline: "Get 80% OFF", sub: "On Every eBook", note: "Learn new skills with instant PDF downloads. Offer ends soon." },
  email: "help@futuregrowacademy.co",
  address: "134, Sector 105, Gurgaon, India",
  note: "This is a digital product and can be downloaded to your device instantly after payment confirmation. You may require any PDF reading application to open the eBook.",
  socials: [
    { label: "Facebook", href: "http://facebook.com/AcademyFGA" },
    { label: "X", href: "http://twitter.com/AcademyFGA" },
    { label: "Instagram", href: "http://instagram.com/futuregrowacademy" },
    { label: "YouTube", href: "https://www.youtube.com/@FutureGrowAcademy" },
    { label: "Pinterest", href: "https://www.pinterest.com/FutureGrowAcademy/" },
    { label: "LinkedIn", href: "http://linkedin.com/company/futuregrowacademy" },
  ],
  legal: [
    { label: "Privacy Policy", href: "https://futuregrowacademy.co/privacy/" },
    { label: "Terms & Conditions", href: "https://futuregrowacademy.co/terms-of-services/" },
    { label: "Refund Policy", href: "https://futuregrowacademy.co/refund-policy/" },
    { label: "Cookies Policy", href: "https://futuregrowacademy.co/cookies-policy/" },
  ],
  nav: [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/books" },
    { label: "Categories", to: "/categories" },
    { label: "Bestsellers", to: "/bestsellers" },
    { label: "Programs", to: "/authors" },
    { label: "Academy", to: "/about" },
    { label: "Connect", to: "/contact" },
  ] as const,
  phone: "+91 95607 22598",
  phoneHref: "tel:+919560722598",
};

export const formatPrice = (value: number) =>
  `$${value.toFixed(2)}`;
