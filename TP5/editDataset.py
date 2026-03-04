import json

with open('cinema.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['filmes'] = [{'id': i, **filme} for i, filme in enumerate(data['filmes'], 1)]

with open('cinema.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

