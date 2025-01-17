//**Revisado */
// Este componente es una versión de ReactMarkdown, que se utiliza para renderizar contenido en Markdown
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { memo } from "react"

interface MemoizedMarkdownProps {
  content: string
  id: string
}

/**
 * Un componente memorizado que renderiza contenido markdown usando ReactMarkdown.
 *
 * @component
 * @param {Object} props - Los props del componente
 * @param {string} props.content - El contenido markdown a renderizar
 * @param {string} props.id - El identificador único para el componente
 *
 * @remarks
 * Este componente utiliza React.memo para optimización de rendimiento, solo se re-renderiza cuando
 * el prop content cambia. Incluye estilos personalizados para elementos markdown como
 * listas no ordenadas, listas ordenadas, elementos de lista y párrafos.
 *
 * El componente utiliza los siguientes plugins y características:
 * - remarkGfm: Soporte para GitHub Flavored Markdown
 * - Estilos personalizados para elementos ul, ol, li, y p
 * - Clases de Tailwind CSS para estilizado
 *
 */
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
          //? Añadir más componentes según sea necesario
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
