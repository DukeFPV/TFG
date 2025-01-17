// Memo-Markdown.tsx

import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { memo } from "react"

interface MemoizedMarkdownProps {
  content: string
  id: string
}

const MemoizedMarkdown = memo(
  ({ content, id }: MemoizedMarkdownProps) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
          ol: ({ children }) => (
            <ol className="list-decimal ml-4">{children}</ol>
          ),
          li: ({ children }) => <li className="my-1">{children}</li>,
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          // Puedes añadir más personalizaciones si es necesario
        }}
      >
        {content}
      </ReactMarkdown>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.content === nextProps.content
  },
)

MemoizedMarkdown.displayName = "MemoizedMarkdown"

export default MemoizedMarkdown
