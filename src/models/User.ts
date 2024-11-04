// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Interfaz para definir los campos de un usuario
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Definimos el esquema de usuario
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Middleware de Mongoose: Encripta la contraseña antes de guardar
UserSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (error: any) {
      next(error);
    }
  });

// Exportamos el modelo basado en el esquema de usuario
export default mongoose.model<IUser>('User', UserSchema);
