import { FC, useState } from 'react'
import { Button, Input } from 'antd'
import apiAskOpenai from '@/api/openai/apiAskOpenai'
import './Chat.css'
import { useNotificationService } from '@/providers/NotificationProvider'

interface ChatMessage {
  sender: 'user' | 'ai'
  content: string
}

const Chat: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const notification = useNotificationService()

  const toggleChat = () => {
    setIsOpen(prev => !prev)
  }

  const handleSendMessage = async () => {
    if (!question.trim()) return

    // Добавляем сообщение пользователя
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', content: question },
    ])
    setQuestion('')

    setLoading(true)

    try {
      const response = await apiAskOpenai(question)
      const answer = response.answer

      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'ai', content: answer },
      ])
    } catch (error) {
      console.error('Ошибка при запросе к OpenAI:', error)
      notification?.notifyError({
        message: 'Ошибка',
        description: 'Не удалось получить ответ от OpenAI.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`floating-chat ${isOpen ? 'open' : 'closed'}`}>
      <div className="chat-header" onClick={toggleChat}>
        Чат с OpenAI
      </div>

      {isOpen && (
        <div className="chat-body">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender === 'user' ? 'user' : 'ai'
                }`}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <Input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onPressEnter={handleSendMessage}
              placeholder="Введите ваш вопрос"
              disabled={loading}
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              loading={loading}
              disabled={loading || !question.trim()}
            >
              Отправить
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
