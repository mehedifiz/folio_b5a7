"use server";

import { revalidateTag } from "next/cache";

export async function createBlogAction(data: {
  title: string;
  summary: string;
  content: string;
  image?: string;
  tags?: string;
  published?: boolean;
}) {
  const modifiedData = {
    ...data,
    tags: data.tags
      ? data.tags
          .toString()
          .split(",")
          .map((tag) => tag.trim())
      : [],
    published: !!data.published,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(modifiedData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create blog");
  }

  const result = await res.json();

  // Revalidate the "blogs" tag after creation
  revalidateTag("blogs");

  return result;
}
