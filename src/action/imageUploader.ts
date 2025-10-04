"use server";

export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data?.data?.url) {
      throw new Error("Upload failed");
    }

    return { success: true, url: data.data.url };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, message: "Image upload failed" };
  }
}
