import requester from '@/lib/axios/requester'
import { MATERIALS, COURSES_LIST } from '@/constants/endpoints'

export default async function apiDownloadFile(
  file_id: string,
  file_name: string,
): Promise<void> {
  try {
    const response = await requester.get(
      `${COURSES_LIST}${MATERIALS}/${file_id}`,
      {
        responseType: 'blob',
      },
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', file_name)
    document.body.appendChild(link)
    link.click()

    // Очистка
    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download error:', error)
    throw new Error('Не удалось скачать файл')
  }
}
