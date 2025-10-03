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

export default function CreateBlogModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(""); 

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

        {/* Form bound to server action */}
        <form action={createBlog} className="space-y-4 mt-4">
          <Input name="title" placeholder="Title" required />
          <Textarea name="summary" placeholder="Summary" />

          <div className="border rounded p-2 min-h-[150px]">
            <Tiptap content={content} setContent={setContent} />
            {/* Sync tiptap content via hidden input */}
            <input type="hidden" name="content" value={content} />
          </div>

          <Input name="image" placeholder="Cover Image URL" />
          <Input name="tags" placeholder="Comma separated tags" />

          <div className="flex items-center gap-2">
            <input type="checkbox" name="published" id="published" />
            <label htmlFor="published">Published</label>
          </div>

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
