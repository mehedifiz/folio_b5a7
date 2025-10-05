"use client";

import { useState, useTransition } from "react";
import { createProject } from "@/action/createProject";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { uploadImage } from "@/action/imageUploader";

export default function CreateProjectModal() {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    startTransition(async () => {
      const res = await uploadImage(file);
      if (res.success) {
        setImageUrl(res.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.set("thumbnail", imageUrl);

    try {
      const res = await createProject(form);
      if (res?.id) {
        toast.success("Project created successfully!");
        setOpen(false);
      } else {
        toast.error("Failed to create project.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Project</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in project details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" placeholder="Title" required />
          <Textarea name="description" placeholder="Description" required />

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isPending}
              className="block w-full border rounded p-2"
              required={!imageUrl}
            />
            {isPending && <p className="text-sm text-gray-500">Uploading...</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <Input name="liveUrl" placeholder="Live Demo URL" required />
          <Input name="repoUrl" placeholder="Repository URL" required/>
          <Input name="features" placeholder="Comma separated features"  required />

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
