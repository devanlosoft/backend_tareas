"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar variables de entorno
const JWT_SECRET = process.env.JWT_SECRET; // Asegúrate de que coincida con el secreto usado en `loginUser`
// Middleware para validar el token JWT
const authenticateToken = (req, res, next) => {
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
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Token inválido o expirado' }));
            return;
        }
        // Si el token es válido, agregamos el `userId` a la solicitud
        req.userId = decoded.userId;
        next(); // Continuamos con la ruta protegida
    });
};
exports.authenticateToken = authenticateToken;
