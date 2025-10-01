import BlogCard, { Blog } from "../BlogCard";

const BlogsSection = async () => {
  const res = await fetch("http://localhost:7000/api/blog/getall", {
    next: {
       tags: ["blogs"]
      }, 
  });
  const data = await res.json();
  const blogs = data.data;

  return (
    <section id="blogs" className="py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Latest Blogs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog : Blog ) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
