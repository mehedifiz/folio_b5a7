"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const updateProjectServer = async (
  id: number,
  payload: {
    title: string;
    description: string;
    thumbnail?: string;
    liveUrl?: string;
    repoUrl?: string;
    features?: string[];
  }
) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth")?.value;
  if (!token) throw new Error("No auth token found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message || "Failed to update project");

  revalidateTag("projects"); // optional, if caching is used

  return result;
};
