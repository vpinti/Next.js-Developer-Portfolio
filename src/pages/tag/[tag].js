import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { CalendarDays, Clock } from "lucide-react";

export default function TagPage({ tag, posts }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-extrabold">Tag: {tag}</h1>
        </div>
        <div className="space-y-12">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blogs/${post.slug}`}>
                  <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={post.coverImage}
                      alt={`Copertina per ${post.title}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </Link>
                <header className="mt-6">
                  <Link href={`/category/${post.category}`}>
                    <Badge className="hover:bg-tag/80 transition-colors mb-2 bg-tag text-tag-foreground">
                      {post.category}
                    </Badge>
                  </Link>
                  <h2 className="font-headline text-3xl font-extrabold text-card-foreground leading-tight mb-2">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
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
                <p className="mt-4 text-lg text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <Link href={`/blogs/${post.slug}`}>
                    <Button variant="link" className="p-0 h-auto">
                      Continua a leggere →
                    </Button>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p>Nessun articolo trovato con questo tag.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const tags = getAllTags();
  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts().filter((post) => post.tags.includes(params.tag));
  return {
    props: {
      tag: params.tag,
      posts,
    },
  };
}
