import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Hi, I’m <span className="text-primary">Jhon Don </span>
      </h1>

      <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
        A passionate <span className="font-semibold">Web Developer</span> 
        building modern, responsive, and user-friendly applications.
      </p>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <Link
          href="#projects"
          className="px-6 py-3 rounded-xl border border-foreground font-medium hover:bg-muted transition"
        >
          View Projects
        </Link>
        <Link
          href="#contact"
          className="px-6 py-3 rounded-xl border border-foreground font-medium hover:bg-muted transition"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}
