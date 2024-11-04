// src/server.ts
// Importamos la función `createServer` del módulo `http`, que permite crear un servidor HTTP básico en Node.js.
import { createServer, IncomingMessage, ServerResponse } from 'http';
// Importamos las rutas de usuarios desde el archivo `userRoutes.ts`.
import { userRoutes } from './routes/userRoutes';
import connectDB from './config/database';
import { taskRoutes } from './routes/taskRoutes';

// Definimos el puerto en el que nuestro servidor escuchará. En este caso, usamos el puerto 3000.
const PORT = 3000;


// Conectar a la base de datos antes de iniciar el servidor
connectDB();

// Creamos el servidor HTTP. Al crear el servidor, pasamos una función que maneja las solicitudes (`req`) y las respuestas (`res`).
const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  // Pasamos `req` y `res` a las rutas de usuarios, que se encargarán de manejar las solicitudes y enviar las respuestas.
    // Enrutar las solicitudes
    if (req.url?.startsWith('/api/users')) {
      userRoutes(req, res);
    } else if (req.url?.startsWith('/api/tasks')) {
      taskRoutes(req, res);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
});

// Iniciamos el servidor en el puerto definido. Cuando el servidor esté listo, imprimirá un mensaje en la consola.
server.listen(PORT, () => {
  
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
