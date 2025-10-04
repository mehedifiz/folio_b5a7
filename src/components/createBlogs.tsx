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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "./Tiptap";
import { createBlog } from "@/action/createBlogs";
import { toast } from "sonner";
import { uploadImage } from "@/action/imageUploader";
import Image from "next/image";

export default function CreateBlogModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
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

  // 📝 Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    form.set("content", content);
    form.set("image", imageUrl);

    try {
      const res = await createBlog(form);
      if (res?.id) {
        toast.success("Blog created successfully!");
        setOpen(false);
        setContent("");
        setImageUrl("");
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

          {/* Editor */}
          <div className="border rounded p-2 min-h-[150px]">
            <Tiptap content={content} setContent={setContent} />
          </div>

          {/* ✅ Image upload field */}
          <div>
            <label className="block mb-1 font-medium">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isPending}
              className="block w-full border rounded p-2"
            />
            {isPending && <p className="text-sm text-gray-500">Uploading...</p>}
            {imageUrl && (
              <Image
              
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>

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
