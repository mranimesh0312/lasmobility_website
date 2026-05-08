import type { MetadataRoute } from "next";

const routes = [
  "",
  "/features",
  "/solutions",
  "/industries",
  "/ai-intelligence",
  "/about",
  "/contact",
  "/privacy",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://lasmobility.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
