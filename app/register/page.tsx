"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/register";
import Reveal from "@/components/Reveal";

const inputClasses =
  "w-full border-b border-ink/20 bg-transparent py-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none transition-colors duration-300 peer";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const result = await registerUser({ name, email, password });

    if (!result.success) {
      setSubmitting(false);
      setError(result.error);
      return;
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (signInResult?.error) {
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <section className="flex min-h-[100svh] flex-col bg-linen">

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-10">
        <div className="mx-auto w-full max-w-md">
          <Reveal className="text-center">
            <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
              Join Us
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Create an Account
            </h1>
          </Reveal>

          <Reveal delay={120} className="mt-14">
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs text-ink/50">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className={inputClasses}
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out peer-focus:scale-x-100" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-xs text-ink/50">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@email.com"
                    className={inputClasses}
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out peer-focus:scale-x-100" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-xs text-ink/50">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className={inputClasses}
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out peer-focus:scale-x-100" />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-1 block text-xs text-ink/50">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputClasses}
                  />
                  <span className="pointer-events-none absolute bottom-0 left-0 h-[1.5px] w-full origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out peer-focus:scale-x-100" />
                </div>
              </div>

              {error && <p className="text-center text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 bg-ink px-10 py-3.5 text-sm tracking-wide text-linen transition-colors duration-300 hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-ink/60">
              Already have an account?{" "}
              <Link href="/login" className="text-ink underline decoration-gold underline-offset-4 hover:text-gold">
                Login
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}