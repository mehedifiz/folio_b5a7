import ProjectCard, { Project } from "@/components/projectCard";
import Head from "next/head";

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/getall`, {
      next: { tags: ["project"] },
    });

    if (!res.ok) {
      return []; 
    }

    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; 
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Head>
        <title>Projects | JonDon Portfolio</title>
        <meta
          name="description"
          content="Explore web development projects built by JonDon using Next.js, Tailwind CSS, Prisma, and modern web technologies."
        />
      </Head>

      <main className="py-16 px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a collection of my recent projects showcasing modern web
            technologies, scalable architecture, and creative UI design.
          </p>
        </div>

        {/* Project Cards */}
        <div className="container mx-auto grid gap-8 md:grid-cols-3">
          {projects?.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
