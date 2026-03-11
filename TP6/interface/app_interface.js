const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API (Se estiveres a correr fora do Docker, usa localhost)
const API_URL = process.env.API_URL || "http://localhost:7789";

app.get(['/', '/filmes'], (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '/filmes')
        .then(resp => {
            const list = resp.data
                .map(f => ({ ...f, id: f._id }))
                .sort((a, b) => a.id - b.id);
            res.render('index', { list, date: d });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

app.get('/filmes/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/filmes/' + req.params.id)
        .then(resp => res.render('filme', { filme: resp.data, date: d }))
        .catch(err => res.render('error', { error: err, message: "Filme não encontrado" }));
});


app.get('/atores', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '/atores')
        .then(resp => {
            const list = resp.data
                .map(a => ({ ...a, id: a._id }))
                .sort((a, b) => a.id - b.id);
            res.render('atores', { list, date: d });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

app.get('/atores/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/atores/' + req.params.id)
        .then(resp => res.render('ator', { ator: resp.data, date: d }))
        .catch(err => res.render('error', { error: err, message: "Ator não encontrado" }));
});


app.get('/generos', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '/generos')
        .then(resp => {
            const list = resp.data
                .map(f => ({ ...f, id: f._id }))
                .sort((a, b) => a.id - b.id);
            res.render('generos', { list, date: d });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

app.get('/generos/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    axios.get(API_URL + '/generos/' + req.params.id)
        .then(resp => res.render('genero', { genero: resp.data, date: d }))
        .catch(err => res.render('error', { error: err, message: "Género não encontrado" }));
});


const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}`);
});