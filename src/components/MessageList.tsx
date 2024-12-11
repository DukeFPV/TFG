import { cn } from '@/lib/utils'
import { Message } from 'ai/react'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  messages: Message []
}

const MessageList = ({ messages }: Props) => {
  return (
    <div className='flex flex-col gap-2 px-4 pb-3'>
      {messages.map((message) => {
        return (
          <div key={message.id}
            className={cn('flex',{
              'justify-end pl-10': message.role === 'user',
              'justify-start pr-10': message.role === 'assistant'
            })}
            >
              <div className={
                cn('px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10', {
                  'bg-purple-800 text-white rounded-t-lg rounded-bl-lg': message.role === 'user',
                  'rounded-t-lg rounded-br-lg': message.role === 'assistant',
                })
              }>
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className={cn('prose max-w-none text-sm', {
                  'prose-invert': message.role === 'user',
                  'prose-neutral': message.role === 'assistant'
                })}
                components={{
                  ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
                  li: ({ children }) => <li className="my-1">{children}</li>,
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  strong: ({ children }) => (
                    <strong className={cn({
                      'text-white': message.role === 'user',
                      'text-black': message.role === 'assistant'
                    })}>{children}</strong>
                  )
                }}
              >
                {message.content}
              </ReactMarkdown>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export default MessageList