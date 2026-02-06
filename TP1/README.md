# Metainformação
> **Título:** TP1 - Oficina automóvel
> **Data:** 06/02/2026
> **Autor:** Juliana Silva
> **UC:** Engenharia Web

Repositório dedicado aos TPC realizados ao longo do semestre no âmbito da UC de Engenharia Web (2025/2026)

## Autor
> **ID:** A105572
> **Nome:** Juliana Silva
![foto](ju.jpeg)

## Res
A partir de um dataset com reparações, é criada uma página principal que encaminha para:
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
- [json2html](./json2html.py) - Ficheiro que fera as páginas
- [dataset](./dataset_reparacoes.json) - Dataset de reparações
- [index](./output/index.html) - Página principal que reencaminha para as diversas listagens (reparações, intervenções e viaturas)
- [reparacoes](./output/pag_reparacoes.html) - Página com a lista de todas as reparações
- [intervencoes](./output/pag_intervencoes.html) - Página com a lista de todos os tipos de intervenções
- [reparacoes](./output/pag_marcas_modelos.html) - Página com a lista de todos as marcas/modelos de carros
- páginas de cada reparação, intervenção e modelo com informações relativas a cada um.

 ## Como executar

```bash
python3 json2html.py
```