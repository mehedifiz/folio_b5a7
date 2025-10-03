import ProjectCard, { Project } from "../projectCard";

const ProjectSection = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/getAll?limit=3`,
    {
      next: { tags: ["project"] },
      cache: "no-store", 
    }
  );

  const data = await res.json();
  const projects: Project[] = data?.data ?? [];

  return (
    <section id="projects" className="py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Latest Projects</h2>

        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((p: Project) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No projects found.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;


