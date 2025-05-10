import { FC, useState } from 'react'
import { Button, Input, Modal } from 'antd'
import ChatButton from './ChatButton'
import apiAskOpenai from '@/api/openai/apiAskOpenai'
import './Chat.css'
import { useNotificationService } from '@/providers/NotificationProvider'

interface ChatMessage {
  sender: 'user' | 'ai'
  content: string
}

const Chat: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([]) // Состояние для хранения сообщений
  const [question, setQuestion] = useState('') // Вопрос пользователя
  const [loading, setLoading] = useState(false) // Состояние для загрузки
  const notification = useNotificationService()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSendMessage = async () => {
    if (!question.trim()) return

    // Добавляем сообщение пользователя
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', content: question },
    ])
    setQuestion('') // Очищаем поле ввода

    setLoading(true)

    try {
      // Отправляем запрос в OpenAI API
      const response = await apiAskOpenai(question)
      const answer = response.answer.content
      // Добавляем ответ от OpenAI
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
    <div>
      <ChatButton text="Ask a question here!" onClick={showModal} />
      <Modal
        title="Чат с OpenAI"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Убираем стандартные кнопки
        width={500}
        className="chat-modal"
        bodyStyle={{ padding: '20px', height: '600px', overflowY: 'scroll' }}
        mask={false} // Отключаем затемнение фона
        maskClosable={false} // Отключаем закрытие окна при клике вне его
      >
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === 'user' ? 'user' : 'ai'}`}
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
      </Modal>
    </div>
  )
}

export default Chat
