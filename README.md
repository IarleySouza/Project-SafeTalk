# Chat WebSocket

Este projeto é uma aplicação de chat em tempo real, utiliza WebSockets com Socket.io e Express. A aplicação permite que os usuários se conectem e se comuniquem em tempo real, com mensagens sendo enviadas entre o servidor e os clientes conectados.

# Tecnologias Utilizadas

* **Node.js**: Ambiente de execução para JavaScript no servidor.
* **Express**: Framework para construção do servidor web.
* **Socket.io**: Biblioteca para comunicação em tempo real via WebSockets.
* **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.

# Funcionalidades
* Comunicação em tempo real com WebSockets usando Socket.io.
* Envio e recebimento de mensagens entre os clientes.
* Exibição de mensagens em tempo real, sem necessidade de recarregar a página.
* Exibição de status de usuários digitando.

## 🚀 Comandos para rodar o projeto
### Passos para configurar o ambiente local e rodar o Chat WebSocket

> **1. Clone o repositório**
```
git clone https://github.com/IarleySouza/ChatWebSocket.git
```
> **2. Acesse o diretório do projeto**
```
cd ChatWebSocket
```
> **3. Instale as dependências**
```
npm install
```
> **4. Compile o TypeScript (se necessário)**
```
npm run build
```
> **5. Inicie o servidor**
```
npm run dev
```
**6. O servidor estará rodando na porta 3000 por padrão. Você pode acessar o aplicativo no seu navegador em http://localhost:3000.**


# Configuração Microsoft Azure

O projeto foi deployado no **Azure App Service**. Para realizar o deploy, foi utilizado o repositório GitHub, permitindo que o código seja automaticamente sincronizado e implantado no Azure. O ambiente foi configurado para rodar a aplicação Node.js na porta padrão 8080, conforme exigido pelo Azure. A aplicação está acessível através da URL fornecida pelo serviço.

# Contribuindo
Sinta-se à vontade para fazer forks, criar issues ou enviar pull requests. Toda contribuição é bem-vinda!


# Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
