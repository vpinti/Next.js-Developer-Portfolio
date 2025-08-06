import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const readingTime = calculateReadingTime(content);

  return { 
    slug: realSlug, 
    ...data, 
    content,
    readingTime,
  };
}

export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .map((filename) => getPostBySlug(filename))
    .filter((post) => post !== null);
  
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getAllCategories() {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.category));
  return Array.from(categories);
}

export function getAllTags() {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap(post => post.tags));
  return Array.from(tags);
}
