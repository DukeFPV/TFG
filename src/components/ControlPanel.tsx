//TODO implementar el componente
import { MessageSquare, Clock } from "lucide-react"

interface ControlPanelProps {
  totalConversations: number
  lastConversationDate: Date | null
}

export function ControlPanel({
  totalConversations,
  lastConversationDate,
}: ControlPanelProps) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 px-6 py-4">
      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
        <div className="p-3 rounded-full bg-blue-600 bg-opacity-75">
          <MessageSquare className="h-8 w-8 text-white" />
        </div>
        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">
            {totalConversations}
          </h4>
          <div className="text-gray-500">Total conversaciones</div>
        </div>
      </div>
      <div className="flex items-center px-5 py-6 mt-4 shadow-sm rounded-md bg-white">
        <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
          <Clock className="h-8 w-8 text-white" />
        </div>
        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">
            {lastConversationDate?.toLocaleDateString()}
          </h4>
          <div className="text-gray-500">Última conversación</div>
        </div>
      </div>
    </div>
  )
}
