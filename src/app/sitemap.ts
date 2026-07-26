import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/data/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://JamesCowx.github.io/toolhive';

  const toolEntries = getAllSlugs().map(slug => ({
    url: `${baseUrl}/tools/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/tools/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/privacy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    ...toolEntries,
  ];
}
