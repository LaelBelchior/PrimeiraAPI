const Pedido = require('../models/pedidos')

module.exports = app => {
    app.get('/pedidos', (req, res) => {
        Pedido.lista(res)
    })

    app.get('/pedidos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Pedido.buscaPorId(id, res)
    })

    app.post('/pedidos', (req, res) => {
        const pedido = req.body
        Pedido.adiciona(pedido, res)
    })

    app.patch('/pedidos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
    
        Pedido.altera(id, valores, res)
    })

    app.delete('/pedidos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Pedido.deleta(id, res)
    })
}