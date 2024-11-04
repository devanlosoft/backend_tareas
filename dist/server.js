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
const database_1 = __importDefault(require("./config/database"));
// Definimos el puerto en el que nuestro servidor escuchará. En este caso, usamos el puerto 3000.
const PORT = 3000;
// Conectar a la base de datos antes de iniciar el servidor
(0, database_1.default)();
// Creamos el servidor HTTP. Al crear el servidor, pasamos una función que maneja las solicitudes (`req`) y las respuestas (`res`).
const server = (0, http_1.createServer)((req, res) => {
    // Pasamos `req` y `res` a las rutas de usuarios, que se encargarán de manejar las solicitudes y enviar las respuestas.
    (0, userRoutes_1.userRoutes)(req, res);
});
// Iniciamos el servidor en el puerto definido. Cuando el servidor esté listo, imprimirá un mensaje en la consola.
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
