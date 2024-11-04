import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para la Tarea
export interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

// Definición del esquema de tarea
const TaskSchema: Schema = new Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model<ITask>('Task', TaskSchema);
