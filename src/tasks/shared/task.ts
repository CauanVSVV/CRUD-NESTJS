import { Document } from 'mongoose';

export class Task extends Document {
    nome: string;
    email: string;
    ativo: boolean;
}
