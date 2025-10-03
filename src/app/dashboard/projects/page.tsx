"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Project } from "@/components/projectCard";
import CreateProjectModal from "@/components/CreateProjectModal";

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/project/getall`
        );
        const json = await res.json();
        setProjects(json.data ?? []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleUpdate = (id: number) => {
    console.log("Update project with id:", id);
  };

  const handleDelete = async (id: number) => {
    console.log("Delete project with id:", id);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

       <CreateProjectModal />

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Live</th>
              <th className="px-4 py-2">Repo</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-4 py-2 font-medium">{p.title}</td>
                <td className="px-4 py-2 line-clamp-2 max-w-xs">
                  {p.description}
                </td>
                <td className="px-4 py-2">
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Live
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2">
                  {p.repoUrl ? (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:underline"
                    >
                      Code
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdate(p.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
