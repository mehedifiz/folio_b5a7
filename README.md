# Blog Dashboard – Next.js Fullstack App

A modern **Next.js 15** fullstack project with blog management, WYSIWYG editor, image uploads, and CRUD operations.  
Built using **React**, **Tailwind CSS**, and **Server Actions** for seamless client–server integration.

---

## 🚀 Features

- 🧠 **Create, Read, Update, Delete (CRUD)** blogs  
- 🖋️ Rich text editing using **Tiptap editor**  
- 🖼️ Image upload support via **ImgBB**  
- 🔒 Auth token stored in cookies  
- 🌗 Fully responsive, clean UI  
- ⚙️ Powered by **Next.js Server Actions** and **App Router**  
- 💬 Toast notifications for better UX  

---

## 🧩 Tech Stack

| Category | Tools |
|----------|-------|
| **Frontend** | Next.js 15, React, Tailwind CSS, ShadCN UI |
| **Editor** | Tiptap (WYSIWYG text editor) |
| **Backend / API** | Next.js Server Actions |
| **Image Upload** | ImgBB API |
| **Notifications** | Sonner Toasts |
| **Auth Handling** | Cookies (client-side + browser storage) |

---


## ⚡ Getting Started

```bash
git clone https://github.com/your-username/blog-dashboard.git
cd blog-dashboard
pnpm i
pnpm dev

NEXT_PUBLIC_BASE_API=https://your-api-url.com
IMGBB_API_KEY=your_imgbb_api_key



## 📁 Project Structure


```
server
├─ package.json
├─ pnpm-lock.yaml
├─ prisma
│  ├─ migrations
│  │  ├─ 20251001180424_
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  └─ schema.prisma
├─ README.md
├─ src
│  ├─ app.ts
│  ├─ config
│  │  ├─ adminMake.ts
│  │  ├─ db.ts
│  │  └─ slug.ts
│  ├─ middlewares
│  │  └─ auth.ts
│  ├─ nodules
│  │  ├─ blogs
│  │  │  ├─ blogs.controller.ts
│  │  │  └─ blogs.router.ts
│  │  ├─ project
│  │  │  ├─ project.router.ts
│  │  │  └─ projects.controller.ts
│  │  └─ user
│  │     ├─ user.controller.ts
│  │     └─ user.routes.ts
│  └─ server.ts
├─ tsconfig.json
└─ vercel.json

```