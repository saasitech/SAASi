"use client";
import { signIn, signUp } from "@/lib/serverActions/authActions";
import { getTheme } from "@/lib/themes";
import Link from "next/link";

const Toast = ({ children }: { children: string }) => (
  <div className="toast toast-center toast-top">
    <div className="alert alert-info">
      <span> {children}</span>
    </div>
  </div>
);

export default function Login({
  searchParams,
}: {
  searchParams: { message?: string; redirectUrl?: string };
}) {
  const toastMessage = searchParams?.message;
  const styleProps = getTheme("dim");

  return (
    <main
      className="min-h-screen flex flex-col items-center bg-base-100"
      style={styleProps}
    >
      {toastMessage &&
        Toast({
          children: toastMessage,
        })}
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <Link
          href={"/"}
          className="absolute left-8 top-8 py-2 px-4 btn btn-outline btn-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={signIn}
        >
          <input
            type="hidden"
            name="redirectUrl"
            value={searchParams.redirectUrl}
          />
          <label className="label-text" htmlFor="email">
            Email
          </label>
          <input
            className="input input-saasi "
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="label-text" htmlFor="password">
            Password
          </label>
          <input
            className="input input-saasi"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
          <button formAction={signUp} className="btn btn-secondary">
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}
