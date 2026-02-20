const axios = require('axios')
const http = require('http')
const util = require('./myUtil.js')

var myServer = http.createServer(async function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    switch(req.method){
        case "GET":
            if(req.url === "/"){
                try {
                    var corpo = util.card("Página Inicial", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>${util.link("http://localhost:25000/alunos", "Alunos")}
                                <th>${util.link("http://localhost:25000/cursos", "Cursos")}
                                <th>${util.link("http://localhost:25000/instrumentos", "Instrumentos")}
                            </tr>
                        </table>
                    `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(util.pagina("Escola de música", corpo))
                
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro no servidor de dados. ${error.message}</p>`)
                }
            } else if(req.url === "/alunos"){
                try {
                    var alunos = await util.getAlunos()
                    var linhas = alunos.map(a => `
                        <tr>
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                            <td>${a.dataNasc}</td>
                            <td>${a.curso}</td>
                            <td>${a.anoCurso}</td>
                            <td>${a.instrumento}</td>
                        </tr>
                    `).join("")

                    var corpo = util.card("Lista de Alunos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Ano do Curso</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${util.botaoVoltar()}
                    `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(util.pagina("Alunos da Escola de Música", corpo))
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro no servidor de dados. ${error.message}</p>`)
                }
            } else if(req.url === "/cursos"){
                try {
                    var cursos = await util.getCursos()
                    var linhas = cursos.map(c => `
                        <tr>
                            <td>${c.id}</td>
                            <td>${c.designacao}</td>
                            <td>${c.duracao}</td>
                            <td>${c.instrumento["#text"]}</td>
                    `).join("")

                    var corpo = util.card("Lista de Cursos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>ID</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${util.botaoVoltar()}
                    `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(util.pagina("Cursos da Escola de Música", corpo))
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro no servidor de dados. ${error.message}</p>`)
                }
            } else if(req.url === "/instrumentos"){
                try {
                    var instrumentos = await util.getInstrumentos()
                    var linhas = instrumentos.map(i => `
                        <tr>
                            <td>${i.id}</td>
                            <td>${i["#text"]}</td>
                    `).join("")

                    var corpo = util.card("Lista de Instrumentos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>ID</th>
                                <th>Designação</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${util.botaoVoltar()}
                    `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(util.pagina("Instrumentos da Escola de Música", corpo))
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro no servidor de dados. ${error.message}</p>`)
                }
            } else {
                res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(`<p>Rota nao suportada: ${req.url}</p>`)
            }
            break
        
        default:
            res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(`<p>Metodo nao suportado: ${req.method}</p>`)
    }
})

myServer.listen(25000)

console.log("Servidor à escuta na porta 25000...")