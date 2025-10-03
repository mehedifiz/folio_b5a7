import BlogCard from "@/components/BlogCard";
import CreateBlogModal from "@/components/createBlogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Blogs",
  description:
    "Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.",
};

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/getall`, {
    cache: "no-store",
    next: { tags: ["blogs"] },
    
  });
  const { data: blogs } = await res.json();
  console.log(blogs , res);
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>

      <CreateBlogModal/>
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-6xl my-5">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} isAdmin={true} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;