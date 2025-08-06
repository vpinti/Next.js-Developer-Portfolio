import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import MarkdownRenderer from "@/components/markdown-renderer";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { CalendarDays, Clock } from "lucide-react";

export default function BlogPost({ post }) {
  return (
    <div className="bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark min-h-screen dark:text-light">
      <main className="py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            <header className="mb-8">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground dark:text-muted-foreground-dark mb-4">
                <Link href={`/category/${post.category}`}>
                  <Badge className="hover:bg-tag/80 transition-colors bg-tag text-tag-foreground">
                    {post.category}
                  </Badge>
                </Link>
              </div>
              <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-card-foreground dark:text-card-foreground-dark leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground-dark">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center space-x-6 text-sm text-muted-foreground dark:text-muted-foreground-dark">
                <div className="flex items-center">
                  <CalendarDays className="w-4 h-4 mr-1.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("it-IT", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{post.readingTime} min di lettura</span>
                </div>
              </div>
            </header>

            <div className="relative w-full h-96 rounded-lg overflow-hidden my-8 shadow-lg">
              <Image
                src={post.coverImage}
                alt={`Copertina per ${post.title}`}
                fill
                objectFit="cover"
                data-ai-hint="programming technology"
              />
            </div>

            <MarkdownRenderer content={post.content} />

            <footer className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Link href={`/tag/${tag}`} key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </Link>
                ))}
              </div>
            </footer>
          </article>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPosts().map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post } };
}
