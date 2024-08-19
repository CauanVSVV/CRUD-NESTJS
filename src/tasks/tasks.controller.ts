/*
Este arquivo define o controlador para manipulação das requisições HTTP relacionadas aos cadastros. Ele usa o serviço TaskService para realizar as operações.
*/


// Serviço que contém a lógica de manipulação de cadastros.
import { TaskService } from './shared/task.service';
// Importa decorators e classes comuns do NestJS
import { Body, Controller, Delete, Get, Param, Post, Put, InternalServerErrorException, NotFoundException, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
//  Interface ou classe que define a estrutura de um cadastro.
import { Task } from './shared/task';
// DTO (Data Transfer Object) para criar um cadastro.
import { CreateTaskDto } from './create-task.dto';


// '@Controller('tasks')': Define que este controlador manipula rotas que começam com /tasks.
@Controller('tasks')
export class TasksController {

    // 'taskService': Injeção de dependência do serviço TaskService.
    constructor(
        private taskService: TaskService
    ) {}

    
    // @Get(): Define a rota GET para /tasks.
    // getAll(): Método para buscar todos os cadastros.
    // Tratamento de Erros: Lança uma exceção interna do servidor se ocorrer um erro.
    @Get()
    async getAll() : Promise<Task[]> {
        try {
            return this.taskService.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar todos os cadastros!');
        }
    }
    

    // @Get(':id'): Define a rota GET para /tasks/:id.
    // getById(@Param('id') id: string): Método para buscar um cadastro pelo ID.
    // Tratamento de Erros:
    //     'NotFoundException e BadRequestException': Lança as exceções específicas se ocorrerem.
    //     Outros Erros: Lança uma exceção interna do servidor se ocorrer outro tipo de erro.
    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Task> {
        try {
            return await this.taskService.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao buscar o cadastro!');
        }
    }
    

    // '@Post()': Define a rota POST para /tasks.
    // '@UsePipes(new ValidationPipe())': Usa o ValidationPipe para validar os dados do corpo da requisição.
    // 'create(@Body() task: CreateTaskDto)': Método para criar um novo cadastro.
    // Tratamento de Erros: Lança uma exceção interna do servidor se ocorrer um erro
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() task: CreateTaskDto): Promise<Task> {
        try {
            return await this.taskService.create(task);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar o cadastro!');
        }
    }
    

    // '@Put(':id')': Define a rota PUT para /tasks/:id.
    // 'update(@Param('id') id: string, @Body() task: CreateTaskDto)': Método para atualizar um cadastro pelo ID.
    // Tratamento de Erros:
    //     'NotFoundException' e 'BadRequestException': Lança as exceções específicas se ocorrerem.
    //     Outros Erros: Lança uma exceção interna do servidor se ocorrer outro tipo de erro
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(@Param('id') id: string, @Body() task: CreateTaskDto): Promise<Task> {
        try {
            return await this.taskService.update(id, task);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao atualizar o cadastro!');
        }
    }
    

    // Define que esse método será chamado para requisições HTTP DELETE na rota /tasks/:id.
    // O ID do cadastro a ser deletada é extraído dos parâmetros da rota usando @Param('id').
    // O método do serviço taskService.delete(id) é chamado para deletar o cadastro.
    // Tratamento de erros:
    //     Se ocorrer um erro e ele for uma NotFoundException ou BadRequestException, essa exceção é relançada para ser tratada pelo framework NestJS.
    //     Qualquer outro erro resulta em uma InternalServerErrorException com uma mensagem apropriada.
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ message: string, task: Task }> {
        try {
            return await this.taskService.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao deletar o cadastro!');
        }
    }
}



    /* Código com o try/catch ---------------------------------------------------------

    @Get()
    async getAll() : Promise<Task[]> {
        try {
            return this.taskService.getAll();
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar todos os cadastros de usuário!');
        }
    }
    
    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Task> {
        try {
            return await this.taskService.getById(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao buscar os dados do usuário!');
        }
    }
    
    @Post()
    async create(@Body() task: Task): Promise<Task> {
        try {
            return await this.taskService.create(task);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar um novo cadastro de usuário!');
        }
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
        try {
            return await this.taskService.update(id, task);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao atualizar os dados do usuário!');
        }
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            return await this.taskService.delete(id);
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Erro ao deletar os dados do usuário!');
        }
    }
    */   


    /* Código sem o try/catch ---------------------------------------------------------

    @Get()
    async getAll() : Promise<Task[]> {
        return this.taskService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Task> {
        return this.taskService.getById(id);
    }

    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
        return this.taskService.update(id, task);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.taskService.delete(id);
    }
    */
   