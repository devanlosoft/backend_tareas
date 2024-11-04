"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const taskRoutes = (req, res) => {
    if (req.url === '/api/tasks' && req.method === 'POST') {
        // Rutas protegidas con autenticación
        (0, authMiddleware_1.authenticateToken)(req, res, () => {
            (0, taskController_1.createTask)(req, res);
        });
    }
    else if (req.url === '/api/tasks' && req.method === 'GET') {
        (0, authMiddleware_1.authenticateToken)(req, res, () => {
            (0, taskController_1.getTasks)(req, res);
        });
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Ruta no encontrada' }));
    }
};
exports.taskRoutes = taskRoutes;
