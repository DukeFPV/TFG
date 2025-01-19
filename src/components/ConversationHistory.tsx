//TODO import { messages } from "@/lib/db/schema";

type Message = {
  id: string
  date: Date
  duration: number
}

interface ConversationHistoryProps {
  messages?: Message[]
  onSelectConversation?: (id: string) => void
}

/**
 * Muestra un listado de conversaciones con fecha y duración,
 * y permite hacer clic para seleccionar una conversación.
 */
export function ConversationHistory({
  messages,
  onSelectConversation,
}: ConversationHistoryProps) {
  if (!Array.isArray(messages)) {
    console.warn("Messages prop is not an array:", messages)
    return null
  }
  return (
    <div className="w-full md:w-1/2 xl:w-full px-6 py-4 mr-24">
      <div className="bg-white shadow-sm rounded-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Historial de conversaciones
        </h2>
        <ul>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <li key={msg.id} className="mb-2 last:mb-0">
                <button
                  onClick={() => onSelectConversation?.(msg.id)}
                  className="w-full text-left p-3 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Conversación del día:{" "}
                      {new Date(msg.date).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      Duración: {Math.floor(msg.duration / 60)}m{" "}
                      {msg.duration % 60}s
                    </span>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-4">
              No hay conversaciones guardadas
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
