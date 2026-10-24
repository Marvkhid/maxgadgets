import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages: Array<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "/shop", priority: 0.9 },
  { path: "/repairs", priority: 0.9 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
