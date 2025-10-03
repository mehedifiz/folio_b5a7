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
import { createBlog } from "@/action/createBlogs";
import { toast } from "sonner";

export default function CreateBlogModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    form.set("content", content);

    try {
      const res = await createBlog(form);
      if (res?.id) {
        toast.success("Blog created successfully!");
        setOpen(false); 
        setContent(""); 
      } else {
        toast.error("Failed to create blog.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Blog</Button>
      </DialogTrigger>

      <DialogContent className="w-full h-full max-w-none p-8 overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
          <DialogDescription>
            Fill in the details and click submit to create a new blog.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" placeholder="Title" required />
          <Textarea name="summary" placeholder="Summary" />

          <div className="border rounded p-2 min-h-[150px]">
            <Tiptap content={content} setContent={setContent} />
          </div>

          <Input name="image" placeholder="Cover Image URL" />
          <Input name="tags" placeholder="Comma separated tags" />

          <div className="flex items-center gap-2">
            <input type="checkbox" name="published" id="published" />
            <label htmlFor="published">Published</label>
          </div>

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
