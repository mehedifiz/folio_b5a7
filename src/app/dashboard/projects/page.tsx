import CreateProjectModal from "@/components/CreateProjectModal";
import ProjectTable from "@/components/ProjectTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Projects",
  description: "Admin dashboard to manage all projects.",
};

const AdminProjectsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/getall`, {
    cache: "no-store",
    next: { tags: ["projects"] },
  });
  const { data: projects } = await res.json();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Projects</h1>
      <div className="mb-6 flex justify-center">
        <CreateProjectModal />
      </div>

      {/* Client component handles interactivity */}
      <ProjectTable projects={projects} />
    </div>
  );
};

export default AdminProjectsPage;
