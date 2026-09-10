import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { books as seedBooks, categories as seedCategories, type Book, type Category } from "@/data/catalog";
import { authors as seedAuthors, reviews as seedReviews, type Author, type Review } from "@/data/academy";

const STORAGE_KEY = "fga_catalog_v1";

type CatalogSnapshot = {
  books: Book[];
  categories: Category[];
  authors: Author[];
  reviews: Review[];
};

type CatalogValue = CatalogSnapshot & {
  ready: boolean;
  upsertBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  upsertCategory: (category: Category) => void;
  deleteCategory: (slug: string) => void;
  upsertAuthor: (author: Author) => void;
  deleteAuthor: (id: string) => void;
  upsertReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  resetCatalog: () => void;
  bookBySlug: (slug: string) => Book | undefined;
  authorById: (id: string) => Author | undefined;
};

const CatalogContext = createContext<CatalogValue | null>(null);

const seed: CatalogSnapshot = {
  books: seedBooks,
  categories: seedCategories,
  authors: seedAuthors,
  reviews: seedReviews,
};

function hydrateBooks(stored?: Book[]) {
  const list = stored && stored.length ? stored : seedBooks;
  return list.map((book) => {
    const seeded = seedBooks.find((row) => row.id === book.id || row.slug === book.slug);
    if (!seeded) return book;
    const customCover =
      typeof book.cover === "string" &&
      (book.cover.startsWith("http://") ||
        book.cover.startsWith("https://") ||
        book.cover.startsWith("data:"));
    return { ...seeded, ...book, cover: customCover ? book.cover : seeded.cover };
  });
}

function hydrateCategories(stored?: Category[]) {
  const list = stored && stored.length ? stored : seedCategories;
  return list.map((category) => {
    const seeded = seedCategories.find((row) => row.slug === category.slug);
    if (!seeded) return category;
    const customCover =
      typeof category.cover === "string" &&
      (category.cover.startsWith("http://") ||
        category.cover.startsWith("https://") ||
        category.cover.startsWith("data:"));
    return { ...seeded, ...category, cover: customCover ? category.cover : seeded.cover };
  });
}

function load(): CatalogSnapshot {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Partial<CatalogSnapshot>;
    return {
      books: hydrateBooks(parsed.books),
      categories: hydrateCategories(parsed.categories),
      authors: Array.isArray(parsed.authors) && parsed.authors.length ? parsed.authors : seed.authors,
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : seed.reviews,
    };
  } catch {
    return seed;
  }
}

function replaceById<T extends { id: string }>(list: T[], item: T) {
  const idx = list.findIndex((row) => row.id === item.id);
  if (idx === -1) return [...list, item];
  const next = [...list];
  next[idx] = item;
  return next;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CatalogSnapshot>(seed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, ready]);

  const upsertBook = useCallback((book: Book) => {
    setData((prev) => {
      const idx = prev.books.findIndex((row) => row.id === book.id);
      if (idx === -1) return { ...prev, books: [book, ...prev.books] };
      const books = [...prev.books];
      books[idx] = book;
      return { ...prev, books };
    });
  }, []);

  const deleteBook = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== id),
      reviews: prev.reviews.filter((r) => r.bookId !== id),
    }));
  }, []);

  const upsertCategory = useCallback((category: Category) => {
    setData((prev) => {
      const idx = prev.categories.findIndex((c) => c.slug === category.slug);
      const categories =
        idx === -1
          ? [...prev.categories, category]
          : prev.categories.map((c, i) => (i === idx ? category : c));
      return { ...prev, categories };
    });
  }, []);

  const deleteCategory = useCallback((slug: string) => {
    setData((prev) => ({ ...prev, categories: prev.categories.filter((c) => c.slug !== slug) }));
  }, []);

  const upsertAuthor = useCallback((author: Author) => {
    setData((prev) => ({ ...prev, authors: replaceById(prev.authors, author) }));
  }, []);

  const deleteAuthor = useCallback((id: string) => {
    setData((prev) => ({ ...prev, authors: prev.authors.filter((a) => a.id !== id) }));
  }, []);

  const upsertReview = useCallback((review: Review) => {
    setData((prev) => ({ ...prev, reviews: replaceById(prev.reviews, review) }));
  }, []);

  const deleteReview = useCallback((id: string) => {
    setData((prev) => ({ ...prev, reviews: prev.reviews.filter((r) => r.id !== id) }));
  }, []);

  const resetCatalog = useCallback(() => setData(seed), []);

  const value = useMemo<CatalogValue>(
    () => ({
      ...data,
      ready,
      upsertBook,
      deleteBook,
      upsertCategory,
      deleteCategory,
      upsertAuthor,
      deleteAuthor,
      upsertReview,
      deleteReview,
      resetCatalog,
      bookBySlug: (slug: string) => data.books.find((b) => b.slug === slug),
      authorById: (id: string) => data.authors.find((a) => a.id === id),
    }),
    [
      data,
      ready,
      upsertBook,
      deleteBook,
      upsertCategory,
      deleteCategory,
      upsertAuthor,
      deleteAuthor,
      upsertReview,
      deleteReview,
      resetCatalog,
    ],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
