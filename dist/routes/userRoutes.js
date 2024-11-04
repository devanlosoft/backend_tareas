"use strict";
// src/routes/userRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// Importamos las funciones del controlador desde `userController.ts`.
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
// Definimos `userRoutes` como una función que maneja diferentes rutas relacionadas con usuarios.
const userRoutes = (req, res) => {
    // Verificamos si la URL solicitada es `/api/users` y el método es `GET`.
    if (req.url === '/api/users' && req.method === 'GET') {
        // Si coincide, llamamos a la función `getUsers` para obtener la lista de usuarios.
        (0, userController_1.getUsers)(req, res);
    }
    // Verificamos si la URL es `/api/users` y el método es `POST`.
    else if (req.url === '/api/users' && req.method === 'POST') {
        // Si coincide, llamamos a la función `createUser` para crear un nuevo usuario.
        (0, userController_1.createUser)(req, res);
    }
    else if (req.url === '/api/users/login' && req.method === 'POST') {
        (0, userController_1.loginUser)(req, res);
    }
    else if (req.url === '/api/users/me' && req.method === 'GET') {
        // Aplicamos el middleware de autenticación para proteger esta ruta
        (0, authMiddleware_1.authenticateToken)(req, res, () => {
            // Ruta protegida: Información del usuario autenticado
            const userId = req.userId;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: `Acceso permitido. ID de usuario: ${userId}` }));
        });
    }
    else {
        // Si la URL o el método no coinciden con las rutas definidas, respondemos con un estado 404.
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
exports.userRoutes = userRoutes;
