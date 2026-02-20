## Metainformação
> **Título:** TP3 - Escola de Música <br>
> **Data:** 13/02/2026 <br>
> **Autor:** Juliana Silva <br>
> **UC:** Engenharia Web 2025/26


## Autor
> **ID:** A105572 <br>
> **Nome:** Juliana Silva <br>
![foto](ju.jpeg)

## Resumo
A partir de um dataset de uma escola de música, é criado um servidor HTTP que gera páginas HTML:
- Página de Alunos:
    - ID
    - Nome
    - Data de Nascimento
    - Curso
    - Ano do Curso
    - Instrumento
- Página de Cursos:
    - ID
    - Designação
    - Duração
    - Instrumento
- Página de Instrumentos:
    - ID
    - Designação

## Resultados
- 'http://localhost:25000' - Página inicial que dá acesso às diferentes páginas
- 'http://localhost:25000/alunos' - Tabela HTML com os dados dos alunos
- 'http://localhost:25000/cursos' - Tabela HTML com os dados dos cursos
- 'http://localhost:25000/instrumentos' - Tabela HTML com os dados dos instrumentos

 ## Como executar
Executar o servidor json-server:
```bash
json-server --watch db.json
```

Instalar dependências:
```bash
npm install axios
```

Executar o servidor http:
```bash
node script.js
```