"use client";

import { useState } from "react";
import { createProject } from "@/action/createProject";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export default function CreateProjectModal() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      const res = await createProject(form);
      console.log("Project created:", res);
      if (res?.id) {
        toast.success("Project created successfully!");
        setOpen(false);
      } else {
        toast.error("Failed to create project.");
      }
    } catch (err) {
      console.error(err);
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
            Fill in the project details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" placeholder="Title" required />
          <Textarea name="description" placeholder="Description" required />
          <Input name="slug" placeholder="Slug" required />
          <Input name="thumbnail" placeholder="Thumbnail URL" />
          <Input name="liveUrl" placeholder="Live Demo URL" />
          <Input name="repoUrl" placeholder="Repository URL" />
          <Input name="features" placeholder="Comma separated features" />

          <Button type="submit" className="w-full mt-2">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
