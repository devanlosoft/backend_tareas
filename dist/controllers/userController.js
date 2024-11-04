"use strict";
// src/controllers/userController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = exports.loginUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'supersecretkey'; // Cambia esto a una clave más segura y guárdala en variables de entorno
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = JSON.parse(body);
            // Verificar que el email y la contraseña se hayan proporcionado
            if (!email || !password) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'El email y la contraseña son obligatorios' }));
                return;
            }
            // Buscar al usuario por email
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                res.statusCode = 401;
                res.end(JSON.stringify({ error: 'Credenciales incorrectas' }));
                return;
            }
            // Comparar la contraseña
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                res.statusCode = 401;
                res.end(JSON.stringify({ error: 'Credenciales incorrectas' }));
                return;
            }
            // Generar token JWT
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ token }));
        }
        catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error al iniciar sesión' }));
        }
    }));
});
exports.loginUser = loginUser;
// Controlador para obtener todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find(); // Obtenemos todos los usuarios
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error al obtener usuarios' }));
    }
});
exports.getUsers = getUsers;
// controlador para Crear un nuevo usuario en la base de datos
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = JSON.parse(body);
            // Validación simple
            if (!name || !email || !password) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'El nombre y el email son obligatorios' }));
                return;
            }
            // Crear y guardar el nuevo usuario en la base de datos
            const newUser = new User_1.default({ name, email, password });
            yield newUser.save();
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Usuario creado correctamente', user: newUser }));
        }
        catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error al crear el usuario' }));
        }
    }));
});
exports.createUser = createUser;
