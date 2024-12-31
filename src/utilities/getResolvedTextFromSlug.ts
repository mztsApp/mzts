export const getResolvedTextFromSlug = (slug: string) =>
  slug.replaceAll('-', ' ').toUpperCase();
