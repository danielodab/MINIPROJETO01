const express = require ("express");
const app = express();
const PORT = 3111;

let produtos = [];


app.use(express.json());

//Registro de logs de solicitações
const logHoraMiddleware = (req, res, next) => {
    const horaAtual = new Date ().toISOString();
    console.log(
        `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
    );
    next();
};

app.use(logHoraMiddleware);

//Criar produto
app.post('/produtos', (req, res) => {
    const produto = req.body;
    produto.id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    produtos.push(produto);
    res.status(201).send('Produto adicionado com sucesso!');
});

//Listar produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

//Atualizar produto
app.put('/produtos/:id', (req, res) => { 
    const { id } = req.params;
    const newData = req.body; 
    const index = produtos.findIndex(produto => produto.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Produto não encontrado.');
        return;
    }
    produtos[index] = { ... produtos[index], ... newData};
    res.status(200).send (`Produto ${id} atualizado com sucesso.`);
});

//Deletar produto
app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex (produto => produto.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Produto não encontrada.');
        return;
    }
    produtos.splice(index, 1);
    res.status(200).send('Produto deletado com sucesso.');
})
app.listen(PORT, () => {
    console.log (`Servidor rodando em http://localhost:${PORT}`)
}); 