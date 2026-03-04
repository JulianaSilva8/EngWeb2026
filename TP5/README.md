## Metainformação
> **Título:** TP5 - Cinema <br>
> **Data:** 04/03/2026 <br>
> **Autor:** Juliana Silva <br>
> **UC:** Engenharia Web 2025/26


## Autor
> **ID:** A105572 <br>
> **Nome:** Juliana Silva <br>
![foto](ju.jpeg)

## Resumo
A partir de um dataset de cinema, são criadas diversas páginas através do express
- Página de Filmes: 
    - Tabela com o Id, Título, Ano, Nr de Géneros e Nr de Atores
    - Opção de ir para a página de Atores e de Géneros
    - Ao clicar numa linha, redireciona para a página respetiva a esse filme
- Página de um Filme específico:
    - Toda a informação respetiva a esse filme
    - Opção de voltar à Página de Filmes
- Página de Atores: 
    - Tabela com o Nome (ordenado) e o Nr de filmes em que o mesmo participou
    - Ao clicar numa linha, redireciona para a página respetiva a esse ator
- Página de um Ator específico:
    - Lista de todos os filmes em que o ator participou
    - Ao clicar num filme, redireciona para a página desse filme
    - Opção de voltar à Página de Atores
- Página de Géneros: 
    - Tabela com o género (ordenado) e o Nr de filmes com esse género
    - Ao clicar numa linha, redireciona para a página respetiva a esse género
- Página de um Género específico:
    - Lista de todos os filmes desse género
    - Ao clicar num filme, redireciona para a página desse filme
    - Opção de voltar à Página de Géneros

## Resultados
- 'http://localhost:3007/filmes' - Página de Filmes
- 'http://localhost:3007/atores' - Página de Atores
- 'http://localhost:3007/generos' - Página de Géneros

 ## Como executar
Modificar Dataset:
```bash
python3 editDataset.py cinema.json
```
Executar o servidor json-server:
```bash
npx json-server --watch cinema.json
```

Instalar dependências:
```bash
npm install
```

Executar o servidor http:
```bash
npm run start
```