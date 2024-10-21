# Informações Importantes do Sistema

## Status do Projeto

1. **Incompleto**: O sistema não foi concluído 100% devido a limitações de tempo.

## Como rodar o projeto?

1. **passo 1**: Após dar clone no projeto execute "docker compose up --build" (subir o container com o banco de dados e o servidor)
2. **passo 2**: Crie um .env com base no example!
2. **passo 3**: Após subir o container, irá dar um problema de falta de migration, entre na pasta do backend e execute o "npx prisma migrate dev" (criar as tabelas no banco de dados)
3. **passo 4**: Após criar as tabelas, rode "docker compose up" (subir o servidor)
4. **passo 5**: Agora o servidor está rodando, acesse o endereço "http://localhost:3000" e faça login com as credenciais do usuário :D.


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

Fora essa pendencia, o projeto segue 100% normal com a melhor padronização de código do mercado :D