"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteBlogServer = async (id: number) => {
  // Get auth token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;
  if (!token) throw new Error("No auth token found");

  // Call backend API to delete
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/delete/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // send token
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Failed to delete blog");

  // Revalidate ISR cache for blogs
  revalidateTag("blogs");

  return result;
};
