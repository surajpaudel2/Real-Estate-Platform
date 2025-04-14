"use client";

import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome to your Basobas dashboard!</p>

      <div className="mt-4">
        <Link href="/login" className="text-[var(--color-primary)] underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
