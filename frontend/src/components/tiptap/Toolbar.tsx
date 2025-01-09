import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
} from 'lucide-react';
import { type Editor } from '@tiptap/react';

interface ComponentProps {
  editor: Editor | null;
  maxTextLength: number;
}

export default function Toolbar({ editor, maxTextLength }: ComponentProps) {
  if (!editor) return null;

  const currentTextLength = editor.getText().length;

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('bold') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Bold className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('italic') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Italic className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('underline') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Underline className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('strike') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Strikethrough className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Heading2 className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('bulletList') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <List className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('orderedList') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <ListOrdered className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('blockquote') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Quote className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('code') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Code className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('undo') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Undo className="h-5 w-auto" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={`rounded-xl border p-2 ${editor?.isActive('redo') ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
          type="button"
        >
          <Redo className="h-5 w-auto" />
        </button>
      </div>
      {maxTextLength && (
        <span className="ml-auto text-sm text-gray-500">
          {currentTextLength} of {maxTextLength}
        </span>
      )}
    </div>
  );
}
