## Metainformação
> **Título:** TP2 - Oficina automóvel <br>
> **Data:** 13/02/2026 <br>
> **Autor:** Juliana Silva <br>
> **UC:** Engenharia Web 2025/26


## Autor
> **ID:** A105572 <br>
> **Nome:** Juliana Silva <br>
![foto](ju.jpeg)

## Resumo
A partir de um dataset com reparações, é criado um servidor HTTP que gera páginas HTML:
- Página de reparações:
    - Nome
    - NIF
    - Data
    - Marca
    - Modelo
    - Matrícula
    - Nr de intervenções
- Página de intervenções:
    - Código
    - Nome
    - Descrição
    - Nr de intervenções
- Página de viaturas:
    - Marca
    - Modelo
    - Matrícula
    - Nr de intervenções

## Resultados
- 'http://localhost:7777/reparacoes' - Tabela HTML com os dados das reparações
- 'http://localhost:7777/intervencoes' - Tabela HTML ordenada por ordem alfabética do código com os diferentes tipos de interveções, sem repetiçoes e com o nr de vezes que foram feitas
- 'http://localhost:7777/viaturas' - Tabela HTML ordenada por ordem alfabética de marca e modelo com os dados dos tipos de viatura intervencionados, sem repetiçoes e o nr de vezes que cada modelo foi reparado

 ## Como executar
Executar o servidor json-server:
```bash
json-server --watch dataset_reparacoes.json
```

Instalar dependências:
```bash
npm install axios
```

Executar o servidor http:
```bash
node script.js
```