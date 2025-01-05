import express, {Application} from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from 'path';

class App {
    private app: Application;
    private http: http.Server;
    private io: Server;

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.listenSocket();
        this.setupRoutes();
    }
    listenServer() {    
        const PORT = process.env.PORT || 3000; // Porta dinâmica ou padrão
        this.http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
    listenSocket() {
        this.io.on('connection', (socket) => {
            console.log('user connected => ', socket.id);

            socket.on('message', (msg) => {
                console.log(`Received message from ${msg.name}: ${msg.content}`);
                // Envie a mensagem de volta para o remetente
                socket.emit('message', { ...msg, fromUser: true });

                // Reenvie a mensagem para os outros clientes
                socket.broadcast.emit('message', { ...msg, fromUser: false });
            });

            socket.on('typing', (name) => {
                socket.broadcast.emit('typing', name); // Inclui o nome de quem está digitando
            });


            socket.on('stopTyping', () => {
                socket.broadcast.emit('stopTyping'); // Emitir que a pessoa parou de digitar
            });
        });
    }
    setupRoutes() {
        this.app.use(express.static(path.resolve(__dirname, '../frontend')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, "../frontend/index.html"));
        });
    }
}

const app = new App()

app.listenServer()