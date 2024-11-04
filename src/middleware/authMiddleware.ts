// src/middleware/authMiddleware.ts
import { IncomingMessage, ServerResponse } from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const JWT_SECRET = process.env.JWT_SECRET; // Asegúrate de que coincida con el secreto usado en `loginUser`


// Middleware para validar el token JWT
export const authenticateToken = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
  // Obtenemos el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  // Verificamos si el token existe
  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Token de autenticación requerido' }));
    return;
  }

  // Verificamos el token
  if (!JWT_SECRET) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'JWT_SECRET no está definido' }));
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Token inválido o expirado' }));
      return;
    }

    // Si el token es válido, agregamos el `userId` a la solicitud
    (req as any).userId = (decoded as any).userId;
    next(); // Continuamos con la ruta protegida
  });
};
