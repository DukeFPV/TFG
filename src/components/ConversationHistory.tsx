//TODO import { messages } from "@/lib/db/schema";

type Message = {
  id: string;
  date: Date;
  duration: number;
};

export function ConversationHistory({ messages }: { messages: Message[] }) {
  return (
    <div className="w-full md:w-1/2 xl:w-full px-6 py-4 mr-24">
      <div className="bg-white shadow-sm rounded-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Historial de conversaciones</h2>
        <ul>
          {messages.map((message: Message) => (
            <li key={message.id} className="mb-2 last:mb-0">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Conversación del día: {message.date.toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  Duración: {Math.floor(message.duration / 60)} minutos {message.duration % 60} segundos
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}