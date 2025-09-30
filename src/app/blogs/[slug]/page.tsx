import { notFound } from "next/navigation";
import Image from "next/image";
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


interface BlogProps {
  params: { slug: string };
}

export default async function BlogPage({ params }: BlogProps) {

    const slug = await params?.slug

    console.log(slug ,"aldfsfdsf")
    
  const blog = await blogs.find((b) => b.slug === slug);

  console.log(blog ,"blogs")



  if (!blog) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{blog.title} | JonDon Portfolio</title>
        <meta name="description" content={blog.summary} />
      </Head>

      <article className="max-w-4xl mx-auto py-16 px-6">
        {/* Blog Image */}
        {blog.image && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Title and Date */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Content */}
        <div
          className="prose max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </>
  );
}
