"use client";

import Link from "next/link";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  image?: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow hover:shadow-lg transition flex flex-col">
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={500}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{blog.summary}</p>
        <div className="mt-auto">
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-block px-4 py-2   rounded-lg hover:opacity-90 transition"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
