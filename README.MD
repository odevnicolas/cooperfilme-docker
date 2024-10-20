INFOS IMPORTANTES DO SISTEMA!

1- ele nao foi concluido 100% por falta de tempo.
2- por conta de uma biblioteca de criptografia que utilizei, dos 3 dockerfile, em conjunto com o docker compose, nao consegui rodar o sistema completo. o front-end, e o banco de dados estão rodando via docker, e o bakcend ele está gerando a seed onde cadastra esses 2 usuários no banco de dados:
//usuario que envia o roteiro
name: "eurekaEscritor",
email: "eurekaEscritor@eureka.com",
password: "eureka123456789",
//usuario que recebe/assume o roteiro
name: "eurekaAnalista",
email: "eurekaAnalista@eureka.com",
password: "eureka123456789",

por mais que o backend esteja rodando junto aos 3 containers, para usar a aplicação terá que entrar na pasta de backend e rodar o comando "npm run start:dev" para iniciar o servidor.

Fora essas pendencias, o projeto segue 100% normal com a melhor padronização de código do mercado :D