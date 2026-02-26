import json

with open('emd.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

emds = []

for info in data:
    emd = info.copy()
    emd['id'] = emd.pop('_id')
    emd['data'] = emd.pop('dataEMD')
    emd['primeiro_nome'] = emd['nome']['primeiro']
    emd['sobrenome'] = emd['nome']['último']
    emd.pop('nome')
    emd['genero'] = emd.pop('género')

    emds.append(emd)

resultado = {"emd": emds}

with open('emd.json', 'w', encoding='utf-8') as f:
    json.dump(resultado, f, ensure_ascii=False, indent=2)

