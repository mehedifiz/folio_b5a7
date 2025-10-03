"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const deleteProject = async (id: number) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/delete/${id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `${token}` }),
      },
    });

    const result = await res.json();

    console.log("Delete project response:", res);

    if (res.ok) {
      revalidateTag("projects");  
      return result;
    } else {
      throw new Error(result?.message || "Failed to delete project");
    }
  } catch (error) {
    console.error("Delete project error:", error);
    throw error;
  }
};
