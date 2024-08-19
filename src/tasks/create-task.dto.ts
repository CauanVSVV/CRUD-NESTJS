/*
Este arquivo define o DTO (Data Transfer Object) para criar um novo cadastro com validações usando a biblioteca class-validator.
*/

// Importa as funções de validação do class-validator.
import { IsString, IsEmail, IsBoolean, IsNotEmpty, NotContains } from 'class-validator';
// A anotação @Transform é usada para aplicar a função trim ao campo nome antes de qualquer validação. Isso remove espaços em branco desnecessários

//import { Transform } from 'class-transformer';

// export class CreateTaskDto {...}: Define a classe DTO para criar um cadastro com três campos:
export class CreateTaskDto {
  // 'nome': Deve ser uma string não vazia.
  @IsString()
  @IsNotEmpty()
  @NotContains(" ")
  //@Transform(({ value }) => value.trim())
  nome: string;

  // 'email': Deve ser um e-mail válido e não vazio.
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // 'ativo': Deve ser um booleano e não vazio.
  @IsBoolean()
  @IsNotEmpty()
  ativo: boolean;
}
