/*
Este arquivo define o esquema Mongoose para a coleção Task. O Mongoose é uma biblioteca de modelagem de dados para MongoDB e Node.js.
*/

// Importa o Mongoose para o arquivo.
import * as mongoose from 'mongoose';

// 'new mongoose.Schema({...})': Define um novo esquema Mongoose com três campos:
export const TaskSchema = new mongoose.Schema({
    // 'nome': Um campo String que é obrigatório.
    nome: { type: String, required: true },
    // 'email': Um campo String que é obrigatório.
    email: { type: String, required: true },
    // 'ativo': Um campo Boolean que é obrigatório.
    ativo: { type: Boolean, required: true }
});


/* Código antes da alteração ----------------------------------------------------------

import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    nome: String,
    email: String,
    ativo: Boolean
})
*/
