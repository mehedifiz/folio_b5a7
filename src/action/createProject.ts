"use server";

import {revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProject = async (data: FormData) => {
  const projectInfo = Object.fromEntries(data.entries());

  const modifiedData = {
    ...projectInfo,
    features: projectInfo.features
      ? projectInfo.features.toString().split(",").map((f) => f.trim())
      : [],
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("auth")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `${token}` }),
      },
      body: JSON.stringify(modifiedData),
    }
  );

  const result = await res.json();

  if (result?.id) {
    revalidateTag("projects"); 
    revalidatePath("/dashboard/projects");
  }

  return result; 
};
