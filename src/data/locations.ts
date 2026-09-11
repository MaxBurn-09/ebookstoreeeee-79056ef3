export type Location = {
  slug: string;
  city: string;
  region: string;
  country: "USA" | "India";
  countryCode: "US" | "IN";
  timezone: string;
  /** Local flavour used in headings and copy. */
  nickname: string;
  intro: string;
  angle: string;
  focus: string[]; // category slugs, most relevant first
  neighbourhoods: string[];
  keywords: string[];
  faq: { q: string; a: string }[];
};

const usaFaq = (city: string, tz: string) => [
  {
    q: `Do you ship physical books to ${city}?`,
    a: `No — every title is a digital PDF. As soon as your payment is confirmed you can download the ebook to any phone, tablet or laptop in ${city}. There are no shipping fees and no waiting.`,
  },
  {
    q: `What time zone is support available for ${city} readers?`,
    a: `Support is by email and we answer every message within 24 hours, including weekends. ${city} runs on ${tz}, so most replies land the same day or first thing the next morning.`,
  },
  {
    q: "Is the $2.97 price in US dollars?",
    a: "Yes. Every ebook is $2.97 USD (regular price $7.50). Your card or PayPal statement will show the charge in dollars with no currency conversion fees.",
  },
];

const indiaFaq = (city: string) => [
  {
    q: `Can I pay in rupees from ${city}?`,
    a: `Yes. Readers in ${city} can pay with UPI, debit/credit cards or net banking. The listed price is $2.97 (about ₹250 at current rates) and your bank shows the equivalent in INR.`,
  },
  {
    q: "Will the PDF open on my phone?",
    a: "Yes. Every ebook is a standard PDF that opens in any free reader on Android or iPhone, and on laptops. Files are optimised so they download quickly even on mobile data.",
  },
  {
    q: `Do you offer courier delivery in ${city}?`,
    a: `There is nothing to courier — the ebook is delivered instantly online. That is why we can keep the price low and why readers in ${city} can start the same evening they order.`,
  },
];

