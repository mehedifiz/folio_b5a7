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
import { toast } from "sonner";
import { updateBlogServer } from "@/action/updateBlogs";
import { uploadImage } from "@/action/imageUploader";

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
  const [imageUrl, setImageUrl] = useState(blog.image ?? "");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

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

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      content,
      image: imageUrl,
      published: formData.get("published") === "on",
    };

    try {
      const res = await updateBlogServer(blog.id, payload);
      if (res?.id) {
        toast.success("Blog updated successfully!");
        setOpen(false);
        onUpdated?.(res);
      } else {
        toast.error("Failed to update blog");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Component UI
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

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input name="title" placeholder="Title" defaultValue={blog.title} required />
          <Textarea name="summary" placeholder="Summary" defaultValue={blog.summary} required />

          <div className="border rounded p-2 min-h-[150px]">
            <Tiptap content={content} setContent={setContent} />
          </div>

          {/* ✅ Image Upload Field */}
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
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              id={`published-${blog.id}`}
              defaultChecked={blog.published}
            />
            <label htmlFor={`published-${blog.id}`}>Published</label>
          </div>

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
