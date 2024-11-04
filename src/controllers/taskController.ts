import { IncomingMessage, ServerResponse } from 'http';
import Task from '../models/Task';

// Crear una nueva tarea
export const createTask = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { title, description } = JSON.parse(body);
      const userId = (req as any).userId; 

      // Verificar que el título esté presente
      if (!title) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'El título es obligatorio' }));
        return;
      }

      // Crear y guardar la tarea en la base de datos
      const newTask = new Task({
        user: userId,
        title,
        description,
      });

      await newTask.save();

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Tarea creada exitosamente', task: newTask }));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error al crear la tarea' }));
    }
  });
};

// Obtener todas las tareas del usuario autenticado
export const getTasks = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = (req as any).userId;
    const tasks = await Task.find({ user: userId });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(tasks));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Error al obtener las tareas' }));
  }
};
