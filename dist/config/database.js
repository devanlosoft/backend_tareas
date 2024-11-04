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
// src/config/database.ts
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar variables de entorno
// Función para conectar a la base de datos
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectar a MongoDB con la URL de conexión
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Conectado a la base de datos MongoDB');
    }
    catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
});
exports.default = connectDB;
