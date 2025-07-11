import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Gapcursor from "@tiptap/extension-gapcursor";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { createLowlight } from "lowlight";
import { SlashCommand } from "../extensions/slash-command";

interface EditorProps {
  content?: string;
  onUpdate?: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

export const Editor: React.FC<EditorProps> = ({
  content = "",
  onUpdate,
  placeholder = 'Start typing or press "/" for commands...',
  className = "",
  editable = true,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      Blockquote,
      BubbleMenu,
      CharacterCount,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(),
      }),
      Color,
      Dropcursor,
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Gapcursor,
      Highlight.configure({
        multicolor: true,
      }),
      HorizontalRule,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2",
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Strike,
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse border border-border",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-border px-3 py-2",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-border px-3 py-2 bg-muted font-medium",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-b border-border",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start gap-2",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Typography,
      Underline,
      SlashCommand,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] ${className}`,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <EditorContent
        editor={editor}
        className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      {editor && (
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <div>
            {editor.storage.characterCount.characters()} characters,{" "}
            {editor.storage.characterCount.words()} words
          </div>
          <div className="text-xs text-muted-foreground">
            Press "/" for commands
          </div>
        </div>
      )}
    </div>
  );
};
