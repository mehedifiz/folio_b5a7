'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline as LucideUnderline,
  List,
  ListOrdered,
  Heading2 as TypeH2,
} from 'lucide-react'

interface TiptapProps {
  content: string
  setContent: (html: string) => void
}

const Tiptap = ({ content, setContent }: TiptapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content || '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  // Button style helper
  const buttonClass = (active: boolean) =>
    `p-2 rounded hover:bg-gray-200 ${active ? 'bg-gray-300 text-blue-600' : ''}`

  return (
    <div className="border rounded w-full shadow-sm">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b sticky top-0 z-10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive('bold'))}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive('italic'))}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonClass(editor.isActive('underline'))}
          title="Underline"
        >
          <LucideUnderline size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonClass(editor.isActive('heading', { level: 2 }))}
          title="Heading 2"
        >
          <TypeH2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive('bulletList'))}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive('orderedList'))}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[400px] max-h-[400px] overflow-y-auto focus:outline-none"
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default Tiptap
