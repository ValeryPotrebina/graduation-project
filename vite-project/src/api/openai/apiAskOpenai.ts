import requester from '@/lib/axios/requester'
import { OPENAI_ASK } from '@/constants/endpoints'

interface OpenAIResponse {
  answer: {
    content: string
  }
}

export default async function apiAskOpenai(
  question: string,
): Promise<OpenAIResponse> {
  try {
    const response = await requester.post<OpenAIResponse>(OPENAI_ASK, {
      question: question,
    })
    console.log('response OPENAI', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
