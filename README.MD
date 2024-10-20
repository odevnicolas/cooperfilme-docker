# Informações Importantes do Sistema

## Status do Projeto

1. **Incompleto**: O sistema não foi concluído 100% devido a limitações de tempo.
2. **Problemas com a Biblioteca de Criptografia**: Por conta de uma biblioteca de criptografia utilizada, não consegui rodar o sistema completo utilizando os três Dockerfiles em conjunto com o Docker Compose. 

## Estrutura do Sistema

- **Front-end**: Está rodando via Docker.
- **Banco de Dados**: Também está operando via Docker.
- **Backend**: O backend está gerando a seed, que cadastra os seguintes usuários no banco de dados:

### Usuários Cadastrados

- **Usuário que envia o roteiro**:
  ```json
  {
    "name": "eurekaEscritor",
    "email": "eurekaEscritor@eureka.com",
    "password": "eureka123456789"
  }
- **Usuário que recebe/assume o roteiro**:
```json
  {
  "name": "eurekaAnalista",
  "email": "eurekaAnalista@eureka.com",
  "password": "eureka123456789"
  }

  por mais que o backend esteja rodando junto aos 3 containers, para usar a aplicação terá que entrar na pasta de backend e rodar o comando "npm run start:dev" para iniciar o servidor.

Fora essas pendencias, o projeto segue 100% normal com a melhor padronização de código do mercado :D