import BlogCard from "@/components/BlogCard";
import Head from "next/head";


const blogs =  [
  {
    "id": 1,
    "title": "Getting Started with Next.js 15",
    "slug": "getting-started-nextjs-15",
    "summary": "Learn how to set up and build your first Next.js 15 project step by step.",
    "content": "<p>Welcome to <strong>Next.js 15</strong>! 🎉 In this guide we'll <em>explore</em> routing, ISR, and API routes.</p><p><a href='https://nextjs.org'>Official Docs</a></p>",
    "image": "https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV4dGpzfGVufDB8fDB8fHww",
    "published": true,
    "createdAt": "2025-09-01T10:00:00Z",
    "updatedAt": "2025-09-01T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Tailwind CSS Tips & Tricks",
    "slug": "tailwind-css-tips",
    "summary": "Boost your productivity with these Tailwind CSS tips and shortcuts.",
    "content": "<ul><li>Use <code>@apply</code> for reusable styles.</li><li>Leverage <strong>dark mode</strong> utilities.</li></ul>",
    "image": "https://source.unsplash.com/random/800x600/?tailwind",
    "published": true,
    "createdAt": "2025-09-05T15:30:00Z",
    "updatedAt": "2025-09-05T15:30:00Z"
  },
  {
    "id": 3,
    "title": "Why Prisma is Awesome",
    "slug": "why-prisma-is-awesome",
    "summary": "Understand why Prisma is a game-changer for database management in Node.js.",
    "content": "<p>Prisma makes working with databases <em>fun</em>. It provides <strong>type safety</strong> and easy migrations.</p>",
    "image": "https://plus.unsplash.com/premium_photo-1669530958591-15cbad83785b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV4dGpzfGVufDB8fDB8fHww",
    "published": true,
    "createdAt": "2025-09-10T09:20:00Z",
    "updatedAt": "2025-09-10T09:20:00Z"
  }
]

const BlogsPage = () => {
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
            Explore articles about modern web development, best practices, and tips on building scalable web apps.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard  key={blog.id} blog={blog} />
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogsPage;
