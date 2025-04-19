from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
from pathlib import Path

root_path = 'D:/BAUMAN/DIPLOM/graduation-project/files'

def run_ftp_server():
    # Создаём директорию, если не существует
    root_dir = Path(root_path)
    root_dir.mkdir(exist_ok=True)

    # Создаём авторизатор
    authorizer = DummyAuthorizer()

    # Разрешаем анонимный доступ к ftp_root/ с правами только на чтение
    authorizer.add_anonymous(str(root_dir), perm='elr')  # elr = List, Read, Change dir
    authorizer.add_user("learnflow", "learnflow", str(root_dir), perm='elradfmwMT')

    # Настраиваем обработчик
    handler = FTPHandler
    handler.authorizer = authorizer

    # Запускаем сервер
    server = FTPServer(("0.0.0.0", 2121), handler)
    print("FTP-сервер запущен на порту 2121...")
    server.serve_forever()

if __name__ == "__main__":
    run_ftp_server()
