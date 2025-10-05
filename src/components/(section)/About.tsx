
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-16 px-6 bg-muted/50">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1453396450673-3fe83d2db2c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="John Don"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">John Don</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I’m <span className="font-semibold">John Don</span>, a passionate{" "}
            <span className="text-primary font-medium">Full Stack Developer</span> 
            with a love for building clean, modern, and user-friendly applications.
            I enjoy solving complex problems and bringing ideas to life through code.
          </p>

          {/* Highlights */}
          <ul className="grid grid-cols-2 gap-3 text-sm md:text-base">
            <li className="px-4 py-2 bg-background border rounded-lg shadow-sm">
              🚀 3+ Years Experience
            </li>
            <li className="px-4 py-2 bg-background border rounded-lg shadow-sm">
              💻 MERN & Next.js
            </li>
            <li className="px-4 py-2 bg-background border rounded-lg shadow-sm">
              🎨 UI/UX Enthusiast
            </li>
            <li className="px-4 py-2 bg-background border rounded-lg shadow-sm">
              🌍 Open Source Lover
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
