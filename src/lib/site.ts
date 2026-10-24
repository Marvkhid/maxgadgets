const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Public origin of the site. Set NEXT_PUBLIC_SITE_URL to the live domain. */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const gaId: string | undefined = process.env.NEXT_PUBLIC_GA_ID || undefined;
