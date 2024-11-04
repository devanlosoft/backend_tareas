// src/routes/userRoutes.ts

// Importamos `IncomingMessage` y `ServerResponse` desde `http` para tipar las solicitudes y respuestas.
import { IncomingMessage, ServerResponse } from 'http';

// Importamos las funciones del controlador desde `userController.ts`.
import { getUsers, createUser, loginUser } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

// Definimos `userRoutes` como una función que maneja diferentes rutas relacionadas con usuarios.
export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
  // Verificamos si la URL solicitada es `/api/users` y el método es `GET`.
  if (req.url === '/api/users' && req.method === 'GET') {
    // Si coincide, llamamos a la función `getUsers` para obtener la lista de usuarios.
    getUsers(req, res);
  }
  // Verificamos si la URL es `/api/users` y el método es `POST`.
  else if (req.url === '/api/users' && req.method === 'POST') {
    // Si coincide, llamamos a la función `createUser` para crear un nuevo usuario.
    createUser(req, res);
  } else if (req.url === '/api/users/login' && req.method === 'POST'){
    loginUser(req, res);
  } else if(req.url === '/api/users/me' && req.method === 'GET'){
        // Aplicamos el middleware de autenticación para proteger esta ruta
        authenticateToken(req, res, () => {
          // Ruta protegida: Información del usuario autenticado
          const userId = (req as any).userId;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `Acceso permitido. ID de usuario: ${userId}` }));
        });
  } else{
    // Si la URL o el método no coinciden con las rutas definidas, respondemos con un estado 404.
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
  }
};
