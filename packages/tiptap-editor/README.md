# @workspace/tiptap-editor

A custom Tiptap editor package with slash commands and all essential extensions pre-configured.

## Features

- ✨ **Slash Commands**: Type "/" to access a comprehensive command palette
- 🎨 **Shadcn Themed**: Styled with shadcn/ui color variables for consistent theming
- 📝 **Rich Text Editing**: All essential Tiptap extensions included
- ⌨️ **Keyboard Navigation**: Arrow keys and Enter for command selection
- 🔧 **Highly Configurable**: Customizable placeholder, styling, and behavior

## Installation

This package is already configured in your workspace. To use it in your app:

```bash
# Add to your app's package.json
"@workspace/tiptap-editor": "workspace:*"
```

## Usage

### Basic Usage

```tsx
import { Editor } from "@workspace/tiptap-editor";
import "@workspace/tiptap-editor/styles";

function MyEditor() {
  const [content, setContent] = useState("");

  return (
    <Editor
      content={content}
      onUpdate={setContent}
      placeholder="Start typing or press '/' for commands..."
    />
  );
}
```

### Props

| Prop          | Type                        | Default                                       | Description                    |
| ------------- | --------------------------- | --------------------------------------------- | ------------------------------ |
| `content`     | `string`                    | `''`                                          | Initial HTML content           |
| `onUpdate`    | `(content: string) => void` | `undefined`                                   | Callback when content changes  |
| `placeholder` | `string`                    | `'Start typing or press "/" for commands...'` | Placeholder text               |
| `className`   | `string`                    | `''`                                          | Additional CSS classes         |
| `editable`    | `boolean`                   | `true`                                        | Whether the editor is editable |

## Available Commands

Press "/" to access these commands:

### Text Formatting

- **Bold** - Make text bold
- **Italic** - Make text italic
- **Strike** - Strike through text
- **Underline** - Underline text
- **Code** - Inline code
- **Highlight** - Highlight text
- **Subscript** - Subscript text
- **Superscript** - Superscript text

### Headings

- **Heading 1** - Big section heading
- **Heading 2** - Medium section heading
- **Heading 3** - Small section heading
- **Paragraph** - Regular text paragraph

### Lists

- **Bullet List** - Unordered list
- **Ordered List** - Numbered list
- **Task List** - Todo list with checkboxes

### Content Blocks

- **Blockquote** - Quote or citation
- **Code Block** - Code block with syntax highlighting
- **Table** - Insert a table
- **Horizontal Rule** - Divider line
- **Image** - Insert an image
- **Link** - Add a link

### Text Alignment

- **Left Align** - Align text to the left
- **Center Align** - Center align text
- **Right Align** - Align text to the right
- **Justify** - Justify text

## Included Extensions

This package includes all the following Tiptap extensions:

- StarterKit (basic functionality)
- Blockquote
- BubbleMenu
- CharacterCount
- CodeBlockLowlight (with syntax highlighting)
- Color
- Dropcursor
- Focus
- Gapcursor
- Highlight
- HorizontalRule
- Image
- Link
- Mention
- Placeholder
- Strike
- Subscript
- Superscript
- Table (with TableCell, TableHeader, TableRow)
- TaskList (with TaskItem)
- TextAlign
- TextStyle
- Typography
- Underline
- Custom SlashCommand extension

## Styling

The editor uses shadcn/ui color variables for consistent theming. Import the styles in your component:

```tsx
import "@workspace/tiptap-editor/styles";
```

## Development

This package is part of the workspace monorepo. To make changes:

1. Edit files in `packages/tiptap-editor/src/`
2. The package will be automatically linked to apps that depend on it
3. Restart your dev server to see changes

## Dependencies

The package includes all necessary Tiptap dependencies and uses:

- React 18+ or 19+
- Tippy.js for tooltips
- Lowlight for code syntax highlighting
