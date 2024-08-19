/*
Este arquivo define o serviço para manipulação de cadastros. Ele inclui métodos para obter, criar, atualizar e deletar tarefas no banco de dados.
*/


// Importa decorators e classes comuns do NestJS, como Injectable, InternalServerErrorException, NotFoundException e BadRequestException.
import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
// Importa a interface ou classe Task.
import { Task } from './task';
// Importa o InjectModel para injetar o modelo Mongoose.
import { InjectModel } from '@nestjs/mongoose';
// Importa a classe Model do Mongoose.
import { Model } from 'mongoose';
// Importa o DTO para criar um cadastro.
import { CreateTaskDto } from '../create-task.dto';


// '@Injectable()': Marca a classe TaskService como um provedor que pode ser injetado em outros componentes.
@Injectable()
export class TaskService {

    // '@InjectModel('Task')': Injeta o modelo Mongoose Task.
    // 'taskModel': É o modelo que permite a interação com a coleção Task no MongoDB.
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }


    // find().exec(): Busca todas os cadastros na coleção.
    // Tratamento de Erros: Lança uma exceção interna do servidor se ocorrer um erro.
    async getAll() {
        try {
            return await this.taskModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar todos os cadastros!');
        }
    }


    // 'findById(id).exec()': Busca um cadastro pelo ID.
    // Tratamento de Erros:
    //     'CastError': Lança uma exceção de BadRequest se o ID for inválido.
    //     Outros Erros: Lança uma exceção interna do servidor se ocorrer outro tipo de erro
    async getById(id: string) {
        try {
            const task = await this.taskModel.findById(id).exec();
            if (!task) {
                throw new NotFoundException('Cadastro de usuário não encontrada!');
            }
            return task;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('ID inválido!');
            }
            throw new InternalServerErrorException('Erro ao buscar o cadastro de usuário, verifique se o id está correto!');
        }
    }
    

    // 'new this.taskModel(task)': Cria uma nova instância do modelo Task com os dados fornecidos.
    // 'save()': Salva a nova tarefa no banco de dados.
    // Tratamento de Erros: Lança uma exceção interna do servidor se ocorrer um erro.
    async create(task: CreateTaskDto) {
        try {
            const createdTask = new this.taskModel(task);
            return await createdTask.save();
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar o cadastro!');
        }
    }
    

    // 'findByIdAndUpdate(id, task, { new: true }).exec()': Atualiza o cadastro pelo ID e retorna o cadastro atualizada.
    // Tratamento de Erros:
    //     'CastError': Lança uma exceção de BadRequest se o ID for inválido.
    //     Outros Erros: Lança uma exceção interna do servidor se ocorrer outro tipo de erro.
    async update(id: string, task: CreateTaskDto) {
        try {
            const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
            if (!updatedTask) {
                throw new NotFoundException('Cadastro de usuário não encontrado!');
            }
            return updatedTask;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('ID inválido!');
            }
            throw new InternalServerErrorException('Erro ao atualizar os dados do usuário!');
        }
    }
    
    
    // O método tenta encontrar um cadastro pelo seu id. A função findById do Mongoose é usada para isso.
    // Se o cadastro não for encontrado, é lançada uma exceção NotFoundException.
    // Se o cadastro for encontrado, ela é deletada usando deleteOne.
    // Verifica se algum cadastro foi realmente deletada. Se deletedCount for 0, o cadastro não foi deletada e uma exceção NotFoundException é lançada.
    // Se tudo ocorrer bem, uma mensagem de sucesso e os detalhes do cadastro deletado são retornados.
    // Tratamento de erros:
    //     Se ocorrer um erro e ele for do tipo CastError (geralmente indicando um ID inválido), uma exceção BadRequestException é lançada.
    //     Qualquer outro erro resulta em uma InternalServerErrorException.
    async delete(id: string) {
        try {
          const task = await this.taskModel.findById(id).exec();
          if (!task) {
            throw new NotFoundException('Cadastro de usuário não encontrado!');
          }
          const result = await this.taskModel.deleteOne({ _id: id }).exec();
          if (result.deletedCount === 0) {
            throw new NotFoundException('Cadastro de usuário não encontrado!');
          }
          return { message: 'Cadastro do usuário deletado!', task };
        } catch (error) {
          if (error.name === 'CastError') {
            throw new BadRequestException('ID inválido!');
          }
          throw new InternalServerErrorException('Erro ao deletar o cadastro do usuário!');
        }
      }
}



    /* Código com try/catch ----------------------------------------------------------------

    async getAll() {
        try {
            return await this.taskModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar todas as tarefas!');
        }
    }
    
    async getById(id: string) {
        try {
            const task = await this.taskModel.findById(id).exec();
            if (!task) {
                throw new NotFoundException('Tarefa não encontrada!');
            }
            return task;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('ID inválido!');
            }
            throw new InternalServerErrorException('Erro ao buscar a tarefa, verifique se o id está correto!');
        }
    }
    
    async create(task: Task) {
        try {
            const createdTask = new this.taskModel(task);
            return await createdTask.save();
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar a tarefa!');
        }
    }
    
    async update(id: string, task: Task) {
        try {
            const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
            if (!updatedTask) {
                throw new NotFoundException('Tarefa não encontrada!');
            }
            return updatedTask;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('ID inválido!');
            }
            throw new InternalServerErrorException('Erro ao atualizar a tarefa!');
        }
    }
    
    async delete(id: string) {
        try {
            const result = await this.taskModel.deleteOne({ _id: id }).exec();
            if (result.deletedCount === 0) {
                throw new NotFoundException('Tarefa não encontrada!');
            }
            return result;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new BadRequestException('ID inválido!');
            }
            throw new InternalServerErrorException('Erro ao deletar a tarefa!');
        }
    }
    */


    /* Código sem try/catch ----------------------------------------------------------------

    async getAll() {
        return await this.taskModel.find().exec();
    }

    async getById(id: string) {
        return await this.taskModel.findById(id).exec();
    }

    async create(task: Task) {
        const createdTask = new this.taskModel(task);
        return await createdTask.save();
    }

    async update(id: string, task: Task) {
        await this.taskModel.updateOne({ _id: id }, task).exec();
        return this.getById(id);
    }

    async delete(id: string) {
        return await this.taskModel.deleteOne({ _id: id }).exec();
    }
    */
