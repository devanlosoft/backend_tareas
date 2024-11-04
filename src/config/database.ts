
// src/config/database.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno


// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // Conectar a MongoDB con la URL de conexión
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Conectado a la base de datos MongoDB');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  }
};

export default connectDB;
