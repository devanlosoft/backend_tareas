"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
// Importamos la función `createServer` del módulo `http`, que permite crear un servidor HTTP básico en Node.js.
const http_1 = require("http");
// Importamos las rutas de usuarios desde el archivo `userRoutes.ts`.
const userRoutes_1 = require("./routes/userRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const taskRoutes_1 = require("./routes/taskRoutes");
// Definimos el puerto en el que nuestro servidor escuchará. En este caso, usamos el puerto 3000.
const PORT = 3000;
dotenv_1.default.config();
// Conectar a la base de datos antes de iniciar el servidor
(0, database_1.default)();
// Creamos el servidor HTTP. Al crear el servidor, pasamos una función que maneja las solicitudes (`req`) y las respuestas (`res`).
const server = (0, http_1.createServer)((req, res) => {
    var _a, _b;
    // Pasamos `req` y `res` a las rutas de usuarios, que se encargarán de manejar las solicitudes y enviar las respuestas.
    // Enrutar las solicitudes
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith('/api/users')) {
        (0, userRoutes_1.userRoutes)(req, res);
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.startsWith('/api/tasks')) {
        (0, taskRoutes_1.taskRoutes)(req, res);
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
});
// Iniciamos el servidor en el puerto definido. Cuando el servidor esté listo, imprimirá un mensaje en la consola.
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
