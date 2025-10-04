"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Globe, Github, Pencil, Trash } from "lucide-react";
import UpdateProjectModal from "./UpdateProjectModal";

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  repoUrl?: string;
  features: string[];
};

type ProjectCardProps = {
  project: Project;
  isAdmin?: boolean;
};

export default function ProjectCard({ project, isAdmin }: ProjectCardProps) {
  const handleUpdate = (id: number) => {
    console.log("Update project with id:", id);
  };

  const handleDelete = async (id: number) => {
    console.log("Delete project with id:", id);
  };

  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow hover:shadow-lg transition flex flex-col">
      {/* Thumbnail */}
      {project.thumbnail && (
        <Image
          src={
            project.thumbnail.startsWith("/") ||
            project.thumbnail.startsWith("http")
              ? project.thumbnail
              : "/default-project.jpg"
          }
          alt={project.title}
          width={800}
          height={500}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Features */}
        {project.features?.length > 0 && (
          <ul className="mb-4 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            {project.features.slice(0, 3).map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Globe className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="mt-auto flex gap-2">
            
             <UpdateProjectModal project={project} />

            {/* Delete Confirmation */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="inline-flex items-center gap-2 px-4 py-2"
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this project?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The project{" "}
                    <strong>{project.title}</strong> will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
