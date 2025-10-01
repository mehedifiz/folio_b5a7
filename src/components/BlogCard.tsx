"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export type Blog = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  image?: string;
  published: boolean;
};

type BlogCardProps = {
  blog: Blog;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
};

export default function BlogCard({ blog, isAdmin }: BlogCardProps) {
  // Dummy handlers
  const handleUpdate = (id: number) => {
    console.log("Update blog with id:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete blog with id:", id);
  };

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

        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Read More →
          </Link>

          {isAdmin && (
            <>
              <Button
                variant="outline"
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => handleUpdate(blog.id)}
              >
                Update
              </Button>

              <Button
                variant="destructive"
                className="px-4 py-2"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
