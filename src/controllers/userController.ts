// src/controllers/userController.ts

// Importamos `IncomingMessage` y `ServerResponse` desde `http` para definir los tipos de `req` y `res`.
import { IncomingMessage, ServerResponse } from 'http';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const JWT_SECRET = 'supersecretkey'; // Cambia esto a una clave más segura y guárdala en variables de entorno

export const loginUser = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { email, password } = JSON.parse(body);

      // Verificar que el email y la contraseña se hayan proporcionado
      if (!email || !password) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'El email y la contraseña son obligatorios' }));
        return;
      }

      // Buscar al usuario por email
      const user = await User.findOne({ email });
      if (!user) {
        res.statusCode = 401;
        res.end(JSON.stringify({ error: 'Credenciales incorrectas' }));
        return;
      }

      // Comparar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.statusCode = 401;
        res.end(JSON.stringify({ error: 'Credenciales incorrectas' }));
        return;
      }

      // Generar token JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ token }));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error al iniciar sesión' }));
    }
  });
};


// Controlador para obtener todos los usuarios
export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await User.find(); // Obtenemos todos los usuarios
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Error al obtener usuarios' }));
  }
  

};


// controlador para Crear un nuevo usuario en la base de datos
export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { name, email, password } = JSON.parse(body);

      // Validación simple
      if (!name || !email || !password) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'El nombre y el email son obligatorios' }));
        return;
      }

      // Crear y guardar el nuevo usuario en la base de datos
      const newUser: IUser = new User({ name, email, password });
      await newUser.save();

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Usuario creado correctamente', user: newUser }));
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Error al crear el usuario' }));
    }
  });
};