// emd_server.js

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')                 // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation
var emdServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /emd ------------------------------------------------------------------
                if(req.url == '/' || req.url == '/emd'){

                    axios.get("http://localhost:3000/emd")
                    .then(resp => {
                        var emd = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdListPage(emd, d))
                    })
                // GET /emd (Ordenado por Data Descendente) ----------------------------------
                }else if(req.url == '/emd?sort=dataDesc'){
                    axios.get("http://localhost:3000/emd?_sort=data&_order=desc")
                    .then(resp => {
                        var emd = resp.data; 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.end(templates.emdListPage(emd, d));
                    })
                // GET /emd (Ordenado por Nome Ascendente) ----------------------------------
                }else if(req.url == '/emd?sort=nomeAsc'){
                    axios.get("http://localhost:3000/emd?_sort=primeiro_nome&_order=asc")                    
                    .then(resp => {
                        var emd = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdListPage(emd, d))
                    })
                // GET /emd/stats ------------------------------------------------------------
                } else if(req.url == '/emd/stats'){
                    axios.get("http://localhost:3000/emd")
                    .then(resp => {
                        var emd = resp.data 
                        let genero = {};
                        let modalidade = {};
                        let clube = {};
                        let resultado = {};
                        let federado = {};

                        emd.forEach(t => {
                            if(t.genero) genero[t.genero] = (genero[t.genero] || 0) + 1;
                            if(t.modalidade) modalidade[t.modalidade] = (modalidade[t.modalidade] || 0) + 1;
                            if(t.clube) clube[t.clube] = (clube[t.clube] || 0) + 1;
                            if(t.resultado !== undefined) resultado[t.resultado] = (resultado[t.resultado] || 0) + 1;
                            if(t.federado !== undefined) federado[t.federado] = (federado[t.federado] || 0) + 1;
                        })

                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdStatsPage({genero, modalidade, clube, resultado, federado}, d))
                    })
                    .catch(erro => {
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                        res.end('<p>Erro ao obter dados: ' + erro + '</p><a href="/">Voltar</a>');
                    });
                }

                // GET /emd/register ---------------------------------------------------------
                else if(req.url == '/emd/registo'){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.emdFormPage(d))
                }
                // GET /emd/edit/:id ---------------------------------------------------------
                else if(/\/emd\/editar\/[0-9a-zA-Z_]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[3]
                    axios.get('http://localhost:3000/emd/' + idEmd)
                    .then(resp => {
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.emdFormEditPage(emd, d))
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possível obter o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
                }
                // GET /emd/delete/:id -------------------------------------------------------
                else if(/\/emd\/apagar\/[0-9a-zA-Z_]+$/.test(req.url)){
                    var idEmd = req.url.split('/')[3]
                    axios.delete('http://localhost:3000/emd/' + idEmd)
                    .then(resp => {
                        res.writeHead(302, {'Location': '/'})
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possível apagar o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
                }
                // GET /emd/:id --------------------------------------------------------------
                else if(req.url.startsWith('/emd/')){
                    var id = req.url.split('/')[2]
                    axios.get("http://localhost:3000/emd?id=" + id)
                        .then(resp => {
                            var emd = resp.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.emdPage(emd, d))
                        })
                        .catch(error => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end('<address><a href="/">Voltar</a></address>')
                        })
                }
               
                break
            case "POST":
                // POST /emd --------------------------------------------------------------------
                if(req.url == '/emd'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/emd', result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Registo inserido com sucesso: ' + JSON.stringify(resp.data) + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possível inserir o registo...</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                        }
                        else{
                            res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possível obter os dados do body...</p>')
                            res.end('<address><a href="/">Voltar</a></address>')
                        }
                    })
                }
                // POST /emd/:id - Alterar um registo
                else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/emd/' + result.id, result) 
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Registo alterado com sucesso: ' + JSON.stringify(resp.data) + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possível alterar o registo...</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                        }
                        else{
                            res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write('<p>Não foi possível obter os dados do body...</p>')
                            res.end('<address><a href="/">Voltar</a></address>')
                        }
                    })
                }

                break
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

emdServer.listen(7777, ()=>{
    console.log("Servidor Ã  escuta na porta 7777...")
})