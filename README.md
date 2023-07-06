# projeto14-mywallet-back

O projeto consiste em um aplicativo de controle de transações financeiras com recursos de autenticação de usuário. 

## Sobre
O projeto visa fornecer uma API para manipulação de transações financeiras, permitindo que os usuários registrem, acessem, atualizem e excluam suas transações. A autenticação é usada para proteger as rotas e garantir que apenas usuários autenticados possam acessar as funcionalidades. As validações dos dados são realizadas para garantir que os valores fornecidos estejam corretos e atendam aos requisitos especificados nos esquemas de validação.

## Tecnologias 🚀

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [nodejs](https://nodejs.org/) 
- [express](https://expressjs.com/)
- [javascript](https://www.javascript.com/) 
- [joi](https://joi.dev/)

## Rotas 🛣️

### Rotas de Autenticação 🔑

#### <span style="color: green;">POST</span> <span style="color: gray;">/sign-up</span>
-  Essa rota permite que um novo usuário se registre no sistema. O endpoint recebe os dados de registro (**nome**, **email** e **senha**), e  verifica se o email já está cadastrado no banco de dados. Se o email já existir, a resposta terá o status 409 Conflict. Caso contrário, a senha é criptografada usando `bcrypt` e o novo usuário é inserido no banco de dados. A resposta terá o status `201` Created.

```json

{
	"name": "nameUser",
	"email": "nameuser@gmail.com",
	"password": "123"
}

```

#### <span style="color: green;">POST</span> <span style="color: gray;">/login</span>

- Essa rota permite que um usuário faça login no sistema. O controlador signIn recebe as credenciais de login (email e senha) e verifica se o email está cadastrado no banco de dados. 
- Se o email não for encontrado, a resposta terá o status 404 Not Found. Se o email for encontrado, a senha fornecida é comparada com a senha armazenada no banco de dados usando bcrypt. 
- Se a senha estiver correta, um token de autenticação é gerado e armazenado no banco de dados, juntamente com o ID do usuário. A resposta terá o status 200 OK e retornará o token de autenticação e o nome do usuário.

```json
{
	"email": "username@gmail.com",
	"password": "123"
}

```

#### <span style="color: green;">POST</span> <span style="color: gray;">/logout</span>

- Essa rota realiza o logout do usuário. O controlador logout recebe o token de autenticação do usuário (obtido do middleware de autenticação) e exclui a sessão correspondente no banco de dados. A resposta terá o status 200 OK. Não é enviado um json, apenas o token de autenticação.



### Rotas de Transação 💸

#### <span style="color: green;">POST</span> <span style="color: gray;">/transactions</span>

- Essa rota permite criar uma nova transação. O controlador `createTransaction` recebe os dados da transação (**valor**, **descrição** e **tipo**) e valida se o valor é um número de ponto flutuante positivo. Em seguida, insere a transação no banco de dados, atribuindo o valor, descrição, tipo, ID do usuário e data atual. A resposta terá o status 201 Created.

```json
{
	"value": "10.00",
	"description": "mesada",
	"type": "Profit"
}

```

#### <span style="color: purple;">GET</span> <span style="color: gray;">/transactions</span>

- Essa rota retorna as transações de um usuário específico. O controlador getTransaction obtém o ID do usuário a partir do token de autenticação e realiza uma consulta no banco de dados para obter as transações ordenadas pela data de forma decrescente. A resposta contém as transações encontradas.


#### <span style="color: red;">DELETE</span> <span style="color: gray;">/transactions/:id</span>

- Essa rota permite excluir uma transação específica. O controlador `deleteTransaction` recebe o ID da transação como parâmetro e verifica se a transação pertence ao usuário autenticado. Em seguida, remove a transação do banco de dados. A resposta terá o status 202 Accepted.

#### <span style="color: orange;">PUT</span> <span style="color: gray;">/transactions/:id</span>

- Essa rota permite atualizar uma transação específica. O controlador `updateTransaction` recebe o ID da transação como parâmetro, o valor e a descrição atualizados. Verifica se a transação pertence ao usuário autenticado e se o novo valor é um número de ponto flutuante positivo. Em seguida, atualiza a transação no banco de dados com os novos valores. A resposta terá o status 200 OK.


```json
{
	"value": "20.00",
	"description": "brinquedo",
	"type": "expense"
}

```
















