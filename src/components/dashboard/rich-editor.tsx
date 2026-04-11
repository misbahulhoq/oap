// components/rich-editor.tsx
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Bold, Italic, List, RotateCcw, RotateCw, Type } from "lucide-react";

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichEditor = ({
  content,
  onChange,
  placeholder,
}: RichEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none min-h-[80px] p-3 border-t border-slate-100",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-all focus-within:ring-1 focus-within:ring-violet-500">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-slate-100 bg-slate-50/50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded p-1 hover:bg-slate-200"
        >
          <RotateCcw className="h-4 w-4 text-slate-600" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded p-1 hover:bg-slate-200"
        >
          <RotateCw className="h-4 w-4 text-slate-600" />
        </button>
        <div className="mx-1 h-4 w-px bg-slate-300" />
        <button
          type="button"
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
        >
          Normal text <Type className="h-3 w-3" />
        </button>
        <div className="mx-1 h-4 w-px bg-slate-300" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="rounded p-1 hover:bg-slate-200"
        >
          <List className="h-4 w-4 text-slate-600" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-1 hover:bg-slate-200 ${editor.isActive("bold") ? "bg-slate-200" : ""}`}
        >
          <Bold className="h-4 w-4 text-slate-600" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-1 hover:bg-slate-200 ${editor.isActive("italic") ? "bg-slate-200" : ""}`}
        >
          <Italic className="h-4 w-4 text-slate-600" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
