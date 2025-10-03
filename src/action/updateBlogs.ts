"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const updateBlogServer = async (id: number, payload: any) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;
  if (!token) throw new Error("No auth token found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Failed to update blog");

  revalidateTag("blogs");

  return result;
};
