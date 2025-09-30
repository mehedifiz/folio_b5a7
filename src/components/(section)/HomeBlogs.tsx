"use client";

import BlogCard from "@/components/BlogCard";


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


export default function BlogsSection() {
  return (
    <section id="blogs" className="py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Latest Blogs</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
