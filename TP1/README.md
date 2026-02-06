## Metainformação
> **Título:** TP1 - Oficina automóvel <br>
> **Data:** 06/02/2026 <br>
> **Autor:** Juliana Silva <br>
> **UC:** Engenharia Web 2025/26


## Autor
> **ID:** A105572 <br>
> **Nome:** Juliana Silva <br>
![foto](ju.jpeg)

## Resumo
A partir de um dataset com reparações, é criada uma página principal com um índice para:
- Página de reparações:
    - Data
    - NIF
    - Nome
    - Marca
    - Modelo
    - Nr de intervenções
- Página de intervenções:
    - Código
    - Nome
    - Descrição
    - Lista de reparações associadas
- Página de viaturas:
    - Marca
    - Modelo
    - Nr de carros
    - Lista de reparações associadas

## Resultados
- [Script](./script.py) - Script em python para gerar as páginas HTML a partir do dataset JSON
- [Dataset](./dataset_reparacoes.json) - Dataset de reparações numa oficina automóvel em formato JSON 

### Output gerado
- [index](./output/index.html) - Página principal com um índice para as listagens (reparações, intervenções e viaturas)
- [reparacoes](./output/pag_reparacoes.html) - Página com a listagem de todas as reparações, com links para as páginas individuais de cada reparação
- [intervencoes](./output/pag_intervencoes.html) - Página com a listagem de todos os tipos de intervenções, com links para as páginas individuais de cada intervenção
- [reparacoes](./output/pag_marcas_modelos.html) - Página com a listagem de todas as marcas/modelos de carros, com links para as páginas individuais de cada marca/modelo
- páginas individuais de cada reparação, intervenção e modelo com informações relativas a cada um.

 ## Como executar

```bash
python3 json2html.py
```