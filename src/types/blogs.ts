export interface Blogs {
  id: number;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  tags: string;
  html_link: string;
  dateAdded: string | null;
  lastUpdated: string | null;
  slug?: string; // <-- Optional, generated on frontend if not in API
}
