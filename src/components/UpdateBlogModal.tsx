"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "./Tiptap";
import { toast } from "sonner";
import { updateBlogServer } from "@/action/updateBlogs";

// ✅ import server action

export type Blog = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  image?: string;
  published: boolean;
  content?: string;
};

type UpdateBlogModalProps = {
  blog: Blog;
  onUpdated?: (updated: Blog) => void;
};

export default function UpdateBlogModal({ blog, onUpdated }: UpdateBlogModalProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(blog.content ?? "");

  const handleSubmit = async (formData: FormData) => {
    const payload = {
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      content,
      image: formData.get("image") as string,
      published: formData.get("published") === "on",
    };

    try {
      const res = await updateBlogServer(blog.id, payload); 
      if (res?.id) {
        toast.success("Blog updated successfully");
        setOpen(false);
        onUpdated?.(res);
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update blog");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
        >
          Update
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full h-full max-w-none p-8 overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Blog</DialogTitle>
          <DialogDescription>
            Modify the blog details and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" placeholder="Title" defaultValue={blog.title} required />
          <Textarea name="summary" placeholder="Summary" defaultValue={blog.summary} />

          <div className="border rounded p-2 min-h-[150px]">
            <Tiptap content={content} setContent={setContent} />
            <input type="hidden" name="content" value={content} />
          </div>

          <Input name="image" placeholder="Cover Image URL" defaultValue={blog.image ?? ""} />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id={`published-${blog.id}`}
              defaultChecked={blog.published}
            />
            <label htmlFor={`published-${blog.id}`}>Published</label>
          </div>

          <Button type="submit" className="w-full mt-2">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
