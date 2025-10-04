"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteBlogServer } from "@/action/deleteBlogs";
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
import UpdateBlogModal from "./UpdateBlogModal";
import { toast } from "sonner";

export type Blog = {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  image?: string;
  published: boolean;
};

type BlogCardProps = {
  blog: Blog;
  onDelete?: (id: number) => void;
  isAdmin?: boolean;
};

export default function BlogCard({ blog,  isAdmin }: BlogCardProps) {
   

  const handleDelete = async (id: number) => {
    try {
     await deleteBlogServer(id);
     toast.success("Blog deleted successfully");

     

      console.log("Blog deleted successfully:", id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border bg-card shadow hover:shadow-lg transition flex flex-col">
      {blog.image && (
        <Image
          src={blog.image
          }
          alt={blog.title}
          width={800}
          height={500}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{blog.summary}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Read More →
          </Link>

          
        {isAdmin && (
  <>
    {/* Update Modal */}
    <UpdateBlogModal
      blog={blog}
      onUpdated={(updated) => console.log("Updated blog:", updated)}
    />

    {/* Delete Confirmation */}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="px-4 py-2">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this blog?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The blog
            <strong>{blog.title}</strong> will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(blog.id)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
)}

        </div>
      </div>
    </div>
  );
}
