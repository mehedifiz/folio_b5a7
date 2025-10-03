import BlogCard, { Blog } from "@/components/BlogCard";
import Head from "next/head";

// Server Component: fetch blogs from API
async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/getall`, {
      next: { tags: ["blogs"] },
    });

    if (!res.ok) {
      return []; // Return empty array if fetch fails
    }

    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return empty array on error
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Head>
        <title>Blogs | JonDon Portfolio</title>
        <meta
          name="description"
          content="Read the latest blogs on web development, Next.js, Tailwind CSS, and Prisma by JonDon."
        />
      </Head>

      <main className="py-16 px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Blogs</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore articles about modern web development, best practices, and
            tips on building scalable web apps.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          {blogs?.map((blog: Blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </main>
    </>
  );
}
