import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar';

export interface TipTapEditorProps {
  data: string;
  setData: (value: string) => void;
  maxTextLength: number;
}

function TiptapEditor({ data, setData, maxTextLength }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: data, // Inicialización inicial
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `focus:outline-none focus:ring-transparent py-2 px-1 w-full prose`,
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const updatedContent = currentEditor.getHTML();
      const plainText = currentEditor.getText();

      if (maxTextLength && plainText.length > maxTextLength) {
        const truncatedText = plainText.slice(0, maxTextLength);
        currentEditor.commands.setContent(truncatedText);
        setData(currentEditor.getHTML());
      } else {
        setData(updatedContent);
      }
    },
  });

  // Efecto para sincronizar `data` con el editor, asegurando también que los strings vacíos se manejen correctamente
  useEffect(() => {
    if (editor && editor.getHTML() !== data) {
      if (data === '') {
        editor.commands.clearContent();
      } else {
        editor.commands.setContent(data);
      }
    }
  }, [data, editor]);

  return (
    <div className="w-full">
      <Toolbar editor={editor} maxTextLength={maxTextLength} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TiptapEditor;
