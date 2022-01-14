const Pedido = require('../models/pedidos')

module.exports = app => {
    app.get('/pedidos', (req, res) => {
        res.send('Você está na rota de pedidos e está realizando um GET!')
    })

    app.post('/pedidos', (req, res) => {
        const pedido = req.body
        Pedido.adiciona(pedido)
        res.send('POST PEDIDO')
    })
}