"use client";

import { useState } from "react";
import { Project } from "@/components/projectCard";
import { deleteProject } from "@/action/deleteProject";
import { toast } from "sonner";
import {
  Dialog,

  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProjectTable({ projects }: { projects: Project[] }) {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Handler to delete a project
  const handleDelete = async (id: number) => {
    try {
      const result = await deleteProject(id);
      if (result?.ok) {
        toast.success("Project deleted successfully!");
      } else {
        toast.error("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
    } finally {
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <>
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
                <td className="px-4 py-2 line-clamp-2 max-w-xs">{p.description}</td>
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
                    onClick={() => console.log("Update project with id:", p.id)}
                  >
                    Update
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDeleteId(p.id);
                      setOpenDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm p-4">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteId) handleDelete(deleteId);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
