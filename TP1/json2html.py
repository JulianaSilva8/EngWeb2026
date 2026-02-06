import json, os, shutil

def open_json(filename):
    with open(filename, "r", encoding="utf-8") as file: # com o with o arquivo é fechado automaticamente
        data = json.load(file)
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.makedirs(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.makedirs(relative_path)

def new_file(filename, content):
    with open(filename, "w", encoding="utf-8") as file:
        file.write(content)

dataset = open_json("dataset_reparacoes.json")
mk_dir("output")

# ------------ Script Principal ------------

lista_reparacoes = ""

lista_intervencoes = ""
tipos_intervencoes = {}
reparacoes_por_intervencao = {}

lista_marcas_modelos = ""
marcas_modelos = {}
reparacoes_por_viatura = {}


contador = 1

for reparacao in dataset["reparacoes"]:
    lista_reparacoes += f'''
        <li>
            <a href="reparacao_{contador}.html">Reparação {contador} - ver detalhes</a>
        </li>
    '''

    pag_reparacao = f'''
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Reparação {contador}</title
        </head>
        <body>
            <h4>Detalhes da Reparação {contador}</h4>
            <table border = "1">
                <tr><th>Data</th><td>{reparacao["data"]}</td></tr>
                <tr><th>NIF</th><td>{reparacao["nif"]}</td></tr>
                <tr><th>Nome</th><td>{reparacao["nome"]}</td></tr>
                <tr><th>Marca</th><td>{reparacao["viatura"]["marca"]}</td></tr>
                <tr><th>Modelo</th><td>{reparacao["viatura"]["modelo"]}</td></tr>
                <tr><th>Nr de intervenções</th><td>{reparacao["nr_intervencoes"]}</td></tr>
            </table>
            <a href="pag_reparacoes.html"> Voltar à lista de reparações </a>
        </body>
    </html>
    '''
    new_file(f"./output/reparacao_{contador}.html", pag_reparacao)

    # guardar as intervaçoes num dicionario
    for intervencao in reparacao["intervencoes"]:
        codigo = intervencao["codigo"]
        if codigo not in tipos_intervencoes:
            tipos_intervencoes[codigo] = intervencao

        if codigo not in reparacoes_por_intervencao:
            reparacoes_por_intervencao[codigo] = []
        reparacoes_por_intervencao[codigo].append(contador)

    marca = reparacao["viatura"]["marca"]
    modelo = reparacao["viatura"]["modelo"]
    viatura = (marca, modelo)

    if viatura in marcas_modelos:
        marcas_modelos[viatura] += 1
    else:
        marcas_modelos[viatura] = 1

    if viatura not in reparacoes_por_viatura:
        reparacoes_por_viatura[viatura] = []
    reparacoes_por_viatura[viatura].append(contador)

    contador += 1
    
for intervencao in sorted(tipos_intervencoes.values(), key=lambda c: c["codigo"]):
    codigo = intervencao["codigo"]
    lista_reparacoes_intervencao = ""
    for num_reparacao in reparacoes_por_intervencao[codigo]:
        lista_reparacoes_intervencao += f'''
            <tr>
                <td><a href="reparacao_{num_reparacao}.html">Reparação {num_reparacao} - ver detalhes</a></td>
            </tr>
        '''
    lista_intervencoes += f'''
        <tr>
            <td>{intervencao["codigo"]}</td>
            <td>{intervencao["nome"]}</td>
            <td>{intervencao["descricao"]}</td>
            <td><a href="intervencao_{intervencao['codigo']}.html"> Ver detalhes </a></td>
        </tr>
    '''

    pag_intervencao = f'''
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Intervenção {intervencao["codigo"]}</title>
        </head>
        <body>
            <h4>Detalhes da Intervenção {intervencao["codigo"]}</h4>
            <table border = "1">
                <tr><th>Código</th><td>{intervencao["codigo"]}</td></tr>
                <tr><th>Nome</th><td>{intervencao["nome"]}</td></tr>
                <tr><th>Descrição</th><td>{intervencao["descricao"]}</td></tr>
            </table>
            <hr>
            <table border = "1">
                <tr><th>Reparações associadas</th></tr>
                {lista_reparacoes_intervencao}
            </table>
            <hr>
            <a href="pag_intervencoes.html"> Voltar à lista de intervenções </a>
        </body>
    </html>
    '''
    new_file(f"./output/intervencao_{intervencao['codigo']}.html", pag_intervencao)


for (marca, modelo), nrCarros in sorted(marcas_modelos.items(), key=lambda x: (x[0][0], x[0][1])):
    lista_reparacoes_viatura = ""
    for num_reparacao in reparacoes_por_viatura[(marca, modelo)]:
        lista_reparacoes_viatura += f'''
            <tr>
                <td><a href="reparacao_{num_reparacao}.html">Reparação {num_reparacao} - ver detalhes</a></td>
            </tr>
        '''
    
    lista_marcas_modelos += f'''
        <tr>
            <td>{marca}</td>
            <td>{modelo}</td>
            <td>{nrCarros}</td>
            <td><a href="viatura_{marca}_{modelo}.html"> Ver detalhes </a></td>
        </tr>
    '''

    pag_marca_modelo = f'''
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Marca {marca} Modelo {modelo}</title>
        </head>
        <body>
            <h4>Detalhes da Marca {marca} Modelo {modelo}</h4>
            <table border = "1">
                <tr><th>Marca</th><td>{marca}</td></tr>
                <tr><th>Modelo</th><td>{modelo}</td></tr>
            </table>
             <hr>
            <table border = "1">
                <tr><th>Reparações associadas</th></tr>
                {lista_reparacoes_viatura}
            </table>
            <hr>
            <a href="pag_marcas_modelos.html"> Voltar à lista de marcas e modelos </a>
        </body>
    </html>
    '''
    new_file(f"./output/viatura_{marca}_{modelo}.html", pag_marca_modelo)

html = f'''
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Oficina Automóvel</title>
    </head>
    <body>
        <h2>Oficina Automóvel</h2>
        <ul>
               <li>
                    <a href="pag_reparacoes.html"> Lista de reparações </a>
               </li>

               <li>
                    <a href="pag_intervencoes.html"> Lista de intervenções </a>
               </li>

               <li>
                    <a href="pag_marcas_modelos.html"> Lista de marcas e modelos dos carros intervencionados </a>
               </li>

          </ul>
    </body>
</html>
'''

pag_reparacoes = f'''
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Reparações</title>
    </head>
    <body>
    <h4>Lista de reparações</h4>
    <ul>
        {lista_reparacoes}
    </ul>
    <a href="index.html"> Voltar à página inicial </a>
'''

pag_intervencoes = f'''
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Intervenções</title>
    </head>
    <body>
    <h4>Lista de intervenções</h4>
    <table border = "1">
        <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
        </tr>
        {lista_intervencoes}
    </table>
    <a href="index.html"> Voltar à página inicial </a>
'''

pag_marcas_modelos = f'''
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Marcas e Modelos</title>
    </head>
    <body>
    <h4>Lista de marcas e modelos dos carros intervencionados</h4>
    <table border = "1">
        <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Nr de carros</th>
        </tr>
        {lista_marcas_modelos}
    </table>
    <a href="index.html"> Voltar à página inicial </a>
'''

new_file("./output/index.html", html)
new_file("./output/pag_reparacoes.html", pag_reparacoes)
new_file("./output/pag_intervencoes.html", pag_intervencoes)
new_file("./output/pag_marcas_modelos.html", pag_marcas_modelos)