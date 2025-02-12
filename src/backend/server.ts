import express, {Application} from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from 'path';

class App {
    private app: Application;
    private http: http.Server;
    private io: Server;
    private usersOnline: { [key: string]: string } = {};

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.io = new Server(this.http, {
            maxHttpBufferSize: 10e6 // 10MB
        });

        this.listenSocket();
        this.setupRoutes();
    }
    listenServer() {    
        const PORT = process.env.PORT || 3000; 
        this.http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
    listenSocket() {
        this.io.on('connection', (socket) => {
            console.log('user connected => ', socket.id);

            // Quando um usuário entra no chat
            socket.on('userJoined', (userName) => {
                this.usersOnline[socket.id] = userName;
                this.io.emit('updateUsers', Object.values(this.usersOnline));
            });

            // Quando um usuário envia uma mensagem
            socket.on('message', (msg) => {
                console.log(`Received message from ${msg.name}: ${msg.content}`);
                socket.emit('message', { ...msg, fromUser: true });
                socket.broadcast.emit('message', { ...msg, fromUser: false });
            });

            // Quando um usuário está digitando
            socket.on('typing', (name) => {
                socket.broadcast.emit('typing', name); 
            });

            // Quando um usuário para de digitar
            socket.on('stopTyping', () => {
                socket.broadcast.emit('stopTyping');
            });

            // Quando um usuário envia uma imagem
            socket.on('image', (data) => {
                console.log(`Imagem recebida de ${data.name}`);
                socket.emit('image', data);
                socket.broadcast.emit('image', data);
            });
        
            // Quando um usuário desconecta
            socket.on('disconnect', () => {
                console.log('Usuário desconectado:', socket.id);
                delete this.usersOnline[socket.id];
                this.io.emit('updateUsers', Object.values(this.usersOnline));
            });
        });
        
    }
    setupRoutes() {
        this.app.use(express.static(path.resolve(__dirname, '../../frontend')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, "../../frontend/index.html"));
        });
    }
}
const app = new App()
app.listenServer()