import axios from 'axios'

export default async function apiDownloadFile(
  file_url: string,
  file_name: string,
): Promise<void> {
  try {
    const response = await axios
      .create({ baseURL: 'http://localhost:8000' })
      .get(file_url, {
        responseType: 'blob',
      })

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
