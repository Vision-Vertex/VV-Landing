/**
 * Resolves the backend API base URL for fetch calls.
 *
 * Priority:
 * 1. NEXT_PUBLIC_API_URL — explicit client-side URL (production / direct backend)
 * 2. /api/proxy — same-origin Next.js rewrite (see next.config.ts) when env is unset
 */
export function getApiBaseUrl(): string {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (publicUrl) {
    return publicUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return "/api/proxy";
  }

  const serverUrl =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:8000";

  return serverUrl.replace(/\/$/, "");
}

export function assertApiConfigured(): void {
  if (!process.env.NEXT_PUBLIC_API_URL?.trim() && !process.env.API_URL?.trim()) {
    console.warn(
      "[api] NEXT_PUBLIC_API_URL / API_URL is not set. Using /api/proxy → http://localhost:8000. " +
        "Add API_URL=http://localhost:8000 to .env.local (or your backend URL)."
    );
  }
}
