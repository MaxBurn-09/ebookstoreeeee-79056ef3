import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { storeConfig } from "@/data/catalog";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Future Grow Academy Library" },
      {
        name: "description",
        content:
          "Sign in to your Future Grow Academy account to read and download the ebooks you have purchased, on any device.",
      },
      { property: "og:title", content: "Sign in — Future Grow Academy" },
      {
        property: "og:description",
        content: "Access your purchased ebooks any time from your reading dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    navigate({ to: "/dashboard", replace: true });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          return;
        }
        toast.success("Welcome to the library.");
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in.");
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <section className="section-y">
      <div className="container-page flex justify-center">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] sm:p-9">
          <p className="eyebrow">{storeConfig.name}</p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-[1.75rem]">
            {mode === "signin" ? "Sign in to your library" : "Create your reading account"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your purchased ebooks stay in your account — read or download them any time, on any
            device.
          </p>

          <button
            type="button"
            onClick={google}
            className="press mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold hover:border-foreground/30 hover:bg-muted"
          >
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[0.7rem] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or use your email
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="grid gap-4">
            {mode === "signup" ? (
              <Field
                label="Full name"
                value={name}
                onChange={setName}
                type="text"
                autoComplete="name"
                required
              />
            ) : null}
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              autoComplete="email"
              required
            />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
            />
            <button
              type="submit"
              disabled={busy}
              className="press mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="link-sweep font-semibold text-foreground"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            <Link to="/books" className="link-sweep">
              Back to the library
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[0.78rem] font-semibold">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/40"
      />
    </label>
  );
}
