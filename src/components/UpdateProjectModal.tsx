"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProjectServer } from "@/action/updateProject";
import { uploadImage } from "@/action/imageUploader";

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

type UpdateProjectModalProps = {
  project: Project;
  onUpdated?: (updated: Project) => void;
};

export default function UpdateProjectModal({ project, onUpdated }: UpdateProjectModalProps) {
  const [open, setOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(project.thumbnail ?? "");
  const [liveUrl, setLiveUrl] = useState(project.liveUrl ?? "");
  const [repoUrl, setRepoUrl] = useState(project.repoUrl ?? "");
  const [features, setFeatures] = useState(project.features?.join(", ") ?? "");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error("Image must be < 2MB");

    startTransition(async () => {
      const res = await uploadImage(file);
      if (res.success) {
        setThumbnail(res.url);
        toast.success("Image uploaded!");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      thumbnail,
      liveUrl,
      repoUrl,
      features: formData.get("features")?.toString().split(",").map(f => f.trim()) ?? [],
    };

    try {
      const res = await updateProjectServer(project.id, payload);
      if (res?.ok) {
        toast.success("Project updated successfully!");
        setOpen(false);
        onUpdated?.(res.project);
      } else {
        toast.error("Failed to update project");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Update</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>Modify the project details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" defaultValue={project.title} placeholder="Title" required />
          <Textarea
            name="description"
            defaultValue={project.description}
            placeholder="Description"
            required
          />

          {/* Thumbnail upload */}
          <div>
            <label className="block mb-1 font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isPending}
              className="block w-full border rounded p-2"
            />
            {isPending && <p className="text-sm text-gray-500">Uploading...</p>}
            {thumbnail && <img src={thumbnail} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
          </div>

          <Input
            name="liveUrl"
            defaultValue={liveUrl}
            placeholder="Live Demo URL"
            onChange={e => setLiveUrl(e.target.value)}
          />
          <Input
            name="repoUrl"
            defaultValue={repoUrl}
            placeholder="Repository URL"
            onChange={e => setRepoUrl(e.target.value)}
          />
          <Input
            name="features"
            defaultValue={features}
            placeholder="Comma separated features"
            onChange={e => setFeatures(e.target.value)}
          />

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
