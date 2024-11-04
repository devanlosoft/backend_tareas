"use strict";
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
exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Crear una nueva tarea
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, description } = JSON.parse(body);
            const userId = req.userId;
            // Verificar que el título esté presente
            if (!title) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'El título es obligatorio' }));
                return;
            }
            // Crear y guardar la tarea en la base de datos
            const newTask = new Task_1.default({
                user: userId,
                title,
                description,
            });
            yield newTask.save();
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Tarea creada exitosamente', task: newTask }));
        }
        catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error al crear la tarea' }));
        }
    }));
});
exports.createTask = createTask;
// Obtener todas las tareas del usuario autenticado
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const tasks = yield Task_1.default.find({ user: userId });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(tasks));
    }
    catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error al obtener las tareas' }));
    }
});
exports.getTasks = getTasks;
