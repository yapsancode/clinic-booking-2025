export interface Blogs {
  id: number;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  tags: string; // could be string[] if your API ever returns an array instead
  dateAdded: string | null;
  lastUpdated: string | null;
}
