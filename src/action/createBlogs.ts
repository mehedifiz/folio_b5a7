"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; 

export const createBlog = async (data: FormData) => {
    console.log("Form Data:", data);

    const blogInfo = Object.fromEntries(data.entries());

    const modifiedData = {
        ...blogInfo,
        tags: blogInfo.tags
            ? blogInfo.tags.toString().split(",").map((tag) => tag.trim())
            : [],
        published: Boolean(blogInfo.isFeatured),
    };

    // Get token from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;
    console.log("Token from cookie:", token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `${token}` }),
        },
        body: JSON.stringify(modifiedData),
    });

    const result = await res.json();

    if (result?.id) {
        revalidateTag("blogs");     
        redirect("/blogs");       
    }

    return result;
};