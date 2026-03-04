var express = require('express');
var router = express.Router();
var axios = require('axios')

// Função para obter a lista de atores e suas participações nos filmes
async function getAtores() {
  const resp = await axios.get("http://localhost:3000/filmes");
    var filmes = resp.data
    var atoresFilme = {};

    filmes.forEach(f => {
      f.cast.forEach(ator => {
        if (!atoresFilme[ator]) {
            atoresFilme[ator] = {
                id: ator.toLowerCase().replace(/\s/g, '-'),
                nome: ator,
                participacoes: []
            };
        }
        atoresFilme[ator].participacoes.push(f);
      });
    });
    
    var atores = Object.values(atoresFilme)

    atores.sort((a, b) => a.nome.localeCompare(b.nome));
    
    return atores;
}

// Função para obter a lista de géneros e suas "participações" nos filmes
async function getGeneros() { 
  const resp = await axios.get("http://localhost:3000/filmes");
  var filmes = resp.data
  var generosFilme = {};

  filmes.forEach(f => {
    f.genres.forEach(gen => {
      if (!generosFilme[gen]) {
          generosFilme[gen] = {
              id: gen.toLowerCase().replace(/\s/g, '-'),
              nome: gen,
              participacoes: []
          };
      }
      generosFilme[gen].participacoes.push(f);
    });
  });
  
  var generos = Object.values(generosFilme)

  generos.sort((a, b) => a.nome.localeCompare(b.nome));
  
  return generos;

}

// GET / e GET /filmes
router.get(['/', '/filmes'], function(req, res, next){
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes")
    .then(resp => {
        var filmes = resp.data
        res.render('index', { list: filmes, date: d });
    })
  .catch(err => next(err))
});

// GET /filmes/:id
router.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes/" + req.params.id)
    .then(resp => {
        var filme = resp.data
        res.render('filme', { filme: filme, date: d });
    })
  .catch(err => next(err))
});

// GET /atores
router.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  getAtores()
    .then(atores => {
      res.render('atores', { list: atores, date: d });
    })
    .catch(err => next(err))
});

// GET /atores/:id
router.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var idAtor = req.params.id;
  getAtores()
    .then(atores => {
      var ator = atores.find(a => a.id === idAtor); // Encontrar o ator pelo ID
      if (ator) {
        res.render('ator', { ator: ator, date: d });
      } else {
        res.status(404).send("Ator não encontrado");
      }
    })
    .catch(err => next(err))
});

// GET /generos
router.get('/generos', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  getGeneros()
    .then(generos => {
      res.render('generos', { list: generos, date: d });
    })
    .catch(err => next(err))
});

// GET /generos/:id
router.get('/generos/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var idGenero = req.params.id;
  getGeneros()
    .then(generos => {
      var genero = generos.find(g => g.id === idGenero); // Encontrar o genero pelo ID
      if (genero) {
        res.render('genero', { genero: genero, date: d });
      } else {
        res.status(404).send("Genero não encontrado");
      }
    })
    .catch(err => next(err))
});

module.exports = router;
