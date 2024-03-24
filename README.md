# Global Chat Rest API

Esta API rest foi desenvolvida especificamente para ser o lado do servidor no projeto Global Chat.
Sendo uma API, ela será responsável por lidar com as requisições HTTP, operações com o banco de dados e devolver informações e
dados ao front-end.

Esta API até então foi escrita para lidar com dados simples de texto, já que a aplicação se trata de uma
página de chat em grupo na qual a funcionalidade essencial é a de enviar mensagens de texto. Além disso, 
também são realizados os cadastros e validações de login dos usuários.

# Funcionalidades
## Funcionalidades relativas ao usuário:

`1 - Criar usuários com os dados recebidos de um formulário mo front-end na base de dados
    utilizando o sequelize`

`2 - Listar todos os usuários e todos os dados relativos a eles.`

`3 - Realizar a edição dos dados do usuário com as informações que o mesmo enviar através da página.`

`4 - Pesquisar um usuário específico na base de dados de acordo com email, nome ou id`

`5 - Alterar um campo específico da tabela dos usuários na base de dados que resultará na inacessibilidade
    do usuário à página (banimento).`

`6 - Deletar um usuário da base de dados.`


## Funcionalidades relativas às mensagens de texto:

`1 - Registrar uma mensagem enviada na página na base de dados`

`2 - Enviar ao front-end todas as mensagens de todos os usuários e todos os dados relativos a estas
    mensagens.`

`3 - Deletar mensagens`

`4 - Deletar todas as mensagens`


## Funcionalidades comuns:

`1 - Gerar um JWT para que os usuários logados consigam acessar as rotas da aplicação.`


# Principais tecnologias usadas
- Node js
- Express
- Mariadb
- Sequelize ORM

