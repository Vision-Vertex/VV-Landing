export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, '') // Remove non-alphanumeric except space
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');
