#!/bin/bash
# Importa o JSON para a base de dados cinema, coleção filmes, atores e generos
mongoimport --host localhost --db cinema --collection filmes  --type json --file /docker-entrypoint-initdb.d/filmes.json  --jsonArray
mongoimport --host localhost --db cinema --collection atores  --type json --file /docker-entrypoint-initdb.d/atores.json  --jsonArray
mongoimport --host localhost --db cinema --collection generos --type json --file /docker-entrypoint-initdb.d/generos.json --jsonArray
# Cria o índice de texto necessário para o parâmetro ?q= funcionar
mongosh cinema --eval 'db.filmes.createIndex({title: "text"})'
mongosh cinema --eval 'db.atores.createIndex({nome: "text"})'
mongosh cinema --eval 'db.generos.createIndex({nome: "text"})'