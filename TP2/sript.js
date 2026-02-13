const axios = require('axios');
const http = require('http');

http.createServer(function (req, res) {
    if(req.url == "/reparacoes"){
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                let html = `
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Reparações</title>
                    </head>
                    <body>
                        <table border="1">
                            <tr>
                                <th>Nome</th>
                                <th>NIF</th>
                                <th>Data</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Matrícula</th>
                                <th>Nr de Intervenções</th>
                            </tr>
                `
                dados = resp.data;
                dados.forEach(c => {
                    html += `
                    <tr>
                        <td>${c.nome}</td>
                        <td>${c.nif}</td>
                        <td>${c.data}</td>
                        <td>${c.viatura.marca}</td>
                        <td>${c.viatura.modelo}</td>
                        <td>${c.viatura.matricula}</td>
                        <td>${c.nr_intervencoes}</td>
                    </tr>
                    `
                });
                html += `
                        </table>
                    </body>
                </html>
                `;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error) + "</pre>");
            }
        );  
    } else if(req.url == "/intervencoes"){ 
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                mapa = new Map();
                dados = resp.data;
                dados.forEach(c => {
                    c.intervencoes.forEach(i => { 
                        if (!mapa.has(i.codigo)) { 
                                        mapa.set(i.codigo, {
                                             nome: i.nome,
                                             descricao: i.descricao,
                                             total: 0
                                        });
                              }
                              mapa.get(i.codigo).total++;
                         })
                });

                let html = `
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Intervenções</title>
                    </head>
                    <body>
                        <table border="1">
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Nr de Intervenções</th>
                            </tr>
                `

                Array.from(mapa.entries())
                    .sort((a, b) => a[0].localeCompare(b[0])) // ordenar pelo codigo
                    .forEach(([codigo, val]) => {
                        html += `
                        <tr>
                            <td>${codigo}</td>
                            <td>${val.nome}</td>
                            <td>${val.descricao}</td>
                            <td>${val.total}</td>
                        </tr>
                        `
                    });

                html += `
                        </table>
                    </body>
                </html>
                `;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + error.toString() + "</pre>");
            }
        );

    } else if(req.url == "/viaturas"){ 
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                mapa = new Map();
                dados = resp.data;
                dados.forEach(c => {
                    key = c.viatura.marca + c.viatura.modelo;
                    if (!mapa.has(key)) {
                        mapa.set(key, {
                            marca: c.viatura.marca,
                            modelo: c.viatura.modelo,
                            matricula: "",
                            total: 0
                        });
                    }
                    mapa.get(key).total++;

                    if (mapa.get(key).matricula.length < 2) {
                        mapa.get(key).matricula += c.viatura.matricula
                    } else {
                        mapa.get(key).matricula += " ; " + c.viatura.matricula;
                    }
                });

                let html = `
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Viaturas</title>
                    </head>
                    <body>
                        <table border="1">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Matrícula</th>
                                <th>Nr de Intervenções</th>
                            </tr>
                `

                Array.from(mapa.entries())
                .sort((a, b) => a[0].localeCompare(b[0])) // ordenar pela key
                    .forEach(([codigo, val]) => {
                        html += `
                        <tr>
                            <td>${val.marca}</td>
                            <td>${val.modelo}</td>
                            <td>${val.matricula}</td>
                            <td>${val.total}</td>
                        </tr>
                        `
                    });

                html += `
                        </table>
                    </body>
                </html>
                `;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + error.toString() + "</pre>");
            }
        );

    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("<h1>404: Not Found</h1>");
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777");