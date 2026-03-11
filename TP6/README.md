## Metainformação
> **Título:** TPC6 - Cinema <br>
> **Data:** 11/03/2026 <br>
> **Autor:** Juliana Silva <br>
> **UC:** Engenharia Web 2025/26


## Autor
> **ID:** A105572 <br>
> **Nome:** Juliana Silva <br>
![foto](ju.jpeg)

## Resumo
A partir de um dataset de cinema, foi criada uma arquitetura com 3 serviços orquestrados pelo Docker Compose:
- **MongoDB** - base de dados com 3 coleções: filmes, atores e generos
- **API de Dados** - servidor Express minimalista que expõe 3 coleções (Porta 7789)
- **Interface Web** - servidor Express com views Pug (Porta 7790)

### Páginas disponíveis
- **Filmes** — tabela com Id, Título, Ano, Nr de Atores e Nr de Géneros; cada linha redireciona para a página do filme
- **Filme individual** — toda a informação do filme (título, ano, elenco, géneros)
- **Atores** — tabela com Id, Nome e Nr de filmes; cada linha redireciona para a página do ator
- **Ator individual** — lista de filmes em que participou, com link para cada filme
- **Géneros** — tabela com Id, Nome e Nr de filmes; cada linha redireciona para a página do género
- **Género individual** — lista de filmes associados, com link para cada filme

## Resultados
- 'http://localhost:7790/filmes' - Página de Filmes
- 'http://localhost:7790/atores' - Página de Atores
- 'http://localhost:7790/generos' - Página de Géneros
- 'http://localhost:7789/filmes' - API de Dados (filmes)
- 'http://localhost:7789/atores' - API de Dados (atores)
- 'http://localhost:7789/generos' - API de Dados (géneros)

## Como executar
### Preparar o dataset
```bash
cd api_dados/dataset
python3 editDataset.py
```

### Arrancar os serviços
```bash
docker compose up -d --build
```

### Parar os serviços
```bash
docker compose down
```
