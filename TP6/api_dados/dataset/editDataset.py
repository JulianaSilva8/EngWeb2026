import json

with open('cinema.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

filmes = [{"_id": i, **filme} for i, filme in enumerate(data['filmes'], 1)]

atores_map = {}
for filme in filmes:
    ref = {"filme_id": filme["_id"], "title": filme["title"], "year": filme["year"]}
    for ator in filme.get("cast", []):
        if ator not in atores_map:
            atores_map[ator] = {"nome": ator, "filmes": []}
        atores_map[ator]["filmes"].append(ref)

atores = [{"_id": i, **a} for i, a in enumerate(sorted(atores_map.values(), key=lambda a: a["nome"]), 1)]

generos_map = {}
for filme in filmes:
    ref = {"filme_id": filme["_id"], "title": filme["title"], "year": filme["year"]}
    for genero in filme.get("genres", []):
        if genero not in generos_map:
            generos_map[genero] = {"nome": genero, "filmes": []}
        generos_map[genero]["filmes"].append(ref)

generos = [{"_id": i, **g} for i, g in enumerate(sorted(generos_map.values(), key=lambda g: g["nome"]), 1)]

with open('filmes.json', 'w', encoding='utf-8') as f:
    json.dump(filmes, f, ensure_ascii=False, indent=2)

with open('atores.json', 'w', encoding='utf-8') as f:
    json.dump(atores, f, ensure_ascii=False, indent=2)

with open('generos.json', 'w', encoding='utf-8') as f:
    json.dump(generos, f, ensure_ascii=False, indent=2)