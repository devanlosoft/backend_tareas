import { IncomingMessage, ServerResponse } from 'http';
import { createTask, getTasks } from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

export const taskRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/tasks' && req.method === 'POST') {
    // Rutas protegidas con autenticación
    authenticateToken(req, res, () => {
      createTask(req, res);
    });
  } else if (req.url === '/api/tasks' && req.method === 'GET') {
    authenticateToken(req, res, () => {
      getTasks(req, res);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
  }
};
