import tiktoken
import fitz  # PyMuPDF для извлечения текста из PDF


def num_tokens_from_string(string: str, encoding_name: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.encoding_for_model(encoding_name)
    tokens = encoding.encode(string)
    # print(f"tokens: {tokens}")
    decoded_tokens = [encoding.decode_single_token_bytes(token) for token in tokens]

    # print(f"decoded tokens: {decoded_tokens}")
    num_tokens = len(tokens)
    return num_tokens

number = num_tokens_from_string("""Ваш ответ в целом правильный, но его можно немного уточнить для большей точности. Ограниченное числовое множество действительно определяется как множество, в котором существуют такие верхняя и нижняя границы (или пределы), что все его элементы меньше (или равны) верхней границе и больше (или равны) нижней границе. Таким образом, точная формулировка будет звучать так: "Числовое множество называется ограниченным, если существуют такие числа \( m \) и \( M \), что для всех элементов \( x \) этого множества выполняется неравенство \( m \leq x \leq M \)", где \( m \) — нижняя граница, а \( M \) — верхняя граница. В вашем ответе достаточно упомянуть, что множество ограничено и сверху, и снизу, чтобы подчеркнуть наличие обеих границ. """, "gpt-4o-mini")

print(f"количество токенов: {number}")


def extract_text_from_pdf(pdf_path):
    """Извлекает текст из PDF-файла."""
    doc = fitz.open(pdf_path)
    text = ""
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)  # загружаем страницу
        text += page.get_text("text")  # извлекаем текст страницы
    return text

def count_tokens(text, model="gpt-4o-mini"):
    """Подсчитывает количество токенов в тексте."""
    encoding = tiktoken.encoding_for_model(model)
    tokens = encoding.encode(text)
    # print(f"tokens: {tokens}")
    decoded_tokens = [encoding.decode_single_token_bytes(token) for token in tokens]

    # print(f"decoded tokens: {decoded_tokens}")
    return len(tokens)

# Путь к PDF файлу
pdf_path = "data-set.pdf"
# pdf_path = "Лекции_Оптимизации.pdf"

# Извлечение текста
# text = extract_text_from_pdf(pdf_path)

# Подсчет токенов
# token_count = count_tokens(text)

# print(f"Количество токенов в PDF-файле: {token_count}")