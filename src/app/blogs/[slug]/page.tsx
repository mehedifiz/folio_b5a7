import { notFound } from "next/navigation";
import Image from "next/image";
import Head from "next/head";

interface BlogProps {
  params: { slug: string };
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default async function BlogPage({ params }: BlogProps) {
  const slug = await params.slug;

  console.log("Fetching blog with slug:", slug);

  // Fetch single blog from backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/get/${slug}`,
    { cache: "no-store" } // ensure fresh data each request
  );
  console.log("Fetch response status:", res);
  if (!res.ok) {
    // return notFound();
  }

  const blog: Blog = await res.json();

  if (!blog) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{blog.title} | JonDon Portfolio</title>
        <meta name="description" content={blog.summary} />
      </Head>

      <article className="max-w-4xl mx-auto py-16 px-6">
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title and Date */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Content */}
        <div
          className="prose max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </>
  );
}
