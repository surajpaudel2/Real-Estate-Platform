"use client";

import Link from "next/link";
import Image from "next/image";
import ToggleButton from "../molecules/ToggleButton";
/**
 * AuthLayout props interface
 */
interface AuthLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Page title */
  title: string;
  /** Page subtitle or description */
  subtitle?: string;
}

/**
 * AuthLayout component
 * Layout for authentication pages (login, signup)
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-10 transition-all duration-300 
      }`}
    >
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center text-center">
          <Link
            href="/"
            className="mb-6 inline-block hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
            aria-label="Basobas Home"
          >
            <Image
              src="/logo/basobaslogo.png"
              alt="Basobas Logo"
              width={120}
              height={50}
              priority
              className="h-auto w-auto"
            />
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-foreground)]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
        <ToggleButton />
        <main
          className="mt-8 rounded-lg border border-[var(--form-border)] bg-[var(--form-bg)] p-6 shadow-sm dark:shadow-md animate-slide-up"
          aria-labelledby="form-heading"
          role="region"
        >
          <h2 id="form-heading" className="sr-only">
            {title} Form
          </h2>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
