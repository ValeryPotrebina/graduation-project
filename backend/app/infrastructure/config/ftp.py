from typing import AsyncGenerator
import aioftp

# Вынести в env

FTP_HOST = "localhost"
FTP_USER = "learnflow"
FTP_PASS = "learnflow"
FTP_PORT = "2121"


class FtpHelper:
    host: str
    port: int
    user: str
    password: str

    def __init__(self, host, port, user, password):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        pass

    async def session_getter(self) -> AsyncGenerator[aioftp.Client, None]:
        client = aioftp.Client()
        try:
            await client.connect(self.host, self.port)
            await client.login(self.user, self.password)
            yield client
        finally:
            await client.quit()


ftp_helper = FtpHelper(FTP_HOST, FTP_PORT, FTP_USER, FTP_PASS)
