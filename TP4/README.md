## Metainformação
> **Título:** TP4 - Exames Médicos Desportivos <br>
> **Data:** 26/02/2026 <br>
> **Autor:** Juliana Silva <br>
> **UC:** Engenharia Web 2025/26


## Autor
> **ID:** A105572 <br>
> **Nome:** Juliana Silva <br>
![foto](ju.jpeg)

## Resumo
A partir de um dataset de exames médicos de atletas, são criadas diversas páginas HTML com recurso a CSS.
- Página de Exames: 
    - Tabela com o Nome, Data, Modalidade e Resultado
    - Opção de ordenar a tabela por data(desc) e nome(asc)
    - Botão que redireciona para a página das estatísticas
    - Opção de editar, adicionar e remover linhas da tabela
    - Ao clicar numa linha, redireciona para a página respetiva a esse exame
- Página de um Exame específico:
    - Toda a informação respetiva a esse exame
    - Opção de voltar à página de Exames
- Página de formulário para edição e registo de exame:
    - Campos necessários
    - Opção de confirmar ou cancelar
- Página de Estatísticas:
    - Tabela com o número de registos de um determinado género
    - Tabela com o número de registos de uma determinada modalidade
    - Tabela com o número de registos de um determinado clube
    - Tabela com o número de resultados
    - Tabela com o número de federados
    - Opção de voltar à página de Exames

## Resultados
- 'http://localhost:7777/emd' - Página de Exames
- 'http://localhost:7777/emd/registo' - Página de registo de um novo exame
- 'http://localhost:7777/emd/stats' - Página de Estatísticas

 ## Como executar
Modificar Dataset:
```bash
python3 editDataset.py
./editDataset.py emd.json
```
Executar o servidor json-server:
```bash
json-server --watch emd.json
```

Instalar dependências:
```bash
npm i axios
npm i pug
```

Executar o servidor http:
```bash
node emd_server.js
```