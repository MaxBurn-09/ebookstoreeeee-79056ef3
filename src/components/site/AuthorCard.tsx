import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Tilt } from "./Motion";

type AuthorLike = {
  name: string;
  slug: string;
  portrait: string;
  books: number;
  note: string;
};

/** Author portrait card with tilt, shine sweep and animated underline. */
export function AuthorCard({ author }: { author: AuthorLike }) {
  return (
    <article className="group text-center">
      <Tilt max={7} className="mx-auto w-fit">
        <div className="shine hover-lift relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-1 ring-border transition-all duration-500 group-hover:ring-2 group-hover:ring-gold sm:h-36 sm:w-36 lg:h-40 lg:w-40">
          <img
            src={author.portrait}
            alt={`Portrait of ${author.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </Tilt>
      <h2 className="mt-4 font-serif text-lg sm:mt-5 sm:text-xl">
        <Link
          to="/books"
          search={{ q: author.name, category: undefined }}
          preload="intent"
          className="link-sweep transition-colors hover:text-primary"
        >
          {author.name}
        </Link>
      </h2>
      <p className="mt-1 text-[0.62rem] tracking-[0.18em] text-muted-foreground uppercase">
        {author.books} books
      </p>
      <p className="mx-auto mt-3 max-w-[26ch] text-[0.82rem] leading-relaxed text-muted-foreground sm:text-sm">
        {author.note}
      </p>
      <Link
        to="/books"
        search={{ q: author.name, category: undefined }}
        preload="intent"
        className="mt-4 inline-flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-forest uppercase transition-colors hover:text-primary"
      >
        View titles
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