export const locations: Location[] = [
  // ---------------------------------------------------------------- USA
  {
    slug: "new-york",
    city: "New York",
    region: "New York",
    country: "USA",
    countryCode: "US",
    timezone: "Eastern Time (ET)",
    nickname: "the city that never slows down",
    intro:
      "New Yorkers read on the subway, between meetings and long after the office lights go off. Our ebooks are built for exactly that rhythm — short chapters, one action per day, and a PDF you can open on your phone from Brooklyn to the Bronx.",
    angle:
      "Long commutes and high-pressure careers make focus and burnout the two most common reasons New York readers pick up a Future Grow Academy title.",
    focus: ["self-care", "money", "relationship"],
    neighbourhoods: ["Manhattan", "Brooklyn", "Queens", "Jersey City", "Long Island"],
    keywords: ["self help ebooks New York", "personal growth books NYC", "instant PDF download New York"],
    faq: usaFaq("New York", "Eastern Time"),
  },
  {
    slug: "los-angeles",
    city: "Los Angeles",
    region: "California",
    country: "USA",
    countryCode: "US",
    timezone: "Pacific Time (PT)",
    nickname: "the creative capital",
    intro:
      "Los Angeles is a city of side projects, reinventions and early alarms. Whether you are building a creative career or getting back into shape, these ebooks give LA readers a clear plan they can follow on a phone in traffic on the 405.",
    angle:
      "Health, habits and purpose are the top-selling shelves in Los Angeles — readers here want energy and direction, not another 400-page theory book.",
    focus: ["health", "self-care", "money"],
    neighbourhoods: ["Santa Monica", "Pasadena", "Long Beach", "Burbank", "Orange County"],
    keywords: ["self improvement ebooks Los Angeles", "fitness ebook PDF LA", "habit books California"],
    faq: usaFaq("Los Angeles", "Pacific Time"),
  },
  {
    slug: "chicago",
    city: "Chicago",
    region: "Illinois",
    country: "USA",
    countryCode: "US",
    timezone: "Central Time (CT)",
    nickname: "the Windy City",
    intro:
      "Chicago winters are made for reading. Families across Cook County use our parenting and relationship guides to bring more calm into busy households, and professionals in the Loop use the money titles to build income that isn't tied to a desk.",
    angle:
      "Parenting and marriage guides lead in Chicago, followed closely by digital-income playbooks for readers planning a second stream of income.",
    focus: ["parenting", "relationship", "money"],
    neighbourhoods: ["The Loop", "Naperville", "Evanston", "Oak Park", "Schaumburg"],
    keywords: ["parenting ebooks Chicago", "relationship books Illinois", "self growth PDF Chicago"],
    faq: usaFaq("Chicago", "Central Time"),
  },
  {
    slug: "houston",
    city: "Houston",
    region: "Texas",
    country: "USA",
    countryCode: "US",
    timezone: "Central Time (CT)",
    nickname: "Space City",
    intro:
      "Houston is one of the most diverse cities in America, and our readers here reflect it — engineers, nurses, small-business owners and new parents. Every ebook is a practical programme you can finish in weeks, not a lecture you abandon in chapter two.",
    angle:
      "Health and habit-building titles are Houston's favourites, with the 20-minute workout and 21-day habit guides among the most downloaded.",
    focus: ["health", "self-care", "parenting"],
    neighbourhoods: ["The Woodlands", "Sugar Land", "Katy", "Pearland", "Galleria"],
    keywords: ["self help PDF Houston", "habit ebook Texas", "wellness ebooks Houston"],
    faq: usaFaq("Houston", "Central Time"),
  },
  {
    slug: "dallas",
    city: "Dallas",
    region: "Texas",
    country: "USA",
    countryCode: "US",
    timezone: "Central Time (CT)",
    nickname: "Big D",
    intro:
      "Dallas–Fort Worth is a hub of ambition: startups in Plano, corporate towers uptown and thousands of remote workers. Our money and mindset ebooks give DFW readers a step-by-step path to clarity, discipline and online income.",
    angle:
      "Digital income, purpose and marriage guides sell best in Dallas, where readers look for structured plans they can act on this quarter.",
    focus: ["money", "self-care", "relationship"],
    neighbourhoods: ["Plano", "Frisco", "Fort Worth", "Irving", "Arlington"],
    keywords: ["make money online ebook Dallas", "self growth books DFW", "instant ebook download Texas"],
    faq: usaFaq("Dallas", "Central Time"),
  },
  {
    slug: "miami",
    city: "Miami",
    region: "Florida",
    country: "USA",
    countryCode: "US",
    timezone: "Eastern Time (ET)",
    nickname: "the Magic City",
    intro:
      "Miami moves fast and lives out loud. Readers here come to us for confidence after a breakup, sharper habits and healthier routines that fit a social calendar. Every title downloads instantly — read it by the pool in Brickell or on the flight home.",
    angle:
      "Relationship healing and self-care are the leading shelves in Miami, alongside quick fat-loss guides ahead of beach season.",
    focus: ["relationship", "self-care", "health"],
    neighbourhoods: ["Brickell", "Coral Gables", "Fort Lauderdale", "Hialeah", "Boca Raton"],
    keywords: ["breakup recovery ebook Miami", "self love book Florida", "ebooks PDF Miami"],
    faq: usaFaq("Miami", "Eastern Time"),
  },
  {
    slug: "san-francisco",
    city: "San Francisco",
    region: "California",
    country: "USA",
    countryCode: "US",
    timezone: "Pacific Time (PT)",
    nickname: "the Bay Area",
    intro:
      "Bay Area readers already know that systems beat willpower. Our ebooks on habits, AI-powered income and mental rewiring are written the way engineers like it: clear frameworks, daily checklists and zero fluff — all in a PDF under 10 MB.",
    angle:
      "AI income, habit systems and burnout recovery are the most-read topics in San Francisco and Silicon Valley.",
    focus: ["money", "self-care", "health"],
    neighbourhoods: ["SoMa", "Oakland", "Palo Alto", "San Jose", "Berkeley"],
    keywords: ["AI side income ebook San Francisco", "habit building PDF Bay Area", "productivity ebooks SF"],
    faq: usaFaq("San Francisco", "Pacific Time"),
  },
  {
    slug: "seattle",
    city: "Seattle",
    region: "Washington",
    country: "USA",
    countryCode: "US",
    timezone: "Pacific Time (PT)",
    nickname: "the Emerald City",
    intro:
      "Rainy evenings, coffee and a good plan — Seattle is a reading city. Our titles help Pacific Northwest readers rewire negative thinking, protect their energy through the dark months and build purpose-led routines that last past January.",
    angle:
      "Mindset and self-care guides lead in Seattle, with the 7-day rewire programme and 30-day purpose guide the most downloaded.",
    focus: ["self-care", "health", "parenting"],
    neighbourhoods: ["Capitol Hill", "Bellevue", "Redmond", "Tacoma", "Kirkland"],
    keywords: ["mindset ebooks Seattle", "self care PDF Washington", "personal growth books Seattle"],
    faq: usaFaq("Seattle", "Pacific Time"),
  },
  {
    slug: "boston",
    city: "Boston",
    region: "Massachusetts",
    country: "USA",
    countryCode: "US",
    timezone: "Eastern Time (ET)",
    nickname: "America's college town",
    intro:
      "Home to more students and researchers than almost anywhere in the world, Boston readers want substance. Each ebook is a structured curriculum — reflection exercises, frameworks and weekly milestones — priced so a student in Cambridge can afford the whole shelf.",
    angle:
      "Purpose, habits and money guides are Boston's top picks, popular with students, graduates and early-career professionals.",
    focus: ["self-care", "money", "health"],
    neighbourhoods: ["Cambridge", "Back Bay", "Somerville", "Brookline", "Quincy"],
    keywords: ["self development ebooks Boston", "student productivity PDF", "purpose book Massachusetts"],
    faq: usaFaq("Boston", "Eastern Time"),
  },
  {
    slug: "atlanta",
    city: "Atlanta",
    region: "Georgia",
    country: "USA",
    countryCode: "US",
    timezone: "Eastern Time (ET)",
    nickname: "the capital of the South",
    intro:
      "Atlanta is a city of entrepreneurs, families and faith-driven growth. Our parenting, marriage and digital-income ebooks give readers across metro Atlanta a calm, practical roadmap — downloadable in seconds and readable on any device.",
    angle:
      "Family and relationship titles lead in Atlanta, with strong demand for the marriage fix and yelling-free parenting guides.",
    focus: ["parenting", "relationship", "money"],
    neighbourhoods: ["Buckhead", "Decatur", "Marietta", "Alpharetta", "Sandy Springs"],
    keywords: ["parenting ebooks Atlanta", "marriage help PDF Georgia", "self growth books Atlanta"],
    faq: usaFaq("Atlanta", "Eastern Time"),
  },

  // -------------------------------------------------------------- India
  {
    slug: "delhi",
    city: "Delhi",
    region: "Delhi NCR",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the capital",
    intro:
      "Future Grow Academy is based in Gurgaon, right in the heart of Delhi NCR. Our readers in Delhi, Noida, Gurgaon and Faridabad were the first to read every title — practical English-language ebooks on career clarity, money, relationships and parenting, delivered instantly as PDF.",
    angle:
      "Career purpose, digital income and parenting are the most-read shelves in Delhi NCR, where readers balance demanding jobs with family life.",
    focus: ["self-care", "money", "parenting"],
    neighbourhoods: ["Gurgaon", "Noida", "Dwarka", "Faridabad", "Ghaziabad"],
    keywords: ["self help ebooks Delhi", "personal development PDF Gurgaon", "ebooks online India instant download"],
    faq: indiaFaq("Delhi"),
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the city of dreams",
    intro:
      "Between the local train and a 10-hour workday, Mumbai readers have no time for padding. Every ebook here is short, structured and mobile-first, so you can finish a chapter between Andheri and Churchgate and apply it the same day.",
    angle:
      "Money and mindset guides sell best in Mumbai — from AI side income to the 60-day transformation plan — followed by relationship healing.",
    focus: ["money", "self-care", "relationship"],
    neighbourhoods: ["Andheri", "Bandra", "Powai", "Thane", "Navi Mumbai"],
    keywords: ["self improvement ebooks Mumbai", "make money online PDF India", "motivational books Mumbai"],
    faq: indiaFaq("Mumbai"),
  },
  {
    slug: "bangalore",
    city: "Bangalore",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "India's Silicon Valley",
    intro:
      "Bangalore's tech professionals want frameworks, not motivation quotes. Our habit-building, AI-income and rewiring guides are written as systems — daily checklists, weekly reviews and measurable outcomes — and they open perfectly on the phone you already carry.",
    angle:
      "Habits, productivity and passive income with AI are Bangalore's top downloads, with strong interest in burnout recovery.",
    focus: ["self-care", "money", "health"],
    neighbourhoods: ["Koramangala", "Whitefield", "Indiranagar", "Electronic City", "HSR Layout"],
    keywords: ["habit ebook Bangalore", "AI passive income PDF India", "productivity books Bengaluru"],
    faq: indiaFaq("Bangalore"),
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    region: "Telangana",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the City of Pearls",
    intro:
      "From HITEC City to the Old City, Hyderabad readers combine ambition with strong family values. Our ebooks help with both: clear career direction and income plans on one shelf, calmer parenting and stronger marriages on the other.",
    angle:
      "Purpose, parenting and money guides lead in Hyderabad, with the emotionally intelligent parenting title a consistent favourite.",
    focus: ["parenting", "self-care", "money"],
    neighbourhoods: ["HITEC City", "Gachibowli", "Banjara Hills", "Secunderabad", "Kukatpally"],
    keywords: ["parenting ebooks Hyderabad", "self growth PDF Telangana", "career clarity book India"],
    faq: indiaFaq("Hyderabad"),
  },
  {
    slug: "pune",
    city: "Pune",
    region: "Maharashtra",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the Oxford of the East",
    intro:
      "Pune is a student and startup city, and its readers are early adopters. Our ebooks give Pune's students, engineers and young couples affordable, structured programmes — purpose in 30 days, habits in 21, a marriage reset in 30 — all for less than the price of a coffee.",
    angle:
      "Purpose, habits and relationship guides are the most popular in Pune, where many readers are in their first job or first serious relationship.",
    focus: ["self-care", "relationship", "money"],
    neighbourhoods: ["Hinjewadi", "Kothrud", "Baner", "Viman Nagar", "Pimpri-Chinchwad"],
    keywords: ["self help books Pune", "student motivation ebook India", "relationship PDF Pune"],
    faq: indiaFaq("Pune"),
  },
  {
    slug: "dehradun",
    city: "Dehradun",
    region: "Uttarakhand",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the Doon valley",
    intro:
      "Dehradun readers value calm and clarity — and so do our books. Whether you are a student preparing for exams, a parent, or a professional who moved to the hills for balance, these ebooks offer short daily practices you can keep up long term.",
    angle:
      "Self-care, health and parenting titles lead in Dehradun, with the self-love challenge and calm-parenting guide among the most read.",
    focus: ["self-care", "health", "parenting"],
    neighbourhoods: ["Rajpur Road", "Clement Town", "Mussoorie", "Rishikesh", "Haridwar"],
    keywords: ["self care ebook Dehradun", "personal growth PDF Uttarakhand", "motivational books Dehradun"],
    faq: indiaFaq("Dehradun"),
  },
  {
    slug: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the Pink City",
    intro:
      "Jaipur blends tradition with a fast-growing digital economy. Our readers here run family businesses, teach, design and freelance — and they use our money and mindset guides to grow online income without leaving Rajasthan.",
    angle:
      "Digital income and mindset guides sell best in Jaipur, followed by marriage and parenting titles popular with young families.",
    focus: ["money", "self-care", "relationship"],
    neighbourhoods: ["Malviya Nagar", "Vaishali Nagar", "C-Scheme", "Mansarovar", "Tonk Road"],
    keywords: ["online income ebook Jaipur", "self improvement books Rajasthan", "ebooks PDF Jaipur"],
    faq: indiaFaq("Jaipur"),
  },
  {
    slug: "lucknow",
    city: "Lucknow",
    region: "Uttar Pradesh",
    country: "India",
    countryCode: "IN",
    timezone: "India Standard Time (IST)",
    nickname: "the City of Nawabs",
    intro:
      "Lucknow is home to millions of students, teachers and government aspirants who read seriously. Our ebooks give them what coaching centres rarely do — clarity of purpose, discipline that lasts and emotional tools for family life — in an affordable PDF.",
    angle:
      "Purpose, habits and relationship guides are Lucknow's most-read titles, especially among students and early-career professionals.",
    focus: ["self-care", "relationship", "parenting"],
    neighbourhoods: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Alambagh"],
    keywords: ["self help books Lucknow", "purpose ebook India", "student discipline PDF Lucknow"],
    faq: indiaFaq("Lucknow"),
  },
];

export const usaLocations = locations.filter((l) => l.country === "USA");
export const indiaLocations = locations.filter((l) => l.country === "India");
export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
