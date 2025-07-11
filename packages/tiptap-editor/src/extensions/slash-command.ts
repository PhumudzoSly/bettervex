import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";
import { CommandList } from "../components/CommandList";

export interface SlashCommandOptions {
  suggestion: {
    char: string;
    command: ({ editor, range, props }: any) => void;
  };
}

export interface CommandItem {
  title: string;
  description: string;
  icon: string;
  command: ({ editor, range }: any) => void;
}

export const SlashCommand = Extension.create<SlashCommandOptions>({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: this.options.suggestion.char,
        command: this.options.suggestion.command,
        items: ({ query }: { query: string }) => {
          const commands: CommandItem[] = [
            {
              title: "Heading 1",
              description: "Big section heading",
              icon: "📰",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setHeading({ level: 1 })
                  .run();
              },
            },
            {
              title: "Heading 2",
              description: "Medium section heading",
              icon: "📄",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setHeading({ level: 2 })
                  .run();
              },
            },
            {
              title: "Heading 3",
              description: "Small section heading",
              icon: "📝",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setHeading({ level: 3 })
                  .run();
              },
            },
            {
              title: "Paragraph",
              description: "Regular text paragraph",
              icon: "📄",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setParagraph().run();
              },
            },
            {
              title: "Bold",
              description: "Make text bold",
              icon: "🔥",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleBold().run();
              },
            },
            {
              title: "Italic",
              description: "Make text italic",
              icon: "✨",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleItalic().run();
              },
            },
            {
              title: "Strike",
              description: "Strike through text",
              icon: "🚫",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleStrike().run();
              },
            },
            {
              title: "Underline",
              description: "Underline text",
              icon: "📝",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleUnderline()
                  .run();
              },
            },
            {
              title: "Code",
              description: "Inline code",
              icon: "💻",
              command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleCode().run();
              },
            },
            {
              title: "Code Block",
              description: "Code block with syntax highlighting",
              icon: "🖥️",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleCodeBlock()
                  .run();
              },
            },
            {
              title: "Blockquote",
              description: "Quote or citation",
              icon: "💬",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleBlockquote()
                  .run();
              },
            },
            {
              title: "Bullet List",
              description: "Unordered list",
              icon: "📋",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleBulletList()
                  .run();
              },
            },
            {
              title: "Ordered List",
              description: "Numbered list",
              icon: "📝",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleOrderedList()
                  .run();
              },
            },
            {
              title: "Task List",
              description: "Todo list with checkboxes",
              icon: "✅",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleTaskList()
                  .run();
              },
            },
            {
              title: "Table",
              description: "Insert a table",
              icon: "📊",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run();
              },
            },
            {
              title: "Horizontal Rule",
              description: "Divider line",
              icon: "➖",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setHorizontalRule()
                  .run();
              },
            },
            {
              title: "Image",
              description: "Insert an image",
              icon: "🖼️",
              command: ({ editor, range }) => {
                const url = window.prompt("Enter image URL:");
                if (url) {
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setImage({ src: url })
                    .run();
                }
              },
            },
            {
              title: "Link",
              description: "Add a link",
              icon: "🔗",
              command: ({ editor, range }) => {
                const url = window.prompt("Enter URL:");
                if (url) {
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setLink({ href: url })
                    .run();
                }
              },
            },
            {
              title: "Highlight",
              description: "Highlight text",
              icon: "🎨",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleHighlight()
                  .run();
              },
            },
            {
              title: "Subscript",
              description: "Subscript text",
              icon: "₂",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleSubscript()
                  .run();
              },
            },
            {
              title: "Superscript",
              description: "Superscript text",
              icon: "²",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .toggleSuperscript()
                  .run();
              },
            },
            {
              title: "Left Align",
              description: "Align text to the left",
              icon: "⬅️",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setTextAlign("left")
                  .run();
              },
            },
            {
              title: "Center Align",
              description: "Center align text",
              icon: "⬆️",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setTextAlign("center")
                  .run();
              },
            },
            {
              title: "Right Align",
              description: "Align text to the right",
              icon: "➡️",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setTextAlign("right")
                  .run();
              },
            },
            {
              title: "Justify",
              description: "Justify text",
              icon: "↔️",
              command: ({ editor, range }) => {
                editor
                  .chain()
                  .focus()
                  .deleteRange(range)
                  .setTextAlign("justify")
                  .run();
              },
            },
          ];

          return commands
            .filter(
              (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 10);
        },
        render: () => {
          let component: ReactRenderer;
          let popup: any;

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
              });

              if (!props.clientRect) {
                return;
              }

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },

            onUpdate(props: any) {
              component.updateProps(props);

              if (!props.clientRect) {
                return;
              }

              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown(props: any) {
              if (props.event.key === "Escape") {
                popup[0].hide();
                return true;
              }

              return component.ref?.onKeyDown(props);
            },

            onExit() {
              popup[0].destroy();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});
