const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// O meu logger
app.use(function(req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    next()
})

// 1. Conexão ao MongoDB
const nomeBD = "cinema"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

// 2. Esquema flexível (strict: false permite campos variados do dataset)
const schema = new mongoose.Schema({ _id: Number }, { strict: false, versionKey: false });const Filme = mongoose.model('Filme', schema, 'filmes'); // (nome do modelo, esquema, nome da coleção)
const Ator = mongoose.model('Ator', schema, 'atores');
const Genero = mongoose.model('Genero', schema, 'generos');

// 3. Rotas CRUD focadas em _id

// GET /filmes
app.get('/filmes', async (req, res) => {
    try {
        let queryObj = { ...req.query };
        
        // 1. Extração de parâmetros especiais
        const searchTerm = queryObj.q;
        const fields = queryObj._select; // 
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        // 2. Configuração da Pesquisa de Texto
        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };
            // Score de relevância
            projection.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        // 3. Configuração da Projeção (_select)
        if (fields) {
            // Converte "title,year" em { title: 1, year: 1 }
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1;
            });
        }

        // 4. Execução da Query
        let execQuery = Filme.find(mongoQuery, projection);

        // Prioridade de ordenação: _sort manual ou textScore se houver pesquisa
        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order });
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const emds = await execQuery.exec();
        res.json(emds);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /filmes/:id - Procurar apenas por _id
app.get('/filmes/:id', async (req, res) => {
    try {
        const filme = await Filme.findById(req.params.id);
        if (!filme) return res.status(404).json({ error: "Não encontrado" });
        res.json(filme);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

// GET /atores
app.get('/atores', async (req, res) => {
    try {
        let queryObj = { ...req.query };
        
        // 1. Extração de parâmetros especiais
        const searchTerm = queryObj.q;
        const fields = queryObj._select; // 
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        // 2. Configuração da Pesquisa de Texto
        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };
            // Score de relevância
            projection.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        // 3. Configuração da Projeção (_select)
        if (fields) {
            // Converte "title,year" em { title: 1, year: 1 }
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1;
            });
        }

        // 4. Execução da Query
        let execQuery = Ator.find(mongoQuery, projection);

        // Prioridade de ordenação: _sort manual ou textScore se houver pesquisa
        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order });
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const emds = await execQuery.exec();
        res.json(emds);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /atores/:id - Procurar apenas por _id
app.get('/atores/:id', async (req, res) => {
    try {
        const ator = await Ator.findById(req.params.id);
        if (!ator) return res.status(404).json({ error: "Não encontrado" });
        res.json(ator);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

// GET /generos
app.get('/generos', async (req, res) => {
    try {
        let queryObj = { ...req.query };
        
        // 1. Extração de parâmetros especiais
        const searchTerm = queryObj.q;
        const fields = queryObj._select; // 
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        // 2. Configuração da Pesquisa de Texto
        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };
            // Score de relevância
            projection.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        // 3. Configuração da Projeção (_select)
        if (fields) {
            // Converte "title,year" em { title: 1, year: 1 }
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1;
            });
        }

        // 4. Execução da Query
        let execQuery = Genero.find(mongoQuery, projection);

        // Prioridade de ordenação: _sort manual ou textScore se houver pesquisa
        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order });
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const emds = await execQuery.exec();
        res.json(emds);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /generos/:id - Procurar apenas por _id
app.get('/generos/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) return res.status(404).json({ error: "Não encontrado" });
        res.json(genero);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

app.listen(7789, () => console.log('API minimalista em http://localhost:7789/filmes'));